<template>
    <div class="TrainerLevel">
        <el-form inline :model="formData" ref="ruleform" :rules="rules" class="formData" v-show="wrapperVisible" label-width="100px">
            <el-form-item label="大纲标准"  prop="standard">
                <el-select v-model="formData.standard" placeholder="请选择大纲标准">
                    <el-option
                        v-for="item in selectStandard"
                        :key="item.name"
                        :label="item.name"
                        :value="item.objectId">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="单位分类"  prop="orgCategories" >
                <el-select filterable multiple v-model="formData.orgCategories" placeholder="请选择适用单位分类,多选" >
                    <el-option
                        v-for="item in selectOrgCategories"
                        :key="item"
                        :label="item"
                        :value="item">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="专业类型"  prop="majorReq">
                <el-select filterable multiple clearable v-model="formData.majorReq" placeholder="选择专业类型，无数据，可不选">
                    <el-option
                        v-for="(value,index) in selectMajors"
                        :key="index"
                        :label="value"
                        :value="value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item :label="handlertask(item,index)" v-for="(item,index) in selectTask" :key="index" >
                <el-input v-model="(formData.stageTime[index]||{}).time" min="1" max="12">
                    <template slot="append">月</template>
                </el-input>
            </el-form-item>

            <el-form-item>
                <el-button :type="btnState?'primary':'warning'" @click="onSubmit('ruleform')">{{btnState?'添加':'修改'}}</el-button>
            </el-form-item>
        </el-form>

        <el-table
            :data="tableData"
            border
            :max-height="maxTableHegith"
            style="width: 100%">
            <el-table-column
                :show-overflow-tooltip="true"
                label="大纲标准" width="110">
                <template slot-scope="scope">
                    <span>{{ scope.row.standard.name || '已停用'}}</span>
                </template>
            </el-table-column>

            <el-table-column
                label="适用单位分类">
                <template slot-scope="scope">
                    <div slot="reference" class="describe-wrapper">
                        {{scope.row.orgCategories.toString()   }}    <span style="color:blue">{{ scope.row.majorReq.toString()}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="任务训练时长信息">
                <template slot-scope="scope">
                    <div slot="reference" class="describe-wrapper">
                        {{scope.row.stageTime.map(task=>task.task+" :需"+task.time+'个月 \n').toString()}}
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="操作" align="right" width="150">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagination
            :total="pageConfig.total"
            :page-size="pageConfig.pageSize"
            :page-sizes="pageConfig.pageSizes"
            @sizeChange="changePage"
            @currentChange="changePage"
            :current-page="pageConfig.currentPage"></Pagination>
        <div class="shadeBox" :class="{'shadeBox-wrapper':wrapperVisible}" @click="closeModal"></div>
    </div>
</template>

<script>
// 训练阶段时长
// const TrainStageTimeSchema = Schema({
// 	standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 训练大纲
//  orgCategories: [String],                        // 课目适用的单位分类列表,一般是一个
// 	majorReq: [String],                             // 专业类型要求
//  stageTime: [{task:[""], time:[0]}],
// });

    import {handle} from 'src/config/mixin'
    export default {
        mixins:[handle],
        data() {
            return {
                rules:{
                    standard:[
                        { required: true, message: '请选择大纲标准',},
                    ],
                },
                disabled:true,
                selectStandard:[],
                selectOrgCategories:[],
                selectTask:[],
                selectMajors:[],
                selectSection:[],
                selectShow:false,
                stageTime:[],
            }
        },
        watch:{
            'formData.orgCategories':{
                handler(value){
                    if(!value || !value.length)return
                    this.selectChanged(value,['OrgCategory','name'],this.handleOrgTypeResult);
                },
                deep:true
            },
        },
        computed:{

        },
        created(){
            this.triggerSelect('TrainStandard').then(result=>{
                this.selectStandard = result.list;
                this.curStandard();
            });

            this.triggerSelect('OrgCategory').then(result=>{
                let orgCategories=[];
                result.list.forEach(function(v){
                    if(((v.orgType).indexOf('分队') > -1))
                    {
                        orgCategories.push(v.name) ;
                    }
                });
                this.selectOrgCategories = orgCategories;
            });
        },
        methods: {
            handlertask(item,index){
                let str = item.name+"训练";
                if(this.formData.stageTime[index]){
                    this.formData.stageTime[index].task = (item.name+"训练");
                }

                return str.length>5 ? str.slice(0,5)+'...' : str
            },


            handleOrgTypeResult(result){
                console.log(result);
                const res = result.list[0];

                this.selectMajors = res.optionalMajors;

                this.selectTask = res.optionalTasks;
                this.selectTask.forEach((item,index) => this.$set(this.formData.stageTime,index,{task:item.name, time:0}));
            },

            filterValueIsChange(equalObject, num){
                (!equalObject.length && num === -1) && (this.search.value = '');
                equalObject = !equalObject.length? undefined : equalObject ;
                this.equalObject = equalObject;
                this.changePage(0);
            },
            querySearchAsync(string){
                this.search.key = 'name';
                this.search.value = string;
                this.equalObject = undefined;
                this.changePage(0);
            },
            initFormData(){
                this.formData = {
                    standard: '',
                    orgCategories:[],
                    majorReq:[],
                    stageTime:[],

                };
            },
        }
    }
</script>

<style scoped>

    .formData{
        display: flex;
        justify-content: space-between;
        flex-flow: wrap
    }
</style>
