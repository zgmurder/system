<template>
    <div class="Report">
        <div class="body" v-if="tableData">
            <div class="body-title">
                <div class="title-text">
                    {{tableData.name}}
                    <div class="text-btns">
                        <div><el-button type="danger" v-if="!patternIsEdit" class="print-hidden" @click="$window.print()" size="mini" plain title="打印">打印</el-button></div>
                        <slot name="handle"></slot>
                    </div>
                </div>
            </div>
            <transition name="el-zoom-in-center">
                <div class="body-content">
                    <div class="content-table">
                        <table cellpadding="0" cellspacing="0" border="1">
                            <tr>
                                <th colspan="3">时间</th>
                                <th colspan="4">内容</th>
                                <th rowspan="2">组训<br>方法</th>
                                <th rowspan="2">组织者<br>教练员</th>
                                <th rowspan="2">场地<br>区分</th>
                                <th rowspan="2">质量<br>指标</th>
                                <th rowspan="2">措施<br>要求</th>
                            </tr>
                            <tr>
                                <th>天数</th>
                                <th colspan="2">日期</th>
                                <th>指挥员</th>
                                <th>参谋部</th>
                                <th>政治工作处</th>
                                <th>保障处</th>
                            </tr>
                            <tr v-for="index in 4">
                                <td v-if="index === 1" rowspan="4">1</td>
                                <td>5日</td>
                                <td>2小时</td>
                                <td colspan="4">任务、对象、环境研究</td>
                                <td>理论<br>辅导</td>
                                <td>李子</td>
                                <td>会议室</td>
                                <td v-if="index === 1" rowspan="4">是的发送到水电费离开事件代理</td>
                                <td v-if="index === 1" rowspan="4">是的发送到水电费离开事件代理</td>
                            </tr>
                        </table>
                    </div>
                    <div class="content-describe">
                        <span>审核人：<b class="text-1"></b></span>
                        <span>填写人：<b class="text-1"></b></span>
                        <span>{{tableData.date|formatDate}}</span>
                    </div>
                </div>
            </transition>
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
                const courseItem = {courseId:target.getAttribute('objectid')};
                const isOfficer = !!target.getAttribute('isOffice');
                const planItem = this.tableData.planItems[target.getAttribute('index')];
                this.$emit('updateArrangedCourse', {isAdd:false,courseItem,planItem,isOfficer})
            },
            addCourse(planItem){
                if(!this.course)return;
                this.$emit('updateArrangedCourse', {isAdd:true,courseItem:this.course,planItem,isOfficer:false,hoursInDay:this.hoursInDay,hoursAtNight:this.hoursAtNight},this.getCanCourse,planItem);
                this.course = undefined;
                this.hoursInDay = 0;
                this.hoursAtNight = 0;
            },
            addOfficeCourse(planItem){
                if(!this.course)return;
                this.$emit('updateArrangedCourse', {isAdd:true,courseItem:this.course,planItem,isOfficer:true,hoursInDay:this.hoursInDay,hoursAtNight:this.hoursAtNight},this.getOfficeCourse,planItem);
                this.course = undefined;
                this.hoursInDay = 0;
                this.hoursAtNight = 0;
            },
            async getCanCourse(planItem,planItemIndex){
                if(planItemIndex)this.active = planItemIndex;
                const instance = this.$parent.$parent.$$ajax;
                const result = await instance.getCourseOptions(planItem,false);
                this.canSelectCourse = await instance.getCourseOptions(planItem,false);
            },
            async getOfficeCourse(planItemIndex,planItem){
                if(planItemIndex && typeof planItemIndex === 'number')this.active = planItemIndex;
                const instance = this.$parent.$parent.$$ajax;
                this.selectOfficeCourse = await instance.getCourseOptions(planItem,true);
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
                if (courseItem.major&&courseItem.major.length>0) {
                    courseName = `${courseName}(${courseItem.major})`
                }
                courseName = `${courseName}(昼训${courseItem.hoursInDay},夜训${courseItem.hoursAtNight})`;
                return courseName;
            },

        },
    }

</script>

<style scoped lang="scss">
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
        font-size: 12px;
        table-layout:fixed;
        th{
            text-align: center!important;
        }
        td{
            position: relative;
            box-sizing: border-box;
            line-height: 24px;
            font-size: 12px;
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
        input{
            border: none!important;
        }
    }
    .text-layout{
        writing-mode: vertical-lr;
    }
    .text-center{
        text-align: center;
    }
    .text-over{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .line-height-normal{
        line-height: normal;
    }
    .Report {
        flex: 1;
        background-color: #fff;
        color: #606266;
        position: relative;
        .body-title{
            .title-text{
                letter-spacing:3px;
                font-size: 26px;
                text-align: center;
                position: relative;
                color: #303133;
                padding: 10px 0;
                font-family: FZXBSJW!important;
                .text-btns{
                    width: 100%;
                    position: absolute;
                    z-index: 3;
                    top: -3px;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: space-between;
                    padding: 10px 0;
                }
            }
        };
        .body-content{
            .content-describe{
                display: flex;
                padding: 0 10px;
                justify-content: space-between;
                line-height: 36px;
                b{
                    border-bottom: 1px solid #222;
                    padding-bottom: 2px;
                }
            }
            .content-table{
                border:2px solid #000;
                .differentiate{
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    li{
                        border-bottom: 1px solid #666;
                        box-sizing: border-box;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    li:last-child{
                        border-bottom: none;
                    }
                }
                .can-edit{
                    position: absolute;
                    box-sizing: border-box;
                    top: 0;
                    right: 0;
                    background: #fff;
                    z-index: 3;
                    height: 100%;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
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
                        /*color: #fff;
                        background: #606266;*/
                    }
                    &.active{
                        background:#DCDFE6;
                    }
                    textarea{
                        font-size: 12px;
                        height: 100%;
                        width: 100%;
                        border: none;
                        resize: none;
                        padding: 2px;
                        box-sizing: border-box;
                    }
                }

            }
            .content-explain{
                padding: 10px;
                line-height: 26px;
                color: #909399;
                background: #f6f6f6;
            }
        }
        .body-empty{
            text-align: center;
        }
    }
</style>
