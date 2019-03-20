<template>
    <div class="chart-body">
        <slot name="chart-title"></slot>
        <div class="chart-content">
            <div class="content-top">
                <div class="content-item">
                    <div class="item-content">
                        <PersonRank
                            :className="'PersonSportAnnualScore'"
                            :filterObj="filterObj"></PersonRank>
                    </div>
                </div>
                <div class="content-item">
                    <div class="item-content">
                        <span class="pie-chart-title">个人成绩分布</span>
                        <chart v-if="scorePie.series[0].data.length" :options="scorePie" style="width:100%;height: 350px; margin-top: 0px">
                        </chart>
                        <div v-else class="noData">
                            <img src="/static/img/empty.png">
                        </div>
                    </div>
                </div>
                <div class="content-item">
                    <div class="item-content">
                        <RateRank
                            :className="className"
                            :filterObj="filterObj"></RateRank>
                    </div>
                </div>
            </div>
            <div class="content-course">
                <!--<span>考核课目平均分排名</span>-->
                <div class="course-content">
                    <div class="item-course">
                        <div class="item-content">
                            <CourseTotalRank
                                :className="className"
                                :filterObj="filterObj"></CourseTotalRank>
                        </div>
                    </div>
                    <div class="item-course">
                        <div class="item-content">
                            <CourseAverageRank
                                :className="className"
                                :course="1"
                                :filterObj="filterObj"></CourseAverageRank>
                        </div>
                    </div>
                    <div class="item-course">
                        <div class="item-content">
                            <CourseAverageRank
                                :course="2"
                                :className="className"
                                :filterObj="filterObj"></CourseAverageRank>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash';
    import moment from 'moment';
    import echarts from 'echarts'
    import RateRank from './RateRank'
    import PersonRank from './PersonRank'
    import Client from 'src/lib/Client'
    import CourseTotalRank from './CourseTotalRank'
    import CourseAverageRank from './CourseAverageRank'
    import {mixinOrg} from "src/config/mixin"
    import ECharts from 'vue-echarts/components/ECharts.vue'
    import {AssessMethod,Gender,OrgSequences,ScoreCriteria} from 'src/lib/Constants'
    export default {
        components:{
            'chart': ECharts,
            PersonRank,
            RateRank,
            CourseTotalRank,
            CourseAverageRank,
        },
        mixins:[{
            methods:mixinOrg.methods
        }],
        props: {
            filterObj: {
                type: Object,
                default: {}
            },
            className: {
                type: String,
                default: ''
            }
        },
        data(){
            return{
                ScoreCriteria,
                scorePie:{
                    color:['#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                    tooltip: {
                    trigger: 'item',
                        formatter: "{b}: {c}%"
                    },
                    legend: {
                        show: true,
                        orient: 'vertical',
                        x: 'right',
                        data:['特一级']
                    },
                    todayTime: undefined,
                    series: [
                        {
                            type:'pie',
                            selectedMode: 'single',
                            radius: [0, '70%'],
                            label: {
                                show: false
                            },
                            data:[]
                        },
                    ]
                },
                tableChartlList: [],
            }
        },
        created() {

        },
        methods: {
            queryListAll(className,query){
                return this.$backendService.queryListAll(className,query);
            },
            getObject(className, objectId) {
                return this.$backendService.getParseObject(className, objectId);
            },
            async fetchChartData(){
                let [legend,chartData,level4Data,Level7Rate] = [[],[],undefined,this.level7Data()];
                this.scorePie.series[0].data = [];
                this.scorePie.legend.data = [];
                let $query = new Client.Query(this.className);
                $query.equalTo('assessMethod',this.filterObj.assessMethod);
                $query.equalTo('year',parseInt(this.filterObj.year));
                if(!this.filterObj.curOrg)return;
                let orgId = await this.getObject('Organization',this.filterObj.curOrg.objectId);
                $query.equalTo('organization',orgId);
                const result = await this.queryListAll(this.className,$query);
                this.tableChartlList = result.list[0];
                if (!_.isEmpty(result.list[0])){
                    Level7Rate.map(item=>{
                        let itemRate={};
                        if (item.name==='特一级率'){
                            itemRate.value=this.tableChartlList.stats[item.value1];
                        } else if (item.name==='不及格率'){
                            itemRate.value= this.handleInteger(100 - this.tableChartlList.stats.passRate);
                        } else {
                            itemRate.value = this.tableChartlList.stats[item.value1] - this.tableChartlList.stats[item.value2];
                        }
                        itemRate.name= item.name;
                        legend.push(item.name);
                        chartData.push(itemRate);
                    });
                    this.scorePie.series[0].data = chartData;
                    this.scorePie.legend.data = legend;
                    level4Data = {
                        personNum: this.tableChartlList.stats.referenceNum,
                        passRate: chartData[5].value,
                        goodRate: chartData[4].value,
                        excellentRate:chartData[3].value};
                }
                this.$emit('getTableList', level4Data);
            },
            level7Data(){
                return [
                    {name:'特一级率', value1: 'extraL1Rate'},
                    {name:'特二级率', value1: 'extraL2Rate', value2: 'extraL1Rate'},
                    {name:'特三级率', value1: 'extraL3Rate', value2: 'extraL2Rate'},
                    {name:'优秀率', value1: 'excellentRate', value2: 'extraL3Rate'},
                    {name:'良好率',value1: 'goodRate', value2: 'excellentRate'},
                    {name:'及格率', value1: 'passRate', value2: 'goodRate'},
                    {name:'不及格率'},];
            },
            handleInteger(val) {
                return Number.isInteger(val) && val || val.toFixed(2);
            },
        },
        watch: {
            'filterObj':{
                handler(val){
                    if (!val || val.length<0) return;
                    this.fetchChartData();
                },
                immediate: true,
                deep: true
            }
        }
    }
</script>

<style scoped lang="scss">
.chart-content{
    padding: 12px;
    box-sizing: content-box;
    background: #fafafa;
    .content-top{
        display: flex;
        justify-content: space-between;
        .content-item{
            box-sizing: border-box;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            background: #fff;
            display: flex;
            width: 32.8%;
            height: 370px;
            border: 1px solid #E4E7ED;
            .item-content{
                width: 98%;
                /*margin: 1% 6px;*/
                margin-top: 6px;
                margin-left: 1%;
                .pie-chart-title{
                    width: 180px;
                    height: 35px;
                    text-align: center;
                    background: #38425c;
                    font-size: 16px;
                    float: left;
                    line-height: 35px;
                    padding: 3px;
                    color: #fff;
                    font-weight: bolder;
                }
            }
        }
    }
    .content-course{
        margin-top: 12px;
        width: 100%;
        span{
            display: inline-block;
        }
        .course-content{
            width: 100%;
            display: flex;
            justify-content: space-between;
            .item-course{
                width: 32.8%;
                height: 370px;
                border: 1px solid #E4E7ED;
                box-sizing: border-box;
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                background: #fff;
                .item-content{
                    margin-top: 6px;
                    width: 98%;
                    margin-left: 1%;
                }
            }
        }
    }
    .noData{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            width: 260px;
        }
    }
}
</style>
