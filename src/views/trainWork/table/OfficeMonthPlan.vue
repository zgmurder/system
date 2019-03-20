<template>
    <div class="AnnualPlan">
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
            <div class="body-content">
                <div class="content-describe">
                    <span>单位：<b class="text-2">{{tableData.organization.displayName}}</b></span>
                    <span>时间：<b class="text-2">{{tableData.date|formatDate}}</b></span>
                </div>
                <table class="content-table" cellspacing="0" cellpadding="0" border="1">
                    <tr>
                        <th colspan="3" width="18%" height="30px">时间</th>
                        <th colspan="4" width="36%"  height="30px">内容</th>
                        <!--<th :colspan="items.length" width="36%">内容</th>-->
                        <th rowspan="2" width="7%"  height="30px">组训<br>方法</th>
                        <th rowspan="2" width="11%"  height="30px">组织者<br>(教练员)</th>
                        <th rowspan="2" width="7%"  height="30px">场地<br>区分</th>
                        <th rowspan="2" width="12%"  height="30px">质量<br>指标</th>
                        <th rowspan="2" width="9%" height="30px">措施<br>要求</th>
                    </tr>
                    <tr>
                        <th width="5%">天数</th>
                        <th colspan="2" width="13%">日期</th>
                        <th width="9%">指挥员</th>
                        <th width="9%">参谋部</th>
                        <th width="9%">政治工作部</th>
                        <th width="9%">保障部</th>
                        <!--<th v-for="item in items" :width="(items.length === 3) && '12%' || '9%'">{{item}}</th>-->
                    </tr>
                    <tr>
                        <td rowspan="4">

                        </td>
                        <td :class="{'edit-content':tableData.annualStages[0]}"  >

                        </td>
                        <td>

                        </td>
                        <td colspan="4">

                        </td>
                        <!--<td :colspan="items.length">-->

                        <!--</td>-->
                        <td>

                        </td>
                        <td>

                        </td>
                        <td>

                        </td>
                        <td rowspan="4">
                            <div class="can-edit" v-if="patternIsEdit">
                                <textarea v-model="tableData.notes"></textarea>
                                <div style="position: absolute;right: 10px">
                                    <slot name="chooseBtn">
                                    </slot>
                                </div>
                            </div>
                            <span v-else></span>
                        </td>
                        <td rowspan="4">
                            <div class="can-edit" v-if="patternIsEdit">
                                <textarea v-model="tableData.notes"></textarea>
                                <div style="position: absolute;right: 10px">
                                    <slot name="chooseBtn">
                                    </slot>
                                </div>
                            </div>
                            <span v-else></span>
                        </td>
                    </tr>

                    <tr v-for="index in 3">
                        <td >
                        </td>
                        <td>

                        </td>
                        <td colspan="4">

                        </td>
                        <!--<td :colspan="items.length">-->

                        <!--</td>-->
                        <td>

                        </td>
                        <td>

                        </td>
                        <td>

                        </td>
                    </tr>
                    <tr>
                        <td colspan="3" style="text-align: center;height:100px ">
                            备注
                        </td>
                        <td colspan="9">
                            <div class="can-edit" v-if="patternIsEdit">
                                <textarea v-model="tableData.notes"></textarea>
                                <div style="position: absolute;right: 10px">
                                    <slot name="chooseBtn">
                                    </slot>
                                </div>
                            </div>
                            <span v-else></span>
                        </td>
                        <!--<td :colspan="5+item.length">-->
                        <!--</td>-->
                    </tr>
                </table>
            </div>
        </div>
        <transition name="el-zoom-in-center">
            <slot name="model"></slot>
        </transition>
        <el-dialog
            :append-to-body="true"
            :close-on-click-modal="false"
            :visible.sync="dialogVisible">
            <div slot="title" class="print-hidden">添加训练计划</div>
            <FormOfficeStagePlan
                :year="tableData"
                :formData="formData"
                :editing="editing"
                @saveEdit="saveEdit">
            </FormOfficeStagePlan>
        </el-dialog>
    </div>
</template>

