<template>
    <div class="AnnualPlan">
        <div class="body" v-if="tableData && tableData.annualStages">
            <div class="body-title">
                <div class="title-text">
                    <input v-if="patternIsEdit" class="input-edit" type="text" v-model="tableData.name">
                    <span v-else>{{tableData.name}}</span>
                    <div class="text-btns">
                        <div>
                            <el-button type="danger" v-if="$route.path === '/TableVue'" class="print-hidden" @click="$window.print()" size="mini" plain title="打印">打印</el-button>
                            <el-button type="primary" v-if="!patternIsEdit && $route.path !== '/TableVue'" class="print-hidden" @click="$units.showTable(tableData,'AnnualPlanSummary')" size="mini" plain title="新窗口打开">新窗口打开（打印）</el-button>
                        </div>
                        <slot name="handle"> </slot>
                    </div>
                </div>
            </div>
            <div class="content-table">
                <table cellspacing="0" cellpadding="0" border="1" style="min-height: 700px" class="print-portrait-height">
                    <tr>
                        <th>参训兵力</th>
                        <th colspan="5">训练阶段起止时间</th>
                        <th>训练内容</th>
                        <th>重要训练活动</th>
                        <th>质量指标</th>
                        <th>措施与要求</th>
                    </tr>
                    <tr>
                        <td :rowspan="comRowLength" :class="{'td-zindex':patternIsEdit}">
                            <textarea v-if="patternIsEdit" v-model="tableData.personReqs"></textarea>
                            <p v-else class="wrap max-heigth" v-html="handleStr(tableData.personReqs)"></p>
                        </td>
                        <td colspan="5" class="td-zindex" :class="{'edit-content':tableData.state === 0}">
                            <span v-if="tableData.annualStages">{{tableData.annualStages[0]|filterAnnualStages}}</span>
                            <div class="edit-btn" v-if="!isSubmit && !noEdit">
                                <a class="el-icon-close" @click="deleteAnnualStages(0)" title="删除"></a>
                                <a class="el-icon-edit-outline" @click="editAnnualStages(0)" title="编辑"></a>
                            </div>
                        </td>

                        <td :rowspan="comRowLength" :class="{'td-zindex':patternIsEdit}">
                            <textarea v-if="patternIsEdit" v-model="tableData.trainContents"></textarea>
                            <p v-else class="wrap max-heigth" v-html="handleStr(tableData.trainContents)"></p>
                        </td>
                        <td :rowspan="comRowLength" :class="{'td-zindex':patternIsEdit}">
                            <textarea v-if="patternIsEdit" v-model="tableData.activities"></textarea>
                            <p v-else class="wrap max-heigth" v-html="handleStr(tableData.activities)"></p>
                        </td>
                        <td :rowspan="comRowLength" :class="{'td-zindex':patternIsEdit}">
                            <textarea v-if="patternIsEdit" v-model="tableData.scoreReqs"></textarea>
                            <p v-else class="wrap max-heigth" v-html="handleStr(tableData.scoreReqs)"></p>
                        </td>
                        <td :rowspan="comRowLength" :class="{'td-zindex':patternIsEdit}">
                            <textarea v-if="patternIsEdit" v-model="tableData.methods"></textarea>
                            <p v-else class="wrap max-heigth" v-html="handleStr(tableData.methods)"></p>
                        </td>
                    </tr>
                    <tr v-for="(annualStage,index) in tableData.annualStages" v-if="index>0">
                        <td colspan="5" class="td-zindex" :class="{'edit-content':tableData.state === 0}">
                            <span v-if="tableData.annualStages">{{annualStage|filterAnnualStages}}</span>
                            <div class="edit-btn" v-if="!isSubmit && !noEdit">
                                <a class="el-icon-close" @click="deleteAnnualStages(index)" title="删除"></a>
                                <a class="el-icon-edit-outline" @click="editAnnualStages(index)" title="编辑"></a>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="tableData.annualStages.length < 12"  v-for="index in Math.abs(12-tableData.annualStages.length)">
                        <td colspan="5"></td>
                    </tr>
                </table>
            </div>
        </div>
        <transition name="el-zoom-in-center">
            <slot name="model"> </slot>
        </transition>
        <el-dialog
            :append-to-body="true"
            :close-on-click-modal="false"
            :visible.sync="dialogVisible">
            <div slot="title" class="print-hidden">添加训练阶段计划</div>
            <FormStagePlan
                ref="formStagePlan"
                :year="tableData"
                :formData="formData"
                :editing="editing"
                @saveEdit="saveEdit">
            </FormStagePlan>
        </el-dialog>

    </div>
</template>

<script>
    import _ from 'lodash'
    import moment from 'moment'
    import FormStagePlan from 'src/pages/common/forms/FormStagePlan'
    import {handleStr,confirm,deleteItem} from 'src/config/units'
    export default {
        components:{
            FormStagePlan
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
            },
            comRowLength(){
                if(!this.tableData.annualStages[0])return 13;
                return this.tableData.annualStages.length <= 11 ? 12 : this.tableData.annualStages.length
            },
            noEdit(){
                return this.$route.meta.noEdit
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
            saveEdit({formData,isNoAdd}){
                //this.$emit('saveEdit',arguments[0]);
                isNoAdd === 1 && (this.tableData.annualStages = [...this.tableData.annualStages,formData]);
                this.dialogVisible=false;
                //this.initFormData();
            },
            editAnnualStages(index){
                this.dialogVisible = true;
                this.editing = true;
                const formData = _.cloneDeep(this.tableData.annualStages[index]);
                //if(formData.majors) formData.majors = formData.majors.split(',');
                // formData.stages = formData.stages.map(item=>{
                //     item.dateArr = [new Date(item.fromDate),new Date(item.toDate)];
                //     return item
                // });
                const arr = formData.stages;
                formData.stages.push({
                    fromDate: moment(arr[arr.length-1].toDate).add(1, 'days').toDate(),
                    toDate: '',
                    task: '',
                });
                this.formData = formData;
            },
            initFormData(){
                this.$refs.formStagePlan && (this.$refs.formStagePlan.TrainStageTime = undefined);
                this.formData = {
                    orgCategory: '',                              // 单位分类（选填）
                    majors: '',                                   // 专业区分
                    stages: []
                }
            },
        },
        filters:{
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
                const str2 = AnnualStages.majors.toString();
                return `
                    ${AnnualStages.orgCategory}：${str2?str2+';':''}${str}
                `
            }
        }
    }
</script>

<style scoped lang="scss">

    @import "./common.scss";
    .edit-content{
        position: relative;
        &:hover{
            cursor: pointer;
            .edit-btn{
                display: block;
            }
        }
        .edit-btn{
            display: none;
            font-size: 24px;
            position: absolute;
            right: 0;
            top:50%;
            padding: 4px;
            transform: translateY(-50%);
            a{
                display: block;
                color: red;
                background: #fff;
                border: 1px solid #ccc;
            }
        }
    }
    /*table{
        border-color: #666;
        border-collapse: collapse;
        width: 100%;
        height: 100%;
        text-align: center;
        vertical-align: center;
        border-width:0;
        border-style:hidden;
        color: #606266;
        table-layout:fixed;
        font-size: 12px;
        th{
            height: 30px;
        }
        td{
            height: 30px;
            word-break: break-all;
            word-wrap:break-word;
            line-height: 1.5;
            text-align: left;
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
                    letter-spacing:3px;
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
                border: 2px solid #000;
                height: 100%;
            }
        }
    }*/
</style>
