<!--<template>-->
    <!--<div class="RetrainRule">-->
        <!--<el-form inline :model="formData" ref="ruleform" :rules="rules" class="formData" v-show="wrapperVisible" label-width="120px">-->
            <!--<el-form-item label="大纲标准："  prop="standard">-->
                <!--<el-select clearable filterable v-model="formData.standard" placeholder="请选择大纲标准">-->
                    <!--<el-option-->
                        <!--v-for="item in selectStandard"-->
                        <!--:key="item.name"-->
                        <!--:label="item.name"-->
                        <!--:value="item.objectId">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="单位分类："  prop="orgCategories">-->
                <!--<el-select clearable filterable multiple v-model="formData.orgCategories" placeholder="请选择单位类别">-->
                    <!--<el-option-->
                        <!--v-for="item in selectOrgCategories"-->
                        <!--:key="item.objectId"-->
                        <!--:label="item.name"-->
                        <!--:value="item.name">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="课目分类："  prop="courseCategory">-->
                <!--<el-select clearable filterable v-model="formData.courseCategory" placeholder="请选择课目类别" @change="clearCourseValue">-->
                    <!--<el-option-->
                        <!--v-for="item in CourseCategorys"-->
                        <!--:key="item.name"-->
                        <!--:label="item.name"-->
                        <!--:value="item.id">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="课目名称："  prop="course">-->
                <!--<el-select clearable filterable v-model="formData.course" placeholder="请选择课目">-->
                    <!--<el-option-->
                        <!--v-for="(item,index) in selectCourse"-->
                        <!--:key="index"-->
                        <!--:label="item.name"-->
                        <!--:value="item.objectId">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="安排顺序：" prop="sequence">-->
                <!--<el-input type="number" v-model="formData.sequence" :min="0" :step="1" style="width: 217px" >-->
                <!--</el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="训练课时数：" prop="hours">-->
                <!--<el-input type="number" v-model="formData.hours"  :min="0" :step="1" style="width: 217px" >-->
                    <!--<template slot="append">课时</template>-->
                <!--</el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="课时权重：" prop="weight">-->
                <!--<el-input type="number" v-model="formData.weight"  :min="0" :step="1" style="width: 217px" ></el-input>-->
            <!--</el-form-item>-->
            <!--<div style="width: 100%;margin-bottom: 20px">-->
                <!--<el-button-group style="width: 284px;float: right">-->
                    <!--<el-button :type="btnState?'primary':'warning'" @click="onSubmit('ruleform', onSubmitCallBack)" style="float: right">{{btnState?'添加':'修改'}}</el-button>-->
                <!--</el-button-group>-->
            <!--</div>-->
        <!--</el-form>-->
        <!--<Filters :props="[Standard,OrgCategories,CourseCategory]" placeholder="输入课目名称，将自动搜索" @filterValueIsChange="filterValueIsChange" @querySearchAsync="querySearchAsync"></Filters>-->

        <!--<el-table-->
            <!--:data="tableData"-->
            <!--border-->
            <!--:max-height="maxTableHegith"-->
            <!--style="width: 100%;">-->
            <!--<el-table-column-->
                <!--prop="standard"-->
                <!--width="180px"-->
                <!--label="训练大纲">-->
                <!--<template slot-scope="scope">-->
                    <!--<span>{{ scope.row.standard && scope.row.standard.name }}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--prop="orgCategories"-->
                <!--label="适用单位">-->
                <!--<template slot-scope="scope">-->
                    <!--<el-tag v-if="scope.row.orgCategories.length"-->
                            <!--v-for="(item,index) in scope.row.orgCategories"-->
                            <!--size="mini"-->
                            <!--:key="index"-->
                            <!--type="danger">-->
                        <!--{{item}}-->
                    <!--</el-tag>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--prop="courseCategory"-->
                <!--label="课目分类">-->
                <!--<template slot-scope="scope">-->
                    <!--<span>{{ scope.row.courseCategory|filterCourseCategory }}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--prop="course"-->
                <!--label="课目名称">-->
                <!--<template slot-scope="scope">-->
                    <!--<span>{{ scope.row.course && scope.row.course.name }}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--prop="sequence"-->
                <!--width="80px"-->
                <!--label="安排顺序">-->
                <!--<template slot-scope="scope">-->
                    <!--<span>{{ scope.row.sequence }}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--prop="hours"-->
                <!--width="100px"-->
                <!--label="训练课时数">-->
                <!--<template slot-scope="scope">-->
                    <!--<span>{{ scope.row.hours }}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--prop="weight"-->
                <!--width="80px"-->
                <!--label="课时权重">-->
                <!--<template slot-scope="scope">-->
                    <!--<span>{{ scope.row.weight }}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="操作" align="right" width="150">-->
                <!--<template slot-scope="scope">-->
                    <!--<el-button-->
                        <!--size="mini"-->
                        <!--@click="handleEdit(scope.row,handleEditCallback)">编辑</el-button>-->
                    <!--<el-button-->
                        <!--size="mini"-->
                        <!--type="danger"-->
                        <!--@click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
                <!--</template>-->
            <!--</el-table-column>-->
        <!--</el-table>-->
        <!--<Pagination-->
            <!--:total="pageConfig.total"-->
            <!--:page-size="pageConfig.pageSize"-->
            <!--:page-sizes="pageConfig.pageSizes"-->
            <!--@sizeChange="changePage"-->
            <!--@currentChange="changePage"-->
            <!--:current-page="pageConfig.currentPage"></Pagination>-->
        <!--<div class="shadeBox" :class="{'shadeBox-wrapper':wrapperVisible}" @click="closeModal"></div>-->
    <!--</div>-->