<script>
    import _ from 'lodash'
    import moment from 'moment'
    import FormOfficeStagePlan from 'src/pages/common/forms/FormOfficeStagePlan'
    import {handleStr,confirm,deleteItem} from 'src/config/units'
    export default {
        components:{
            FormOfficeStagePlan
        },
        name: "annual-plan",
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
                formData:{},
                dialogVisible:false,
                editing:false,
            }
        },
        created(){
            this.initFormData();
        },
        computed:{
            isSubmit(){
                return !!this.tableData.state
            }
        },
        methods:{
            handleStr,
            deleteAnnualStages(index){
                confirm(()=>{
                    let stages = this.tableData.annualStages.splice(index,1);
                    deleteItem('AnnualStage', stages[0]).then(_ =>{
                        this.$message({showClose: true,message:'删除成功',type:'success'})
                    });
                });
            },
            saveEdit(){
                this.$emit('saveEdit',arguments[0]);
                this.dialogVisible=false;
                this.initFormData();
            },
            editAnnualStages(index){
                this.dialogVisible = true;
                this.editing = true;
                const formData = _.cloneDeep(this.tableData.annualStages[index]);
                formData.majors = formData.majors.toString();
                // formData.stages = formData.stages.map(item=>{
                //     item.dateArr = [new Date(item.fromDate),new Date(item.toDate)];
                //     return item
                // });
                formData.stages.push({
                    fromDate: '',
                    toDate: '',
                    task: '',
                });
                this.formData = formData;
            },
            initFormData(){
                this.formData = {
                    orgCategory: '',                              // 单位分类（选填）
                    majors: '',                                   // 专业区分
                    stages: []
                }
            }
        },
        filters:{
            formatDate(date){
                return moment(date).format('YYYY年MM月DD日')
            },
            filterAnnualStages(AnnualStages,num){
                if(!AnnualStages)return '';
                let str = '';
                AnnualStages.stages.map(item=>{
                    if(item.task){
                        str += `
                        ${moment(item.fromDate.iso ? item.fromDate.iso : item.fromDate ).format('MM月DD日')}至
                        ${moment(item.toDate.iso ? item.toDate.iso : item.toDate ).format('MM月DD日')}安排${item.task}训练；
                        `
                    }
                });
                return `
                    ${AnnualStages.orgCategory}${AnnualStages.majors[0] && '、'+AnnualStages.majors[0]||''}：${str}
                `
            }
        }
    }
</script>

<style scoped lang="scss">
    table{
        border-color: #666;
        border-collapse: collapse;
        width: 100%;
        height: 100%;
        text-align: center;
        vertical-align: center;
        border-width:0;
        border-style:hidden;
        color: #606266;
        /*table-layout:fixed;*/
        font-size: 12px;
        th{
            height: 30px;
        }
        td{
            /*height: 30px;*/
            word-break: break-all;
            word-wrap:break-word;
            line-height: 1.5;
            text-align: left;
            .can-edit1{
                position: relative;
                box-sizing: border-box;
                line-height: 30px;
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
            .can-edit{
                position: relative;
                box-sizing: border-box;
                line-height: 30px;
                overflow: hidden;
                top: 0;
                right: 0;
                background: #fff;
                z-index: 3;
                height: 100%;
                width: 100%;
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
            .edit-btn{
                display: none;
                font-size: 24px;
                position: absolute;
                background: #fff;
                right: 0;
                top:50%;
                padding: 4px;
                transform: translateY(-50%);
                a{
                    display: block;
                }
            }
            &.edit-content{
                position: relative;
                &:hover{
                    cursor: pointer;
                    .edit-btn{
                        display: block;
                    }
                }
            }
        }
    }
    .popover-one{
        margin-top: 20px;
        display: flex;
    }
    .popover-two{
        display: flex;
        justify-content: space-between;
        margin-top: 12px
    }
    .AnnualPlan{
        height: 100%;
        .body{
            height: 100%;
            .body-title{
                .title-text{
                    font-size: 24px;
                    text-align: center;
                    position: relative;
                    color: #303133;
                    padding: 10px 0;
                    background: #fff;
                    font-family: FZXBSJW;
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

                height: 100%;
                .content-describe{
                    display: flex;
                    justify-content: space-between;
                    line-height: 36px;
                }
                .content-table{
                    border: 2px solid #000;
                    min-width: 1350px;
                    min-height: 700px;
                }
            }
        }
    }
</style>
