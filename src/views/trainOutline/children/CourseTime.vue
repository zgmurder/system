<!--
<template>
    <div class="TrainerLevel">
        <el-form inline :model="formData" ref="ruleform" :rules="rules" class="formData" v-show="wrapperVisible" label-width="100px">
            <el-form-item label="大纲标准"  prop="standard">
                <el-select clearable v-model="formData.standard" placeholder="请选择大纲标准" @change="formData.section = ''">
                    <el-option
                        v-for="item in selectStandard"
                        :key="item.name"
                        :label="item.name"
                        :value="item.objectId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="大纲分册"  prop="section">
                <el-select filterable clearable v-model="formData.section" placeholder="请选择大纲分册">
                    <el-option
                        v-for="item in selectSection"
                        :key="item.name"
                        :label="item.name"
                        :value="item.objectId">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="训练课目"  prop="courses">
                <el-select filterable multiple v-model="formData.courses" placeholder="请选择训练课目">
                    <el-option
                        v-for="item in selectCourse"
                        :key="item.name"
                        :label="item.name"
                        :value="item.objectId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="人员类型"  prop="personProperties">
                <el-select filterable multiple v-model="formData.personProperties" placeholder="请选择适用人员类型">
                    <el-option
                        v-for="item in selectPersonProperties"
                        :key="item"
                        :label="item"
                        :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="单位分类"  prop="orgCategories">
                <el-select filterable multiple v-model="formData.orgCategories" placeholder="请选择适用单位">
                    <el-option
                        v-for="item in selectOrgCategories"
                        :key="item"
                        :label="item"
                        :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="勤务类型"  prop="serviceReq">
                <el-select filterable multiple v-model="formData.serviceReq" placeholder="无" disabled>

                </el-select>
            </el-form-item>
            <el-form-item label="任务类型"  prop="tasks">
                <el-select filterable multiple v-model="formData.tasks" placeholder="无">
                    <el-option
                        v-for="item in selectTasks"
                        :key="item"
                        :label="item"
                        :value="item">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="专业类型"  prop="tasks">
                <el-select filterable clearable v-model="formData.major" placeholder="无">
                    <el-option
                        v-for="item in selectMajors"
                        :key="item"
                        :label="item"
                        :value="item">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="昼训时间/时"  prop="hoursInDay">
                <el-input-number v-model="formData.hoursInDay" style="width: 217px" :min="0"></el-input-number>
            </el-form-item>

            <el-form-item label="夜训时间/时"  prop="hoursAtNight">
                <el-input-number v-model="formData.hoursAtNight" style="width: 217px" :min="0"></el-input-number>
            </el-form-item>

            <el-form-item>
                <el-button :type="btnState?'primary':'warning'" @click="onSubmit('ruleform')">{{btnState?'添加':'修改'}}</el-button>
            </el-form-item>
        </el-form>
        <Filters :props="[Standard,Section,OrgCategories,PersonProperty,ServiceReq,Task]" placeholder="输入课目名称，将自动搜索" @filterValueIsChange="filterValueIsChange" @querySearchAsync="querySearchAsync"></Filters>
        <el-table
            :data="tableData"
            border
            :max-height="maxTableHegith"
            style="width: 100%">

            <el-table-column
                :show-overflow-tooltip="true"
                label="大纲标准" width="150">
                <template slot-scope="scope">
                    <span>{{ scope.row.standard && scope.row.standard.name || '已停用'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                width="150"
                label="分册名称">
                <template slot-scope="scope">
                    <span>{{ scope.row.section && scope.row.section.name }}</span>
                </template>
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                label="训练课目" width="300">
                <template slot-scope="scope">
                    <span>{{ scope.row.courses | makeCourseName }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="适用单位分类">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.orgCategories.length"
                            v-for="(item,index) in scope.row.orgCategories"
                            size="mini"
                            :key="index"
                            type="danger">
                        {{item}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                label="适用人员类型" width="150">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.personProperties.length"
                            v-for="(item,index) in scope.row.personProperties"
                            size="mini"
                            :key="index"
                            type="info">
                        {{item}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                label="勤务类型" width="110">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.serviceReq && scope.row.serviceReq.length"
                            v-for="(item,index) in scope.row.serviceReq"
                            size="mini"
                            :key="index"
                            type="info">
                        {{item}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                label="任务类型" width="110">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.tasks && scope.row.tasks.length"
                            v-for="(item,index) in scope.row.tasks"
                            size="mini"
                            :key="index"
                            type="info">
                        {{item}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                label="专业类型" width="110">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.major"
                            size="mini"
                            :key="index"
                            type="info">
                        {{scope.row.major}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                label="昼训时间" width="80">
                <template slot-scope="scope">
                    <span>{{ scope.row.hoursInDay}}小时</span>
                </template>
            </el-table-column>
            <el-table-column
                label="夜训时间" width="80">
                <template slot-scope="scope">
                    <span>{{ scope.row.hoursAtNight}}小时</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="right" width="150">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.row,handleEditCallback)">编辑</el-button>
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

    // 课目时间表
    // const CourseTimeSchema = new Schema({
    //  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],    // 训练课目
    //  standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 训练大纲
    //  section: { type: Schema.Types.ObjectId, ref: 'TrainSection' },    // 训练大纲
    //  orgCategories: [String],                        // 课目适用的单位分类列表
    //  personProperties: [String],                     // 课目适用的人员属性列表,一般是一个
    //  serviceReq: String,                             // 勤务类型
    //  task: String,                                   // 训练任务(可选)
    //  hoursInDay: Number,                             // 昼训时间要求
    //  hoursAtNight: Number,                           // 夜训时间要求
    // });
    import _ from 'lodash'
    import {OrgType,PersonProperty} from 'src/lib/Constants'
    import courseUtils from 'src/lib/utils/courseUtils'
    import {handle} from 'src/config/mixin'
    import Filters from 'src/pages/common/Filters.vue'
    import Client from 'src/lib/Client'
    export default {
        mixins:[handle],
        components:{
            Filters
        },
        data() {
            return {
                selectOrgType:OrgType,
                selectPersonType:PersonProperty,
                rules:{
                    standard:[
                        { required: true, message: '请选择训练大纲', trigger: 'blur' },
                    ],
                    section:[
                        { required: true, message: '请选择分册', trigger: 'blur' },
                    ],
                    courses:[
                        { required: true, message: '请选择训练课目', trigger: 'blur' },
                    ],
                },
                selectStandard:[],
                selectCourse:[],
                selectOrgCategories: [],
                selectPersonProperties: [],
                selectTasks: [],
                selectMajors: [],
                Standard:{selects: undefined, value:'', valueKey:'objectId', textValue: true, placeholder: '训练大纲', equalObject: {className:'CourseTime',name:'standard'}},
                Section: {selects: undefined, value:'', valueKey:'objectId', textValue: true, placeholder: '大纲分册', equalObject: {className:'CourseTime',name:'section'}},
                OrgCategories: {selects: undefined, value:'', placeholder: '单位分类', equalObject: {className:'CourseTime',name:'orgCategories'}},
                Task: {selects: undefined, value:'', placeholder: '训练任务', equalObject: {className:'CourseTime',name:'tasks'}},
                ServiceReq: {selects: undefined, value:'', placeholder: '勤务类型', equalObject: {className:'CourseTime',name:'serviceReq'}},
                PersonProperty:{selects:PersonProperty,value:'',placeholder:'人员属性',equalObject:{className:'CourseTime',name:'personProperties'}},
                equalObject: undefined,
                search: {
                    key: '',
                    value: ''
                },
            }
        },
        created(){
            this.triggerSelect('TrainStandard').then(result=>{
                this.curStandard();
                this.Standard.selects = result.list;
                this.selectStandard = result.list;
            });
            this.triggerSelect('TrainSection').then(result=>{
                this.Section.selects = result.list;
            })
        },
        watch:{
            'formData.section'(newVal,oldVal){
                if (!newVal || newVal.length === 0) return;
                const parseObj = this.getObject('TrainSection', newVal);
                this.selectChanged(parseObj,['Course','section'],this.handleSectionResult);
            },
            'formData.courses'(newVal,oldVal){
                if (!newVal) return;
                if (_.isEqual(newVal, oldVal)) return;
                if (newVal.length > 0) {
                    const obj = this.selectCourse.find(item=>newVal[0] === item.objectId);
                    if (!this.firstFlag) {
                        this.formData.tasks = _.isEmpty(obj.tasks)?[]:obj.tasks;
                        this.formData.serviceReq = obj.serviceReq || [];
                        this.formData.personProperties = obj.personProperties;
                        this.formData.orgCategories = obj.orgCategories;
                        this.formData.major = obj.majorReq;
                    }

                    this.selectOrgCategories = [...obj.orgCategories];
                    this.selectPersonProperties = [...obj.personProperties];
                } else {
                    if (!this.firstFlag) {
                        this.formData.tasks = [];
                        this.formData.serviceReq = [];
                        this.formData.personProperties = [];
                        this.formData.orgCategories = [];
                        this.formData.major = undefined;
                    }

                    this.selectOrgCategories = [];
                    this.selectPersonProperties = [];
                }

                this.firstFlag = false;
            },
            'formData.orgCategories'(newVal,oldVal) {
                if (!newVal || newVal.length === 0) return;
                this.selectChanged(newVal[0],['OrgCategory','name'],this.handleOrgCategoryResult);
            }
        },
        filters: {
            makeCourseName(courses) {
                if (_.isEmpty(courses)) return '';
                let courseName = '';

                courseName = courses.reduce((prev, curr) => {
                    return prev.length>0?`${prev}; ${curr.seq}. ${curr.name}`:`${curr.seq}. ${curr.name}`
                }, courseName);

                return courseName;
            }
        },
        methods: {
            handleQuery(filterObj,className = this.className) {
                this.clearFilterOptions(filterObj);
                if(!filterObj)return this.query(className);
                let [parentQuery, childQuery, childName] = [];
                filterObj.map(item=>{
                    parentQuery = parentQuery || this.query(item.className);
                    if (item.name === 'standard'){
                        let parseStandard = new Client.TrainStandard();
                        parseStandard.id = item.value;
                        parentQuery.equalTo(item.name,parseStandard);
                    } else if (item.name === 'section'){
                        let parseSection = new Client.TrainSection();
                        parseSection.id = item.value;
                        parentQuery.equalTo(item.name,parseSection);
                        this.selectChanged(item.value,['TrainSection'],this.handleFilterSectionResult);
                    } else if (item.name === 'orgCategories'){
                        parentQuery.equalTo(item.name,item.value);
                        this.selectChanged(item.value,['OrgCategory','name'],this.handleFilterCategoryResult);
                    } else {
                        parentQuery.equalTo(item.name,item.value);
                    }
                });
                parentQuery = parentQuery || this.query(className);
                childQuery && parentQuery.matchesQuery(childName.toLowerCase(), childQuery);
                parentQuery.addAscending('createdAt');
                return parentQuery;
            },
            querySearchAsync(string){
                this.search.key = 'name';
                this.search.value = string;
                this.equalObject = undefined;
                this.changePage(0);
            },
            async changePage(curPage,pageSize){
                let query = this.handleQuery(this.equalObject);
                if (this.search.value&&this.search.value.length>0) {
                    let courseQuery = this.query('TrainCourse');
                    courseQuery.contains(this.search.key,this.search.value);
                    query.matchesQuery('courses', courseQuery);
                }
                query.skip(curPage).limit(pageSize||this.pageConfig.pageSize);
                const result = await this.queryList(this.className,query);
                this.pageConfig.total = result.total;
                this.tableData = result.list;
                return result;
            },
            filterValueIsChange(equalObject, num){
                (!equalObject.length && num === -1) && (this.search.value = '');
                equalObject = !equalObject.length? undefined : equalObject ;
                this.equalObject = equalObject;
                this.changePage(0);
            },
            handleFilterOrgTypeResult(result) {
                this.OrgCategories.selects = _.intersection(result.list.map(item=>item.name), this.optionalFilterOrgCategories);
            },
            handleFilterSectionResult(result) {
                this.selectFilterOrgType = result.list[0].orgTypes;
                this.optionalFilterOrgCategories = result.list[0].orgCategories;
                this.selectChanged(this.selectFilterOrgType[0],['OrgCategory','orgType'],this.handleFilterOrgTypeResult);
            },
            handleFilterCategoryResult(result) {
                let Tasks = [],Services = [],Majors = [];
                result.list.map(item =>{
                    Tasks = Tasks.concat(item.optionalTasks);
                    Services = Services.concat(item.optionalServices||[]);
                    Majors = Majors.concat(item.optionalMajors)
                });
                Tasks = Tasks.map(item =>{
                    return item.name
                });
                this.Task.selects = [...new Set(Tasks)];
                this.ServiceReq.selects = [...new Set(Services)];
            },
            clearFilterOptions(filterObj) {
                if (!filterObj || filterObj.findIndex(item => item.name === 'section') < 0) {
                    this.OrgCategories.selects = undefined;
                    this.OrgCategories.value = '';
                    this.Task.selects = undefined;
                    this.Task.value = '';
                    this.ServiceReq.selects = undefined;
                    this.ServiceReq.value = '';
                    _.remove(filterObj, (item) => item.name === 'orgCategories');
                    _.remove(filterObj, (item) => item.name === 'task');
                    _.remove(filterObj, (item) => item.name === 'serviceReq');
                } else if (filterObj.findIndex(item => item.name === 'orgCategories') < 0) {
                    this.Task.selects = undefined;
                    this.Task.value = '';
                    this.ServiceReq.selects = undefined;
                    this.ServiceReq.value = '';
                    _.remove(filterObj, (item) => item.name === 'task');
                    _.remove(filterObj, (item) => item.name === 'serviceReq');
                }
            },
            handleEditCallback(row){
                this.firstFlag = true;
                this.formData = {
                    ...row,
                    courses: (row.courses && row.courses.map(item => item.objectId)) || [],
                    section: row.section && row.section.objectId,
                    standard: row.standard && row.standard.objectId
                };
                if (row.courses && row.courses.length > 0) {
                    this.selectOrgCategories = [...row.courses[0].orgCategories];
                    this.selectPersonProperties = [...row.courses[0].personProperties];
                }

            },
            handleSectionResult(result){
                this.selectCourse = result.list.map(item =>{
                    return {
                        objectId: item.objectId,
                        seq: item.seq,
                        name: courseUtils.makeupCourseName(item),
                        orgCategories: item.orgCategories || [],
                        personProperties: item.personProperties || [],
                        tasks: item.tasks,
                        serviceReq: item.serviceReq || [],
                        majorReq: item.majorReq
                    }
                });
            },
            handleOrgCategoryResult(result){
                if (result.list && result.list.length > 0) {
                    this.selectTasks = result.list[0].optionalTasks.map(item => item.name);
                    this.selectMajors = result.list[0].optionalMajors||[];
                } else {
                    this.selectTasks = [];
                    this.selectMajors = [];
                }
            },
            initFormData() {
                this.formData = {
                    courses: [],             // 训练课目
                    standard: '',          // 训练大纲
                    section: '',           // 训练分册
                    orgCategories: [],     // 课目适用的单位分类列表
                    personProperties: [],  // 课目适用的人员属性列表,一般是一个
                    tasks: [],
                    serviceReq: '',
                    major: undefined,
                    hoursInDay: 0,         // 昼训时间要求
                    hoursAtNight: 0,       // 夜训时间要求
                }
            }

        }
    }
</script>

<style scoped>
    .formData{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .formData .el-form-item:last-child{
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
</style>
-->
<template>
    <div class="property">
        <formAndTable :schema="schema" :columns="columns" > </formAndTable>

        <el-dialog
            title="查看"
            :append-to-body="true"
            :close-on-click-modal="false"
            width="70%"
            :visible.sync="dialogVisible">
            <new-com-sub-course v-if="dialogVisible" :level="2" :schema="childSchema" :columns="childColumns" :courseData="courseData" > </new-com-sub-course>
            <!--<com-form :schema="schema" :editing="!!objectId" @formFinish="formFinish"> </com-form>-->
        </el-dialog>

    </div>
</template>

<script>
    import formAndTable from '@/pages/common/new-com-formAndTable'
    import newComSubCourse from '@/pages/common/new-com-subCourse'
    import {OrgType,PersonProperty,TrainRequirement,ScoreCriteria2,OrgSequences,TestRequirement} from '@/lib/Constants'
    const ScoreCriteriaOptions = Object.values(ScoreCriteria2).map(item=>item.name);
    const OrgSequenceOptions = Object.values(OrgSequences).map(item=>item.name);
    // 课目时间表
    // const CourseTimeSchema = new Schema({
    //  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],    // 训练课目
    //  standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 训练大纲
    //  section: { type: Schema.Types.ObjectId, ref: 'TrainSection' },    // 训练大纲
    //  orgCategories: [String],                        // 课目适用的单位分类列表
    //  personProperties: [String],                     // 课目适用的人员属性列表,一般是一个
    //  serviceReq: String,                             // 勤务类型
    //  tasks: [String],                                   // 训练任务(可选)
    //  hoursInDay: Number,                             // 昼训时间要求
    //  hoursAtNight: Number,                           // 夜训时间要求
    // });
    export default {
        components: {
            formAndTable,
            newComSubCourse
        },
        data() {
            return {
                columns: [
                    {prop: 'section', label: '大纲分册',handleValue:(value)=>value.name,style:{color:'#67C23A'}},
                    {prop: 'courses', label: '课目名称',style:{color:'#F56C6C'},handleValue:value=>value.map(item=>item.name).join('、')},
                    {prop: 'orgCategories', label: '单位分类',handleValue:value=>value.join('、')},
                    {prop: 'personProperties', label: '人员属性',handleValue:value=>value.join('、')},
                    {prop: 'tasks', label: '对应任务',handleValue:value=>value.join('、')},
                    {prop: 'serviceReq', label: '勤务类型'},
                    {prop: 'hoursInDay', label: '昼训时间',handleValue:value=>`${value}小时`},
                    {prop: 'hoursAtNight', label: '夜训时间',handleValue:value=>`${value}小时`},
                ],
                schema: [
                    {fieldType: "input",width:'50%', placeholder: "训练大纲", label: "训练大纲", _name: "standard", standard: '',disabled:true},
                    {fieldType: "select",width:'50%', placeholder: "大纲分册", label: "大纲分册", _name: "section", section: '',options:[],filterable:true},
                    {fieldType: "select",width:'66%', placeholder: "课目名称", label: "课目名称", _name: "courses", courses: [],multiple:true,options:[]},
                    // {fieldType: "input-number", placeholder: "课目序号", label: "课目序号", _name: "seq", seq: 0},
                    {fieldType: "select", placeholder: "人员属性", label: "人员属性", _name: "personProperties", personProperties: [],multiple:true,options:[],},
                    // {fieldType: "select", placeholder: "单位类型", label: "单位类型", _name: "orgType", orgType: '',options:[],},
                    {fieldType: "select",width:'66%', placeholder: "单位分类", label: "单位分类", _name: "orgCategories", orgCategories: [],multiple:true,options:[],},
                    {fieldType: "select", placeholder: "对应任务（无数据，不可选）", label: "对应任务", _name: "tasks", tasks: [],options:[],disabled:false},
                    {fieldType: "select", placeholder: "对应勤务（无数据，不可选）", label: "对应勤务", _name: "serviceReq", serviceReq: [],multiple:true,options:[],disabled:false},
                    {fieldType: "input-number", placeholder: "昼训时间", label: "昼训时间", _name: "hoursInDay", hoursInDay: 0},
                    {fieldType: "input-number", placeholder: "夜训时间", label: "夜训时间", _name: "hoursInDay", hoursAtNight: 0},

                    // {fieldType: "select", placeholder: "训练要求", label: "训练要求", _name: "require", require:'必训',options:Object.values(TrainRequirement),},
                    // {fieldType: "select", placeholder: "评分标准", label: "评分标准", _name: "scoreCriteria", scoreCriteria:'四级制',options:ScoreCriteriaOptions,},
                    // {fieldType: "select", placeholder: "训练步骤", label: "训练步骤", _name: "trainStep", trainStep:'',options:[],},
                    // {fieldType: "select", placeholder: "训练单元", label: "训练单元", _name: "trainUnits",multiple:true, trainUnits:[],options:OrgSequenceOptions,},
                    //
                    // {fieldType: "select", placeholder: "专业类型（无数据，不可选）", label: "对应专业", _name: "majorReq", majorReq: '',options:[],disabled:false},
                    // {fieldType: "select",width:'50%', placeholder: "场地要求", label: "场地要求", _name: "placeTypes",multiple:true, placeTypes:[],options:[],},
                    //
                    // {fieldType: "select", placeholder: "军械类型", label: "军械类型", _name: "ordnanceTypes",multiple:true, ordnanceTypes:[],options:[],},
                    // {fieldType: "select", placeholder: "枪手类型", label: "枪手类型", _name: "gunnerType", gunnerType:'',options:[],},
                    // {fieldType: "select", placeholder: "军衔要求", label: "军衔要求", _name: "rankL2Reqs",multiple:true, rankL2Reqs:[],options:[],},
                    //
                    // {fieldType: "input",width:'100%', placeholder: "课目条件", label: "课目条件", _name: "textCondition", textCondition: ''},
                    // {fieldType: "input",width:'100%', placeholder: "课目标准", label: "课目标准", _name: "textStandard", textStandard: ''},
                    // {fieldType: "input",width:'100%', placeholder: "考核要求", label: "考核要求", _name: "textEvaluation", textEvaluation: ''},

                ],
                dialogVisible:false,
                courseData:{},
                childSchema:[],
                childColumns:[],
                courseId:'',

            }
        },
        created(){
            this._schemaLength = this.schema.length;
            setTimeout(async ()=>{
                const standardPoint = this.$backendService.getParseObject('TrainStandard',this.$parent.standard.objectId);
                this._sectionOptions = (await this.$units.queryItemByKeyValue('TrainSection','standard',standardPoint)).list;
                this.schemaObj.sectionSchema.options = this._sectionOptions.map(item=>item.name);
                // this.schemaObj.trainStepSchema.options = (await this.$backendService.queryListByKeyValue('TrainStep')).list.map(item=>item.name);
                // this.schemaObj.rankL2ReqsSchema.options = (await this.$backendService.queryListByKeyValue('MilitaryRank')).list.map(item=>item.name);
                // this.schemaObj.ordnanceTypesSchema.options = (await this.$backendService.queryListByKeyValue('OrdnanceType')).list.map(item=>item.name);
                // this.schemaObj.placeTypesSchema.options = (await this.$backendService.queryListByKeyValue('PlaceType')).list.map(item=>item.name);
                // this.schemaObj.gunnerTypeSchema.options = (await this.$backendService.queryListByKeyValue('GunnerType')).list.map(item=>item.name);

            },500);
        },
        watch:{
            'schemaObj.sectionSchema.section':{
                async handler(newValue){
                    if(!newValue){
                        this.schemaObj.orgCategoriesSchema.orgCategories = [];
                        this.schemaObj.personPropertiesSchema.personProperties = [];
                    }else {
                        const selected = this._sectionOptions.find(item=>item.name === newValue);
                        const parseSection = this.$backendService.getParseObject('TrainSection',selected.objectId);
                        this._courses = (await this.$units.queryItemByKeyValue('Course','section',parseSection,['name','tasks','serviceReq'])).list;
                        console.log(this._courses)
                        this.schemaObj.coursesSchema.options = this._courses.map(item=>item.name)
                        this.schemaObj.orgCategoriesSchema.options = selected.orgCategories;
                        this.schemaObj.orgCategoriesSchema.orgCategories = this.$units._cloneDeep(selected.orgCategories);
                        this.schemaObj.personPropertiesSchema.options = selected.personProperties;
                        this.schemaObj.personPropertiesSchema.personProperties = this.$units._cloneDeep(selected.personProperties)
                        // this.schemaObj.orgTypeSchema.options = selected.orgTypes;
                        // selected.orgTypes.length === 1 && (this.schemaObj.orgTypeSchema.orgType = selected.orgTypes[0]);
                        // this.schemaObj.orgCategoriesSchema.options = selected.orgCategories;
                        // selected.orgCategories.length === 1 && (this.schemaObj.orgCategoriesSchema.orgCategories = this.$units._cloneDeep(selected.orgCategories));
                        // this.schemaObj.personPropertiesSchema.options = selected.personProperties;
                        // selected.personProperties.length === 1 && (this.schemaObj.personPropertiesSchema.personProperties = this.$units._cloneDeep(selected.personProperties))
                    }
                    //this._editTimeArr = [];
                },
                isDeep:true,
            },
            'schemaObj.coursesSchema.courses':{
                handler(newValue){
                    if(newValue.length){
                        const selected = this._courses.find(item=>item.name === newValue[0]);
                        this.schemaObj.tasksSchema.tasks = selected.tasks;
                        this.schemaObj.tasksSchema.disabled = !this.schemaObj.tasksSchema.options.length;
                        this.schemaObj.serviceReqSchema.options = selected.serviceReq;
                        selected.serviceReq.length === 1 && (this.schemaObj.serviceReqSchema.serviceReq = selected.serviceReq[0]);
                        this.schemaObj.serviceReqSchema.disabled = !this.schemaObj.serviceReqSchema.options.length;
                        // newValue.forEach(async orgCategory =>{
                        //     const result = (await this.$units.queryItemByKeyValue('OrgCategory','name',orgCategory)).list[0];
                        //     const majorArr = [...this.schemaObj.majorReqSchema.options,...result.optionalMajors];
                        //     this.schemaObj.majorReqSchema.options = this.$units._uniq(majorArr);
                        //     this.schemaObj.majorReqSchema.disabled = !this.schemaObj.majorReqSchema.options.length;
                        //     const tasksArr = [...this.schemaObj.tasksSchema.options,...result.optionalTasks.map(item=>item.name)];
                        //     this.schemaObj.tasksSchema.options = this.$units._uniq(tasksArr);
                        //     this.schemaObj.tasksSchema.disabled = !this.schemaObj.tasksSchema.options.length;
                        //     const serviceReqArr = [...this.schemaObj.serviceReqSchema.options,...result.optionalServices];
                        //     this.schemaObj.serviceReqSchema.options = this.$units._uniq(serviceReqArr);
                        //     this.schemaObj.serviceReqSchema.disabled = !this.schemaObj.serviceReqSchema.options.length;
                        // });
                    }else {
                        // this.schemaObj.tasksSchema.disabled = false;
                        // this.schemaObj.majorReqSchema.disabled = false;
                        // this.schemaObj.serviceReqSchema.disabled = false;
                    }
                },
                isDeep:true
            },
        },
        computed:{
            schemaObj(){
                return this.schema.reduce((prev,curr)=>{
                    prev[`${curr._name}Schema`] = curr;
                    return prev
                },{});
            }
        },
        methods:{
            beforeSubmit(target) {
                target.standard = this.$parent.standard.objectId;
                target.section = this._sectionOptions.find(item=>item.name === target.section).objectId;
            },
            beforeEdit(target){
                target.standard = this.$parent.standard.name;
                target.section = target.section.name;
            },
            handleSubCourse(scope){
                this.dialogVisible = true;
                const rootData = scope.row;
                this.courseData = {
                    rootData:rootData,
                    resourceData:rootData.subcourses,
                    type:'subcourses',
                    level:1
                };
                this.childSchema = [
                    {fieldType: "input-number", placeholder: "课目序号", label: "课目序号", _name: "seq", seq: 1,},
                    {fieldType: "input", placeholder: "课目名称", label: "课目名称", _name: "name", name: '',},
                    {fieldType: "select", placeholder: "训练要求", label: "训练要求", _name: "require", require:'必训',options:Object.values(TrainRequirement),},
                ];
                this.childColumns = [
                    {prop: 'name', label: '子课目名称',style:{color:'#F56C6C'}},
                    {prop: 'require', label: '训练要求'},
                    {prop: 'seq', label: '课目序号'},
                    {prop: 'subcourses', label: '子课目',
                        handleValue:value=>'点击查看',style:{color:'#F56C6C',cursor: 'pointer'}},
                ]
            },
            handleContents(scope){
                this.dialogVisible = true;
                const rootData = scope.row;
                this.courseData = {
                    rootData,
                    resourceData:rootData.testContents,
                    type:'testContents',
                    level:1
                };
                this.childSchema = [
                    {fieldType: "input", placeholder: "考核内容", label: "考核内容", _name: "content", content: '',},
                    {fieldType: "select", placeholder: "训练要求", label: "训练要求", _name: "testReq", testReq:'必考',options:Object.values(TestRequirement),},
                ];
                this.childColumns = [
                    {prop: 'content', label: '考核内容',style:{color:'#F56C6C',cursor: 'pointer'}},
                    {prop: 'testReq', label: '考核类型'},
                ]
            },
        }
    }
</script>
