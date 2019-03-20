<template>
    <div class="Report">
        <div class="body" v-loading="!tableData">
            <div class="body-title">
                <div class="title-text">
                    个人军事训练综合成绩登记表
                    <div class="text-btns">
                        <div>
                            <el-button type="danger" v-if="$route.path === '/TableVue'" class="print-hidden" @click="$window.print()" size="mini" plain title="打印">打印</el-button>
                            <el-button type="primary" v-if="!patternIsEdit && $route.path !== '/TableVue'" class="print-hidden" @click="$units.showTable(tableData,'PersonAnnualScore')" size="mini" plain title="新窗口打开">新窗口打开（打印）</el-button>
                        </div>
                        <slot name="handle"> </slot>
                    </div>
                </div>
            </div>

            <div class="body-content" v-if="tableData">
                <div class="content-describe">
                    <span>姓名：<b class="font-family">{{tableData.name}}</b>&nbsp;&nbsp;职务：<b class="font-family">{{tableData.position}}</b></span>
                </div>
                <div class="content-table" ><!--v-if="tableData"-->
                    <table border="1" cellspacing="0" cellpadding="0">
                        <tr>
                            <th rowspan="2" colspan="3">课目</th>
                            <th colspan="2">成绩</th>
                            <th rowspan="2">年度成绩</th>
                            <th rowspan="2">优秀教练员（参谋）</th>
                            <th rowspan="2">比武竞赛</th>
                        </tr>
                        <tr>
                            <th>两级制</th>
                            <th>四级制</th>
                        </tr>
                        <tr class="font-family">
                            <td colspan="3">{{(tableData.courseScores[0]||{}).name}}</td>
                            <td> </td>
                            <td>{{handleScoreSriteria((tableData.courseScores[0]||{}).score)}}</td>
                            <td :rowspan="repairTableLength+tableData.courseScores.length">{{handleScoreSriteria(tableData.score)}}</td>
                            <td :rowspan="repairTableLength+tableData.courseScores.length"  :class="{'td-zindex':patternIsEdit}">
                                <div v-if="patternIsEdit">
                                    <el-radio v-model="tableData.excellentTrainer" :label="false">否</el-radio>
                                    <el-radio v-model="tableData.excellentTrainer" :label="true">是</el-radio>
                                </div>
                                <span v-else>{{tableData.excellentTrainer ? '是' : '否'}}</span>
                            </td>
                            <td :rowspan="repairTableLength+tableData.courseScores.length" :class="{'td-zindex':patternIsEdit}">
                                <textarea  v-if="patternIsEdit" placeholder="按回车键可输入多条数据" :value="tableData.competitions.join('\n')" @input="e =>tableData.competitions = e.target.value.split('\n')"></textarea>
                                <ul v-else class="competitions">
                                    <li v-for="item in tableData.competitions">{{item}}</li>
                                </ul>
                            </td>
                        </tr>
                        <tr class="font-family" v-for="(item,index) in tableData.courseScores" v-if="index>0">
                            <td colspan="3">{{item.name}}</td>
                            <td>{{item.criteria === '二级制' && handleScoreSriteria(item.score,item.criteria)||''}}</td>
                            <td>{{item.criteria === '四级制' && handleScoreSriteria(item.score,item.criteria)||''}}</td>
                        </tr>
                        <tr v-for="item in repairTableLength">
                            <td colspan="3">&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                    </table>
                </div>
                <div class="content-describe">
                    <span>审核人：<b class="text-1"></b></span>
                    <span>填写人：<b class="text-1"></b></span>
                    <span>{{$units.format(tableData.date)}}</span>
                </div>
            </div>

            <transition name="el-zoom-in-center">
                <div v-show="patternIsEdit" class="shadeBox shadeBox-wrapper"></div>
            </transition>
        </div>
    </div>
</template>

<script>
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
            }
        },
        computed:{
            repairTableLength(){
                if(!this.tableData)return {};
                const len = this.tableData.courseScores.length;
                return len > 33 ? this.tableData.courseScores.length : Math.abs(this.tableData.courseScores.length-33)
            },
        },
        methods:{
            handleScoreSriteria(score,criteria='四级制'){
                const found = Object.values(ScoreCriteria2).find(item=>item.name === criteria);
                return found.optionalScores[score]
            }
        },
    }
</script>

<style scoped lang="scss">
    @import "./common.scss";
</style>
