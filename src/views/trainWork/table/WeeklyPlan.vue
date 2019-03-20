<template>
    <div class="Report">
        <div class="body" v-loading="!tableData">
            <div class="body-title">
                <div class="title-text" v-if="tableData">
                    <input v-if="patternIsEdit" class="input-edit" type="text" v-model="tableData.name">
                    <span v-else>{{tableData.name}}</span>
                    <div class="text-btns">
                        <div>
                            <el-button type="danger" v-if="$route.path === '/TableVue'" class="print-hidden" @click="$window.print()" size="mini" plain title="打印">打印</el-button>
                            <el-button type="primary" v-if="!patternIsEdit && $route.path !== '/TableVue'" class="print-hidden" @click="$units.showTable(tableData,'WeeklyPlan')" size="mini" plain title="新窗口打开">新窗口打开（打印）</el-button>
                        </div>
                        <slot name="handle"> </slot>
                    </div>
                </div>

            </div>
            <div class="body-content" v-if="tableData">
                <div class="content-describe">
                    <span>审批：<b class="text-1">{{tableData|formatApprovedBy}}</b></span>
                    <span>制表时间：{{tableData.createdAt|formatDate}}</span>
                </div>
                <div class="content-table" ref="contentTable">
                    <table cellpadding="0" cellspacing="0" border="1" class="print-portrait-height">
                        <tr>
                            <th colspan="3">时间</th>
                            <th :colspan="comTrainData.length" width="50%">训练内容</th>
                            <th rowspan="2" class="line-height-normal">实施<br>方法</th>
                            <th rowspan="2" class="line-height-normal">保障<br>措施</th>
                            <th rowspan="2" class="line-height-normal">地点</th>
                            <th rowspan="2" class="line-height-normal">教练员<br>组织者</th>
                            <th rowspan="2">早晨</th>
                            <th rowspan="2">晚上</th>
                        </tr>
                        <tr>
                            <th>日/星期</th>
                            <th colspan="2">课时</th>
                            <th v-for="item in comTrainData">{{item}}</th>
                        </tr>
                        <tr v-for="(lesson,index) in totalLessons.lessons">
                            <td v-if="totalLessons.indexArr.includes(index)" :rowspan="handlerRowSpan(totalLessons.indexArr,index)">{{dateOrWeekday(index).date|formatDataToDay}}/{{dateOrWeekday(index).weekday|filterWeek}}</td>
                            <td v-if="showRow(lesson.section,index)" :rowspan="combineRow(lesson.section,index)">{{lesson.section}}</td>
                            <td :class="{'td-zindex':patternIsEdit}">
                                <span role="button" v-if="patternIsEdit" style="width: 20px;left: -25px;" @click="handleCommand('deleteLesson',handlerIndex(index),lesson,lesson._index)" title="删除" class="el-input-number__decrease btn__decrease"><i class="el-icon-delete"></i></span>
                                <span role="button" v-if="patternIsEdit" style="width: 20px;left: -50px;" @click="handleCommand('addLesson',handlerIndex(index),lesson,lesson._index)" title="往下加一行" class="el-input-number__decrease btn__decrease"><i class="el-icon-plus"></i></span>
                                <span role="button" v-if="patternIsEdit" style="width: 20px" class="el-input-number__decrease" @click="lesson.hours--,handlerInput(lesson.hours,lesson,index)"><i class="el-icon-minus"></i></span>
                                <input type="number" style="text-align: center" class="input-number" @input="handlerInput($event,lesson,index)" v-if="patternIsEdit" :value="lesson.hours"> <!-- :disabled="totalLessons.indexArr.includes(index+1)"-->
                                <span role="button" v-if="patternIsEdit" style="width: 20px" class="el-input-number__increase" @click="lesson.hours++,handlerInput(lesson.hours,lesson,index)"><i class="el-icon-plus"></i></span>
                                {{lesson.hours}}
                            </td>
                            <td :class="{'td-zindex':patternIsEdit}" v-if="majorIsShow(lesson.courses)" v-for="major in comTrainData">{{lesson.courses|filterCourses(major)}}</td>
                            <td :class="{'td-zindex':patternIsEdit}" v-if="!majorIsShow(lesson.courses)" :colspan="comTrainData.length">
                                <a class="el-icon-edit-outline addBtn a" v-if="patternIsEdit" title="编辑" @click="handleCommand('edit',handlerIndex(index),lesson,lesson._index)"></a>
                                {{lesson.courses|filterCourses}}
                            </td>

                            <td :class="{'td-zindex':patternIsEdit}" v-if="index === 0" :rowspan="totalLessons.lessons.length">
                                <textarea v-if="patternIsEdit " v-model="tableData.methods"></textarea>
                                <p v-else class="wrap max-heigth" v-html="handleStr(tableData.methods)"></p>
                            </td>
                            <td :class="{'td-zindex':patternIsEdit}" v-if="index === 0" :rowspan="totalLessons.lessons.length">
                                <textarea v-if="patternIsEdit" v-model="tableData.ensures"></textarea>
                                <p v-else class="wrap max-heigth" v-html="handleStr(tableData.ensures)"></p>
                            </td>
                            <td :class="{'td-zindex':patternIsEdit}">
                                <el-select v-if="patternIsEdit" size="mini" value-key="name" v-model="lesson.place" placeholder="地点" style="width: 100%">
                                    <el-option
                                        v-for="(place,index) in getPlaceOptions"
                                        :label="place.name"
                                        :key="index"
                                        :value="place">
                                    </el-option>
                                </el-select>
                                <span v-else>{{(lesson.place||{}).name||''}}</span>
                            </td>
                            <td :class="{'td-zindex':patternIsEdit}">
                                <el-select value-key="name" size="mini" v-if="patternIsEdit && !lesson.trainerName" v-model="lesson.trainer" placeholder="请选择教练员">
                                    <el-option
                                        v-for="(trainer,index) in getTrainerOptions(lesson)"
                                        :label="trainer.name"
                                        :key="index"
                                        :value="trainer">
                                    </el-option>
                                </el-select>
                                <span v-else>{{lesson.trainerName||(lesson.trainer||{}).name||(tableData.theDuty||{}).name||''}}</span>
                            </td>
                            <td :class="{'td-zindex':patternIsEdit}" v-for="reLesson in momingOrNight(index)" v-if="totalLessons.indexArr.includes(index)" :rowspan="handlerRowSpan(totalLessons.indexArr,index)">
                                {{reLesson.courses|filterCourses}}
                                <a class="el-icon-edit-outline addBtn" v-if="patternIsEdit" title="编辑" @click="handleCommand('edit',handlerIndex(index),reLesson,reLesson._index,true)"></a>
                            </td>
                            <!--<td v-if="patternIsEdit" :class="{'td-zindex':patternIsEdit}" >
                                <el-button-group style="display: flex;justify-content: space-between">
                                    <el-button type="text" size="mini" icon="el-icon-edit" @click="handleCommand('addLesson',handlerIndex(index),lesson,lesson._index)">添加</el-button>
                                    <el-button type="text" size="mini" icon="el-icon-share" @click="handleCommand('edit',handlerIndex(index),lesson,lesson._index)">编辑</el-button>
                                    <el-button type="text" size="mini" icon="el-icon-delete"  @click="handleCommand('deleteLesson',handlerIndex(index),lesson,lesson._index)">删除</el-button>
                                </el-button-group>
                            </td>-->
                        </tr>

                        <tr style="height: 80px">
                            <td colspan="3" style="text-align: center;">备注</td>
                            <td :colspan="comTrainData.length + 6" :class="{'td-zindex':patternIsEdit}" style="padding-left: 8px;text-align: left">
                                <textarea style="text-align: left" v-if="patternIsEdit" v-model="tableData.notes"></textarea>
                                <p v-else v-html="handleStr(tableData.notes)"></p>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="content-describe">
                    <span>中队长：<b class="text-1"></b></span>
                    <span style="padding-right: 100px">政治指导员：<b class="text-1"></b></span>
                </div>
            </div>
            <div v-if="!tableData" class="body-empty"><img src="/static/img/empty.png" alt=""></div>
            <transition name="el-zoom-in-center">
                <slot name="model"> </slot>
            </transition>
        </div>
        <el-dialog
            :append-to-body="true"
            :title="dialogTitle"
            :visible.sync="dialogVisible">
            <component :is="dynamic ? 'FormInWeeklyPlan1' : 'FormInWeeklyPlan'"
                       ref="FormInWeeklyPlan"
                       @formFinish="saveEdit"
                       :isCustom="isCustom"
                       :formData="formData">
                <el-select value-key="courseId" multiple v-model="formData.courses" placeholder="请选择或输入" slot="selectCourse" @change="coursesIsChange" style="width: 100%" v-if="dynamic">
                    <el-option-group
                        v-for="(group,index) in formData.categories"
                        :key="index"
                        :label="handlerCategory(group)">
                        <el-option
                            v-for="(item,subIndex) in canSelectCourse1[index]"
                            :label="renderSelectCourseName(item)"
                            :key="subIndex"
                            :value="item">
                        </el-option>
                    </el-option-group>
                </el-select>

                <el-select v-else value-key="courseId" multiple v-model="formData.courses" placeholder="请选择或输入" slot="selectCourse" @change="coursesIsChange" style="width: 100%">
                    <el-option
                        v-for="(item,index) in canSelectCourse"
                        :label="renderSelectCourseName(item)"
                        :key="index"
                        :value="item">
                    </el-option>
                </el-select>
                <el-button plain slot="isCustom" :type="isCustom ? 'warning' : 'danger'" @click="isCustomChange">{{isCustom?'选择课目':'自定义课目'}}</el-button>
            </component>
        </el-dialog>
    </div>
