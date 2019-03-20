<template>
    <div class="rate-ranking">
        <div class="item-title">
            <span class="person-title">单位成绩排名</span>
            <el-popover
                placement="top"
                width="200"
                v-model="visible2">
                <el-select v-model="filterRate.orgRank"  placeholder="选择单位编制">
                    <el-option
                        v-for="(item,key) in selectOrgs"
                        :key="key"
                        :label="item.name"
                        :value="item.type">
                    </el-option>
                </el-select>
                <el-select v-model="filterRate.rateRank"  placeholder="选择比率类型" style="margin-top: 10px">
                    <el-option
                        v-for="(item,key) in selectRate"
                        :key="key"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
                <span slot="reference" style="line-height: 40px"><i class="el-icon-setting"></i></span>
            </el-popover>
        </div>
        <el-table
            class="chartTable"
            v-if="tableRateList.length"
            :data="tableRateList"
            size="mini"
            border
            max-height="309"
            style="width: 100%">
            <el-table-column
                prop="organization"
                align="center"
                header-align="center"
                label="单位名称">
                <template slot-scope="scope">
                    <div>
                        {{scope.row.organization && scope.row.organization.name}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="position"
                align="center"
                header-align="center"
                label="百分比">
                <template slot-scope="scope">
                    <div>
                        {{scope.row|filterRateNum(filterRate.rateRank) }}
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div v-else class="noData">
            <img src="/static/img/empty.png">
        </div>
        <div v-else class="noData">
            <img src="/static/img/empty.png">
        </div>
    </div>
</template>

<script>
    import _ from 'lodash';
    import Client from 'src/lib/Client';
    import {mixinOrg} from "src/config/mixin"
    import {OrgSequences} from 'src/lib/Constants'
    export default {
        props:{
            filterObj:{
                type: Object,
                default: {}
            },
            className: {
                type: String,
                default: ''
            }
        },
        mixins: [{
            methods:mixinOrg.methods
        }],
        data(){
            return {
                visible2: false,
                OrgSequences,
                filterRate: {
                    rateRank: '',
                    orgRank: undefined,
                    curOrg: '',
                    year: undefined,
                    assessMethod:''
                },
                selectOrgs: [],
                tableRateList: [],
                selectRate: [
                    {name:'优秀率', value: 'excellentRate'},
                    {name:'良好率', value: 'goodRate'},
                    {name:'及格率', value: 'passRate'},],
                filterConditions: {},
            }
        },
        watch: {
            'filterObj':{
                async handler(val){
                    if (!val.year || val.length <0) return;
                    this.filterRate.year = val.year;
                    this.filterRate.curOrg = val.curOrg;
                    this.filterRate.assessMethod = val.assessMethod;
                    let $localStorage = localStorage.getItem('PersonSportAnnualChartAnaylsis');
                    this.currentUsername = await this.$backendService.UserService.backendService.currentUser.username;
                    this.currentSequence = await await this.$backendService.orgService.getRootOrganization();
                    $localStorage = JSON.parse($localStorage);
                    let $index = $localStorage.findIndex(item=>item.username===this.currentUsername);
                    if ($localStorage[$index] && $localStorage[$index].filterRate) {
                        this.filterRate.rateRank = $localStorage[$index].filterRate.rateRank;
                        this.filterRate.orgRank = $localStorage[$index].filterRate.orgRank;
                    } else {
                        this.filterRate.rateRank = 'excellentRate';
                        let $$index = OrgSequences.findIndex(item=>item.type===this.currentSequence.orgSequence);
                        this.filterRate.orgRank = OrgSequences[$$index+1].type;
                    }
                },
                immediate: true,
                deep: true,
            },
            'filterRate':{
                handler(val){
                    if (!val.rateRank || val.length <0) return;
                    let $localStorage = localStorage.getItem('PersonSportAnnualChartAnaylsis');
                    $localStorage = JSON.parse($localStorage);
                    let $index = $localStorage.findIndex(item=>item.username===this.currentUsername);
                    $localStorage[$index].filterRate = this.filterRate;
                    localStorage.setItem('PersonSportAnnualChartAnaylsis',JSON.stringify($localStorage));
                    this.fetchRateRankTable()
                },
                immediate: false,
                deep: true,
            },
        },
        async created() {
            let $currentSequence = await this.$backendService.orgService.getRootOrganization();
            this.selectOrgs = OrgSequences.filter(item=>item.type<7 && item.type> $currentSequence.orgSequence);
        },
        methods:{
            async fetchRateRankTable(){
                let $query = new Client.Query(this.className);
                let $orgQuery = new Client.Query('Organization');
                $query.equalTo('year',parseInt(this.filterRate.year));
                $query.equalTo('assessMethod',this.filterRate.assessMethod);
                if (this.filterRate.orgRank) {
                    $orgQuery.equalTo('orgSequence',this.filterRate.orgRank);
                }
                $orgQuery.addDescending('orgSequence');
                $orgQuery.equalTo('parentIds', this.filterRate.curOrg.objectId);
                $query.matchesQuery('organization', $orgQuery);
                let result = await this.queryListAll(this.className, $query);
                result.list.map(item=>{
                    item.passRate = item.stats.passRate - item.stats.goodRate;
                    item.goodRate = item.stats.goodRate - item.stats.excellentRate;
                    item.excellentRate = item.stats.excellentRate - item.stats.extraL3Rate;
                });
                result.list.sort(this.handleAscDesc(this.filterRate.rateRank,-1));
                this.tableRateList = result.list;
            },
            handleAscDesc(name,num) {
                return ((obj1, obj2)=>{
                    let value1 = obj1[name];
                    let value2 = obj2[name];
                    return num*(value1-value2);
                })
            },
            queryListAll(className,query){
                return this.$backendService.queryListAll(className,query);
            },
        },
        filters: {
            filterScoreRate(rate,selectRate){
                return selectRate.find(item=>item.value===rate).name;
            },
            filterRateNum(data,name){
                return `${data[name]}%`;
            }
        }
    }
</script>

<style scoped lang="scss">
    .rate-ranking{
        width: 100%;
        .item-title{
            display: flex;
            justify-content: space-between;
            .person-title{
                width: 180px;
                height: 35px;
                text-align: center;
                background: #38425c;
                font-size: 16px;
                float: left;
                line-height: 35px;
                padding: 3px;
                color: #fff;
                font-weight: bolder;
            }
        }
        .noData{
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                width: 260px;
            }
        }
        .chartTable{
            margin-top: 8px;
        }
    }
</style>