<!--</template>-->
<!--<script>-->
    <!--// 复训课目规则-->
    <!--// const RetrainRuleSchema = new Schema({-->
    <!--//  standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 大纲标准-->
    <!--// 	courseCategory: Number,                                             // 课目分类-->
    <!--// 	course: { type: Schema.Types.ObjectId, ref: 'Course' },             // 课目对象-->
    <!--//  orgCategories: [String],                                            // 适用的单位分类列表-->

    <!--//  sequence: Number, 		        // 复训安排顺序-->
    <!--//  hours: Number, 		            // 每次安排的课时数-->
    <!--//  weight: Number,                 // 安排课时权重-->
    <!--// });-->
    <!--import _ from 'lodash';-->
    <!--import {CourseCategorys} from 'src/lib/Constants'-->
    <!--import {handle} from 'src/config/mixin'-->
    <!--import Filters from 'src/pages/common/Filters.vue'-->
    <!--import Client from 'src/lib/Client'-->
    <!--export default {-->
        <!--mixins:[handle],-->
        <!--components:{-->
            <!--Filters-->
        <!--},-->
        <!--data() {-->
            <!--return{-->
                <!--selectStandard:[],-->
                <!--selectOrgCategories:[],-->
                <!--CourseCategorys,-->
                <!--selectCourse:[],-->
                <!--rules:{-->
                    <!--standard:[-->
                        <!--{required: true, message: '请选择训练大纲',},-->
                    <!--],-->
                    <!--courseCategory:[-->
                        <!--{required: true, message: '请选择课目类别',},-->
                    <!--],-->
                    <!--orgCategories:[-->
                        <!--{required: true, message: '请选择单位类型',},-->
                    <!--]-->
                <!--},-->
                <!--standardResult:'',-->
                <!--orgCategoriesResult:[],-->
                <!--courseCategoryResult:'',-->
                <!--Standard:{selects: undefined, value:'', valueKey:'objectId', textValue: true,  placeholder: '训练大纲', equalObject: {className:'TrainCourse',name:'standard'}},-->
                <!--OrgCategories: {selects: undefined, value:'', placeholder: '单位分类', equalObject: {className:'TrainCourse',name:'orgCategories'}},-->
                <!--CourseCategory: {selects: CourseCategorys, value:'', placeholder: '课目分类', equalObject: {className:'TrainCourse',name:'courseCategory'}},-->
                <!--equalObject: undefined,-->
                <!--search: {-->
                    <!--key: '',-->
                    <!--value: ''-->
                <!--},-->
            <!--}-->
        <!--},-->
        <!--created() {-->
            <!--this.triggerSelect('TrainStandard').then(result=>{-->
                <!--this.selectStandard = result.list;-->
                <!--this.curStandard();-->
                <!--this.Standard.selects = result.list;-->
            <!--});-->
            <!--this.triggerSelect('OrgCategory').then(result=>{-->
                <!--this.selectOrgCategories = result.list;-->
                <!--this.OrgCategories.selects = result.list;-->
            <!--});-->
        <!--},-->
        <!--filters:{-->
            <!--filterCourseCategory(courseCategory) {-->
                <!--return  !(courseCategory) && '' || Object.values(CourseCategorys).find(item=>item.id === courseCategory).name;-->
            <!--},-->
        <!--},-->
        <!--watch:{-->
            <!--'formData.standard'(newVal, oldVal){-->
                <!--if (!newVal||newVal.length === 0) return;-->
                <!--this.standardResult = newVal;-->
                <!--this.filterCourse(this.standardResult,this.orgCategoriesResult,this.courseCategoryResult);-->
            <!--},-->
            <!--'formData.orgCategories'(newVal, oldVal){-->
                <!--if (!newVal||newVal.length === 0) return;-->
                <!--this.orgCategoriesResult = newVal;-->
                <!--this.filterCourse(this.standardResult,this.orgCategoriesResult,this.courseCategoryResult);-->
            <!--},-->
            <!--'formData.courseCategory'(newVal, oldVal) {-->
                <!--if (newVal === undefined) return;-->
                <!--this.courseCategoryResult = newVal;-->
                <!--if (newVal === 0) {-->
                    <!--this.filterCourse(this.standardResult,this.orgCategoriesResult,this.courseCategoryResult);-->
                <!--} else {-->
                    <!--this.selectChanged(newVal, ['Course', 'category'], this.handleCoursesResult);-->
                <!--}-->
            <!--}-->
        <!--},-->
        <!--methods:{-->
            <!--handleQuery(filterObj,className = this.className) {-->
                <!--if(!filterObj)return this.query(className);-->
                <!--let [parentQuery, childQuery, childName] = [];-->
                <!--filterObj.map(item=>{-->
                    <!--parentQuery = parentQuery || this.query(className);-->
                    <!--if (item.name === 'standard') {-->
                        <!--let parseStandard = new Client.TrainStandard();-->
                        <!--parseStandard.id = item.value;-->
                        <!--parentQuery.equalTo(item.name,parseStandard);-->
                    <!--} else {-->
                        <!--parentQuery.equalTo(item.name,item.value);-->
                    <!--}-->
                <!--});-->
                <!--parentQuery = parentQuery || this.query(className);-->
                <!--childQuery && parentQuery.matchesQuery(childName.toLowerCase(), childQuery);-->
                <!--parentQuery.addAscending('createdAt');-->
                <!--return parentQuery;-->
            <!--},-->
            <!--querySearchAsync(string){-->
                <!--this.search.key = 'name';-->
                <!--this.search.value = string;-->
                <!--this.equalObject = undefined;-->
                <!--this.changePage(0);-->
            <!--},-->
            <!--async changePage(curPage,pageSize){-->
                <!--let query = this.handleQuery(this.equalObject);-->
                <!--if (this.search.value&&this.search.value.length>0) {-->
                    <!--let courseQuery = this.query('TrainCourse');-->
                    <!--courseQuery.contains(this.search.key,this.search.value);-->
                    <!--query.matchesQuery('course', courseQuery);-->
                <!--}-->
                <!--query.skip(curPage).limit(pageSize||this.pageConfig.pageSize);-->
                <!--const result = await this.queryList(this.className,query);-->
                <!--this.pageConfig.total = result.total;-->
                <!--this.tableData = result.list;-->
                <!--return result;-->
            <!--},-->
            <!--filterValueIsChange(equalObject, num){-->
                <!--(!equalObject.length && num === -1) && (this.search.value = '');-->

                <!--equalObject = !equalObject.length? undefined : equalObject ;-->
                <!--this.equalObject = equalObject;-->
                <!--this.changePage(0);-->
            <!--},-->
            <!--filterValueIsChange(equalObject, num){-->
                <!--(!equalObject.length && num === -1) && (this.search.value = '');-->
                <!--if (num===1) {-->
                    <!--equalObject = equalObject.map(item=>{-->
                        <!--item.value = this.handleFilterValueStr(item.value);-->
                        <!--return item-->
                    <!--});-->
                    <!--equalObject = !equalObject.length? undefined : equalObject ;-->
                    <!--this.equalObject = equalObject;-->
                    <!--this.objectEquale = equalObject;-->
                <!--} else {-->
                    <!--this.equalObject = this.objectEquale;-->
                <!--}-->
                <!--this.changePage(0);-->
            <!--},-->
            <!--filterCourse(standard,orgCategories,courseCategory) {-->
                <!--if (standard && orgCategories.length>0 && (courseCategory===0)) {-->
                    <!--let query = this.query('Course');-->
                    <!--const args1 = ['standard',this.getObject('TrainStandard',standard)];-->
                    <!--const args2 = ['category',courseCategory];-->
                    <!--const args3 = ['orgCategories',orgCategories];-->
                    <!--query.equalTo(...args1).equalTo(...args2).containedIn(...args3);-->
                    <!--this.queryListByKeyValue('Course',query).then(this.handleTrainCourseResult);-->
                <!--}else{-->
                    <!--return;-->
                <!--}-->
            <!--},-->
            <!--clearCourseValue(){-->
                <!--this.selectCourse = undefined;-->
                <!--this.formData.course = '';-->
            <!--},-->
            <!--handleCoursesResult(result) {-->
                <!--this.selectCourse = result.list;-->
            <!--},-->
            <!--handleTrainCourseResult(result) {-->
                <!--this.selectCourse = result.list;-->
            <!--},-->
            <!--handleEditCallback(row) {-->
                <!--this.formData = {-->
                    <!--...this.cloneDeep(row),-->
                    <!--standard: row.standard.objectId,-->
                    <!--course: row.course.objectId,-->
                <!--}-->
            <!--},-->
            <!--onSubmitCallBack() {-->
                <!--let target = {-->
                    <!--...this.formData,-->
                    <!--sequence: !this.formData.sequence? 0 : Number(this.formData.sequence),-->
                    <!--hours: !this.formData.hours? 0 : Number(this.formData.hours),-->
                    <!--weight: !this.formData.weight? 0 : Number(this.formData.weight),-->
                <!--};-->
                <!--return target;-->
            <!--},-->
            <!--handleFilterValueStr(str){-->
                <!--switch (str){-->
                    <!--case '军事课目':-->
                        <!--return 0;-->
                    <!--case '体育课目':-->
                        <!--return 1;-->
                    <!--case '政治教育':-->
                        <!--return 2;-->
                    <!--case '党团活动':-->
                        <!--return 3;-->
                    <!--case '其它工作':-->
                        <!--return 4;-->
                    <!--case '自定义课目':-->
                        <!--return 5;-->
                    <!--default:-->
                        <!--return str;-->
                <!--}-->
            <!--},-->
            <!--initFormData() {-->
                <!--this.formData={-->
                    <!--standard: '',                                                  // 大纲标准-->
                    <!--courseCategory: undefined,                                             // 课目分类-->
                    <!--course: '',                                                    // 课目对象-->
                    <!--orgCategories: [],                                             // 适用的单位分类列表-->
                    <!--sequence: 0, 		                                            // 复训安排顺序-->
                    <!--hours: 0, 		                                                // 每次安排的课时数-->
                    <!--weight: 0,                                                     // 安排课时权重-->
                <!--},-->
                <!--this.$refs.ruleform && this.$refs.ruleform.clearValidate()-->
            <!--}-->
        <!--}-->
    <!--}-->
