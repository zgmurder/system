<template>
    <div class="report print-body">
        <div class="body-title">
            <slot name="table-filter"></slot>
            <div class="title-text">
                <div class="text-btns">
                    <div><el-button type="danger" size="mini" plain class="print-hidden" @click="print()">打印</el-button></div>
                </div>
            </div>
        </div>

        <transition name="el-zoom-in-center">
            <div class="body-content" v-if="tableData.length">
                <div class="title-text" style="text-align: center">{{`${orgName}${tableData[0].year}年${tableData[0].month + 1}月`}}军事体育成绩排名表</div>
                <table class="content-table" border="1" cellspacing="0" cellpadding="0">
                    <tr>
                        <th rowspan="2" width="4%" >序号</th>
                        <th rowspan="2" width="6%">姓名</th>
                        <th width="4%" rowspan="2">性别</th>
                        <th width="4%" rowspan="2">年龄</th>
                        <th rowspan="2" width="6%">部职别</th>
                        <th rowspan="2" width="24%">单位</th>
                        <th colspan="5">通用训练课目</th>
                        <th rowspan="2" width="4%" >专项课目总评</th>
                        <th rowspan="2" width="4%" >体型成绩</th>
                        <th width="4%" rowspan="2">总分</th>
                        <th width="5%" rowspan="2">总评</th>
                    </tr>
                    <tr>
                        <th v-for="item in requiredCourse">{{item}}</th>
                    </tr>
                    <tr v-for="(item,index) in tableData">
                        <td width="4%">{{index+1+curPage}}</td>
                        <td width="6%">{{item.name}}</td>
                        <td width="4%">{{item.gender}}</td>
                        <td width="4%">{{item.age}}</td>
                        <td width="6%">{{item.position}}</td>
                        <td  width="24%">{{item.organization && item.organization.displayName}}</td>
                        <td v-for="indexNum in 5">{{tableData[index].requiredCourseScores|filterCourseScores(requiredCourse[indexNum-1])}}</td>
                        <td width="4%" >{{item.optionalScore|filterOptionCourseScores}}</td>
                        <td width="4%" >{{(item.shapeScore === 2)&&'合格'||'不合格'}}</td>
                        <td width="4%" >{{item.totalScore}}</td>
                        <td width="5%" >{{item.evaluatedScore|filterScore(item.evaluatedScoreCriteria)}}</td>
                    </tr>
                </table>
            </div>
        </transition>
    </div>
</template>

<script>
    import {ScoreCriteria2} from 'src/lib/Constants'
    const level4 = [...ScoreCriteria2.Level4.optionalScores];
    export default {
        data() {
            return {
                requiredCourse: ['引体向上/屈臂悬垂','俯卧撑（40岁以上）','仰卧起坐','30 米×2 蛇形跑','3000 米跑'],
            }
        },
        props: {
            tableData:{
                type:Array,
                default(){
                    return []
                }
            },
            orgName: {
                type: String,
                default() {
                    return ''
                }
            },
            curPage:{
                type:Number,
                default:0
            }
        },
        computed: {
            optionCoures() {
                if (!this.tableData.length) return [];
                let manCourse = this.tableData.find(item=>item.gender === '男');
                return !manCourse ? this.tableData[0].optionalCourseScores : manCourse.optionalCourseScores;
            }
        },
        filters: {
            filterScore(Score,scoreSriteria){
                const found = Object.values(ScoreCriteria2).find(item=>item.name === scoreSriteria);
                return found.optionalScores[Score]
            },
            filterCourseScores(itemCourseData, courseName) {
                let resultItem = itemCourseData.find(item=>(courseName===item.courseName)||(courseName==='引体向上/屈臂悬垂' && ((item.courseName==='单杠 1 练习（引体向上）') || (item.courseName=== '单杠屈臂悬垂'))));
                return !resultItem ? '-' : resultItem.score;
            },
            filterOptionCourseScores(score) {
                return !score?  '-' :level4[score];
            }
        },
        methods: {
            print(){
                window.print()
            }
        }
    }
</script>

<style scoped lang="scss">
    .report{
        flex: 1;
        background-color: #fff;
        overflow: hidden;
        color: #606266;
        position: relative;
        /*max-height: 840px;*/
        /*overflow: auto;*/
        .title-text{
            letter-spacing:3px;
            font-size: 26px;
            text-align: center;
            position: relative;
            color: #303133;
            padding: 10px 0;
            font-family: FZXBSJW!important;
        }
        .body-title{
            .title-text{
                letter-spacing:3px;
                font-size: 26px;
                text-align: center;
                /*position: relative;*/
                color: #303133;
                padding: 10px 0;
                font-family: FZXBSJW!important;
                .text-btns{
                    width: 100%;
                    position: absolute;
                    z-index: 3;
                    top: 15px;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: space-between;
                    padding: 10px;
                    padding-left: 0;
                }
            }
            .title-tip{
                text-align: center;
                border-bottom: 1px solid #ebeef5;
                line-height: 36px;
            }
        }
        .body-content{
            .content-describe{
                display: flex;
                justify-content: space-between;
                line-height: 36px;
            }
            .content-table{
                border:2px solid #000;
                td {
                    line-height: 28px;
                }
                th{
                    position: relative;
                    line-height: 26px;
                }
                .can-edit{
                    word-break: break-all;
                    word-wrap:break-word;
                    position: absolute;
                    box-sizing: border-box;
                    line-height: 36px;
                    overflow: hidden;
                    display: flex;
                    top: 0;
                    background: #fff;
                    z-index: 3;
                    height: 100%;
                    width: 100%;
                    input{
                        height: 100%;
                        width: 100%;
                        text-align: center;
                        border: none;
                    }
                }
                .select-in-table{
                    width: 100%;
                    position: relative;
                    z-index: 3;
                    text-align: left;
                }
            }
            .content-explain{
                padding: 10px;
                line-height: 26px;
                color: #909399;
                background: #f6f6f6;
            }
        }
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
        line-height: 30px;
        th{
            position: relative;
            line-height: 26px;
        }
        td{
            position: relative;
            line-height: 28px;
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
</style>
