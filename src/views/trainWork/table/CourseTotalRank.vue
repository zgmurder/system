<template>
    <div class="course-total-ranking">
        <div class="item-title">
            <span class="person-title">课目总分排名</span>
            <el-popover
                placement="top"
                width="200"
                v-model="visible2">
                <el-select v-model="filterTotal.orgRank"  placeholder="选择单位编制">
                    <el-option
                        v-for="(item,key) in selectOrgs"
                        :key="key"
                        :label="item.name"
                        :value="item.type">
                    </el-option>
                </el-select>
                <span slot="reference" style="line-height: 40px"><i class="el-icon-setting"></i></span>
            </el-popover>
        </div>
        <el-table
            class="chartTable"
            v-if="tableCourseTotalList.length"
            :data="tableCourseTotalList"
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
                label="分数">
                <template slot-scope="scope">
                    <div>
                        {{scope.row.totalAverageScore }}
                    </div>
                </template>
            </el-table-column>
        </el-table>
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
            className:{
                type: String,
                default: ''
            }
        },
        mixins: [{
            methods:mixinOrg.methods
        }],
        data(){
            return {
                OrgSequences,
                visible2: false,
                filterTotal: {
                    rateRank: '',
                    orgRank: undefined,
                    curOrg: '',
                    year: undefined,
                    assessMethod:''
                },
                tableCourseTotalList: [],
                selectOrgs: {},
                filterConditions: {},
            }
        },
        watch: {
            'filterObj':{
                async handler(val){
                    if (!val.year || val.length <0) return;
                    this.filterTotal.year = val.year;
                    this.filterTotal.curOrg = val.curOrg;
                    this.filterTotal.assessMethod = val.assessMethod;
                    let $localStorage = localStorage.getItem('PersonSportAnnualChartAnaylsis');
                    this.currentUsername = await this.$backendService.UserService.backendService.currentUser.username;
                    this.currentSequence =  await this.$backendService.orgService.getRootOrganization();
                    $localStorage = JSON.parse($localStorage);
                    let $index = $localStorage.findIndex(item=>item.username===this.currentUsername);
                    if ($localStorage[$index] && $localStorage[$index].filterTotal) {
                        this.filterTotal.orgRank = $localStorage[$index].filterTotal.orgRank;
                    } else {
                        let $$index = OrgSequences.findIndex(item=>item.type===this.currentSequence.orgSequence);
                        this.filterTotal.orgRank = OrgSequences[$$index+1].type;
                    }
                },
                immediate: true,
                deep: true,
            },
            'filterTotal':{
                handler(val){
                    if (!val.curOrg) return;
                    let $localStorage = localStorage.getItem('PersonSportAnnualChartAnaylsis');
                    $localStorage = JSON.parse($localStorage);
                    let $index = $localStorage.findIndex(item=>item.username===this.currentUsername);
                    if ($index<0) return;
                    $localStorage[$index].filterTotal = val;
                    localStorage.setItem('PersonSportAnnualChartAnaylsis',JSON.stringify($localStorage));
                    this.filterCourseTotalList()
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
            async filterCourseTotalList() {
                let $query = new Client.Query(this.className);
                let $orgQuery = new Client.Query('Organization');
                $query.equalTo('year',parseInt(this.filterTotal.year));
                $query.equalTo('assessMethod',this.filterTotal.assessMethod);
                if (this.filterTotal.orgRank) {
                    $orgQuery.equalTo('orgSequence',this.filterTotal.orgRank);
                }
                $orgQuery.addDescending('totalAverageScore','orgSequence');
                $orgQuery.equalTo('parentIds', this.filterTotal.curOrg.objectId);
                $query.matchesQuery('organization', $orgQuery);
                let result = await this.queryListAll(this.className, $query);
                this.tableCourseTotalList = result.list;
            },
            queryListAll(className,query){
                return this.$backendService.queryListAll(className,query);
            },
        },
    }
</script>

<style scoped lang="scss">
    .course-total-ranking{
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