<!--</script>-->
<!--<style scoped>-->
    <!--.formData{-->
        <!--display: flex;-->
        <!--flex-wrap: wrap;-->
        <!--justify-content: space-between;-->
    <!--}-->
    <!--.formData .el-form-item:last-child{-->
        <!--width: 100%;-->
        <!--display: flex;-->
        <!--justify-content: flex-end;-->
    <!--}-->
<!--</style>-->

<template>
    <div class="RetrainRule">
        <form-and-table :columns="columns" :schema="schema" ref="formAndTable"> </form-and-table>
    </div>
</template>

<script>
    import comRender from '@/pages/common/com-render'
    import formAndTable from '@/pages/common/new-com-formAndTable'
    // 复训课目规则
    // const RetrainRuleSchema = new Schema({
    //  standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 大纲标准
    // 	courseCategory: Number,                                             // 课目分类
    // 	course: { type: Schema.Types.ObjectId, ref: 'Course' },             // 课目对象
    //  orgCategories: [String],                                            // 适用的单位分类列表

    //  sequence: Number, 		        // 复训安排顺序
    //  hours: Number, 		            // 每次安排的课时数
    //  weight: Number,                 // 安排课时权重
    // });
    import {CourseCategorys} from '@/lib/Constants'
    export default {
        name: "category",
        components: {
            formAndTable
        },
        data() {
            return {
                columns: [
                    {prop: 'standard', label: '训练大纲',
                        width: 200,
                        handleValue:(val)=>{
                            return val && val.name;
                        }},
                    {prop: 'courseCategory',
                        label: '课目分类',
                        width: 120,
                        handleValue:(val)=>{
                            return CourseCategorys.find(item=>item.id === val).name;
                        }},
                    {prop: 'course', label: '课目名称',
                        width: 160,
                        handleValue:(val)=>{
                            return val && val.name;
                        }},
                    {prop: 'orgCategories', label: '单位分类', component: comRender},
                    {prop: 'sequence', label: '复训顺序', width: 90},
                    {prop: 'hours', label: '课时数', width: 90},
                    {prop: 'weight', label: '课时权重', width: 90},
                ],
                schema: [
                    {fieldType: "input", placeholder: "训练大纲", label: "训练大纲", _name: "standard", standard: '',disabled:true},
                    {fieldType: "select", placeholder: "单位分类", label: "单位分类", _name: "orgCategories", orgCategories: [],options: [], multiple: true, change: this.handleChangeCourseCategory},
                    {fieldType: "select", placeholder: "课目分类", label: "课目分类", _name: "courseCategoryV2", courseCategoryV2: '',keyOptions: CourseCategorys, change: this.handleChangeCourseCategory},
                    {fieldType: "select", placeholder: "课目名称", label: "课目名称", _name: "courseV2", courseV2: undefined,keyOptions: [], },
                    {fieldType: "input-number", placeholder: "复训顺序", label: "复训顺序", _name: "sequence", sequence: 0,},
                    {fieldType: "input-number", placeholder: "课时数", label: "课时数", _name: "hours", hours: 0,},
                    {fieldType: "input-number", placeholder: "课时权重", label: "课时权重", _name: "weight", weight: 0,},
                ]
            }
        },
        async created(){
            this.schema[0].standard = this.$parent.standard.name;
            this.schemaOrgCategory.options = (await this.$backendService.queryListByKeyValue('OrgCategory')).list.map(item=>item.name);
        },
        computed:{
            schemaOrgCategory(){
                return this.schema.find(item=>item._name === 'orgCategories')
            },
            schemaCourseCategoryV2(){
                return this.schema.find(item=>item._name === 'courseCategoryV2')
            },
            schemaCourseV2(){
                return this.schema.find(item=>item._name === 'courseV2')
            },
        },
        methods: {
            beforeSubmit(formData) {
                const deleteKeys = ['courseCategoryV2','courseV2',];
                formData.courseCategory = (CourseCategorys.find(item=>item.name === formData.courseCategoryV2) || {}).id;
                formData.course = (this.schemaCourseV2.keyOptions.find(item=>item.name === formData.courseV2) || {}).objectId;
                formData.standard = this.$parent.standard.objectId;
                Object.keys(formData).forEach(key=>{
                    if(deleteKeys.includes(key))delete formData[key];
                })


            },
            beforeEdit(row){
                row.standard = this.$parent.standard.name;
                row.courseCategoryV2 = CourseCategorys.find(item=>item.id === row.courseCategory).name;
                row.courseV2 = row.course && row.course.name;
            },
            async handleChangeCourseCategory() {
                this.schemaCourseV2.courseV2 = undefined;
                let query = new this.$Client.Query(this.$Client.Course);
                let $idNum = (CourseCategorys.find(item=>item.name === this.schemaCourseCategoryV2.courseCategoryV2) || {}).id;
                if ($idNum)query.equalTo('category', $idNum);
                if ($idNum === 0)query.containedIn('orgCategories', this.schemaOrgCategory.orgCategories);
                this.schemaCourseV2.keyOptions =  (await this.$backendService.queryListByKeyValue('Course', query)).list
            }
        },
    }
</script>

