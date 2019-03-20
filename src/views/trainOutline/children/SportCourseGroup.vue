<!--<template>-->
    <!--<div class="SportAssessReq">-->
        <!--<el-form inline :model="formData" ref="ruleform" :rules="rules" class="formData" v-show="wrapperVisible" label-width="120px">-->
            <!--<el-form-item label="大纲标准："  prop="standard">-->
                <!--<el-select clearable v-model="formData.standard" placeholder="请选择大纲标准">-->
                    <!--<el-option-->
                        <!--v-for="item in selectStandard"-->
                        <!--:key="item.name"-->
                        <!--:label="item.name"-->
                        <!--:value="item.objectId">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="课目组编号："  prop="groupId">-->
                <!--<el-input-number v-model="formData.groupId" style="width: 217px" :min="1" :max="10"></el-input-number>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="课目序号："  prop="itemSeq">-->
                <!--<el-input-number v-model="formData.itemSeq" style="width: 217px" :min="1" :max="10"></el-input-number>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="体育课目："  prop="courses">-->
                <!--<el-select filterable multiple v-model="formData.courses" placeholder="请选择体育课目，可多选">-->
                    <!--<el-option-->
                        <!--v-for="item in selectSportCourse"-->
                        <!--:key="item.name"-->
                        <!--:label="item.name"-->
                        <!--:value="item.objectId">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="训练等级："  prop="physicalLevel">-->
                <!--<el-select filterable clearable v-model="formData.physicalLevel" placeholder="请选择训练等级">-->
                    <!--<el-option-->
                        <!--v-for="item in selectPhysicalLevel"-->
                        <!--:key="item.objectId"-->
                        <!--:label="item.name"-->
                        <!--:value="item.name">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item  label="军兵种类型："   prop="troopCategory">-->
                <!--<el-select filterable clearable v-model="formData.troopCategory" placeholder="请选军兵种类型">-->
                    <!--<el-option-->
                        <!--v-for="(value,key) in TroopCategory"-->
                        <!--:key="key"-->
                        <!--:label="value"-->
                        <!--:value="value">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item  label="性别要求："   prop="gender">-->
                <!--<el-select filterable clearable v-model="formData.gender" placeholder="请选性别">-->
                    <!--<el-option-->
                        <!--v-for="(value,key) in Gender"-->
                        <!--:key="key"-->
                        <!--:label="value"-->
                        <!--:value="value">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item>-->
                <!--<el-button :type="btnState?'primary':'warning'" @click="onSubmit('ruleform')">{{btnState?'添加':'修改'}}</el-button>-->
            <!--</el-form-item>-->
        <!--</el-form>-->
        <!--<Filters :props="[Standard,PhysicalLevel,TroopCategories,Genders]" placeholder="输入课目名称，将自动搜索" @filterValueIsChange="filterValueIsChange" @querySearchAsync="querySearchAsync"></Filters>-->

        <!--<el-table-->
            <!--:data="tableData"-->
            <!--border-->
            <!--:max-height="maxTableHegith"-->
            <!--style="width: 100%">-->
            <!--<el-table-column-->
                <!--prop="standard"-->
                <!--width="200"-->
                <!--label="训练大纲">-->
                <!--<template slot-scope="scope">-->
                    <!--<span>{{ scope.row.standard && scope.row.standard.name }}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--prop="groupId"-->
                <!--width="100"-->
                <!--label="课目组编号">-->
                <!--<template slot-scope="scope">-->
                    <!--<span>{{ scope.row.groupId }}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--prop="course"-->
                <!--label="课目组内容">-->
                <!--<template slot-scope="scope">-->
                    <!--<span>{{ scope.row | makeCourseName }}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--prop="physicalLevel"-->
                <!--width="120"-->
                <!--label="体能训练等级">-->
                <!--<template slot-scope="scope">-->
                    <!--<el-tag size="medium">{{scope.row.physicalLevel}}</el-tag>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--prop="troopCategory"-->
                <!--width="120"-->
                <!--label="军兵种类型">-->
                <!--<template slot-scope="scope">-->
                    <!--<el-tag size="medium">{{scope.row.troopCategory}}</el-tag>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--prop="genders"-->
                <!--width="120"-->
                <!--label="性别要求">-->
                <!--<template slot-scope="scope">-->
                    <!--<el-tag size="medium">{{scope.row.gender}}</el-tag>-->
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

    <!--// 体育专项训练课目组-->
    <!--// const SportCourseGroupSchema = new Schema({-->
    <!--//  standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 训练大纲-->
    <!--//  groupId: Number,                                                    // 课目组编号-->
    <!--//  itemSeq: Number,                                                    // 课目序号-->
    <!--//  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],           // 体育课目列表-->
    <!--//  physicalLevel: String,                                              // 体能训练等级-->
    <!--//  troopCategory: String,                                              // 军兵种类型-->
    <!--//  gender: String,                                                     // 性别要求-->
    <!--// });-->
    <!--import {Gender, TroopCategory} from 'src/lib/Constants'-->
    <!--import {handle} from 'src/config/mixin'-->
    <!--import _ from 'lodash'-->
    <!--import Filters from 'src/pages/common/Filters.vue'-->
    <!--import Client from 'src/lib/Client'-->

    <!--export default {-->
        <!--mixins:[handle],-->
        <!--components:{-->
            <!--Filters-->
        <!--},-->
        <!--data() {-->
            <!--return {-->
                <!--selectPhysicalLevel: [],-->
                <!--selectStandard:[],-->
                <!--selectSportCourse:[],-->
                <!--TroopCategory,-->
                <!--Gender,-->
                <!--mrssage: 40,-->
                <!--rules:{-->
                    <!--standard:[-->
                        <!--{ required: true, message: '请选择训练大纲',},-->
                    <!--],-->
                    <!--groupId:[-->
                        <!--{ required: true, message: '请输入课目组编号', },-->
                    <!--],-->
                    <!--itemSeq:[-->
                        <!--{ required: true, message: '请输入课目序号', },-->
                    <!--],-->
                    <!--courses:[-->
                        <!--{ required: true, message: '请选择训练课目', },-->
                    <!--],-->
                    <!--physicalLevel:[-->
                        <!--{ required: true, message: '请选择训练等级', },-->
                    <!--],-->
                    <!--troopCategory: [-->
                        <!--{ required: true, message: '请选择军兵种', },-->
                    <!--],-->
                    <!--gender: [-->
                        <!--{ required: true, message: '请选择性别', },-->
                    <!--]-->
                <!--},-->
                <!--Standard:{selects: undefined, value:'', valueKey:'objectId', textValue: true, placeholder: '训练大纲', equalObject: {className:'SportAssessReq',name:'standard'}},-->
                <!--PhysicalLevel:{selects: undefined, value:'', placeholder: '训练等级', equalObject: {className:'SportAssessReq',name:'physicalLevel'}},-->
                <!--TroopCategories:{selects: TroopCategory, value:'', placeholder: '军兵种类型', equalObject: {className:'SportAssessReq',name:'troopCategory'}},-->
                <!--Genders:{selects: Gender, value:'', placeholder: '性别', equalObject: {className:'SportAssessReq',name:'gender'}},-->
                <!--equalObject: undefined,-->
                <!--search: {-->
                    <!--key: '',-->
                    <!--value: ''-->
                <!--},-->
            <!--}-->
        <!--},-->
        <!--created(){-->
            <!--this.triggerSelect('TrainStandard').then(result=>{-->
                <!--this.Standard.selects = result.list;-->
                <!--this.selectStandard = result.list;-->
                <!--this.curStandard();-->
            <!--});-->
            <!--this.triggerSelect('PhysicalLevel').then(result=>{-->
                <!--this.PhysicalLevel.selects = result.list;-->
                <!--this.selectPhysicalLevel = result.list;-->
            <!--});-->
        <!--},-->
        <!--watch: {-->
            <!--'formData.standard'(newVal, oldVal) {-->
                <!--if (_.isEmpty(newVal)) return (this.selectSportCourse = []);-->
                <!--this.selectChanged(this.getObject('TrainStandard', newVal), ['SportCourse', 'standard'], this.handleSportCoursesResult)-->
            <!--}-->
        <!--},-->
        <!--filters: {-->
            <!--makeCourseName(row) {-->
                <!--if (_.isEmpty(row.courses)) return '';-->
                <!--const names = row.courses.map(item => item.name);-->
                <!--return `${row.itemSeq}. ${names.join('; ')}`;-->
            <!--}-->
        <!--},-->
        <!--methods: {-->
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
                    <!--query.matchesQuery('courses', courseQuery);-->
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
            <!--handleSportCoursesResult(result) {-->
                <!--this.selectSportCourse = result.list;-->
            <!--},-->

            <!--handleEditCallback(row){-->
               <!--this.formData ={-->
                    <!--...this.cloneDeep(row),-->
                    <!--standard: row.standard.objectId,-->
                    <!--courses:  row.courses ? row.courses.map(item => item.objectId):[]-->
                <!--}-->
            <!--},-->
            <!--initFormData() {-->
                <!--this.formData = {-->
                     <!--standard: '',              // 训练大纲-->
                     <!--groupId: 1,                // 专项课目组编号-->
                     <!--itemSeq: 1,                // 专项课目组中的课目序号-->
                     <!--courses: [],               // 体育课目-->
                     <!--physicalLevel: '',-->
                     <!--troopCategory: '',-->
                     <!--gender: Gender.Male,-->
                    <!--}-->
            <!--}-->

        <!--}-->
    <!--}-->
