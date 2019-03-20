<template>
    <div class="Report">
        <div class="body" v-loading="!tableData">
            <div class="body-title" v-if="tableData">
                <div class="title-text">
                    <input v-if="patternIsEdit" class="input-edit" type="text" v-model="tableData.name">
                    <span v-else>{{tableData.name}}</span>
                    <div class="text-btns">
                        <div>
                            <el-button type="danger" v-if="$route.path === '/TableVue'" class="print-hidden" @click="$window.print()" size="mini" plain title="打印">打印</el-button>
                            <el-button type="primary" v-if="!patternIsEdit && $route.path !== '/TableVue'" class="print-hidden" @click="$units.showTable(tableData,'OfficeAnnualPlan')" size="mini" plain title="新窗口打开">新窗口打开（打印）</el-button>
                        </div>
                        <slot name="handle"> </slot>
                    </div>
                </div>
            </div>
            <div class="content-table" v-if="tableData">
                <table cellspacing="0" class="body-content-table print-portrait-height" cellpadding="0" border="1" @click="deleteCourse">
                    <tr>
                        <th :rowspan="comThRow" width="50"  v-if="hasMajors">区分</th>
                        <th :colspan="comThCol" height="20">内容与时间分配</th>
                        <th :rowspan="comThRow">训练<br>时间</th>
                        <th :rowspan="comThRow">重要<br>训练<br>活动</th>
                        <th :rowspan="comThRow">质量<br>指标</th>
                        <th :rowspan="comThRow">措施<br>要求</th>
                    </tr>
                    <tr>
                        <th height="50" v-for="item in tableData.trainSteps" :colspan="item.majorCourses && item.majorCourses && 4 || 1" :rowspan="hasMajors ? (item.majorCourses && item.majorCourses && 1 || 2) : 1">
                            {{item.name}}
                            <span class="nowrap" v-if="item.hoursAtNight">（昼{{item.hoursInDay}}小时/夜{{item.hoursAtNight}}小时）</span>
                            <span class="nowrap" v-else>（{{item.hoursInDay}}小时）</span>
                        </th>
                    </tr>
                    <tr v-if="comThRow === 3">
                        <th v-for="item in comBase" :colspan="item.name === '专业技能' && 3" height="50">
                            {{item.name}}
                            <span class="nowrap" v-if="item.hoursAtNight">昼{{item.hoursInDay}}/夜{{item.hoursAtNight}}（时）</span>
                            <span class="nowrap" v-else>（{{item.hoursInDay}}小时）</span>
                        </th>
                    </tr>
                    <tr>
                        <td v-if="hasMajors">
                            <ul class="differentiate">
                                <li :style="{height:key}" style="display: flex;justify-content: center;align-items: center" v-for="(key,value) in handlerDepart">{{value}}</li><!-- :style="{height:24*key+1+'px'}"-->
                            </ul>
                        </td>
                        <td :class="{'td-zindex':patternIsEdit}" v-for="item in comTotalCourses" :colspan="isMajors(item) && 3">
                            <table border="1" cellspacing="0" cellpadding="0" class="nested-table"  v-if="isMajors(item)">
                                <tr v-for="group in toGroup(item)">
                                    <td style="text-align: center">{{group.name}}</td>
                                    <td colspan="3">
                                        <p :class="{delete:patternIsEdit}" v-for="course in group.courses" :objectId="course.courseId">{{course.name}}</p>
                                    </td>
                                </tr>
                            </table>
                            <div v-else>
                                <p :class="{delete:patternIsEdit}" v-for="course in item" :objectId="course.courseId" style="display: flex;">
                                    {{course.name}}
                                </p>
                            </div>
                        </td>
                        <td :class="{'td-zindex':patternIsEdit}">
                            <textarea v-if="patternIsEdit" v-model="tableData.timeReq"></textarea>
                            <p v-else class="wrap max-heigth" v-html="handleStr(tableData.timeReq)"></p>
                        </td>
                        <td :class="{'td-zindex':patternIsEdit}">
                            <textarea v-if="patternIsEdit" v-model="tableData.activities"></textarea>
                            <p v-else class="wrap max-heigth" v-html="handleStr(tableData.activities)"></p>
                        </td>
                        <td :class="{'td-zindex':patternIsEdit}">
                            <textarea v-if="patternIsEdit" v-model="tableData.scoreReqs"></textarea>
                            <p v-else class="wrap max-heigth" v-html="handleStr(tableData.scoreReqs)"></p>
                        </td>
                        <td :class="{'td-zindex':patternIsEdit}">
                            <textarea v-if="patternIsEdit" v-model="tableData.methods"></textarea>
                            <p v-else class="wrap max-heigth" v-html="handleStr(tableData.methods)"></p>
                        </td>
                    </tr>

                    <tr style="text-align: center">
                        <td height="50px">备注</td>
                        <td :colspan="comThCol + (hasMajors ? 4 : 3)" style="padding-left: 8px"  :class="{'td-zindex':patternIsEdit}">
                            <textarea v-if="patternIsEdit" v-model="tableData.notes"></textarea>
                            <p v-else class="wrap" v-html="handleStr(tableData.notes)"></p>
                        </td>
                    </tr>

                </table>

                <div class="content-describe">
                    <span>审核人：<b class="text-1"></b></span>
                    <span>填写人：<b class="text-1"></b></span>
                    <span>{{tableData.date|formatDate}}</span>
                </div>
            </div>

            <div v-if="!tableData" class="body-empty"><img src="/static/img/empty.png" alt=""></div>

            <transition name="el-zoom-in-center">
                <div v-show="patternIsEdit" class="shadeBox shadeBox-wrapper"></div>
            </transition>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import {ScoreCriteria2,Departments} from 'src/lib/Constants'
    import {handleDataInTd} from 'src/config/units'
    import _ from 'lodash'
    export default{
        name:'OfficeAnnualPlan',
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
        methods:{
            handleDataInTd,
            handleStr(str){
                if(!str)return;
                return str.replace(/\n/g,"<br/>").replace(/\s/g,"&nbsp;")
            },
            toGroup(courseArr=[]){
                const majors = [...new Set(courseArr.map(item=>item.major))];
                let group = [];
                majors.reduce((prev,cur,index)=>{
                    const arr = prev.filter(item=>item.major === cur);
                    group[index] = {
                        name:cur,
                        courses:arr
                    };
                    return prev.filter(item=>item.major !== cur);
                },courseArr);
                group = group.filter(item=>!!item.courses.length);
                return group;
            },
            deleteCourse(event){
                const target = event.target;
                if(target.nodeName !== 'P' || !this.patternIsEdit)return;
                const objectId = target.getAttribute('objectid');
                this.$emit('deleteCourse', objectId)
            },
            isMajors(courseArr){
                return courseArr.some(item=>item.major)
            }
        },
        computed:{

            comMajorCourses(){
                const found = this.tableData.trainSteps.find(item=>item.majorCourses && item.majorCourses.length);
                return this.toGroup(found.majorCourses)
            },
            comThRow(){
                const found = this.tableData.trainSteps.find(item=>item.majorCourses && item.majorCourses.length);
                return found ? 3 : 2
            },

            comThCol(){
                return this.comStep.length*3 + this.tableData.trainSteps.length
            },
            comStep(){
                return this.tableData.trainSteps.filter(item=>item.majorCourses && item.majorCourses.length);
            },
            comBase(){
                let arr = [];
                this.comStep.forEach(item=>{
                    arr = [...arr,{...item.commonStats,name:'基本技能'},{...item.majorStats,name:'专业技能'}]
                });
                return arr
            },
            comTotalCourses(){
                let arr = [];
                this.tableData.trainSteps.forEach(item=>{
                    arr = [...arr,item.commonCourses,item.majorCourses]
                });
                return arr.filter(Boolean)
            },
            hasMajors(){
                return this.tableData.trainSteps.some(item=>item.majorCourses && item.majorCourses.length)
            },



            handlerDepart(){
                const found = this.tableData.trainSteps.find(item=>item.majorCourses && item.majorCourses.length);
                if(found){
                    const obj = _.countBy(found.majorCourses, 'depart');
                    const len = found.majorCourses.length;
                    const O = {};
                    Object.keys(obj).forEach(key=>{
                        O[key] = (obj[key]/len)*100+'%';
                    });
                    return O
                }else {
                    return {}
                }
            },

            totalHeight(){
                const el = document.querySelector('.body-content-table')
                console.log(el.style.height)
            },
        },
        filters:{
            formatDate(date){
                return moment(date).format('YYYY年')
            },
            handleScore(Score,scoreSriteria='四级制'){
                const found = Object.values(ScoreCriteria2).find(item=>item.name === scoreSriteria);
                return found.optionalScores[Score];
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
    .nested-table{
        border-style: hidden!important;
        height: 100%;
    }
    .differentiate{
        height: 100%;
        position: absolute;
        width: 100%;
        top: 0;
        li:not(:first-child){
            box-sizing: border-box;
            border-top: 1px solid #000;
        }
    }
    table.body-content-table{
        td{
            text-align: left;
            position: relative;
        }
        p.delete:hover{
            cursor: default;
            &:before{
                font-family: 'element-icons'!important;
                content: "\E60F";
                position: absolute;
                font-size: 16px;
                width: 16px;
                height: 16px;
                right: 0;
            }
        }
    }
</style>
