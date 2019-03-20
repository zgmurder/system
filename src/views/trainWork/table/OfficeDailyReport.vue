<template>
    <div class="Report">
        <div class="body print-body">
            <div class="body-title">
                <slot name="header"></slot>
                <div class="title-text">
                    <div class="text-btns">
                        <div><el-button type="danger" size="mini" plain class="print-hidden" @click="print">打印</el-button></div>
                        <slot name="handle"></slot>
                    </div>
                </div>
            </div>
            <transition name="el-zoom-in-center">
                <div class="body-content content-table" v-if="tableData" id="pdfDom">
                    <h3 style="text-align: center;font-family: FZXBSJW!important;font-size: 24px!important;" class="font-family">首长机关军事训练情况日登记表</h3>
                    <div class="content-describe">
                        <span>单位：<b class="text-2">{{tableData.targetOrg.displayName}}</b></span><!--{{mainOrgInfo.organization.displayName}}-->
                        <span>时间：<b class="text-2">{{tableData.date|formatDate}}</b></span><!--{{mainOrgInfo.date|handleDate}}-->
                    </div>
                    <table border="1" cellspacing="0" cellpadding="0" class="table-height">
                        <tr>
                            <th colspan="5">训练人员</th>
                            <th colspan="5">训练时间</th>
                        </tr>
                        <tr>
                            <td rowspan="2">实力数</td>
                            <td rowspan="2">参训人数</td>
                            <td rowspan="2">参训率</td>
                            <td rowspan="2" colspan="2" class="text-over">未参加人员及原因</td>
                            <td rowspan="2">区分</td>
                            <td colspan="2">当日训练时间</td>
                            <td colspan="2">累积训练时间</td>
                        </tr>
                        <tr>
                            <td>昼</td>
                            <td>夜</td>
                            <td>昼</td>
                            <td>夜</td>
                        </tr>
                        <tr>
                            <td :rowspan="tableData.timeStat.length" class="td-zindex" height="60">
                                <input type="number" @input="totalIsChange" :readonly="!patternIsEdit" :value="tableData.personStat.total||0">
                            </td>
                            <td :rowspan="tableData.timeStat.length" class="td-zindex">
                                <input type="number" @input="presentIsChange" :readonly="!patternIsEdit" :value="tableData.personStat.present||0">
                            </td>
                            <td :rowspan="tableData.timeStat.length">{{`${tableData.personStat.presentRate||0}%`}}</td>
                            <td :rowspan="tableData.timeStat.length" colspan="2"  class="font-family td-zindex font-family">
                                <textarea v-if="patternIsEdit" v-model="tableData.personStat.notes"></textarea>
                                <span v-else>{{tableData.personStat.notes}}</span>
                            </td>
                            <td>{{(tableData.timeStat[0]||{}).type}}</td>
                            <td class="td-zindex">
                                <input type="number" :readonly="!patternIsEdit" v-model.number="(tableData.timeStat[0]||{}).hoursInDay" @input="hoursInDayIsChange(0,$event)">
                            </td>
                            <td class="td-zindex">
                                <input type="text" :readonly="!patternIsEdit" v-model.number="(tableData.timeStat[0]||{}).hoursAtNight" @input="hoursAtNightIsChange(0,$event)">
                            </td>
                            <td>{{(tableData.timeStat[0]||{}).totalHoursInDay}}</td>
                            <td>{{(tableData.timeStat[0]||{}).totalHoursAtNight}}</td>
                        </tr>
                        <tr v-for="(item,index) in (tableData.timeStat||[])" v-if="index>0 && tableData.timeStat.length !== 1">
                            <td>{{item.type}}</td>
                            <td class="td-zindex">
                                <input type="number" :readonly="!patternIsEdit" v-model.number="item.hoursInDay" @input="hoursInDayIsChange(index,$event)">
                            </td>
                            <td class="td-zindex">
                                <input type="number" :readonly="!patternIsEdit" v-model.number="item.hoursAtNight" @input="hoursAtNightIsChange(index,$event)">
                            </td>
                            <td>{{item.totalHoursInDay}}</td>
                            <td>{{item.totalHoursAtNight}}</td>
                        </tr>
                        <tr>
                            <th colspan="5">训练内容</th>
                            <th colspan="5">训练弹药</th>
                        </tr>


                        <tr v-for="(value,key,index) in tableData.contentStat">
                            <td>{{DailySection[key.substring(0,1).toUpperCase()+key.substring(1)]}}</td>
                            <td colspan="4" class="td-zindex">
                                <slot v-if="patternIsEdit" name="selectContentStat" :type="key"> </slot>
                                <span v-else class="font-family">{{tableData.contentStat[key]|arrayToString}}</span>
                            </td>
                            <td rowspan="2" v-if="index === 0">弹药类型</td>
                            <td colspan="2" v-if="index === 0">当日消耗量</td>
                            <td colspan="2" v-if="index === 0">累计消耗量</td>
                            <td  v-if="index === 1">本级训练<br>（人均/总数）</td>
                            <td  v-if="index === 1">其他</td>
                            <td  v-if="index === 1">本级训练<br>（人均/总数）</td>
                            <td  v-if="index === 1">其他</td>
                            <td v-if="index > 1" class="font-family">{{(tableData.bulletStat[index-2]||{}).type}}</td>
                            <td v-if="index > 1" class="td-zindex" :style="{'z-index': tableData.bulletStat[index-2] ? 4 : 0}">
                                <input type="number" :value="(tableData.bulletStat[index-2]||{}).trainAverage" :readonly="!patternIsEdit" @input="trainAverageIsChange(index-2,$event)" style="border-right: 1px solid #000;width: 50%">
                                <input type="number" :value="(tableData.bulletStat[index-2]||{}).train" @input="trainIsChange(index-2,$event)" :readonly="!patternIsEdit" style="width: 50%;left: 50%">
                            </td>
                            <td v-if="index > 1" class="td-zindex" :style="{'z-index': tableData.bulletStat[index-2] ? 4 : 0}">
                                <input type="number" v-model.number="(tableData.bulletStat[index-2]||{}).others" @input="othersIsChange(index-2,$event)" :readonly="!patternIsEdit">
                            </td>
                            <td v-if="index > 1" class="td-zindex" style="z-index: 0">
                                <input type="number" :value="(tableData.bulletStat[index-2]||{}).totalTrainAverage" :readonly="!patternIsEdit" style="border-right: 1px solid #000;width: 50%">
                                <input type="number" :value="(tableData.bulletStat[index-2]||{}).totalTrain" :readonly="!patternIsEdit" style="width: 50%;left: 50%">
                            </td>
                            <td v-if="index > 1">{{(tableData.bulletStat[index-2]||{}).totalOthers}}</td>
                        </tr>
                        <tr v-for="index in bulletStatLength">
                            <th colspan="5" v-if="index === 1">摩托（飞行）小时</th>
                            <td colspan="3" v-if="index === 2">区分</td>
                            <td v-if="index === 2">当日完成量</td>
                            <td v-if="index === 2">累计完成量</td>
                            <td colspan="3" v-if="index > 2" class="font-family">{{(tableData.motorStat[index-2]||{}).type}}</td>
                            <td class="td-zindex font-family" v-if="index > 2" :style="{'z-index': tableData.motorStat[index-2] ? 4 : 0}">
                                <input v-if="patternIsEdit" type="number" v-model.number="(tableData.motorStat[index-2]||{}).count" @input="motorStatIsChange(index-2,$event)" :readonly="!patternIsEdit">
                                <span v-else>{{(tableData.motorStat[index-2]||{}).count}}{{(tableData.motorStat[index-2]||{}).unitType}}</span>
                            </td>
                            <td v-if="index > 2" class="font-family">{{(tableData.motorStat[index-2]||{}).total||'　'}}{{(tableData.motorStat[index-2]||{}).unitType}}</td>

                            <td class="font-family">{{(tableData.bulletStat[index+2]||{}).type}}</td>
                            <td class="td-zindex" :style="{'z-index': tableData.bulletStat[index+2] ? 4 : 0}">
                                <input type="number" :value="(tableData.bulletStat[index+2]||{}).trainAverage" :readonly="!patternIsEdit" @input="trainAverageIsChange(index+2,$event)" style="border-right: 1px solid #000;width: 50%">
                                <input type="number" :value="(tableData.bulletStat[index+2]||{}).train" @input="trainIsChange(index+2,$event)" :readonly="!patternIsEdit" style="width: 50%;left: 50%">
                            </td>
                            <td class="td-zindex" :style="{'z-index': tableData.bulletStat[index+2] ? 4 : 0}">
                                <input type="number" v-model.number="(tableData.bulletStat[index+2]||{}).others" @input="othersIsChange(index+2,$event)" :readonly="!patternIsEdit">
                            </td>
                            <td class="td-zindex" style="z-index: 0">
                                <input type="number" :value="(tableData.bulletStat[index+2]||{}).totalTrainAverage" :readonly="!patternIsEdit" style="border-right: 1px solid #000;width: 50%">
                                <input type="number" :value="(tableData.bulletStat[index+2]||{}).totalTrain" :readonly="!patternIsEdit" style="width: 50%;left: 50%">
                            </td>
                            <td>{{(tableData.bulletStat[index+2]||{}).totalOthers}}</td>
                        </tr>
                    </table>
                    <div class="content-describe" style="margin-right: 50px">
                        <div>填写人：</div>
                        <div>{{!isCheckDailyReport && '中队主官：' || '主官：'}}<span style="color: #fff"></span></div>
                    </div>
                    <ul class="content-explain">
                        <!--<li>1.此表由中队级单位每日填写留存备查，并报大队，由大队每周五统一上报支队；不设大队的中队每周五自行上报支队。新兵训练照此执行。</li>-->
                        <li>1.训练人员。“未参训人员说明”栏简要填写数量及原因。</li>
                        <li>2.训练内容。仅填写军事训练内容，政治教育、党（团）活动等其他工作不填写。</li>
                        <li>3.训练时间。昼间训练时间不含早操和体能训练时间；夜间训练时间是指落实《大纲》规定的夜训课目时间，不含夜间组织的体能等非夜训课目时间。干部训练时间不含随队训练时间。</li>
                        <li>4.训练弹药。本级训练填写实弹射击训练“人均弹药消耗数/弹药消耗总数”，其它填写参加上级抽考、比武集训和组织实兵演习演练消耗的弹药总数。</li>
                        <li>5.摩托（飞行）小时。填写所属驾驶员人均完成小时数或公里数。</li>
                    </ul>
                </div>
            </transition>

            <div v-if="!tableData" class="body-empty"><img src="/static/img/empty.png" alt=""></div>

            <transition name="el-zoom-in-center">
                <slot name="model"></slot>
            </transition>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import {DailySection} from 'src/lib/Constants'
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
        },
        showTips:{
            type:Boolean,
            default:true
        },
        isCheckDailyReport: {
            type:Boolean,
            default:true
        }
    },
    data(){
        return {
            DailySection,
        }
    },
    computed:{
        bulletStatLength(){
            return this.tableData.bulletStat.length > 12 ? this.tableData.bulletStat.length - 3 : 10
        },
    },
    methods:{
        handleItem(name,index,...args){
            const value = this.tableData[name][index-1] && args.reduce((prev,cur)=>{
                return prev[cur]
            },this.tableData[name][index-1]);
            return value ? value : (value === 0 ? value : '　');
        },
        trainAverageIsChange(index,e){
            let localData = JSON.parse(localStorage.getItem('OfficeDailyReport'));
            if(!localData)return;
            const bulletStat = localData.bulletStat;
            const obj = this.tableData.bulletStat[index];
            obj.trainAverage = +e.target.value;
            obj.totalTrainAverage = +e.target.value +bulletStat[index].totalTrainAverage - bulletStat[index].trainAverage;

        },
        trainIsChange(index,e){
            let localData = JSON.parse(localStorage.getItem('OfficeDailyReport'));
            if(!localData)return;
            const bulletStat = localData.bulletStat;
            const obj = this.tableData.bulletStat[index];
            obj.train = +e.target.value;
            // obj.trainAverage = +(e.target.value/obj.soldierNumber).toFixed(1);
            obj.totalTrain = +e.target.value +bulletStat[index].totalTrain - bulletStat[index].train;
            // obj.totalTrainAverage = +(obj.totalTrain/obj.soldierNumber).toFixed(1)
        },
        totalIsChange(e){
            const target = e.target;
            // if(!this.$$total)this.$$total = this.tableData.personStat.total;
            this.tableData.personStat.total = target.value;
            // if(this.tableData.personStat.present>target.value){
            //     this.tableData.personStat.present = target.value;
            // }
            // if(target.value>this.$$total){
            //     this.tableData.personStat.total = this.$$total;
            // }
            this.tableData.personStat.presentRate = +(this.tableData.personStat.present*100/this.tableData.personStat.total).toFixed(1);
        },
        motorStatIsChange(index,e){
            let localData = JSON.parse(localStorage.getItem('OfficeDailyReport'));
            if(!localData)return;
            const motorStat = localData.motorStat;
            const obj = this.tableData.motorStat[index];
            obj.total = +e.target.value+motorStat[index].total-motorStat[index].count;
        },
        othersIsChange(index,e){
            let localData = JSON.parse(localStorage.getItem('OfficeDailyReport'));
            if(!localData)return;
            const bulletStat = localData.bulletStat;
            const obj = this.tableData.bulletStat[index];
            obj.totalOthers = +e.target.value +bulletStat[index].totalOthers - bulletStat[index].others;
        },
        hoursInDayIsChange(index,e){
            let localData = JSON.parse(localStorage.getItem('OfficeDailyReport'));
            if(!localData)return;
            const timeStat = localData.timeStat;
            const obj = this.tableData.timeStat[index];
            obj.totalHoursInDay = +e.target.value +timeStat[index].totalHoursInDay - timeStat[index].hoursInDay;
        },
        hoursAtNightIsChange(index,e){
            let localData = JSON.parse(localStorage.getItem('OfficeDailyReport'));
            if(!localData)return;
            const timeStat = localData.timeStat;
            const obj = this.tableData.timeStat[index];
            obj.totalHoursAtNight = +e.target.value +timeStat[index].totalHoursAtNight - timeStat[index].hoursAtNight;
        },
        presentIsChange(e){
            const target = e.target;
            this.tableData.personStat.present = target.value;
            if(target.value>this.tableData.personStat.total){
                this.tableData.personStat.present = this.tableData.personStat.total;
            }
            this.tableData.personStat.presentRate = +(this.tableData.personStat.present*100/this.tableData.personStat.total).toFixed(1);
        },
        print(){
            window.print()
        }
    },
    filters:{
        formatDate(date){
            return moment(date).format('YYYY年MM月DD日')
        },
        arrayToString(array){
            if(!array.length)return '　';
            return array.join(' 、 ')
        },
    },
    }

