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
                            <el-button type="primary" v-if="!patternIsEdit && $route.path !== '/TableVue'" class="print-hidden" @click="$units.showTable(tableData,'StagePlan')" size="mini" plain title="新窗口打开">新窗口打开（打印）</el-button>
                        </div>
                        <slot name="handle"> </slot>
                    </div>
                </div>
            </div>
            <div class="body-content">
                <div class="content-table" v-if="tableData">
                    <table cellspacing="0" cellpadding="0" border="1" @click="deleleCourse" class="print-portrait-height">
                        <tr>
                            <th colspan="2" rowspan="2" width="5%">区分</th>
                            <th :colspan="tableData.planItems.length" height="1">内容与时间分配</th>
                            <th rowspan="2" class="line-height-normal" width="6.4%">训练<br>时间</th>
                            <th rowspan="2" class="line-height-normal" width="6.4%">重要<br>训练<br>活动</th>
                            <th rowspan="2" class="line-height-normal" width="6.4%">质量<br>指标</th>
                            <th rowspan="2" class="line-height-normal" width="6.4%">基本<br>要求</th>
                            <th rowspan="2" class="line-height-normal" width="6.4%">保障<br>措施</th>
                        </tr>
                        <tr>
                            <th class="line-height-normal" height="1" v-for="planItem in tableData.planItems">
                                {{planItem.fromDate|formatDate}}至{{planItem.toDate|formatDate}}<br>
                                （{{planItem.days}}天，{{planItem.hours}}小时）
                            </th>
                        </tr>
                        <tr>
                            <td rowspan="2" class="text-center" width="10">{{tableData.orgCategory}}</td>
                            <td class="text-center">警<br>官</td>
                            <td v-for="(planItem,planItemIndex) in tableData.planItems" :class="{'td-zindex can-edit':patternIsEdit,active:active === planItemIndex}">
                                <div v-if="patternIsEdit">
                                    <el-popover
                                        placement="right"
                                        title="标题"
                                        width="200"
                                        trigger="click">
                                        <div>
                                            <p style="margin-bottom: 10px" v-for="(item,index) in selectOfficeCourse"><el-checkbox v-model="item.checked">{{item|renderCourseName}}</el-checkbox></p>
                                            <p v-if="!selectOfficeCourse.length" style="color: #909399">无可选课目</p>
                                            <el-button type="primary" size="mini" icon="el-icon-edit" @click="addOfficeCourse(planItem)" style="width: 100%">确定添加</el-button>
                                        </div>
                                        <a slot="reference" class="el-icon-circle-plus addBtn" title="添加课目" @click="getOfficeCourse(planItem, planItemIndex)"></a>
                                    </el-popover>
                                    <p style="text-align: center" :class="{delete:patternIsEdit}" isOffice="true" :objectid="JSON.stringify(officerCourse)" :index="planItemIndex" v-for="officerCourse in planItem.officerCourses">{{officerCourse|renderCourseName}}</p>
                                </div>
                                <p style="text-align: center"  v-else isOffice="true" :objectid="JSON.stringify(officerCourse)"  v-for="officerCourse in planItem.officerCourses">{{officerCourse|renderCourseName}}</p>
                            </td>
                            <td style="text-align: center" :class="{'td-zindex':patternIsEdit}">
                                <input v-model.number="tableData.officerHours" v-if="patternIsEdit" type="number" oninput = "value=value.replace(/[^\d]/g,'')">
                                <span v-else>{{tableData.officerHours}}小时</span>
                            </td>
                            <td rowspan="2" :class="{'td-zindex':patternIsEdit}">
                                <textarea v-if="patternIsEdit" v-model="tableData.activities"></textarea>
                                <p v-else class="wrap max-heigth" v-html="handleStr(tableData.activities)"></p>
                            </td>
                            <td rowspan="2" :class="{'td-zindex':patternIsEdit}">
                                <textarea v-if="patternIsEdit" v-model="tableData.scoreReqs"></textarea>
                                <p v-else class="wrap max-heigth" v-html="handleStr(tableData.scoreReqs)"></p>
                            </td>
                            <td rowspan="2" :class="{'td-zindex':patternIsEdit}">
                                <textarea v-if="patternIsEdit" v-model="tableData.basicReqs"></textarea>
                                <p v-else class="wrap max-heigth" v-html="handleStr(tableData.basicReqs)"></p>
                            </td>
                            <td rowspan="2" :class="{'td-zindex':patternIsEdit}">
                                <textarea v-if="patternIsEdit" v-model="tableData.methods"></textarea>
                                <p v-else class="wrap max-heigth" v-html="handleStr(tableData.methods)"></p>
                            </td>

                        </tr>
                        <tr>
                            <td class="text-center">分<br>队</td>
                            <td :width="(63/tableData.planItems.length)+'%'" v-for="(planItem,planItemIndex) in tableData.planItems" :class="{'td-zindex can-edit':patternIsEdit,active:active === planItemIndex+10}">
                                <div v-if="patternIsEdit">
                                    <el-popover
                                        placement="bottom"
                                        title="请选择课目"
                                        width="auto"
                                        trigger="click">
                                        <div style="max-height: 400px;overflow-y: auto;margin-bottom: 28px">
                                            <p style="margin-bottom: 10px" v-for="(item,index) in canSelectCourse"><el-checkbox v-model="item.checked">{{item|renderCourseName}}</el-checkbox></p>
                                            <p v-if="!canSelectCourse.length" style="color: #909399">无可选课目</p>
                                            <el-button type="primary" size="mini" icon="el-icon-edit" @click="addCourse(planItem)" style="width: 100%;position: absolute;bottom: 0;z-index: 1;left: 0">确定添加</el-button>
                                        </div>
                                        <a slot="reference" class="el-icon-circle-plus addBtn" @click="getCanCourse(planItem,planItemIndex+10)"></a>
                                    </el-popover>
                                    <p :class="{delete:patternIsEdit}" style="text-align: center" :index="planItemIndex" :objectid="JSON.stringify(orgCourse)" v-for="orgCourse in planItem.orgCourses">{{orgCourse|renderCourseName}}</p>
                                </div>
                                <p v-else style="text-align: center" :index="planItemIndex" :objectid="JSON.stringify(orgCourse)" v-for="orgCourse in planItem.orgCourses">{{orgCourse|renderCourseName}}</p>
                            </td>
                            <td class="text-center" :class="{'td-zindex':patternIsEdit}">
                                <input v-model.number="tableData.soldierHours" v-if="patternIsEdit" type="number" oninput = "value=value.replace(/[^\d]/g,'')">
                                <span v-else>{{tableData.soldierHours}}小时</span>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" height="50px" style="text-align: center">备注</td>
                            <td :colspan="tableData.planItems.length+5" style="padding-left: 8px" :class="{'td-zindex':patternIsEdit}">
                                <textarea v-if="patternIsEdit" v-model="tableData.notes"></textarea>
                                <p v-else class="wrap max-heigth" v-html="handleStr(tableData.notes)"></p>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="content-describe">
                    <span>审核人：<b class="text-1"></b></span>
                    <span>填写人：<b class="text-1"></b></span>
                    <span>{{tableData && tableData.date|formatDate}}</span>
                </div>
            </div>
            <div v-if="!tableData" class="body-empty"><img src="/static/img/empty.png" alt=""></div>
            <transition name="el-zoom-in-center">
                <slot name="model" @click="aaa"></slot>
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
                selectOfficeCourse:[],
                active:undefined,

                course:undefined,
                hoursInDay:0,
                hoursAtNight:0
            }
        },
        watch:{
            'patternIsEdit':{
                handler(value){
                    if(value)this.active = undefined;
                }
            }
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
            deleleCourse(event){
                const target = event.target;
                if(target.nodeName !== 'P' || !this.patternIsEdit)return;
                const courseItems = [JSON.parse(target.getAttribute('objectid'))];
                const isOfficer = !!target.getAttribute('isOffice');
                const planItem = this.tableData.planItems[target.getAttribute('index')];
                this.$emit('updateArrangedCourse', {isAdd:false,courseItems,planItem,isOfficer})
            },
            addCourse(planItem){
                const courseItems = this.canSelectCourse.filter(item=>item.checked);
                this.$emit('updateArrangedCourse', {isAdd:true,courseItems,planItem,isOfficer:false,hoursInDay:this.hoursInDay,hoursAtNight:this.hoursAtNight});
                this.getCanCourse(planItem)
            },
            addOfficeCourse(planItem){
                const courseItems = this.selectOfficeCourse.filter(item=>item.checked);
                this.$emit('updateArrangedCourse', {isAdd:true,courseItems,planItem,isOfficer:true});
                this.getOfficeCourse(planItem)
            },
            getCanCourse(planItem,planItemIndex){
                if(planItemIndex)this.active = planItemIndex;
                const instance = this.$parent.$parent._StagePlan;
                this.canSelectCourse = instance.getCourseOptions(planItem);
                this.canSelectCourse.forEach(item=>this.$set(item,'checked',false))
            },
            getOfficeCourse(planItem,planItemIndex){
                if(planItemIndex && typeof planItemIndex === 'number')this.active = planItemIndex;
                const instance = this.$parent.$parent._StagePlan;
                this.selectOfficeCourse = instance.getOfficerCourseOptions(planItem);
                this.selectOfficeCourse.forEach(item=>this.$set(item,'checked',false))
            },
            renderSelectCourseName(courseItem) {
                let courseName = `${courseItem.seq}.${courseItem.name}`;
                if (courseItem.major&&courseItem.major.length>0) {
                    courseName = `${courseName}(${courseItem.major})`
                }
                courseName = `${courseName}(昼训${courseItem.hoursInDay}/${courseItem.allHoursInDay},夜训${courseItem.hoursAtNight}/${courseItem.allHoursAtNight})`;
                return courseName;
            },
            courseIsChange(course) {
                this.hoursInDay = course.allHoursInDay-course.hoursInDay;
                this.hoursAtNight = course.allHoursAtNight-course.hoursAtNight;
                (this.hoursInDay<0)&&(this.hoursInDay=0);
                (this.hoursAtNight<0)&&(this.hoursAtNight=0);
            }
        },
        computed:{
            unitForceTime(){
                return /*+this.handleDataInTd(this.tableData,'unitForceTime','timeReq','hoursPerDay')*/''
            },
            stepTrainTime(){
                return ''
                /*const timeObj = this.handleDataInTd(this.tableData,'unitForceTime','timeReq');
                return `
                    年度军事训练${timeObj.months}个月不少于${timeObj.days}天${timeObj.hours}小时（每月训练不少于${timeObj.daysPerMonth}天，每天训练${timeObj.hoursPerDay}小时）；训练机动时间${timeObj.flexibleDays}天${timeObj.flexibleDays*(+timeObj.hoursPerDay)}小时；
                    夜间训练时间不少于年度训练时间的20%（216小时）；全年体能训练时间不少于280小时（不计入训练时间）
                `*/
            }
        },
        filters:{
            formatDate(date){
                return moment(date).format('MM月DD日')
            },
            handleScore(Score,scoreSriteria='四级制'){
                const found = Object.values(ScoreCriteria2).find(item=>item.name === scoreSriteria);
                return found.optionalScores[Score];
            },
            handleScoreSriteria(value,scoreSriteria,contains){
                if(scoreSriteria === contains)return value;
                else return ' '
            },
            renderCourseName(courseItem) {
                let courseName = `${courseItem.seq}.${courseItem.name}`;
                if (courseItem.gunnerType&&courseItem.gunnerType.length>0) {
                    courseName = `${courseName}(${courseItem.gunnerType}训)`
                }
                if (courseItem.major&&courseItem.major.length>0) {
                    courseName = `${courseName}(${courseItem.major})`
                }
                //courseName = `${courseName}(昼训${courseItem.hoursInDay},夜训${courseItem.hoursAtNight})`;
                return courseName;
            },

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