</template>

<script>
    import moment from 'moment';
    import {CourseCategorys,CourseOption,DailySection,WeekDays} from 'src/lib/Constants'
    import {handleStr} from 'src/config/units'
    import _ from 'lodash'
    import FormInWeeklyPlan from 'src/pages/common/forms/FormInWeeklyPlan'
    import FormInWeeklyPlan1 from 'src/pages/common/forms/FormInWeeklyPlan1'
    export default{
        components:{
            FormInWeeklyPlan,
            FormInWeeklyPlan1
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
            },
        },
        data(){
            return {
                canSelectCourse:[],
                canSelectCourse1:[],
                active:undefined,

                formData:{},

                dialogVisible:false,
                dialogTitle:'',

                dynamic:false,
                isCustom:false,

                placeList:[],
                TrainList:[],
            }
        },
        watch:{
            'patternIsEdit':{
                handler(value){
                    if(value)this.active = undefined;
                }
            },
            'formData.category':{
                handler(value){
                    if(!this.$$date|| value === undefined)return;
                    if(value!==0)this.formData.courseOption = 2;
                    this.handlerCanSelectCourse(this.$$date,value,this.formData.courseOption);
                },
                deep:true
            },
            'formData.categories':{
                handler(value){
                    if(!this.$$date|| value === undefined)return;
                    this.handlerCanSelectCourse(this.$$date,value,2);
                },
                deep:true
            },
        },
        computed:{
            getPlaceOptions(){
                const instance = this.$parent.$parent._WeeklyPlan;
                return instance.getPlaceOptions();
            },
            totalLessons(){
                let [dailyLesson,lessons,indexArr,rowArr,lessonArr] = [[],[],[0],[],[]];
                this.tableData.dailyLessons.forEach((item)=>{
                    const A = ['早操','夜间'];
                    const {date,weekday} = item;
                    const subArr = item.lessons.map((v,i)=>{v._index = i;return v}).filter(lesson=>!A.includes(lesson.section));
                    const B = item.lessons.filter(lesson=>A.includes(lesson.section));
                    const len = indexArr[indexArr.length-1]||0;
                    indexArr.push(subArr.length+len);
                    lessonArr = [...lessonArr,B];
                    dailyLesson = [...dailyLesson,{date,weekday}];
                    rowArr = [...rowArr,subArr.length];
                    lessons = [...lessons,...subArr]
                });
                return {lessons,indexArr,rowArr,lessonArr,dailyLesson}
            },
            comTrainData(){
                return _.isEmpty(this.tableData.trainMajors)?this.tableData.trainOrgs.map(item=>item.name):this.tableData.trainMajors
            }
        },
        methods:{
            majorIsShow(courses){
                return courses.some(item=>(this.tableData.trainMajors||[]).includes(item.major))
            },
            handlerRowSpan(arr,index){
                 const i = arr.findIndex(item=>item === index);
                 return this.totalLessons.rowArr[i]
            },
            momingOrNight(index){
                const i = this.totalLessons.indexArr.findIndex(item=>item === index);
                return this.totalLessons.lessonArr[i]
            },
            dateOrWeekday(index){
                const i = this.totalLessons.indexArr.findIndex(item=>item === index);
                return this.totalLessons.dailyLesson[i]
            },
            combineRow(section,index){
                const lessons = this.totalLessons.lessons;
                const calculate = (section,index,num = 1)=>{
                    const is = (lessons[index+1]||{}).section === section;
                    return is ? calculate(section,index+1,num+1) : num;
                };
                return calculate(section,index)
            },
            showRow(section,index){
                const lesson = this.totalLessons.lessons[index-1];
                return (lesson||{}).section !== section;
            },
            handlerIndex(index){
                const arr = this.totalLessons.indexArr.slice(1);
                const i = arr.findIndex(item=>item > index);
                return this.tableData.dailyLessons[i]
            },

            isCustomChange(){
                this.isCustom = !this.isCustom;
                this.formData.courses = [];
                this.formData.category = undefined;
            },

            handlerCategory(category){
                return (CourseCategorys[category]||{}).name
            },
            getTrainerOptions(lesson){
                const instance = this.$parent.$parent._WeeklyPlan;
                return instance.getTrainerOptions(lesson);
            },
            coursesIsChange(value){
                const instance = this.$parent.$parent._WeeklyPlan;
                const courses = _.cloneDeep(value);
                _.forEach(courses,(item)=>item.subcourses = []);
                this.formData.courses = courses;


                this.formData.place = instance.getTrainPlaceByCourse(value[0]);
                this.formData.trainer = instance.getTrainerByCourse(value[0]);
            },
            async saveEdit(formData,cb){
                this.$$lesson.categories = formData.categories;
                this.$$lesson.category = formData.category;
                const result = {
                    dailyLesson:this.$$dailyLesson,
                    lesson:this.$$lesson,
                    courseOption:formData.courseOption,
                    courseItems:formData.courses,
                    place:formData.place,
                    trainer:formData.trainer,
                    trainerName:formData.trainerName,
                };
                const instance = this.$parent.$parent._WeeklyPlan;
                formData.trainer && instance.setTrainer(this.$$lesson, formData.trainer);
                formData.trainerName && instance.setTrainer(this.$$lesson, formData.trainerName);
                formData.place && instance.setPlace(this.$$lesson, formData.place);

                this.$emit('saveCourseEdit',result);
                this.dialogVisible = false;
                this.$$date = undefined;
                this.formData = {};
                cb && cb()
            },
            handlerInput(e,lesson,index){
                const instance = this.$parent.$parent._WeeklyPlan;
                let hours;
                if(typeof e === 'object')hours = +e.target.value;
                else {
                    hours = +e;
                    lesson.hours = hours;
                }
                if(lesson.section === '上午'){
                    if(hours>instance.dailySchedule.morning){
                        hours = instance.dailySchedule.morning
                    }
                }else if(lesson.section === '下午'){
                    if(hours>instance.dailySchedule.afternoon){
                        hours = instance.dailySchedule.afternoon
                    }
                }
                const dailyLesson = this.handlerIndex(index);
                instance.setLessonHours(dailyLesson, lesson, hours);
            },
            handleCommand(command,dailyLesson,lesson,index,isMorning){
                const instance = this.$parent.$parent._WeeklyPlan;
                switch (command){
                    case 'deleteLesson':
                        instance.deleteLesson(dailyLesson, lesson.section, index);
                        break;
                    case 'addLesson':
                        instance.addLesson(dailyLesson, lesson.section, index);
                        break;
                    case 'edit':
                        this.dynamic = !!isMorning;
                        const formData = _.cloneDeep(lesson);
                        this.isCustom = formData.category === 5;
                        if(this.isCustom){
                            setTimeout(() => {
                                this.$refs.FormInWeeklyPlan&&(this.$refs.FormInWeeklyPlan.customInput = (formData.courses[0]||{}).name)
                            });
                        }
                        //formData.category = this.dynamic ? [formData.category] : formData.category;
                        console.log(formData,232323)
                        this.formData = formData;

                        if(!this.formData.trainer)this.$set(this.formData,'trainer',undefined);
                        if(!this.formData.place)this.$set(this.formData,'place',undefined);
                        if(!this.formData.trainerName)this.$set(this.formData,'trainerName',undefined);


                        this.dialogTitle = `正在编辑本周${this.handlerWeekDays(dailyLesson.weekday)}${lesson.section}的课目...`;
                        this.$$dailyLesson = dailyLesson;
                        this.$$lesson = lesson;
                        this.$$date = dailyLesson.date;
                        this.dialogVisible = true;
                        break;
                    default:
                        return
                }
            },
            handlerWeekDays(weekday){
                return WeekDays.find(item=>item.value === weekday).name
            },
            handleStr(str){
                if(!str)return;
                return str.replace(/\n/g,"<br/>").replace(/\s/g,"&nbsp;")
            },
            deleleCourse(dailyLesson, lesson, courseIndex){
                this.$emit('deleleCourse', dailyLesson, lesson, courseIndex)
            },
            async handlerCanSelectCourse(date,category,courseOption){
                const instance = this.$parent.$parent._WeeklyPlan;
                switch(courseOption){
                    case 0:
                        this.canSelectCourse = this.handlerArr(instance.getTrainCourseOptionsThisWeek(date));
                        break;
                    case 1:
                        this.canSelectCourse = this.handlerArr(instance.getTrainCourseOptionsThisStage(date));
                        break;
                    case 2:
                        if(Array.isArray(category)){
                            let arr = [];
                            category.forEach(async item=>{
                                const A = this.handlerArr(instance.getCourseOptions(item,date));
                                arr.push(A)
                            });
                            this.canSelectCourse1 = arr;
                        }else this.canSelectCourse = this.handlerArr(instance.getCourseOptions(category,date)||[]);
                        break;
                    default:
                        return
                }
            },
            handlerArr(arr){
                if((arr[0]||{}).course)
                    return arr.map(courseItem=>{
                        Object.assign(courseItem,{
                            name:courseItem.course.name,
                            courseId:courseItem.course.objectId,
                            category: courseItem.course.category,
                            serviceReq: courseItem.course.serviceReq,
                            major: courseItem.course.majorReq,
                            gunnerType: courseItem.course.gunnerType,
                            subcourses:courseItem.course.subcourses||[],
                            seq:courseItem.course.seq
                        });
                        delete courseItem.course;
                        return courseItem
                    });
                else return arr
            },
            renderSelectCourseName(courseItem) {
                let courseName = `${courseItem.seq}.${courseItem.name}`;
                if (courseItem.gunnerType&&courseItem.gunnerType.length>0) {
                    courseName = `${courseName}(${courseItem.gunnerType}训)`
                }
                if (courseItem.major&&courseItem.major.length>0) {
                    courseName = `${courseName}(${courseItem.major})`
                }
                if (courseItem.majorReq&&courseItem.majorReq.length>0) {
                    courseName = `${courseName}(${courseItem.majorReq})`
                }
                if (!_.isEmpty(courseItem.serviceReq)) {
                    courseName = `${courseName}(${courseItem.serviceReq.join('、')})`
                }
                courseName = `${courseName}(昼训${courseItem.hoursInDay}/${courseItem.allHoursInDay},夜训${courseItem.hoursAtNight}/${courseItem.allHoursAtNight})`;
                return courseName;
            },
        },
        filters:{
            formatApprovedBy(tableData) {
                const position = tableData.approvedByPosition||(tableData.approvedBy||{}).position;
                const name = tableData.approvedByName||(tableData.approvedBy||{}).name;
                return position ? `${position}: ${name}` : name;
            },

            formatDate(date){
                return moment(date).format('YYYY年MM月DD日')
            },
            formatDataToDay(date){
                return moment(date).format('DD日')
            },
            filterCourses(courses,major){
                if(_.isEmpty(courses))return ' ';
                if(major && typeof major === 'string')courses = courses.filter(item=>item.major === major)
                const courseNames = courses.map(course => {
                    let subNames = _.isEmpty(course.inputText) ? [] : [course.inputText];
                    if (!_.isEmpty(course.subcourses)) {
                        subNames = course.subcourses.map(subcourse => {
                            let sub2Name = _.isEmpty(subcourse.subcourses) ? subcourse.inputText : subcourse.subcourses.map(item => item.name).join('、');
                            return _.isEmpty(sub2Name) ? `${subcourse.name}` : `${subcourse.name}：${sub2Name}`;
                        });
                    }
                    return _.isEmpty(subNames) ? course.name : `${course.name}：${subNames.join('，')}`;
                });

                return courseNames.join('；');

                // const loop = (courses,str = '')=>{
                //     if(Array.isArray(courses))courses.forEach(item=>{
                //         str += `${item.name}${!_.isEmpty(item.subcourses) ? '：'+loop(item.subcourses,str):item.inputText ? '：'+item.inputText : ''}`;
                //     });
                //     return str
                // };
                // return loop(courses);
            },
            filterWeek(week){
                return WeekDays[week].shortName
            }
        },
    }

</script>

<style scoped lang="scss">
    @import "./common.scss";
    //@page { size: portrait; }
    .addBtn.a{
        right: 0!important;
        transform:translateX(0);
        left: auto;
    }
    .btn__decrease{
        color: #F56C6C;
        &:hover{
            color: red;
        }
    }
</style>
