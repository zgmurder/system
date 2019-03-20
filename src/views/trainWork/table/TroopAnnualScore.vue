<template>
    <div class="Report">
        <div class="body">
            <div class="body-title">
                <div class="title-text">
                    {{tableData.name}}军事训练综合成绩登记表
                    <div class="text-btns">
                        <div>
                            <el-button type="danger" v-if="$route.path === '/TableVue'" class="print-hidden" @click="$window.print()" size="mini" plain title="打印">打印</el-button>
                            <el-button type="primary" v-if="!patternIsEdit && $route.path !== '/TableVue'" class="print-hidden" @click="$units.showTable(tableData,'TroopAnnualScore')" size="mini" plain title="新窗口打开">新窗口打开（打印）</el-button>
                        </div>
                        <slot name="handle"> </slot>
                    </div>
                </div>
            </div>
            <div class="body-content">
                <div class="content-table">
                    <table border="1" cellspacing="0" cellpadding="0">
                        <tr>
                            <th height="100" rowspan="2">本级机关<br>年度训练成绩</th>
                            <th colspan="3">下级单位年度训练成绩</th>
                            <th rowspan="2">部队战术（战役）<br>训练成绩</th>
                            <th rowspan="2">年度<br>训练<br>成绩</th>
                        </tr>
                        <tr>
                            <th>单位</th>
                            <th>成绩</th>
                            <th>总评</th>
                        </tr>
                        <tr class="font-family">
                            <td rowspan="12">{{tableData.officeAnnualScore|handleScore}}</td>
                            <td height="50">{{tableData.childOrgScores[0].name}}</td>
                            <td>{{tableData.childOrgScores[0].score|handleScore}}</td>
                            <td rowspan="12">{{tableData.childrenScore|handleScore}}</td>
                            <td rowspan="12" class="td-zindex">
                                <el-radio-group v-if="patternIsEdit" v-model="tableData.tacticsScore" @change="evaluateScore" size="mini"><!-- @change="handleRadioChange"-->
                                    <el-radio-button style="margin-top: -1px" :label="index" :key="index" v-for="(score,index) in scoreOptions">{{score}}</el-radio-button>
                                </el-radio-group>
                                <span v-else>{{tableData.tacticsScore|handleScore}}</span>
                            </td>
                            <td rowspan="12">{{tableData.annualScore|handleScore}}</td>
                        </tr>
                        <tr v-for="index in 11" class="font-family">
                            <td height="50">　</td>
                            <td>　</td>
                        </tr>
                        <tr>
                            <td height="100">备注</td>
                            <td colspan="5">
                                <p style="text-align: left;padding-left: 10px">
                                    直属单位合为一个下级单位
                                </p>
                            </td>
                        </tr>
                    </table>
                </div>
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
        computed:{
            scoreOptions(){
                return ScoreCriteria2.Level4.optionalScores
            }
        },
        methods:{
            async evaluateScore(){
                await this.$backendService.scoreService.evaluateTroopAnnualScore(this.tableData);
            },
        },
        filters:{
            handleScore(Score){
                return ScoreCriteria2.Level4.optionalScores[Score]
            },
        },
    }

</script>

<style scoped lang="scss">
    @import "./common.scss";
</style>
