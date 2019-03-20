<template>
    <div class="Report">
        <div class="body"  v-loading="!tableData">
            <div class="body-title">
                <div class="title-text" v-if="tableData">
                    <input v-if="patternIsEdit" class="input-edit" type="text" v-model="tableData.name">
                    <span v-else>{{tableData.name}}</span>
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
                    <table  v-if="tableData && tableData.trainSteps && tableData.planItems" cellspacing="0" cellpadding="0" border="1" @click="deleteCourse" class="print-portrait-height">
                        <tr>
                            <th colspan="2" rowspan="3" width="50">区分</th>
                            <th :colspan="tableData.planItems.length" height="24" width="60%">内容与时间分配</th>
                            <th rowspan="3">训练<br>时间</th>
                            <th rowspan="3">重要<br>训练<br>活动</th>
                            <th rowspan="3">质量<br>指标</th>
                            <th rowspan="3">措施<br>要求</th>
                        </tr>
                        <tr>
                            <th height="45" v-for="planItem in tableData.planItems">{{planItem.task}}<br>（{{planItem.fromDate|formatDate}}至{{planItem.toDate|formatDate}}）</th>
                        </tr>
                        <tr>
                            <th v-for="planItem in tableData.planItems"  height="24">{{planItem.hours/unitForceTime}}天{{planItem.hours}}小时</th>
                        </tr>
                        <tr>
                            <td :rowspan="tableData.trainSteps.length+1" class="text-center" width="50">{{tableData.orgCategory}}</td>

                            <td height="50" class="text-center">警<br>官</td>
                            <td v-for="(planItem,planItemIndex) in tableData.planItems" :class="{'td-zindex can-edit':patternIsEdit,active:active === planItemIndex+1}" >
                                <div v-if="patternIsEdit">
                                    <el-popover
                                        placement="right"
                                        title="请选择课目"
                                        width="200"
                                        trigger="click">
                                        <div style="max-height: 400px;overflow-y: auto;margin-bottom: 28px">
                                            <p style="margin-bottom: 10px" v-for="(item,index) in canSelectCourse"><el-checkbox v-model="item.checked">{{item.name}}</el-checkbox></p>
                                            <p v-if="!canSelectCourse.length" style="color: #909399">无可选课目</p>
                                            <el-button type="primary" size="mini" icon="el-icon-edit" @click="addOfficeCourse(planItem)" style="width: 100%;position: absolute;bottom: 0;z-index: 1;left: 0">确定添加</el-button>
                                        </div>
                                        <a slot="reference" class="el-icon-circle-plus addBtn" @click="getOfficeCourse(planItemIndex+1)"></a>
                                    </el-popover>
                                    <p :class="{delete:patternIsEdit}" isOffice="true"  :objectid="JSON.stringify(officerCourse)" :index="planItemIndex" v-for="officerCourse in planItem.officerCourses">{{officerCourse.name}}</p>
                                </div>
                                <p v-else :class="{delete:patternIsEdit}" isOffice="true"  :objectid="JSON.stringify(officerCourse)" :index="planItemIndex" v-for="officerCourse in planItem.officerCourses">{{officerCourse.name}}</p>
                            </td>
                            <td>{{tableData.officerTime && tableData.officerTime.timeReq.hours}}小时</td>

                            <td :class="{'td-zindex':patternIsEdit}" :rowspan="tableData.trainSteps.length+1">
                                <textarea v-if="patternIsEdit" v-model="tableData.activities"></textarea>
                                <p v-else class="wrap max-heigth" v-html="handleStr(tableData.activities)"></p>
                            </td>
                            <td :class="{'td-zindex':patternIsEdit}" :rowspan="tableData.trainSteps.length+1">
                                <textarea v-if="patternIsEdit" v-model="tableData.scoreReqs"></textarea>
                                <p v-else class="wrap max-heigth" v-html="handleStr(tableData.scoreReqs)"></p>
                            </td>
                            <td :class="{'td-zindex':patternIsEdit}" :rowspan="tableData.trainSteps.length+1">
                                <textarea v-if="patternIsEdit" v-model="tableData.methods"></textarea>
                                <p v-else class="wrap max-heigth" v-html="handleStr(tableData.methods)"></p>
                            </td>
                        </tr>
                        <tr v-for="(step,index) in tableData.trainSteps" :id="'tr'+index">
                            <td>{{step}}</td>
                            <td :width="(63/tableData.planItems.length)+'%'" v-for="(planItem,planItemIndex) in tableData.planItems" :style="{height:heightArr[index]+'px'}" :height="heightArr[index]+'px'" :class="{'td-zindex can-edit':patternIsEdit,active:active === index+''+planItemIndex}">
                                <div v-if="patternIsEdit">
                                    <el-popover
                                        placement="right"
                                        title="请选择课目"
                                        width="200"
                                        trigger="click">
                                        <div style="max-height: 400px;overflow-y: auto;margin-bottom: 28px">
                                            <p style="margin-bottom: 10px" v-for="(item,index) in canSelectCourse"><el-checkbox v-model="item.checked">{{item.displayName}}</el-checkbox></p>
                                            <p v-if="!canSelectCourse.length" style="color: #909399">无可选课目</p>
                                            <el-button type="primary" class="select-in-popover" size="mini" icon="el-icon-edit" @click="addCourse(planItem)" style="width: 100%;position: absolute;bottom: 0;z-index: 1;left: 0">确定添加</el-button>
                                        </div>
                                        <a slot="reference" class="el-icon-circle-plus addBtn" @click="getCanCourse(planItem,step,index+''+planItemIndex)"></a>
                                    </el-popover>
                                </div>
                                <table cellspacing="0" cellpadding="0" border="1" style="table-layout: auto" class="nested-table">
                                    <tr>
                                        <td width="40%">
                                            <p :class="{delete:patternIsEdit}" :index="planItemIndex" :objectid="JSON.stringify(commonCourse)" v-for="commonCourse in filterArrByItemKeyValue(planItem.commonCourses,'trainStep',step)">{{commonCourse|formatCourseName}}</p>
                                        </td>
                                        <td v-if="findMajorArr(planItem.majorCourses,step).length">
                                            <table cellspacing="0" cellpadding="0" border="1" class="nested-table">
                                                <tr v-for="majorName in findMajorArr(planItem.majorCourses,step)">
                                                    <td style="width: 20%" class="text-center">{{majorName}}</td>
                                                    <td colspan="2">
                                                        <p :class="{delete:patternIsEdit}" :index="planItemIndex" :objectid="JSON.stringify(majorCourse)" isMajor="true" v-for="majorCourse in filterArrByItemKeyValue(filterArrByItemKeyValue(planItem.majorCourses,'majorReq',majorName), 'trainStep',step)">{{majorCourse|formatCourseName}}</p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td v-if="index === 0" :rowspan="tableData.trainSteps.length">
                                {{stepTrainTime}}
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="content-describe">
                    <span>审核人：<b class="text-1"></b></span>
                    <span>填写人：<b class="text-1"></b></span>
                    <span>{{(tableData||{}).date|formatDate}}</span>
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
    import {handleDataInTd,filterArrByItemKeyValue} from 'src/config/units'
    import _ from 'lodash'
    export default{
        name:'UnitForceAnnualPlan',
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
        data(){
            return {
                canSelectCourse:[],
                course:[],
                active:undefined,
                heightArr:[]
            }
        },
        watch:{
            'patternIsEdit':{
                handler(value){
                    if(value)this.active = undefined;
                }
            },
            'tableData':{
                handler(value){
                    if(!value || !value.trainSteps)return;
                    this.$nextTick(()=>{
                        this.tableData.trainSteps.forEach((item,index)=>{
                            const value = document.querySelector('#tr'+index).offsetHeight+'px';
                            this.$set(this.heightArr,index,value);
                        });
                    })
                }
            },
        },
        methods:{
            handleDataInTd,
            filterArrByItemKeyValue,
            handleStr(str){
                if(!str)return;

                return str.replace(/\n/g,"<br/>").replace(/\s/g,"&nbsp;")
            },
            findMajorArr(majorCourseArr,step){
                const arr = majorCourseArr.filter(item=>item.trainStep === step);
                return _.uniq(_.map(arr,(item)=>item.majorReq));
            },
            filterMajorArr(majorCourseArr,majorCourse){
                return majorCourseArr.filter(item=>item.majorReq === majorCourse)
            },
            deleteCourse(event){
                const target = event.target;
                if(target.nodeName !== 'P' || !this.patternIsEdit)return;
                const courses = [JSON.parse(target.getAttribute('objectid'))];
                //const courses = this.canSelectCourse.filter(course=>course.courseId === courseId);
                const isOfficer = !!target.getAttribute('isOffice');
                const planItem = this.tableData.planItems[target.getAttribute('index')];
                this.$emit('updateCourseUnitForce', {isAdd:false,courses,planItem,isOfficer})
            },
            addCourse(planItem){
                const courses = this.canSelectCourse.filter(item=>item.checked);
                this.$emit('updateCourseUnitForce', {isAdd:true,courses,planItem,isOfficer:false},this.getCanCourse,this.$$step);
            },
            addOfficeCourse(planItem){
                const courses = this.canSelectCourse.filter(item=>item.checked);
                this.$emit('updateCourseUnitForce', {isAdd:true,courses,planItem,isOfficer:true},this.getOfficeCourse);
            },
            getCanCourse(planItem,step,planItemIndex){
                if(planItemIndex)this.active = planItemIndex;
                if(step)this.$$step = step;
                const result = this.$backendService.annualPlanService.getOptionalUnitForceCourses(planItem);
                this.canSelectCourse = result.filter(item=>item.trainStep === this.$$step).map(item=>{
                    item.displayName = item.name;
                    if(!_.isEmpty(item.majorReq)) item.displayName = `${item.name}(${item.majorReq})`;
                    return item
                });
                this.canSelectCourse.forEach(item=>this.$set(item,'checked',false))
            },
            getOfficeCourse(planItemIndex){
                if(planItemIndex && typeof planItemIndex === 'number')this.active = planItemIndex;
                this.canSelectCourse = this.$backendService.annualPlanService.getOptionalOfficerCourses(this.tableData);
                this.canSelectCourse.forEach(item=>this.$set(item,'checked',false))
            },
            handleHeight(id){
                const el = document.querySelector('#'+id);
                return el && el.offsetHeight+'px'
            }
        },
        computed:{
            unitForceTime(){
                if(!this.tableData.unitForceTime)return
                return +this.handleDataInTd(this.tableData,'unitForceTime','timeReq','hoursPerDay')
            },
            stepTrainTime(){
                if(!this.tableData.unitForceTime)return
                const timeObj = this.handleDataInTd(this.tableData,'unitForceTime','timeReq');
                return `
                    年度军事训练${timeObj.months}个月不少于${timeObj.days}天${timeObj.hours}小时（每月训练不少于${timeObj.daysPerMonth}天，每天训练${timeObj.hoursPerDay}小时）；训练机动时间${timeObj.flexibleDays}天${timeObj.flexibleDays*(+timeObj.hoursPerDay)}小时；
                    夜间训练时间不少于年度训练时间的20%（216小时）；全年体能训练时间不少于280小时（不计入训练时间）
                `
            }
        },
        filters:{
            formatCourseName(course) {
                let name = course.name;
                if (course.serviceReq&&course.serviceReq.length>0) {
                    name = `${name}(${course.serviceReq.join('、')})`;
                }
                if (course.gunnerType&&course.gunnerType.length>0) {
                    name = `${name}(${course.gunnerType}训)`;
                }

                return name;
            },
            formatDate(date){
                if(!date)return;
                return moment(date).format('MM月DD日')
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
    //@page { size: portrait; }
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
            color: red;
        }
    }
    .can-edit{
        .addBtn{
            display: none;
            position: absolute;
            bottom: 0;
            font-size: 36px;
            z-index: 4;
            left: 50%;
            transform: translateX(-50%);
            color: #409EFF;
        }
        &:hover{
            .addBtn{
                display: block;
            }
            background: #DCDFE6;
        }
        &.active{
            background:#DCDFE6;
        }
    }
</style>
