<template>
    <div class="person-ranking">
        <div class="item-title">
            <span class="person-title">个人成绩排名</span>
            <el-popover
                placement="top"
                width="240"
                v-model="visible2">
                <el-cascader
                    style="line-height: 48px"
                    clearable
                    placeholder="请选择职务"
                    :options="selectPosition"
                    v-model="filterPersonal.position">
                </el-cascader>
                <el-radio v-model="filterPersonal.rank" label="top" style="line-height: 2;">前十位排名</el-radio>
                <el-radio v-model="filterPersonal.rank" label="bottom" style="line-height: 2;">后十位排名</el-radio>
                <span slot="reference" style="line-height: 40px"><i class="el-icon-setting"></i></span>
            </el-popover>
        </div>
        <el-table
            class="chartTable"
            v-if="tablePersonalList.length"
            :data="tablePersonalList"
            size="mini"
            max-height="309"
            border
            style="width: 100%">
            <el-table-column
                prop="name"
                align="center"
                width="70"
                header-align="center"
                label="姓名">
                <template slot-scope="scope">
                    <div>
                        {{ scope.row.name }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                header-align="center"
                prop="organization"
                label="单位">
                <template slot-scope="scope">
                    <div>
                        {{scope.row.organization && scope.row.organization.displayName}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="position"
                align="center"
                width="70"
                header-align="center"
                label="职位">
                <template slot-scope="scope">
                    <div>
                        {{ scope.row.position }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="totalScore"
                width="50"
                align="center"
                header-align="center"
                label="总分">
                <template slot-scope="scope">
                    <div>
                        {{ scope.row.totalScore }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="evaluatedScore"
                width="60"
                align="center"
                header-align="center"
                label="总评">
                <template slot-scope="scope">
                    <div>
                        {{ scope.row.evaluatedScore|filterScore(scope.row.evaluatedScoreCriteria) }}
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
    import {OrgSequences,ScoreCriteria2} from 'src/lib/Constants'
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
                filterPersonal: {
                    position:[],
                    rank: '',
                    curOrg: ''
                },
                tablePersonalList: [],
                selectPosition: [],
                filterConditions: {}
            }
        },
        watch: {
            'filterObj':{
                async handler(val){
                    if (!val.year || val.length<0) return;
                    this.filterConditions.assessMethod = val.assessMethod;
                    this.filterConditions.year = val.year;
                    this.filterConditions.curOrg = val.curOrg;
                    this.filterPersonal.curOrg = val.curOrg.name;
                    let $personStorage = localStorage.getItem('PersonSportAnnualChartAnaylsis');
                    this.currentUsername = await this.$backendService.UserService.backendService.currentUser.username;
                    $personStorage = JSON.parse($personStorage);
                    if(!$personStorage) return;
                    let $index = $personStorage.findIndex(item=>item.username===this.currentUsername);
                    if (!$personStorage[$index] || !$personStorage[$index].filterPersonal) {
                        this.filterPersonal.position = [];
                        this.filterPersonal.rank= 'top';
                    } else {
                        this.filterPersonal.position = $personStorage[$index].filterPersonal.position;
                        this.filterPersonal.rank= $personStorage[$index].filterPersonal.rank;
                    }
                },
                immediate: true,
                deep: true,
            },
            'filterPersonal': {
                handler(val){
                    if (!val.rank || val.length<0) return;
                    this.filterConditions.position = val.position;
                    this.filterConditions.ascDesc = val.rank;
                    let $personStorage = localStorage.getItem('PersonSportAnnualChartAnaylsis');
                    $personStorage = JSON.parse($personStorage);
                    let $index = $personStorage.findIndex(item=>item.username===this.currentUsername);
                    $personStorage[$index].filterPersonal = this.filterPersonal;
                    localStorage.setItem('PersonSportAnnualChartAnaylsis',JSON.stringify($personStorage));
                    this.fetchPersonalTable();
                },
                immediate: false,
                deep: true,
            },
        },
        async created() {
            let positionArr = [];
            OrgSequences.map(item=>{
                if (item.type>6) return;
                let itemPosition = {};
                itemPosition.value = item.type;
                itemPosition.label = item.name;
                itemPosition.children = [];
                positionArr.push(itemPosition);
            });
            this.triggerSelect('Position').then(result=>{
                positionArr.map(item=>{
                    result.list.map(itemResult=>{
                        if (item.value !== itemResult.orgSequence) return;
                        let resultObj = {};
                        resultObj.label = itemResult.name;
                        resultObj.value = `${itemResult.name}${itemResult.sortCode}`;
                        item.children.push(resultObj);
                    })
                });
                this.selectPosition = positionArr;
            });
        },
        methods:{
            async fetchPersonalTable() {
                let $query = new Client.Query(this.className);
                if (this.filterConditions.ascDesc ==='top'){
                    $query.addDescending('evaluatedScore','totalScore',);
                    $query.addAscending('positionCode');
                } else {
                    $query.addAscending('evaluatedScore','totalScore',);
                    $query.addDescending('positionCode');
                }
                if (this.filterConditions.position && this.filterConditions.position[0] && this.filterConditions.position[1]) {
                    let $position =this.filterConditions.position[1].substring(this.filterConditions.position[1].length-3,0);
                    let $positionCode = parseInt(this.filterConditions.position[1].substring(this.filterConditions.position[1].length-3,this.filterConditions.position[1].length));
                    $query.equalTo('position',$position).equalTo('positionCode', $positionCode);
                }
                $query.equalTo('assessMethod',this.filterConditions.assessMethod);
                $query.equalTo('year',parseInt(this.filterConditions.year));
                $query.limit(10);
                const parameters = {className:this.className,query:$query,organization:this.filterConditions.curOrg,withLocal:false};
                const result = await this.$backendService.queryListByOrganization(parameters);
                this.tablePersonalList = result.list;
            },
        },
        filters:{
            filterScore(Score,scoreSriteria){
                const found = Object.values(ScoreCriteria2).find(item=>item.name === scoreSriteria);
                return found.optionalScores[Score]
            },
        }
    }
</script>

<style scoped lang="scss">
    .person-ranking{
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
        .content-table {
            margin-top: 12px;
            border: 1px solid #000;
        }
        table{
            border-color: #333;
            border-collapse: collapse;
            width: 100%;
            text-align: center;
            vertical-align: center;
            box-sizing: border-box;
            border-width:0;
            border-style:hidden;
            color: #606266;
            table-layout: fixed;
            line-height: 25px;
            th{
                font-size: 14px;
                color: #fff;
                background: rgb(18, 46, 74);
                position: relative;
                line-height: 25px;
            }
            td{
                position: relative;
                line-height: 25px;
                font-size: 14px;
            }
            .textarea{
                line-height: 30px;
                box-sizing: border-box;
                padding-top: 15px;
                padding-left: 5px;
                border: none;
                width: 100%;
                resize: none;
                text-align: center;
                word-wrap: break-word;
                overflow: hidden;
            }
        }
        .chartTable{
            margin-top: 8px;
        }
    }

</style>
