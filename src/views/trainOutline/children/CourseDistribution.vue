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

            <el-form-item label="训练课目"  prop="course">
                <el-select filterable clearable v-model="formData.course" placeholder="请选择训练课目" @change="formData.serviceReq=formData.task='',selectTasks=formData.subjects=selectSubjects=[]">
                    <el-option
                        v-for="item in selectCourse"
                        :key="item.objectId"
                        :label="item.name"
                        :value="item.objectId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="人员类型"  prop="personProperties">
                <el-select filterable multiple v-model="formData.personProperties" placeholder="请选择适用人员类型" ></el-select>
            </el-form-item>
            <el-form-item label="单位分类"  prop="orgCategories">
                <el-select filterable multiple v-model="formData.orgCategories" placeholder="请选择适用单位" ></el-select>
            </el-form-item>
            <el-form-item label="勤务类型"  prop="serviceReq">
                <el-select filterable clearable v-model="formData.serviceReq" placeholder="请选择勤务类型">
                    <el-option
                        v-for="item in selectServiceReqs"
                        :key="item"
                        :label="item"
                        :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="训练任务"  prop="task">
                <el-select filterable clearable v-model="formData.task" placeholder="请选择训练任务" @change="formData.subjects=selectSubjects=[]">
                    <el-option
                        v-for="item in selectTasks"
                        :key="item"
                        :label="item"
                        :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="训练课题"  prop="seq">
                <el-select filterable multiple v-model="formData.subjects" placeholder="请选择训练课题">
                    <el-option
                        v-for="item in selectSubjects"
                        :key="item"
                        :label="item"
                        :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button :type="btnState?'primary':'warning'" @click="onSubmit('ruleform')">{{btnState?'添加':'修改'}}</el-button>
            </el-form-item>
        </el-form>
        <Filters :props="[Standard,Section,OrgCategories,PersonProperty,Task,ServiceReq]" placeholder="输入课目名称，将自动搜索" @filterValueIsChange="filterValueIsChange" @querySearchAsync="querySearchAsync"></Filters>
        <el-table
            :data="tableData"
            border
            :max-height="maxTableHegith"
            style="width: 100%">

            <el-table-column
                :show-overflow-tooltip="true"
                label="大纲标准" width="200">
                <template slot-scope="scope">
                    <span>{{ scope.row.standard && scope.row.standard.name || '已停用'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                width="200"
                label="分册名称">
                <template slot-scope="scope">
                    <span>{{ scope.row.section && scope.row.section.name }}</span>
                </template>
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                label="训练课目" width="200">
                <template slot-scope="scope">
                    <span>{{ scope.row.course && `${scope.row.course.seq}. ${scope.row.course.name}` }}</span>
                </template>
            </el-table-column>

            <el-table-column
                label="单位分类">
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
                label="人员类型" width="110">
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
                :show-overflow-tooltip="true"
                label="任务类型" width="110">
                <template slot-scope="scope">
                    <el-tag size="mini">
                        {{ scope.row.task || '无'}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                label="训练课题" width="200">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.subjects.length"
                            v-for="(item,index) in scope.row.subjects"
                            size="mini"
                            :key="index"
                            type="warning">
                        {{item}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                label="勤务类型" width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.serviceReq }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="专业类型" width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.course&&scope.row.course.majorReq }}</span>
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

    // 课目配档表
    // const CourseDistributionSchema = new Schema({
    // 	name: { type: String, required: true },         // 课目名称
    //  seq: Number,                                    // 课目序号
    //  course: { type: Schema.Types.ObjectId, ref: 'Course' },    // 训练课目
    //  standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 训练大纲
    //  section: { type: Schema.Types.ObjectId, ref: 'TrainSection' },    // 训练大纲
    //  orgCategories: [String],                        // 课目适用的单位分类列表(同课目)
    //  personProperties: [String],                     // 课目适用的人员属性列表,一般是一个(同课目)
    //  serviceReq: String,                             // 勤务类型(可选)
    //  task: String,                                   // 训练任务
    //  subjects: [String],                             // 训练课题列表
    // });
    // import {handle} from 'src/config/mixin'

    import {OrgType,PersonProperty,TrainRequirement,ScoreCriteria,OrgSequences} from 'src/lib/Constants'
    import {handle} from 'src/config/mixin'
    import Filters from 'src/pages/common/Filters.vue'
    import {PoliticalStatus,Gender} from 'src/lib/Constants'
    import Client from 'src/lib/Client'
    import courseUtils from 'src/lib/utils/courseUtils'
    export default {
        mixins:[handle],
        components:{
            Filters
        },
        data() {
            return {
                rules:{
                    name:[
                        { required: true, message: '请输入课目名称', trigger: 'blur' },
                    ],
                    seq:[
                        { required: true, message: '请输入课目序号', trigger: 'blur' },
                    ],
                    standard:[
                        { required: true, message: '请选择训练大纲', trigger: 'blur' },
                    ],
                    section:[
                        { required: true, message: '请选择分册', trigger: 'blur' },
                    ],
                    course:[
                        { required: true, message: '请选择训练课目', trigger: 'blur' },
                    ],
                },
                selectStandard:[],
                selectCourse:[],
                selectTasks: [],
                selectSubjects:[],
                selectServiceReqs: [],
                optionalTasks: [],
                isEdit: false,
                Standard:{selects: undefined, value:'', valueKey:'objectId', textValue:true, placeholder: '训练大纲', equalObject: {className:'TrainDistribution',name:'standard'}},
                Section: {selects: undefined, value:'', valueKey:'objectId', textValue:true,placeholder: '大纲分册', equalObject: {className:'TrainDistribution',name:'section'}},
                OrgCategories: {selects: undefined, value:'', placeholder: '单位分类', equalObject: {className:'TrainDistribution',name:'orgCategories'}},
                Task: {selects: undefined, value:'', placeholder: '训练任务', equalObject: {className:'TrainDistribution',name:'task'}},
                ServiceReq: {selects: undefined, value:'', placeholder: '勤务类型', equalObject: {className:'TrainDistribution',name:'serviceReq'}},
                PersonProperty:{selects:PersonProperty,value:'',placeholder:'人员属性',equalObject:{className:'TrainDistribution',name:'personProperties'}},
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
            'formData.course'(newVal,oldVal){
                if (!newVal) return;
                if (this.isEdit) {
                    this.isEdit = !this.isEdit;
                    return;
                }
                const obj = this.selectCourse.find(item=>newVal === item.objectId);
                this.selectTasks = obj.tasks || [];
                this.formData.task = (obj.tasks&&obj.tasks.length>0)?obj.tasks[0]:'';
                this.formData.serviceReq = obj.serviceReq&&obj.serviceReq.length>0?obj.serviceReq[0]:'';
                this.formData.personProperties = obj.personProperties;
                this.formData.orgCategories = obj.orgCategories;
                this.formData.seq = obj.seq;
            },
            'formData.orgCategories'(newVal,oldVal){
                if (!newVal || newVal.length === 0) return;
                this.selectChanged(newVal[0],['OrgCategory','name'],this.handleOrgCategoryResult);
            },
            'formData.task'(newVal,oldVal){
                if (!newVal || newVal.length === 0) return;
                const taskObj = this.optionalTasks.find(item => item.name === newVal);
                if (taskObj) this.selectSubjects = taskObj.optionalSubjects || [];
            },
        },
        methods: {
            handleQuery(filterObj,className = this.className) {
                this.clearFilterOptions(filterObj);
                if(!filterObj)return this.query(className);
                let [parentQuery, childQuery, childName] = [];
                filterObj.map(item=>{
                    parentQuery = parentQuery || this.query(className);
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
                this.isEdit = true;
                this.formData = {...row};
                this.formData.course = row.course.objectId;
                this.formData.section = row.section.objectId;
                this.formData.standard = row.standard.objectId;
                this.selectTasks = row.course.tasks || [];
            },
            handleOrgCategoryResult(result){
                console.log(result)
                if (!result.list || result.list.length === 0) return;
                this.selectServiceReqs = result.list[0].optionalServices;
                this.optionalTasks = result.list[0].optionalTasks;

                if(!this.formData.task)return;
                const taskObj = this.optionalTasks.find(item => item.name === this.formData.task);
                if (taskObj) this.selectSubjects = taskObj.optionalSubjects || [];
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
                        serviceReq: item.serviceReq || []
                    }
                });
            },

            initFormData() {
                this.isEdit = false;
                this.formData = {
                    name: '',              // 课目名称
                    seq: 0,                // 课目序号
                    course:'',             // 训练课目
                    standard: '',          // 训练大纲
                    section: '',           // 训练分册
                    orgCategories: [],     // 课目适用的单位分类列表
                    personProperties: [],  // 课目适用的人员属性列表,一般是一个
                    task: '',              // 训练任务(可选)
                    serviceReq: '',         // 昼训时间要求
                    subjects: [],       // 夜训时间要求
                };
                this.selectCourse = [];
                this.selectTasks = [];
                this.selectSubjects = [];
                this.selectServiceReqs = [];
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
