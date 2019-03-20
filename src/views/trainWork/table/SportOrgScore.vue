<template>
    <div class="Report">
        <div class="body">
            <div class="body-title">
                <div class="title-text">
                    {{tableData.name}}体育训练考核成绩登记表
                    <div class="text-btns">
                        <div>
                            <el-button type="danger" v-if="$route.path === '/TableVue'" class="print-hidden" @click="$window.print()" size="mini" plain title="打印">打印</el-button>
                            <el-button type="primary" v-if="!patternIsEdit && $route.path !== '/TableVue'" class="print-hidden" @click="$units.showTable(tableData,'SportOrgScore')" size="mini" plain title="新窗口打开">新窗口打开（打印）</el-button>
                        </div>
                        <slot name="handle"> </slot>
                    </div>
                </div>
            </div>

            <div class="body-content">
                <div class="content-table">
                    <table cellspacing="0" cellpadding="0" border="1" class="print-height">
                        <tr>
                            <th>序号</th>
                            <th>姓名</th>
                            <th>职务</th>
                            <th>个人总评</th>
                            <th>单位评定指标</th>
                            <th>单位总评</th>
                        </tr>
                        <tr>
                            <td>{{tableData.personScores[0]?1:'&nbsp'}}</td>
                            <td class="font-family">{{handleItem(1,'name')}}</td>
                            <td class="font-family">{{handleItem(1,'position')}}</td>
                            <td class="font-family">{{handleItem(1,'score')|handleScore}}</td>
                            <td :rowspan="comLength">
                                <div v-for="(value,key) in tableData.stats">{{handleStats(key,value)}}</div>
                            </td>
                            <td :rowspan="comLength">
                                <!--<div v-for="(item,index) in level4"><el-checkbox :value="tableData.evaluatedScore === level4.length-index">{{item}}</el-checkbox></div>-->
                                <div v-for="(item,index) in level4" style="position: relative"><i :class="{'el-icon-check':tableData.evaluatedScore === level4.length-index}" style="border: solid 1px #999;position: absolute;width: 14px;height: 14px;top:10px;margin-left: -20px"></i>{{item}}</div>
                            </td>
                        </tr>
                        <tr v-for="(personScore,index) in tableData.personScores" v-if="index>0">
                            <td>{{personScore ? index+1:'&nbsp'}}</td>
                            <td class="font-family">{{personScore.name}}</td>
                            <td class="font-family">{{personScore.position}}</td>
                            <td class="font-family">{{personScore.score|handleScore}}</td>
                        </tr>
                        <tr v-if="tableData.personScores.length < 14" v-for="i in Math.abs(14-tableData.personScores.length)">
                            <td v-for="index in 4">&nbsp;&nbsp;</td>
                        </tr>
                        <tr>
                            <td height="72">备注</td>
                            <td colspan="5" class="line-height-normal" style="text-align: left;padding-left: 15px">
                                <p>1.本表由普考组织单位填写，所填写对象均为本单位的普考对象；</p>
                                <p>2.各级单位的年度军事体育训练成绩均依据上述普考成绩计算；</p>
                                <p>3.及格率、良好率、优秀率分别为及格、良好、优秀人数除以参考人数（特级以上人员计入优秀人数）</p>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import {ScoreCriteria} from 'src/lib/Constants'
    import _ from 'lodash'
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
        methods:{
            handleItem(index){
                return this.tableData.personScores[index-1] && [...arguments].slice(1).reduce((prev,cur)=>{
                    return prev[cur]
                },this.tableData.personScores[index-1])
            },
            handleStats(key,value){
                switch (key){
                    case 'extraL1Count':
                        return `特1级：${value}`;
                    case 'extraL2Count':
                        return `特2级：${value}`;
                    case 'extraL3Count':
                        return `特3级：${value}`;
                    case 'excellentCount':
                        return `优秀：${value}`;
                    case 'goodCount':
                        return `良好：${value}`;
                    case 'passCount':
                        return `及格：${value}`;
                    case 'unpassCount':
                        return `不及格：${value}`;
                    case 'excellentRate':
                        return `优秀率：${value||0}%`;
                    case 'goodRate':
                        return `良好率：${value||0}%`;
                    case 'passRate':
                        return `及格率：${value||0}%`;
                }
            }
        },
        computed:{
            level4(){
                const arr = _.cloneDeep(ScoreCriteria.Level4.optionalScores);
                return arr.reverse();
            },
            comLength(){
                return this.tableData.personScores.length < 14 ? 15 : this.tableData.personScores.length+1
            }
        },
        filters:{
            handleScore(Score){
                return ScoreCriteria.Level7.optionalScores[Score-1]
            },
        },
    }

</script>


<style scoped lang="scss">
    @import "./common.scss";
</style>
