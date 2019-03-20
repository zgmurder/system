<template>
    <div class="Report">
        <div class="body">
            <div class="body-title">
                <div class="title-text">
                    个人军事体育训练考核成绩登记表
                    <div class="text-btns">
                        <div>
                            <el-button type="danger" v-if="$route.path === '/TableVue'" class="print-hidden" @click="$window.print()" size="mini" plain title="打印">打印</el-button>
                            <el-button type="primary" v-if="!patternIsEdit && $route.path !== '/TableVue'" class="print-hidden" @click="$units.showTable(tableData,'PersonSportAnnualScore')" size="mini" plain title="新窗口打开">新窗口打开（打印）</el-button>
                        </div>
                        <slot name="handle"> </slot>
                    </div>
                </div>
            </div>
            <div class="body-content">
                <div class="content-table" v-if="tableData"><!--v-if="tableData"-->
                    <table border="1" cellspacing="0" cellpadding="0">
                        <tr>
                            <td rowspan="3" colspan="2" width="120">基本<br>信息</td>
                            <td colspan="3">姓名</td>
                            <td colspan="3">{{tableData.name}}</td>
                            <td width="120">性别</td>
                            <td colspan="3">{{tableData.gender}}</td>
                            <td colspan="3">年龄</td>
                            <td width="120">{{tableData.age}}</td>
                        </tr>
                        <tr>
                            <td colspan="6">部职别</td>
                            <td colspan="8">{{tableData.departmentPosition}}</td>
                        </tr>
                        <tr>
                            <td colspan="6" class="line-height">军人保障卡号<br>（新兵、文职人员身份证号）</td>
                            <td colspan="8">{{tableData.cardId|handleString}}</td>
                        </tr>
                        <tr>
                            <td rowspan="22">
                                考核<br>成绩
                            </td>
                            <td rowspan="7">新兵</td>
                            <th colspan="6">课目名称</th>
                            <th>课目成绩</th>
                            <th colspan="6">单课目成绩评定</th>
                            <th>总评</th>
                        </tr>
                        <tr>
                            <td colspan="6">体型</td>
                            <td class="line-height shape">
                                <p style="">身高：{{isXinBing && tableData.shape.height+'cm' || ''}}</p>
                                <p>体重：{{isXinBing && tableData.shape.weight+'kg' || ''}}</p>
                            </td>
                            <td colspan="6">
                                <el-checkbox :key="index" v-for="(item,index) in level2" :value="isXinBing && tableData.shape.score === level2.length - index">{{item}}</el-checkbox>
                            </td>
                            <td rowspan="6">
                                <div v-for="(item,index) in level4"><el-checkbox  :value="isXinBing && tableData.evaluatedScore === level4.length - index">{{item}}</el-checkbox></div>
                            </td>
                        </tr>
                        <tr v-for="(courseName,index) in ['单杠引体向上/屈臂悬垂','双杠臂屈伸/支撑前移','仰卧起坐','3000米跑','基础体能组合']">
                            <td colspan="6">
                                {{courseName}}
                                <span v-if="index === 4">
                                    <el-checkbox :value="isXinBing && isOneOrTow === '1'">1</el-checkbox>
                                    <el-checkbox :value="isXinBing && isOneOrTow === '2'">2</el-checkbox>
                                </span>
                            </td>
                            <td>{{(isXinBing && getCourseScore(courseName)||'')|handleCourseCount}}</td>
                            <td colspan="6">
                                <div style="display: flex;justify-content: space-around;width: 100%">
                                    <el-checkbox style="margin-left: 0" :key="index" v-for="(subItem,index) in level4" :value="isXinBing && getCourseScore(courseName).score === level4.length - index">{{subItem}}</el-checkbox>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td rowspan="10">
                                <div v-for="name in ['一类人员','二类人员','三类人员']">
                                    <el-checkbox :value="!isCivilServant && !isXinBing && tableData.physicalLevel === name">{{name.slice(0,2)}}</el-checkbox>
                                </div>
                            </td>
                            <td rowspan="6">
                                通用<br>
                                训练<br>
                                课目<br>
                            </td>
                            <td colspan="5">体型</td>
                            <td class="shape">
                                <p style="">身高：{{isSoldier && tableData.shape.height+'cm' || ''}}</p>
                                <p>体重：{{isSoldier && tableData.shape.weight+'kg' || ''}}</p>
                            </td>
                            <td colspan="6">
                                <el-checkbox v-for="(item,index) in level2" :key="index" :value="isSoldier && tableData.shape.score === level2.length - index">{{item}}</el-checkbox>
                            </td>
                            <td rowspan="10">
                                <div v-for="(item,index) in level7"><el-checkbox :value="isSoldier && tableData.evaluatedScore === level7.length - index">{{item}}</el-checkbox></div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="5">单杠引体向上/屈臂悬垂</td>
                            <td>{{isSoldier && getCourseScore('单杠')||''|handleCourseCount}}</td>
                            <td rowspan="2" colspan="4">分数：{{isSoldier && (getCourseScore('单杠').score?getCourseScore('单杠').score:getCourseScore('俯卧').score)||''}}</td>
                            <td rowspan="5" colspan="2">总分：{{isSoldier && tableData.totalScore||''}}</td>
                        </tr>
                        <tr>
                            <td colspan="5">俯卧撑（40岁以上）</td>
                            <td>{{isSoldier && getCourseScore('俯卧')||''|handleCourseCount}}</td>
                        </tr>
                        <tr v-for="(courseName,index) in ['仰卧起坐','30米x2蛇形跑','3000米跑']">
                            <td colspan="5">{{courseName}}</td>
                            <td>{{isSoldier && getCourseScore(courseName)||''|handleCourseCount}}</td>
                            <td colspan="4">分数：{{isSoldier && getCourseScore(courseName).score||''}}</td>
                        </tr>
                        <tr v-for="index in 4">
                             <td rowspan="4" v-if="index === 1">
                                 专项<br>
                                 训练<br>
                                 课目<br>
                                 组
                             </td>
                             <td rowspan="4" v-if="index === 1">
                                 <div v-for="index in 4"><el-checkbox :value="isSoldier && tableData.groupId === index">{{index}}</el-checkbox></div>
                             </td>
                             <td colspan="4">课目{{index}}：{{isSoldier && (optionalCourseScores[index-1]||{}).courseName||'　'}}</td>
                             <td>{{isSoldier && optionalCourseScores[index-1]||''|handleCourseCount}}</td>
                             <td colspan="4">
                                 <span class="my-checkbox">
                                     <el-checkbox :key="subIndex" :style="{marginLeft:subIndex === 2 && 0}" v-for="(item,subIndex) in level4" :value="isSoldier && (optionalCourseScores[index-1]||{}).score === level4.length - subIndex">{{item}}</el-checkbox>
                                 </span>
                             </td>
                             <td rowspan="4" colspan="2" v-if="index === 1">
                                 <div v-for="(item,subIndex) in level4"><el-checkbox style="width: 50px;text-align: left" :key="subIndex" :value="isSoldier && tableData.optionalScore === level4.length - subIndex">{{item}}</el-checkbox></div>
                             </td>
                         </tr>

                        <tr>
                            <td rowspan="5">文职<br>人员</td>
                            <td colspan="6">体型</td>
                            <td class="line-height shape">
                                <p style="">身高：{{isCivilServant && tableData.shape.height+'cm' || ''}}</p>
                                <p>体重：{{isCivilServant && tableData.shape.weight+'kg' || ''}}</p>
                            </td>
                            <td colspan="6">
                                <el-checkbox v-for="(item,index) in level2" :key="index" :value="isCivilServant && tableData.shape.score === level2.length - index">{{item}}</el-checkbox>
                            </td>
                            <td rowspan="5">
                                <div v-for="(item,index) in level4"><el-checkbox  :value="isCivilServant && tableData.evaluatedScore === level4.length - index">{{item}}</el-checkbox></div>
                            </td>
                        </tr>
                        <tr v-for="(courseName,index) in ['单杠引体向上/屈臂悬垂','俯卧撑（40岁以上）','仰卧起坐','3000米跑']">
                            <td colspan="6">{{courseName}}</td>
                            <td>{{isCivilServant && getCourseScore(courseName).count||''}}</td>
                            <td colspan="6" v-if="index !== 1" :rowspan="index === 0?2:1">
                                <div style="display: flex;justify-content: space-around">
                                    <el-checkbox :key="index" v-for="(subItem,index) in level4" style="margin-left: 0" :value="isCivilServant && getCourseScore(courseName).score === level4.length - index">{{subItem}}</el-checkbox>
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <td height="100px" width="8%">备注</td>
                            <td colspan="15" class="line-height-normal" style="text-align: left;padding-left: 15px">

                            </td>
                        </tr>
                    </table>
                </div>
                <div class="content-describe">
                    <span>审核人：<b class="text-1"></b></span>
                    <span>填写人：<b class="text-1"></b></span>
                    <span>{{$units.format(tableData.date)}}</span>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import {ScoreCriteria} from 'src/lib/Constants'
    const level2 = [...ScoreCriteria.Level2.optionalScores].reverse();
    const level4 = [...ScoreCriteria.Level4.optionalScores].reverse();
    const level7 = [...ScoreCriteria.Level7.optionalScores].reverse();
    export default{
        data(){
            return {
                selectScoreCriteria:ScoreCriteria,
                level2,
                level4,
                level7
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
        created(){
            console.log(this.tableData)
        },
        computed:{
            isCivilServant(){
                return this.tableData.isCivilServant
            },
            isXinBing(){
                return this.tableData.physicalLevel === '新兵'
            },
            isSoldier(){
                return !this.isCivilServant && !this.isXinBing
            },
            requiredCourseScores(){
                return this.tableData.requiredCourseScores
            },
            optionalCourseScores(){
                return this.tableData.optionalCourseScores
            },
            isOneOrTow(){
                const found = this.requiredCourseScores.find(item=>item.courseName.includes("基础体能组合"));
                return found.courseName.substr(found.courseName.length-1,1)
            }
        },
        methods:{
            getCourseScore(courseName){
                 return this.requiredCourseScores.find(courseObj=>courseObj.courseName.includes(courseName.slice(0,2)))||{}
            },
        },
        filters:{
            handleString(str){
                return str.length > 10 ? `${str.substr(0,6)}****${str.substr(-4)}`:str;
            },
            handleCourseCount(course){
                if(!course || !course.courseName)return;
                if(course.countType === '')return level4[level4.length-course.count];
                else if(course.countType === '时间'){
                    const integer = parseInt(+course.count);
                    const float = +(course.count - integer).toFixed(1)*10;
                    const minute = Math.floor(integer / 60) ? Math.floor(integer / 60)+ "' " : '';
                    return minute + integer % 60 + '" '+ (float > 0 ? float : '');
                }else if(course.courseName.includes('马')){
                    return level4[level4.length-found[name]];
                }else {
                    return course.count
                }
                /*if(str)str = str.trim().substr(-2);
                const found = arrData.find(item => item.courseName.includes(str));
                if(found){
                    if(str.includes('马'))return level4[level4.length-found[name]];
                    if(found.countType === '')return level4[level4.length-found[name]];
                    if(found.countType === '时间' && name !== 'score'){
                        const str = found[name];
                        if (!str) return '';
                        const integer = parseInt(+str);
                        const float = +(str - integer).toFixed(1)*10;
                        const minute = Math.floor(integer / 60) ? Math.floor(integer / 60)+ "' " : '';
                        return minute + integer % 60 + '" '+ (float > 0 ? float : '');
                    }else {
                        return name !== 'score' ? found[name]+found.unitType : found[name]
                    }
                }else {
                    return '　'
                }*/
            },

        },
    }

</script>
<style>

    /*.el-checkbox__inner:after{
        border-color:#000!important ;
    }*/
</style>

<style scoped lang="scss">
    @import "./common.scss";
    .shape{
        text-align: left;
        p{
            box-sizing: border-box;
            padding-left: 3px;
        }
        p:first-child{
            border-bottom: 1px solid #606266;
            padding-bottom: 3px;
            margin-bottom: 3px;
        }
    }
    .my-checkbox{
        display:flex;
        width: 150px;
        flex-flow: wrap;
        margin: 0 auto
    }
</style>