<!--</script>-->

<!--<style scoped>-->
    <!--/*.formData{*/-->
        <!--/*display: grid;*/-->
        <!--/*grid-template-columns: 33% 33% 33%;*/-->
    <!--/*}*/-->
    <!--/*.formData .el-form-item:last-child{*/-->
        <!--/*width: 100%;*/-->
        <!--/*display: flex;*/-->
        <!--/*justify-content: flex-end;*/-->
    <!--/*}*/-->
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
    <div class="SportAssessReq">
        <form-and-table :columns="columns" :schema="schema" ref="formAndTable"> </form-and-table>
    </div>
</template>

<script>
    import formAndTable from '@/pages/common/new-com-formAndTable'
    import {Gender, CourseCategory, TroopCategory} from '@/lib/Constants'
    // 体育专项训练课目组
    // const SportCourseGroupSchema = new Schema({
    //  standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 训练大纲
    //  groupId: Number,                                                    // 课目组编号
    //  itemSeq: Number,                                                    // 课目序号
    //  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],           // 体育课目列表
    //  physicalLevel: String,                                              // 体能训练等级
    //  troopCategory: String,                                              // 军兵种类型
    //  gender: String,                                                     // 性别要求
    // });
    export default {
        name: "category",
        components: {
            formAndTable
        },
        data() {
            return {
                columns: [
                    {prop: 'standard',label: '训练大纲',handleValue:(value)=> value && value.name, width: 200},
                    {prop: 'groupId', label: '课目组编号', width: 100,},
                    {prop: 'courses', label: '体育课目', handleValue: ((val, row)=>{return this.filterCourse(row)})},
                    {prop: 'physicalLevel', label: '体能训练等级',width: 120,},
                    {prop: 'troopCategory', label: '军兵种类型',width: 100,},
                    {prop: 'gender', label: '性别要求',  width: 100,},
                ],
                schema: [
                    {fieldType: "input", placeholder: "训练大纲", label: "训练大纲", _name: "standard", standard: '',disabled:true},
                    {fieldType: "input-number", placeholder: "课目组编号", label: "课目组编号", _name: "groupId", groupId: 0, min: 0},
                    {fieldType: "input-number", placeholder: "课目序号", label: "课目序号", _name: "itemSeq", itemSeq: 0, min: 0},
                    {fieldType: "select", placeholder: "体育课目", label: "体育课目", _name: "courseV2", courseV2: [],keyOptions: [], multiple: true},
                    {fieldType: "select", placeholder: "训练等级", label: "训练等级", _name: "physicalLevel", physicalLevels: '',keyOptions: [],},
                    {fieldType: "select", placeholder: "军兵种类型", label: "军兵种类型", _name: "troopCategory", troopCategories: '',options: Object.values(TroopCategory),},
                    {fieldType: "select", placeholder: "性别要求", label: "性别要求", _name: "gender", gender: '',options: Object.values(Gender),},
                ]
            }
        },
        async created(){
            setTimeout(async _=>{
                this.schema[0].standard = this.$parent.standard.name;
                let sportCourseQuery = new this.$Client.Query(this.$Client['Course']);
                let $standard = this.$backendService.getParseObject('TrainStandard' , this.$parent.standard.objectId);
                sportCourseQuery.equalTo('standard', $standard);
                sportCourseQuery.equalTo('category', CourseCategory.Sport);
                this.schemaCourseV2.keyOptions = (await this.$backendService.queryListByKeyValue('Course', sportCourseQuery)).list;
            }, 500);
            this.schemaPhysicalLevel.keyOptions = (await this.$backendService.queryListByKeyValue('PhysicalLevel')).list;
        },
        computed:{
            schemaPhysicalLevel(){
                return this.schema.find(item=>item._name === 'physicalLevel')
            },
            schemaCourseV2(){
                return this.schema.find(item=>item._name === 'courseV2')
            },

        },
        methods: {
            beforeSubmit(formData) {
                let deleteList = ['courseV2'];
                formData.standard = this.$parent.standard.objectId;
                let $coursesArr = [];
                this.schemaCourseV2.keyOptions.forEach(item=>{
                    if (formData.courseV2.includes(item.name)) $coursesArr.push(item.objectId);
                });
                formData.courses = [...$coursesArr];
                Object.keys(formData).forEach(item=>{
                    if (deleteList.includes(item)) delete formData[item]
                });
            },
            beforeEdit(row){
                row.standard = this.$parent.standard.name;
                row.courseV2 = [...row.courses].map(item => item.name);

            },
            filterCourse(row) {
                if (_.isEmpty(row.courses)) return '';
                const names = row.courses.map(item => item.name);
                return `${row.itemSeq}. ${names.join('; ')}`;
            }
        },
    }
</script>