</script>

<style scoped lang="scss">
    /*.text-over{*/
        /*overflow: hidden;*/
        /*text-overflow: ellipsis;*/
        /*white-space: nowrap;*/
    /*}*/
    /*table{*/
        /*border-color: #333;*/
        /*border-collapse: collapse;*/
        /*width: 100%;*/
        /*text-align: center;*/
        /*vertical-align: center;*/
        /*box-sizing: border-box;*/
        /*border-width:0;*/
        /*border-style:hidden;*/
        /*color: #606266;*/
        /*table-layout: fixed;*/
        /*line-height: 30px;*/
        /*td{*/
            /*position: relative;*/
        /*}*/
        /*.textarea{*/
            /*line-height: 30px;*/
            /*box-sizing: border-box;*/
            /*padding-top: 15px;*/
            /*padding-left: 5px;*/
            /*border: none;*/
            /*width: 100%;*/
            /*resize: none;*/
            /*text-align: center;*/
            /*word-wrap: break-word;*/
            /*overflow: hidden;*/
        /*}*/
    /*}*/
    /*.Report {*/
        /*flex: 1;*/
        /*background-color: #fff;*/
        /*color: #606266;*/
        /*position: relative;*/
        /*.body-title{*/
            /*.title-text{*/
                /*letter-spacing:3px;*/
                /*font-size: 26px;*/
                /*text-align: center;*/
                /*position: relative;*/
                /*color: #303133;*/
                /*padding: 10px 0;*/
                /*font-family: FZXBSJW!important;*/
                /*.text-btns{*/
                    /*width: 100%;*/
                    /*position: absolute;*/
                    /*z-index: 3;*/
                    /*top: -3px;*/
                    /*box-sizing: border-box;*/
                    /*display: flex;*/
                    /*justify-content: space-between;*/
                    /*padding: 10px;*/
                    /*padding-left: 0;*/
                /*}*/
            /*}*/
            /*.title-tip{*/
                /*text-align: center;*/
                /*border-bottom: 1px solid #ebeef5;*/
                /*line-height: 36px;*/
            /*}*/
        /*};*/
        /*.body-content{*/
            /*.content-describe{*/
                /*display: flex;*/
                /*justify-content: space-between;*/
                /*line-height: 36px;*/
            /*}*/
            /*.content-table{*/
                /*border:2px solid #000;*/
                /*.can-edit{*/
                    /*word-break: break-all;*/
                    /*word-wrap:break-word;*/
                    /*position: absolute;*/
                    /*box-sizing: border-box;*/
                    /*line-height: 36px;*/
                    /*overflow: hidden;*/
                    /*display: flex;*/
                    /*top: 0;*/
                    /*background: #fff;*/
                    /*z-index: 3;*/
                    /*height: 100%;*/
                    /*width: 100%;*/
                    /*input{*/
                        /*height: 100%;*/
                        /*width: 100%;*/
                        /*text-align: center;*/
                        /*border: none;*/
                    /*}*/
                /*}*/
                /*.select-in-table{*/
                    /*width: 100%;*/
                    /*position: relative;*/
                    /*z-index: 3;*/
                    /*text-align: left;*/
                /*}*/
            /*}*/
            /*.content-explain{*/
                /*padding: 10px;*/
                /*line-height: 26px;*/
                /*color: #909399;*/
                /*background: #f6f6f6;*/
            /*}*/
        /*}*/
        /*.body-empty{*/
            /*text-align: center;*/
        /*}*/
    /*}*/
    @import "./common.scss";
    @media print{
        .table-height{
            height: 700px!important;
        }
    }
    .table-height{
        min-height: 600px;
    }
</style>
