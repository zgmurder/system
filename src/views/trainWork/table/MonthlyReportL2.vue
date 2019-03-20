<template>
    <div class="Report">
        <div class="body">
            <div class="body-title">
                <div class="title-text"  v-if="tableData">
                    {{tableData.organization.name}}军事训练情况月统计表
                    <div class="text-btns">
                        <div>
                            <el-button type="danger" v-if="$route.path === '/TableVue'" class="print-hidden" @click="$window.print()" size="mini" plain title="打印">打印</el-button>
                            <el-button type="primary" v-if="!patternIsEdit && $route.path !== '/TableVue'" class="print-hidden" @click="$units.showTable(tableData,'MonthlyReportL2')" size="mini" plain title="新窗口打开">新窗口打开（打印）</el-button>
                        </div>
                        <slot name="handle"> </slot>
                    </div>
                </div>
            </div>
            <div class="body-content" v-if="tableData">
                <div class="content-describe">
                    <span>单位：<b class="text-2">{{tableData.organization.displayName}}</b></span><!--{{mainOrgInfo.organization.displayName}}-->
                    <span>时间：<b class="text-2">{{$units.format(tableData.date,'YYYY年MM月')}}</b></span><!--{{mainOrgInfo.date|handleDate}}-->
                </div>
                <div class="content-table" v-if="tableData">
                    <table border="1" cellspacing="0" cellpadding="0" class="table-height">
                        <tr>
                            <th colspan="2">训练内容</th>
                            <th colspan="2">训练质量</th>
                            <th colspan="6">训练时间</th>
                            <th colspan="2">教练员</th>
                        </tr>
                        <tr>
                            <td rowspan="2">
                                <p>首长机关本</p>
                                <p>本月训练内容</p>
                            </td>
                            <td rowspan="2" class="font-family td-zindex">
                                <el-popover
                                    v-if="patternIsEdit"
                                    placement="right"
                                    width="400"
                                    trigger="click">
                                    <slot name="selectCourse"> </slot>
                                    <div slot="reference" style="cursor: pointer">
                                        <p v-for="item in tableData.trainContent">{{item}}</p>
                                        <span v-if="!tableData.trainContent.length && patternIsEdit">点击选择内容</span>
                                    </div>
                                </el-popover>
                                <div v-else>
                                    <p v-for="item in tableData.trainContent">{{item}}</p>
                                </div>
                            </td>
                            <td rowspan="2">
                                <p>首长机关</p>
                                <p>年度训练</p>
                                <p>成绩评定</p>
                            </td>
                            <td rowspan="2" class="font-family td-zindex">
                                <el-select v-if="patternIsEdit" v-model="tableData.evaluatedScore" placeholder="请选择">
                                    <el-option
                                        v-for="(item,index) in Level4"
                                        :key="index"
                                        :label="item"
                                        :value="index">
                                    </el-option>
                                </el-select>
                                <span v-else>{{tableData.evaluatedScore|handleScore}}</span>
                            </td>
                            <td rowspan="2">
                                <p>本月</p>
                                <p>集中训</p>
                                <p>练天数</p>
                            </td>
                            <td rowspan="2" class="font-family td-zindex">
                                <input v-if="tableData.timeStatistic.trainDays || patternIsEdit" type="number" v-model.number="tableData.timeStatistic.trainDays" :readonly="!patternIsEdit">
                            </td>
                            <td rowspan="2">
                                <p>首长机关</p>
                                <p>月训练</p>
                                <p>时间（小时）</p>
                            </td>
                            <td rowspan="2" class="font-family td-zindex">
                                <input type="number" v-if="tableData.timeStatistic.trainHours || patternIsEdit" v-model.number="tableData.timeStatistic.trainHours" @input="staticInput('timeStatistic','trainHours','totalHours',$event)" :readonly="!patternIsEdit">
                            </td>
                            <td rowspan="2">
                                <p>首长机关</p>
                                <p>累积训练</p>
                                <p>时间（小时）</p>
                            </td>
                            <td rowspan="2" class="font-family td-zindex" style="z-index: 0">
                                <input type="number" v-if="tableData.timeStatistic.totalHours || patternIsEdit" v-model.number="tableData.timeStatistic.totalHours" :readonly="!patternIsEdit">
                            </td>
                            <td>
                                <p>达标</p>
                                <p>单位数量</p>
                            </td>
                            <td class="td-zindex" :style="{'z-index':isDec?4:0}">
                                <input type="number" v-if="tableData.trainerStatistic.passNumber || patternIsEdit" v-model.number="tableData.trainerStatistic.passNumber" :readonly="!patternIsEdit">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>平均</p>
                                <p>达标率</p>
                            </td>
                            <td class="td-zindex" :style="{'z-index':isDec?4:0}">
                                <input v-if="patternIsEdit" :value="tableData.trainerStatistic.passRate" @input="handlerInput('trainerStatistic','passRate',$event)" :readonly="!patternIsEdit">
                                <span v-if="tableData.trainerStatistic.passRate">{{tableData.trainerStatistic.passRate}}%</span>
                            </td>
                        </tr>
                        <tr>
                            <th colspan="4">训练场地</th>
                            <th colspan="8">训练弹药（手枪）</th>
                        </tr>
                        <tr>
                            <td rowspan="2">
                                <p>达标</p>
                                <p>单位数量</p>
                            </td>
                            <td rowspan="2" class="font-family td-zindex" :style="{'z-index':isDec?4:0}">
                                <input type="number" v-if="tableData.placeStatistic.passNumber || patternIsEdit" v-model.number="tableData.placeStatistic.passNumber" :readonly="!patternIsEdit">
                            </td>
                            <td rowspan="2">达标率</td>
                            <td rowspan="2" class="font-family td-zindex" :style="{'z-index':isDec?4:0}">
                                <input v-if="patternIsEdit" :value="tableData.placeStatistic.passRate" @input="handlerInput('placeStatistic','passRate',$event)" :readonly="!patternIsEdit">
                                <span v-if="tableData.placeStatistic.passRate">{{tableData.placeStatistic.passRate}}%</span>
                            </td>
                            <td colspan="4">
                                首长机关本月消耗量（人均/总数）
                                人均/总数
                            </td>
                            <td colspan="4">
                                首长机关累积消耗量（人均/总数）
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" class="td-zindex" height="30">
                                <input type="number" :value="tableData.bulletStatOffice.trainAverage" @input="staticInput('bulletStatOffice','trainAverage','totalTrainAverage',$event)" :readonly="!patternIsEdit" style="border-right: 1px solid #000;width: 50%">
                                <input type="number" :value="tableData.bulletStatOffice.train" @input="staticInput('bulletStatOffice','train','totalTrain',$event)" :readonly="!patternIsEdit" style="width: 50%;left: 50%">
                            </td>
                            <td colspan="4" class="td-zindex" style="z-index: 0">
                                <input type="number" :value="tableData.bulletStatOffice.totalTrainAverage" :readonly="!patternIsEdit" style="border-right: 1px solid #000;width: 50%">
                                <input type="number" :value="tableData.bulletStatOffice.totalTrain" :readonly="!patternIsEdit" style="width: 50%;left: 50%">
                            </td>
                        </tr>
                        <tr>
                            <th colspan="4">全部队摩托（飞行）小时</th>
                            <td rowspan="2" colspan="2">弹药类型</td>
                            <td colspan="3">本月消耗量</td>
                            <td colspan="3">累积消耗量</td>
                        </tr>
                        <tr>
                            <td colspan="2">区分</td>
                            <td>本月人均完成量</td>
                            <td>累积人均完成量</td>
                            <td colspan="2">本级训练（人均/总数）</td>
                            <td>其他</td>
                            <td colspan="2">本级训练（人均/总数）</td>
                            <td>其他</td>
                        </tr>
                        <tr v-for="index in bulletStatLength">
                            <td colspan="2" class="font-family">{{(tableData.motorStat[index-1]||{}).type || '　'}}</td>
                            <td class="font-family">
                                {{handlerMotorStat(tableData.motorStat[index-1],'count')}}
                            </td>
                            <td class="font-family">
                                {{handlerMotorStat(tableData.motorStat[index-1],'total')}}
                            </td>

                            <td colspan="2" class="font-family">{{(tableData.bulletStat[index-1]||{}).type}}</td>
                            <td colspan="2" class="td-zindex" style="z-index: 0">
                                <input type="number" :value="(tableData.bulletStat[index-1]||{}).trainAverage" readonly style="border-right: 1px solid #000;width: 50%">
                                <input type="number" :value="(tableData.bulletStat[index-1]||{}).train" readonly style="width: 50%;left: 50%">
                            </td>

                            <td>{{(tableData.bulletStat[index-1]||{}).others}}</td>
                            <td colspan="2" class="td-zindex" style="z-index: 0">
                                <input type="number" :value="(tableData.bulletStat[index-1]||{}).totalTrainAverage" readonly style="border-right: 1px solid #000;width: 50%">
                                <input type="number" :value="(tableData.bulletStat[index-1]||{}).totalTrain" readonly style="width: 50%;left: 50%">
                            </td>
                            <td>{{(tableData.bulletStat[index-1]||{}).totalOthers}}</td>
                        </tr>

                    </table>
                </div>
                <div class="content-describe">
                    <span>填写人：<b class="text-1">{{tableData.createdBy}}</b></span>
                    <span style="padding-right: 50px">中队主官：<b class="text-1"></b></span>
                </div>
            </div>

            <slot name="created"> </slot>

            <transition name="el-zoom-in-center">
                <div v-show="patternIsEdit" class="shadeBox shadeBox-wrapper"> </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import {ScoreCriteria2} from 'src/lib/Constants'
    const mapContent = ['年度驾驶训练','年度实车驾驶训练','年度实车驾驶','年度驾驶','汽车年度实车驾驶训练','汽车年度驾驶训练'];
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
        watch:{
            /*'tableData.bulletStatOffice.train'(value){
                if(_.isUndefined(this.$$lastTotalTrain))this.$$lastTotalTrain = this.tableData.bulletStatOffice.totalTrain;
                if(!this.tableData.bulletStatOffice.soldierNumber)return;
                this.tableData.bulletStatOffice.trainAverage = +(value/this.tableData.bulletStatOffice.soldierNumber).toFixed(1);
                this.tableData.bulletStatOffice.totalTrain = this.$$lastTotalTrain + value;
                this.tableData.bulletStatOffice.totalTrainAverage = +(this.tableData.bulletStatOffice.totalTrain/this.tableData.bulletStatOffice.soldierNumber).toFixed(1);
            }*/
        },
        computed:{
			formatMotorStat() {
				return (this.tableData.motorStat||[]).map(motorStat => {
                    const stat = motorStat.motorInfo.find(item => item.type.includes('年度')&&!item.type.includes('摩托'));
                    return stat ? {
                        orgType: motorStat.type,
                        ...stat
                    } : {
                        orgType: motorStat.type,
                        type: '',
                        unitType: '',
                        count: 0,
                        total: 0
                    };
                });
			},
            Level4(){
                return ScoreCriteria2.Level4.optionalScores;
            },
            bulletStatLength(){
                return this.tableData.bulletStat.length > 14 ? this.tableData.bulletStat.length : 14
            },
            isDec(){
                return this.$systemTime().getMonth() === 11
            }
        },
        filters:{
            handleScore(Score){
                return Score === 0 ? '' : ScoreCriteria2.Level4.optionalScores[Score];
            },
        },
        methods:{
            handleItem(name,index,...args){
				const result = this.tableData[name][index-1] && args.reduce((prev,cur)=>{
                    return prev[cur]
                },this.tableData[name][index-1])
                return result ? result : result === 0 ? 0 : '';
            },
            handlerMotorStat(obj,key){
                if(!obj || !obj.motorInfo || !obj.motorInfo.length)return '';
                const arr = obj.motorInfo.filter(item=>mapContent.includes(item.type));
                //const found = obj.motorInfo.find(item=>item.unitType === '公里');
                return arr[0] && (arr[0][key] + arr[0].unitType)
            },
            handlerInput(objName,key,e,isOk){
                e.target.value = +e.target.value > 100 && !isOk ? 100 : +e.target.value;
                this.tableData[objName][key] = +e.target.value
            },
            staticInput(name,key,totalKey,e){
                let localData = JSON.parse(localStorage.getItem('MonthlyReportL2'));
                if(!localData)return;
                this.tableData[name][key] = +e.target.value;
                this.tableData[name][totalKey] = +e.target.value + localData[name][totalKey] - localData[name][key]
            },
            /*formatMotorStat() {
                return (this.tableData.motorStats||[]).map(motorStat => {
                    const stat = motorStat.motorInfo.find(item => item.type.includes('年度')&&!item.type.includes('摩托'));
                    return stat ? {
                        orgType: motorStat.type,
                        ...stat
                    } : {
                        orgType: motorStat.type,
                        type: '',
                        unitType: '',
                        count: 0,
                        total: 0
                    };
                });
            }*/
        }
    }

</script>

<style scoped lang="scss">
    @import "./common.scss";
    .Report{
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative
    }
    @media print{
        .table-height{
            height: 700px!important;
        }
    }
    .table-height{
        min-height: 600px;
    }
</style>
