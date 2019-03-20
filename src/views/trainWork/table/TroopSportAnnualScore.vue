<template>
    <div class="Report print-border-none">
        <div class="body">
            <div class="body-title">
                <div class="title-text">
                    单位军事体育训练考核成绩汇总表
                    <div class="text-btns">
                        <div><el-button type="danger" size="mini" plain class="print-hidden" @click="$window.print()">打印</el-button></div>
                        <slot name="handle"> </slot>
                    </div>
                </div>
            </div>

            <div class="body-content" v-if="tableData">
                <div class="content-table">
                    <table cellspacing="0" cellpadding="0" border="1" class="print-height">
                        <tr>
                            <th>序号</th>
                            <th>所属部（分）队名称</th>
                            <th v-for="item in level4.reverse()">{{item}}</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td class="font-family">军事主官</td>
                            <td v-for="(item,i) in level4">
                                <i v-if="tableData.militaryMaster === level4.length - i" class="el-icon-check"></i>
                                <span v-else></span>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td class="font-family">政治主官</td>
                            <td v-for="(item,i) in level4">
                                <i v-if="Math.max(1,tableData.politicalMaster) === level4.length - i" class="el-icon-check"></i>
                                <span v-else></span>
                            </td>
                        </tr>
                        <tr v-for="index in 14">
                            <td>{{tableData.orgScores[index-1]?index+2:'&nbsp'}}</td>
                            <td class="font-family">{{handleItem(index,'name')}}</td>
                            <td v-for="(item,i) in level4">
                                <i v-if="handleItem(index,'score') === level4.length - i" class="el-icon-check"></i>
                                <span v-else></span>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>合计（共{{tableData.stats.total}}个）</td>
                            <td v-for="(item,i) in level4">
                                {{handleStats(item)}}
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">本级单位总评</td>
                            <td v-for="(item,i) in level4">
                                <i v-if="tableData.evaluatedScore === level4.length - i" class="el-icon-check"></i>
                                <span v-else></span>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">
                                <div class="box">
                                    <span class="item">考核总负责人签名：</span>
                                    <span class="item">{{tableData.date|formatDate}}</span>
                                </div>
                            </td>
                            <td colspan="3">
                                <div class="box">
                                    <span class="item">单位军事主官签名：</span>
                                    <span class="item">{{tableData.date|formatDate}}</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td height="72">备注</td>
                            <td colspan="5"></td>
                        </tr>
                    </table>
                </div>
            </div>
            <div v-else class="body-empty"><img src="/static/img/empty.png" alt=""></div>

            <transition name="el-zoom-in-center">
                <slot name="model"></slot>
            </transition>
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
        data(){
            return {

            }
        },
        methods:{
            handleItem(index){
                return this.tableData.orgScores[index-1] && [...arguments].slice(1).reduce((prev,cur)=>{
                    return prev[cur]
                },this.tableData.orgScores[index-1])
            },
            handleStats(key){
                switch (key){
                    case '优秀':
                        return this.tableData.stats.excellentCount;
                    case '良好':
                        return this.tableData.stats.goodCount;
                    case '及格':
                        return this.tableData.stats.passCount;
                    case '不及格':
                        return this.tableData.stats.unpassCount;
                }
            }
        },
        computed:{
            level4(){
                const arr = _.cloneDeep(ScoreCriteria.Level4.optionalScores);
                console.log(arr)
                return arr;
            },
        },
        filters:{
            formatDate(date){
                return moment(date).format('YYYY年MM月DD日')
            },
            arrayToString(array){
                return array.length ? array.join(' 、 ') : ''
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
        table-layout:fixed;
        line-height: 36px;
    }
    .float-left{
        float: left;
    }
    .border-right{
        border-right: 1px solid #DCDFE6;
    }
    .box {
        display: flex;
        min-height: 72px;
        box-sizing: border-box;
        padding:0 10px;
        justify-content: space-between;
    }

    .item:nth-child(2) {
        align-self: flex-end;
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
            .title-tip{
                text-align: center;
                border-bottom: 1px solid #ebeef5;
                line-height: 36px;
            }
        };
        .body-content{
            .content-describe{
                display: flex;
                padding: 0 10px;
                justify-content: space-between;
                line-height: 36px;
            }
            .content-table{
                border:2px solid #000;
                .can-edit{
                    word-break: break-all;
                    word-wrap:break-word;
                    position: relative;
                    box-sizing: border-box;
                    line-height: 36px;
                    overflow: hidden;
                    top: 0;
                    right: 0;
                    background: #fff;
                    z-index: 3;
                    height: 100%;
                    width: 100%;
                    input{
                        width: 100%;
                        text-align: center;
                        line-height: 36px;
                        height: 36px;
                        border: none!important;
                    }
                }
                .isRepair:before{
                    content: '（补考）';
                    position: absolute;
                    opacity: 0.8;
                    right: 10px;
                    font-size: 12px;
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
