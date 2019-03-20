<template>
    <div class="chart-body">
        <slot name="chart-filter"></slot>
        <div class="chart-content">
            <transition name="el-zoom-in-center">
                <div v-if="!personScoreChart.series.length" style="text-align: center">
                    <div class="info-class"><i class="el-icon-info"></i>选择完课目和时间后才可以添加人员，当重新选择课目或者时间，原来添加的人员会被清除,人员最多可添加15人！</div>
                    <img src="/static/img/empty.png" style="width: 470px">
                </div>
                <chart v-else :options="personScoreChart" class="chart-class" style="margin-top: 20px" :style="{width:chartWidth+'px',height:chartHeight+'px'}">
                </chart>
            </transition>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash';
    import moment from 'moment';
    import echarts from 'echarts'
    import Client from 'src/lib/Client'
    import {mixinOrg} from "src/config/mixin"
    import ECharts from 'vue-echarts/components/ECharts.vue'
    import {AssessMethod,OrgSequences,ScoreCriteria} from 'src/lib/Constants'
    export default {
        components:{
            'chart': ECharts,
        },
        mixins:[{
            methods:mixinOrg.methods
        }],
        props: {
            filterObj:{
                type: Object,
                default: {
                    date: [],
                    courseName: '',
                    soldier: []
                }
            },
            curOrg: {
                type: Object,
                default: {}
            }
        },
        data(){
            return{
                chartWidth: document.body.clientWidth - 450,
                chartHeight: document.body.clientHeight - 300,
                personScoreChart: {
                    title: {
                        text: '个人军事成绩分析',
                        left: 'center'
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'right',
                        data:[]
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    xAxis: {
                        type: 'time',
                        boundaryGap: false,
                        data: [],
                        name: '日期',

                    },
                    yAxis: {
                        type: 'value',
                        name: '分数',
                    },
                    series:  []
                }
            }
        },
        async created() {
            this.$$rootOrg = await this.$backendService.orgService.getRootOrganization();
        },
        methods: {
            queryListAll(className,query){
                return this.$backendService.queryListAll(className,query);
            },
            getObject(className, objectId) {
                return this.$backendService.getParseObject(className, objectId);
            },
        },
        watch: {
            'filterObj':{
                async handler(val){
                    this.personScoreChart.series = [];
                    if (!val.courseName || !val.date || _.isEmpty(val.soldier)) return;
                    let querySportScore = new Client.Query(Client.SportScore);
                    querySportScore.equalTo('courseName',val.courseName);
                    let lessYear = val.date.getFullYear();
                    let lessDate = new Date(`${lessYear}-01-01 00:00:00`);
                    let greaterYear = lessYear + 1;
                    let greaterDate = new Date(`${greaterYear}-01-01 00:00:00`);
                    querySportScore.greaterThanOrEqualTo('date',lessDate);
                    querySportScore.lessThanOrEqualTo('date',greaterDate);

                    let parseSoldiers = val.soldier.map(soldierId => this.getObject('Soldier', soldierId));
                    querySportScore.containedIn('soldier', parseSoldiers);
                    querySportScore.addAscending('date');
                    let result = await this.queryListAll('SportScore',querySportScore);
                    let [chartSeriesData, chartLegend] = [[], []];
                    if (!_.isEmpty(result.list)){
                        val.soldier.forEach(itemSoldier=>{
                            let chartItem = {name: '',type: 'line',data: []};
                            result.list.forEach(item=>{
                                if (itemSoldier !== item.soldier.objectId) return;
                                chartItem.name = item.soldier.name;
                                chartItem.data.push([moment(item.date).format('YYYY-MM-DD'),item.score]);
                            });
                            chartLegend.push(chartItem.name);
                            chartSeriesData.push(chartItem);
                        });
                    } else {
                        this.$message({type: 'error', message: '人员暂无数据，请先添加好该人员体育成绩！'})
                    }
                    this.personScoreChart.series = chartSeriesData;
                    this.personScoreChart.legend.data = chartLegend;
                },
                immediate: true,
                deep: true
            }
        }
    }
</script>

<style scoped lang="scss">
    .chart-content{
        .info-class{
            width: 100%;
            margin-top: 10px;
            margin-left: 20px;
            color: rgb(245, 108, 108);
            font-size: 12px;
            text-align: left;
        }
    }
</style>
