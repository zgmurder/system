<!--
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
                <el-input v-model="(formData.stageTime[index]||{}).time" min="1" max="12" style="width: 217px">
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
                // let str = item.name+"训练";
                // if(this.formData.stageTime[index]){
                //     this.formData.stageTime[index].task = (item.name+"训练");
                // }
                //
                //return str.length>5 ? str.slice(0,5)+'...' : str
                let str = item.name;
                if(this.formData.stageTime[index]){
                    this.formData.stageTime[index].task = item.name;
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
-->
<template>
    <div class="property">
        <formAndTable :schema="schema" :columns="columns" > </formAndTable>
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
    import formAndTable from '@/pages/common/new-com-formAndTable'
    import {OrgType,PersonProperty} from '@/lib/Constants'
    export default {
        components: {
            formAndTable,
        },
        data() {
            return {
                columns: [
                    {prop: 'orgCategories', label: '单位分类',handleValue:value=>value.join('、')},
                    {prop: 'majorReq',width:'180', label: '专业类型',handleValue:value=>value.join('、')},
                    {prop: 'stageTime', label: '任务训练时长信息',handleValue:value=>value.map(item=>`${item.task}训练：需${item.time}个月`).join('；')},
                ],
                schema: [
                    {fieldType: "input", placeholder: "训练大纲", label: "训练大纲", _name: "standard", standard: '',disabled:true},
                    {fieldType: "select",width:'100%', placeholder: "适用的单位分类", label: "单位分类", _name: "orgCategories",multiple:true, orgCategories: [],options:[],},
                    {fieldType: "select",width:'100%', placeholder: "专业类型", label: "专业类型", _name: "majorReq",multiple:true, majorReq: [],options:[],},
                    {fieldType: "select",width:'100%', placeholder: "选择任务", label: "选择任务", _name: "stageTime",multiple:true, stageTime: [],options:[],},


                    //{fieldType: "input", placeholder: "分册名称", label: "分册名称", _name: "orgCategories", orgCategories: ''},
                    //{fieldType: "input", placeholder: "分册编码", label: "分册编码", _name: "code", code: ''},
                    //{fieldType: "select",width:'50%', placeholder: "适用的单位类型", label: "单位类型", _name: "orgTypes",multiple:true,orgTypes: [],options:Object.values(OrgType)},
                    //{fieldType: "select",width:'50%', placeholder: "适用的人员属性", label: "人员属性", _name: "personProperties", personProperties:[],multiple:true,options:PersonProperty},
                ]
            }
        },
        async created(){
            this._orgCategoriesOptions = (await this.$backendService.queryListByKeyValue('OrgCategory')).list;
            this.schemaOrgCategories.options = this._orgCategoriesOptions.map(item=>item.name);
            this.schema[0].standard = this.$parent.standard.name;
            this._schemaLength = this.schema.length;
            this._editTimeArr = [];
        },
        watch:{
             'schemaOrgCategories.orgCategories':{
                 handler(newValue){
                     let majorArr = [],taskArr = [];
                     newValue.forEach(orgCategory=>{
                        const found = this._orgCategoriesOptions.find(item=>item.name === orgCategory);
                        if(!found)return;
                         majorArr = [...majorArr,...found.optionalMajors];
                         taskArr = [...taskArr,...found.optionalTasks];
                     });
                     this.schemaMajorReq.options = this.$units._uniq(majorArr);
                     this.schemaStageTime.options = this.$units._uniq(taskArr.map(item=>item.name));
                     //this._editTimeArr = [];
                 }
             },
             'schemaStageTime.stageTime':{
                 handler(newValue){
                     if(JSON.stringify(newValue)=== this._newValue || !newValue)return;
                     this._newValue = JSON.stringify(newValue);
                     const oldArr = this.schema.splice(this._schemaLength,this.schema.length-this._schemaLength);
                     newValue.forEach((item,index)=>{
                         this.$set(this.schema,this.schema.length,
                             {fieldType: "input-number", placeholder: "训练时长", label: item, _name: "time_"+index, ["time_"+index]:this._editTimeArr[index]||(oldArr[index]?oldArr[index]["time_"+index]:0),}
                         )
                     });
                 }
             }
        },
        computed:{
            schemaOrgCategories(){
                return this.schema.find(item=>item._name === 'orgCategories')
            },
            schemaMajorReq(){
                return this.schema.find(item=>item._name === 'majorReq')
            },
            schemaStageTime(){
                return this.schema.find(item=>item._name === 'stageTime')
            },
        },
        methods:{
            beforeSubmit(target) {
                target.standard = this.$parent.standard.objectId;
                target.stageTime = target.stageTime.map((item,index)=>{
                    const obj = {task:item,time:target[`time_${index}`]};
                    delete target[`time_${index}`];
                    return obj
                });
            },
            beforeEdit(target){
                this._editTimeArr = [];
                target.standard = this.$parent.standard.name;
                target.stageTime = target.stageTime.map(item=>{
                    this._editTimeArr.push(item.time);
                    return item.task
                });
            },
        }
    }
</script>
