<template>
    <div class="Report">
        <div class="body">
            <div class="body-title">
                <div class="title-text">
                    {{tableData.name}}军事训练综合成绩登记表
                    <div class="text-btns">
                        <div>
                            <el-button type="danger" v-if="$route.path === '/TableVue'" class="print-hidden" @click="$window.print()" size="mini" plain title="打印">打印</el-button>
                            <el-button type="primary" v-if="!patternIsEdit && $route.path !== '/TableVue'" class="print-hidden" @click="$units.showTable(tableData,'UnitForceAnnualPlan')" size="mini" plain title="新窗口打开">新窗口打开（打印）</el-button>
                        </div>
                        <slot name="handle"> </slot>
                    </div>
                </div>
            </div>

            <div class="body-content">
                <div class="content-table">
                    <table border="1" cellspacing="0" cellpadding="0" class="print-height">
                        <tr>
                            <th :colspan="isZhongDui?3:2" height="50px">本级指挥官<br>年度训练成绩</th>
                            <th colspan="3" >下级{{isBan?'个人':'单位'}}<br>年度训练成绩</th>
                            <th colspan="4">本级战术训练（专业合练）成绩</th>
                            <th rowspan="2">年度<br>训练<br>成绩</th>
                        </tr>
                        <tr>
                            <th height="50px">姓名</th>
                            <th v-if="isZhongDui">成绩</th>
                            <th>总评</th>
                            <th>{{(!tableData.childOrgScores[0] && tableData.personScores[0]) && '姓名' || '单位'}}</th>
                            <th>成绩</th>
                            <th>总评</th>
                            <th colspan="2">课目</th>
                            <th>成绩</th>
                            <th>总评</th>
                        </tr>
                        <tr v-for="index in 16" class="font-family">
                            <td v-if="isZhongDui?(index % 2):index===1" :rowspan="isZhongDui?2:16">{{(commanderScores[index-1]||{}).name}}<br>{{(commanderScores[index-1]||{}).position}}</td>
                            <td v-if="(index % 2) && isZhongDui" rowspan="2">{{scoreOptions[(commanderScores[index-1]||{}).score]}}</td>
                            <td v-if="index === 1" rowspan="16">{{scoreOptions[tableData.commanderScore]}}</td>
                            <td v-if="(index % 2)" rowspan="2">{{(childOrgScores[index-1]||{}).name}}<br>{{(childOrgScores[index-1]||{}).position}}</td>
                            <td v-if="(index % 2)" rowspan="2">{{scoreOptions[(childOrgScores[index-1]||{}).score]}}</td>
                            <td v-if="index === 1" rowspan="16">{{scoreOptions[tableData.childrenScore]}}</td>
                            <td colspan="2" :class="{'td-zindex':courseScores[index-1]}">
                                <i class="el-icon-delete" v-if="courseScores[index-1] && patternIsEdit" style="position: absolute;right: 3px;top: 8px" @click="removeCourse(index-1)"></i>
                                {{(courseScores[index-1]||{}).name || (index===1?'点击右上角添加按钮':'　')}}
                            </td>
                            <td :class="{'td-zindex':courseScores[index-1]}">
                                <el-select
                                    v-if="patternIsEdit && courseScores[index-1]"
                                    size="mini"
                                    v-model="(courseScores[index-1]||{}).score"
                                    placeholder="请选择"
                                    @change="scoreIsChange">
                                    <el-option
                                        :label="score"
                                        :key="index"
                                        v-for="(score,index) in scoreOptions"
                                        :value="index">
                                    </el-option>
                                </el-select>
                                <span v-else>{{scoreOptions[(courseScores[index-1]||{}).score]}}</span>
                            </td>
                            <td v-if="index === 1" rowspan="16">{{scoreOptions[tableData.tacticsScore]}}</td>
                            <td v-if="index === 1" rowspan="16">{{scoreOptions[tableData.annualScore]}}</td>
                        </tr>
                        <tr>
                            <td height="80">备注</td>
                            <td :colspan="isZhongDui?10:9" style="text-align: left;padding-left: 10px">
                                <p>“姓名”栏填写姓名加职务</p>
                            </td>
                        </tr>
                    </table>
                </div>

                <!--<div class="content-describe">
                    <span>审核人：<b class="text-1"></b></span>
                    <span>填写人：<b class="text-1"></b></span>
                    <span>{{tableData.date|formatDate}}</span>
                </div>-->
            </div>

            <transition name="el-zoom-in-center">
                <div v-show="patternIsEdit" class="shadeBox shadeBox-wrapper"></div>
            </transition>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import {ScoreCriteria2} from 'src/lib/Constants'
    export default{
        props:{
            tableData:{
                type:Object,
                default:()=>{
                    return null
                }
            },
            patternIsEdit:{
                type:Boolean,
                default:false
            },
        },
        created(){
            console.log(this.tableData)
        },
        computed:{
            commanderScores(){
                return this.tableData.commanderScores
            },
            childOrgScores(){
                return this.isBan ? this.tableData.personScores : this.tableData.childOrgScores
            },
            courseScores(){
                return this.tableData.courseScores
            },
            scoreOptions(){
                return ScoreCriteria2.Level4.optionalScores
            },
            isZhongDui(){
                return this.tableData.orgSequence === 6
            },
            isBan(){
                return this.tableData.orgSequence === 8
            }
        },
        methods:{
            async scoreIsChange(){
                this.tableData.tacticsScore = await this.$backendService.scoreService.evaluateTacticsScore(this.tableData.courseScores);
                this.tableData.annualScore = await this.$backendService.scoreService.evaluateUnitForceScore(this.tableData);
            },
            removeCourse(index){
                this.tableData.courseScores.splice(index,1)
            }
        },
        filters:{
            formatDate(date){
                return moment(date).format('YYYY年MM月DD日')
            },
            handleScore(Score,scoreSriteria='四级制'){
                const found = Object.values(ScoreCriteria2).find(item=>item.name === scoreSriteria);
                return Score ? found.optionalScores[Score] : ' '
            },
            handleScoreSriteria(value,scoreSriteria,contains){
                if(scoreSriteria === contains)return value;
                else return ' '
            }
        },
    }

</script>

<style scoped lang="scss">
    @import "./common.scss";
    .active{
        background: #C0C4CC;
        color: #fff;
    }
</style>
