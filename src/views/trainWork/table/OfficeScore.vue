<template>
    <div class="Report">
        <div class="body">
            <div class="body-title">
                <div class="title-text">
                    {{tableData.name}}军事训练综合成绩登记表
                    <div class="text-btns">
                        <div>
                            <el-button type="danger" v-if="$route.path === '/TableVue'" class="print-hidden" @click="$window.print()" size="mini" plain title="打印">打印</el-button>
                            <el-button type="primary" v-if="!patternIsEdit && $route.path !== '/TableVue'" class="print-hidden" @click="$units.showTable(tableData,'AssessEvent')" size="mini" plain title="新窗口打开">新窗口打开（打印）</el-button>
                        </div>
                        <slot name="handle"> </slot>
                    </div>
                </div>
            </div>
            <transition name="el-zoom-in-center">
                <div class="body-content">
                    <div class="content-table">
                        <table cellpadding="0" cellspacing="0" border="1">
                            <tr>
                                <th colspan="4">机关个人年度训练成绩</th>
                                <th rowspan="2">战术（战役）<br>作业成绩</th>
                                <th rowspan="2">指挥所<br>演习成绩</th>
                                <th rowspan="2">年度训练成绩</th>
                            </tr>
                            <tr>
                                <th>姓名</th>
                                <th>职务</th>
                                <th>成绩</th>
                                <th>成绩总评</th>
                            </tr>
                            <tr class="font-family">
                                <td>{{personScores[0] && personScores[0].name|| '　'}}</td>
                                <td>{{personScores[0] && personScores[0].position}}</td>
                                <td>{{personScores[0] && scoreOptions[personScores[0].score]}}</td>
                                <td rowspan="25">{{scoreOptions[tableData.childrenScore]}}</td>
                                <td rowspan="25" class="td-zindex">
                                    <el-radio-group v-if="patternIsEdit" v-model="tableData.tacticsScore" @change="evaluateScore" size="mini"><!---->
                                        <el-radio-button style="margin-top: -1px" :label="index" :key="index" v-for="(score,index) in scoreOptions">{{score}}</el-radio-button>
                                    </el-radio-group>
                                    <span v-else>{{scoreOptions[tableData.tacticsScore]}}</span>
                                </td>
                                <td rowspan="25" class="td-zindex">
                                    <el-radio-group v-if="patternIsEdit" v-model="tableData.exerciseScore" @change="evaluateScore" size="mini"><!-- @change="handleRadioChange"-->
                                        <el-radio-button style="margin-top: -1px" :label="index" :key="index" v-for="(score,index) in scoreOptions">{{score}}</el-radio-button>
                                    </el-radio-group>
                                    <span v-else>{{scoreOptions[tableData.exerciseScore]}}</span>
                                </td>
                                <td rowspan="25">{{scoreOptions[tableData.annualScore]}}</td>
                            </tr>
                            <tr v-for="index in 24" class="font-family">
                                <td>{{personScores[index] && personScores[index].name|| '　'}}</td>
                                <td>{{personScores[index] && personScores[index].position}}</td>
                                <td>{{personScores[index] && scoreOptions[personScores[index].score]}}</td>
                            </tr>
                        </table>
                    </div>

                    <div class="content-describe">
                        <span>审核人：<b class="text-1"></b></span>
                        <span>填写人：<b class="text-1"></b></span>
                        <span>{{$units.format(tableData.date)}}</span>
                    </div>
                </div>
            </transition>

            <transition name="el-zoom-in-center">
                <div v-show="patternIsEdit" class="shadeBox shadeBox-wrapper"></div>
            </transition>
        </div>
    </div>
</template>

<script>
    import {ScoreCriteria2} from 'src/lib/Constants'
    export default{
        name:'OfficeAnnualScore',
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
        computed:{
            scoreOptions(){
                const found = Object.values(ScoreCriteria2).find(item=>item.name === (this.tableData.scoreSriteria||'四级制'));
                return found.optionalScores
            },
            personScores(){
                return this.tableData && this.tableData.personScores || []
            },
        },
        methods:{
            async evaluateScore(){
                await this.$backendService.scoreService.evaluateLeaderOfficeScore(this.tableData);
            },
        }
    }

</script>

<style scoped lang="scss">
    @import "./common.scss";
</style>
