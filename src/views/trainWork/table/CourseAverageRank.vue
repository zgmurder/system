<template>
    <div class="course-total-ranking">
        <div class="item-title">
            <span class="person-title">{{!filterAverage.courseName && '课目排名' || filterAverage.courseName}}</span>
            <el-popover
                placement="top"
                width="200"
                v-model="visible2">
                <el-select v-model="filterAverage.orgRank"  placeholder="选择单位编制">
                    <el-option
                        v-for="(item,key) in selectOrgs"
                        :key="key"
                        :label="item.name"
                        :value="item.type">
                    </el-option>
                </el-select>
                <el-select v-model="filterAverage.courseName"  placeholder="选择课目" style="margin-top: 8px">
                    <el-option :label="item"
                               :key="item"
                               v-for="item in selectCourse"
                               :value="item">
                    </el-option>
                </el-select>
                <span slot="reference" style="line-height: 40px"><i class="el-icon-setting"></i></span>
            </el-popover>
        </div>
        <el-table
            class="chartTable"
            v-if="tableCourseAverageList.length"
            :data="tableCourseAverageList"
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
                        {{scope.row.selectCoureScore === undefined && '-' || scope.row.selectCoureScore}}
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
    import {OrgSequences,OrgSequence} from 'src/lib/Constants'
    export default {
        props:{
            filterObj:{
                type: Object,
                default: {}
            },
            className:{
                type: String,
                default: ''
            },
            course:{
                type: Number,
                default: 1
            }
        },
        mixins: [{
            methods:mixinOrg.methods
        }],
        data(){
            return {
                OrgSequences,
                visible2: false,
                filterAverage: {
                    rateRank: '',
                    orgRank: undefined,
                    curOrg: '',
                    year: undefined,
                    assessMethod:'',
                    courseName: ''
                },
                tableCourseAverageList: [],
                selectOrgs: {},
                filterConditions: {},
                selectCourse: {}
            }
        },
        watch: {
            'filterObj':{
                async handler(val){
                    if (!val.year || val.length <0) return;
                    this.filterAverage.year = val.year;
                    this.filterAverage.curOrg = val.curOrg;
                    this.filterAverage.assessMethod = val.assessMethod;
                    let $localStorage = localStorage.getItem('PersonSportAnnualChartAnaylsis');
                    this.currentUsername = await this.$backendService.UserService.backendService.currentUser.username;
                    this.currentSequence = await this.$backendService.orgService.getRootOrganization();
                    $localStorage = JSON.parse($localStorage);
                    let $index = $localStorage.findIndex(item=>item.username===this.currentUsername);
                    if (this.course === 1){
                        if ($localStorage[$index] && $localStorage[$index].filterAverage1) {
                            this.filterAverage.orgRank = $localStorage[$index].filterAverage1.orgRank;
                            this.filterAverage.courseName = $localStorage[$index].filterAverage1.courseName;
                        } else {
                            let $$index = OrgSequences.findIndex(item=>item.type===this.currentSequence.orgSequence);
                            this.filterAverage.orgRank = OrgSequences[$$index+1].type;
                            this.filterAverage.courseName = '单杠 1 练习（引体向上）';
                        }
                    } else {
                        if ($localStorage[$index] && $localStorage[$index].filterAverage2) {
                            this.filterAverage.orgRank = $localStorage[$index].filterAverage2.orgRank;
                            this.filterAverage.courseName = $localStorage[$index].filterAverage2.courseName;
                        } else {
                            let $$index = OrgSequences.findIndex(item=>item.type===this.currentSequence.orgSequence);
                            this.filterAverage.orgRank = OrgSequences[$$index+1].type;
                            this.filterAverage.courseName = '单杠 1 练习（引体向上）';

                        }
                    }

                },
                immediate: true,
                deep: true,
            },
            'filterAverage':{
                handler(val){
                    if (!val.curOrg) return;
                    let $localStorage = localStorage.getItem('PersonSportAnnualChartAnaylsis');
                    $localStorage = JSON.parse($localStorage);
                    let $index = $localStorage.findIndex(item=>item.username===this.currentUsername);
                    if ($index<0) return;
                    if (this.course === 1){
                        $localStorage[$index].filterAverage1 = val;
                    } else {
                        $localStorage[$index].filterAverage2 = val;
                    }
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
           let $courseArr = [];
           let result = await this.queryListAll('SportAssessReq');
           result.list.map(item=>{
               if (item.physicalLevels.length===1 && item.physicalLevels[0]==='新兵') return;
               $courseArr.push(item.course.name)
           });
           this.selectCourse = Array.from(new Set($courseArr))


        },
        methods:{
            async filterCourseTotalList() {
                let $query = new Client.Query(this.className);
                let $orgQuery = new Client.Query('Organization');
                $query.equalTo('year',parseInt(this.filterAverage.year));
                $query.equalTo('assessMethod',this.filterAverage.assessMethod);
                if (this.filterAverage.orgRank) {
                    $orgQuery.equalTo('orgSequence',this.filterAverage.orgRank);
                }
                $orgQuery.addDescending('totalAverageScore','orgSequence');
                $orgQuery.equalTo('parentIds', this.filterAverage.curOrg.objectId);
                $query.matchesQuery('organization', $orgQuery);
                let result = await this.queryListAll(this.className, $query);
                result.list.map(item=>{
                    let score = item.courseAverageScores.find(item1=>item1.name === this.filterAverage.courseName) ;
                    item.selectCoureScore = !score ? undefined : score.averageScore;
                });
                result.list.sort(this.handleAscDesc('selectCoureScore',-1));
                this.tableCourseAverageList = result.list;
            },
            queryListAll(className,query){
                return this.$backendService.queryListAll(className,query);
            },
            handleAscDesc(name,num) {
                return ((obj1, obj2)=>{
                    let value1 = obj1[name];
                    let value2 = obj2[name];
                    return num*(value1-value2);
                })
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
