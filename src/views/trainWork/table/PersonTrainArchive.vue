<template>
    <div class="Report">
        <div class="body">
            <div class="body-title">
                <div class="title-text">
                    个人军事训练档案
                    <div class="text-btns">
                        <div>
                            <el-button type="danger" v-if="$route.path === '/TableVue'" class="print-hidden" @click="$window.print()" size="mini" plain title="打印">打印</el-button>
                            <el-button type="primary" v-if="!patternIsEdit && $route.path !== '/TableVue'" class="print-hidden" @click="$units.showTable(tableData,'PersonTrainArchive')" size="mini" plain title="新窗口打开">新窗口打开（打印）</el-button>
                        </div>
                        <slot name="handle"></slot>
                    </div>
                </div>
            </div>

            <div class="body-content" v-if="tableData" >
                <div class="content-table" >
                    <table border="1" cellspacing="0" cellpadding="0" class="table-height">
                        <tr>
                            <td class="td-title">单位</td>
                            <td colspan="5">{{tableData.organization && tableData.organization.displayName}}</td>
                            <td class="td-title">职务</td>
                            <td>{{tableData.position}}</td>
                        </tr>
                        <tr>
                            <td class="td-title">姓名</td>
                            <td>{{tableData.name}}</td>
                            <td class="td-title">性别</td>
                            <td>{{tableData.person && tableData.person.gender}}</td>
                            <td class="td-title">出生年月日</td>
                            <td>{{tableData.person && tableData.person.birthday|formatDate}}</td>
                            <td class="td-title">入伍年月</td>
                            <td>{{tableData.soldier && tableData.soldier.enlistedAt|filterMonth}}</td>
                        </tr>
                        <tr>
                            <td class="td-title">任现职时间</td>
                            <td>{{tableData.soldier && tableData.soldier.positionAt|filterMonth}}</td>
                            <td class="td-title">类别</td>
                            <td>{{tableData.soldier && tableData.soldier.soldierCategory}}</td>
                            <td class="td-title">专业</td>
                            <td>{{tableData.soldier && tableData.soldier.majorType}}</td>
                            <td class="td-title">证件号</td>
                            <td><p style="word-break: break-all;">{{tableData.cardId}}</p></td>
                        </tr>
                        <tr>
                            <td class="td-title" :rowspan="repairTableLength">军事训练成绩</td>
                            <td>{{tableData.courseScores[0] && tableData.courseScores[0].name}}</td>
                            <td>{{handleCourseScores(tableData.courseScores[0])}}</td>
                            <td>{{tableData.courseScores[6] && tableData.courseScores[6].name}}</td>
                            <td>{{handleCourseScores(tableData.courseScores[6])}}</td>
                            <td>{{tableData.courseScores[12] && tableData.courseScores[12].name}}</td>
                            <td>{{handleCourseScores(tableData.courseScores[12])}}</td>
                            <td :rowspan="repairTableLength">{{tableData.trainScore|handleScore}}</td>
                        </tr>
                        <tr v-for="(item, index) in repairTableLength" v-if="index">
                            <td>{{tableData.courseScores[index] && tableData.courseScores[index].name || ''}}</td>
                            <td>{{handleCourseScores(tableData.courseScores[index]) || ''}}</td>
                            <td>{{tableData.courseScores[index + repairTableLength] && tableData.courseScores[index + repairTableLength].name || ''}}</td>
                            <td>{{handleCourseScores(tableData.courseScores[index + repairTableLength]) || ''}}</td>
                            <td>{{tableData.courseScores[index + 2*repairTableLength] && tableData.courseScores[index + 2 *repairTableLength].name || ''}}</td>
                            <td>{{handleCourseScores(tableData.courseScores[index + 2 *repairTableLength]) || ''}}</td>
                        </tr>
                        <tr>
                            <td class="td-title" rowspan="6">军事体育训练成绩</td>
                            <td class="td-title" colspan="2">通用课目</td>
                            <td class="td-title" colspan="2">专项课目</td>
                            <td class="td-title" colspan="2">体型</td>
                            <td rowspan="6">总分 : {{tableData.totalScore}}<br>总成绩 : {{tableData.sportScore|handleScore('七级制')}}</td>
                        </tr>
                        <tr v-for="(item, index) in 5">
                            <td>{{tableData.requiredCourseScores[index] && tableData.requiredCourseScores[index].courseName}}</td>
                            <td>{{tableData.requiredCourseScores[index] && tableData.requiredCourseScores[index].score}}</td>
                            <td>{{tableData.optionalCourseScores[index] && tableData.optionalCourseScores[index].courseName}}</td>
                            <td>{{tableData.optionalCourseScores[index] && tableData.optionalCourseScores[index].score|handleScore(tableData.optionalScoreCriteria.name)}}</td>
                            <td>{{shapeList[index]}}</td>
                            <td>{{tableData.shape[shapeValue[index]]|filterShape(shapeValue[index])}}</td>
                        </tr>
                        <tr>
                            <td class="td-title" >年度总成绩</td>
                            <td colspan="6">{{tableData.overAllScore|handleScore}}</td>
                            <td></td>
                        </tr>
                        <tr style="height: 72px">
                            <td class="td-title">表彰与奖励</td>
                            <td colspan="6" :class="{'td-zindex':patternIsEdit}">
                                <textarea  v-if="patternIsEdit" placeholder="输入表彰与奖励" :value="tableData.rewards" @input="e =>tableData.rewards = e.target.value"></textarea>
                                <div v-else class="table-text">{{tableData.rewards}}</div>
                            </td>
                            <td ></td>
                        </tr>
                    </table>
                </div>
                <div class="content-describe">
                    <span >审核人：<b class="text-1"></b></span>
                    <span >填写人：<b class="text-1"></b></span>
                    <span >{{$units.format(tableData.date)}}</span>
                </div>
            </div>

            <!--<div v-if="!tableData" class="body-empty"><img src="/static/img/empty.png" alt=""></div>-->

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
        data() {
            return {
                shapeList: ['身高（cm）', '体重（kg）', '体型', '体脂（%）', '成绩评定'],
                shapeValue: ['height', 'weight', 'bmi', 'pbf', 'score'],
            }
        },
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
        methods:{
            handleCourseScores(course) {
                if (!course) return;
                const found = Object.values(ScoreCriteria2).find(item=>item.name === course.criteria);
                return found.optionalScores[course.score];
            },
        },
        computed:{
            repairTableLength(){
                if(!this.tableData)return {};
                const len = this.tableData.courseScores.length;
                return len > 18 ? Math.ceil(len/3) : 6;
            },
        },
        filters:{
            formatDate(date){
                return moment(date).format('YYYY年MM月DD日')
            },
            filterMonth(date){
                if (!date) return '';
                return moment(date).format('YYYY年MM月')
            },
            handleScore(Score,scoreSriteria='四级制'){
                const found = Object.values(ScoreCriteria2).find(item=>item.name === scoreSriteria);
                return found.optionalScores[Score]
            },
            filterShape(value, name){
                if (value === undefined) return '';
                if (name === 'score') {
                    return !value  ? '不及格' : '及格';
                } else {
                    return value;
                }
            }
        },
    }

</script>

<style scoped lang="scss">
    @import "./common.scss";
    @media print{
        .table-height {
            height: 900px;
        }
    }
    table{
        border-color: #666;
        border-collapse: collapse;
        width: 100%;
        text-align: center;
        vertical-align: center;
        box-sizing: border-box;
        border-width:0;
        border-style:hidden;
        color: #606266;
        table-layout:fixed;
        td{
            position: relative;
            box-sizing: border-box;
            height: 35px;
            /*line-height: 36px;*/
            .table-text {
                word-break: break-all;
            }

        }
        .td-title{
            font-weight: bolder;
        }
        input{
            border: none!important;
        }
    }
</style>
