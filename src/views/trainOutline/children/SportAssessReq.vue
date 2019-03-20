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
            <!--<el-form-item label="训练课目："  prop="course">-->
                <!--<el-select filterable clearable v-model="formData.course" placeholder="请选择体育课目">-->
                    <!--<el-option-->
                        <!--v-for="item in selectSportCourse"-->
                        <!--:key="item.name"-->
                        <!--:label="item.name"-->
                        <!--:value="item.objectId">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="训练等级："  prop="physicalLevels">-->
                <!--<el-select filterable clearable multiple v-model="formData.physicalLevels" placeholder="请选择训练等级">-->
                    <!--<el-option-->
                        <!--v-for="item in selectPhysicalLevel"-->
                        <!--:key="item.objectId"-->
                        <!--:label="item.name"-->
                        <!--:value="item.name">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item  label="军兵种类型："   prop="troopCategories">-->
                <!--<el-select filterable clearable multiple v-model="formData.troopCategories" placeholder="请选军兵种类型">-->
                    <!--<el-option-->
                        <!--v-for="(value,key) in TroopCategory"-->
                        <!--:key="key"-->
                        <!--:label="value"-->
                        <!--:value="value">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item  label="性别要求："   prop="genders">-->
                <!--<el-select filterable clearable multiple v-model="formData.genders" placeholder="请选性别">-->
                    <!--<el-option-->
                        <!--v-for="(value,key) in Gender"-->
                        <!--:key="key"-->
                        <!--:label="value"-->
                        <!--:value="value">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="其他选项：">-->
                <!--<el-checkbox label="适用文职人员" v-model="formData.isCivilServant" ></el-checkbox>-->

                <!--<el-checkbox label="启用年龄条件" v-model="formData.ageEnabled"></el-checkbox>-->
            <!--</el-form-item>-->
            <!--<el-form-item  label="最小年龄："   v-if="formData.ageEnabled === true" prop="ageCondition">-->
                <!--<el-input-number v-model="formData.ageCondition.fromAge"  style="width: 217px" :min="15" :max="formData.ageCondition.toAge"></el-input-number>-->
            <!--</el-form-item>-->
            <!--<el-form-item  label="最大年龄："   v-if="formData.ageEnabled === true" prop="ageCondition">-->
                <!--<el-input-number v-model="formData.ageCondition.toAge" style="width: 217px":min="formData.ageCondition.fromAge" :max="100"></el-input-number>-->
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
                <!--prop="course"-->
                <!--width="200"-->
                <!--label="体育课目">-->
                <!--<template slot-scope="scope">-->
                    <!--<span>{{ scope.row.course && (scope.row.course.name) }}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--prop="physicalLevel"-->
                <!--label="体能训练等级">-->
                <!--<template slot-scope="scope">-->
                    <!--<el-tag v-for="(item,index) in scope.row.physicalLevels" :key="index" style="margin-right: 5px">-->
                        <!--{{item}}-->
                    <!--</el-tag>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--prop="troopCategory"-->
                <!--label="军兵种类型">-->
                <!--<template slot-scope="scope">-->
                    <!--<el-tag v-for="(item,index) in scope.row.troopCategories" :key="index" style="margin-right: 5px">-->
                        <!--{{item}}-->
                    <!--</el-tag>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--prop="genders"-->
                <!--width="120"-->
                <!--label="性别要求">-->
                <!--<template slot-scope="scope">-->
                    <!--<el-tag v-for="(item,index) in scope.row.genders" :key="index" style="margin-right: 5px">-->
                        <!--{{item}}-->
                    <!--</el-tag>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--prop="required"-->
                <!--width="120"-->
                <!--label="适用文职人员">-->
                <!--<template slot-scope="scope">-->
                    <!--<span v-if="scope.row.isCivilServant === true">是</span>-->
                    <!--<span v-else>否</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--prop="ageEnabled"-->
                <!--width="120"-->
                <!--label="年龄要求">-->
                <!--<template slot-scope="scope">-->
                    <!--<span>{{!scope.row.ageEnabled && '无要求'|| scope.row.ageCondition.fromAge+' - '+scope.row.ageCondition.toAge}}</span>-->
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

    <!--// 课目时间表-->
    <!--// const SportTimeSchema = new Schema({-->
    <!--//  standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 训练大纲-->
    <!--//  course: { type: Schema.Types.ObjectId, ref: 'Course' },              // 体育课目-->
    <!--//  required: Boolean,                                                   // 是否必考,区分必考和选考-->
    <!--//  physicalLevels: [String],                                            // 体能训练等级列表-->
    <!--//  troopCategories: [String],                                            // 军兵种类型列表-->
    <!--//  genders: [String],                                                    // 性别要求列表(男/女)-->
    <!--//  isCivilServant: Boolean,                                              // 是否适用于文职人员-->
    <!--//  ageEnabled: Boolean,                                                  // 是否启用年龄条件-->
    <!--//  ageCondition: {                                                       // 年龄条件-->
    <!--//      fromAge: Number,                                                  // 年龄-->
    <!--//      toAge: Number,                                                    //-->
    <!--//  },-->
    <!--// });-->
    <!--import {Gender, TroopCategory} from 'src/lib/Constants'-->
    <!--import {handle} from 'src/config/mixin'-->
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
                    <!--course:[-->
                        <!--{ required: true, message: '请选择体育课目', },-->
                    <!--],-->
                    <!--physicalLevels:[-->
                        <!--{ required: true, message: '请选择训练等级', },-->
                    <!--],-->
                    <!--troopCategories: [-->
                        <!--{ required: true, message: '请选择军兵种', },-->
                    <!--],-->
                    <!--genders: [-->
                        <!--{ required: true, message: '请选择性别', },-->
                    <!--]-->
                <!--},-->
                <!--Standard:{selects: undefined, value:'', valueKey:'objectId', textValue: true, placeholder: '训练大纲', equalObject: {className:'SportAssessReq',name:'standard'}},-->
                <!--PhysicalLevel:{selects: undefined, value:'', placeholder: '训练等级', equalObject: {className:'SportAssessReq',name:'physicalLevels'}},-->
                <!--TroopCategories:{selects: TroopCategory, value:'', placeholder: '军兵种类型', equalObject: {className:'SportAssessReq',name:'troopCategories'}},-->
                <!--Genders:{selects: Gender, value:'', placeholder: '性别', equalObject: {className:'SportAssessReq',name:'genders'}},-->
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
                    <!--course:  row.course.objectId-->
                <!--}-->
            <!--},-->
            <!--initFormData() {-->
                <!--this.formData = {-->
                     <!--standard: '',              // 训练大纲-->
                     <!--course: '',                // 体育课目-->
                     <!--isCivilServant: false,-->
                     <!--physicalLevels: [],-->
                     <!--troopCategories: [],-->
                     <!--genders: [],-->
                     <!--ageEnabled: false,-->
                     <!--ageCondition: {-->
                         <!--fromAge: 0,-->
                         <!--toAge: 40,-->
                     <!--},-->
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
    import comRender from '@/pages/common/com-render'
    import formAndTable from '@/pages/common/new-com-formAndTable'
    import {Gender, CourseCategory, TroopCategory} from '@/lib/Constants'
    // 课目时间表
    // const SportTimeSchema = new Schema({
    //  standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 训练大纲
    //  course: { type: Schema.Types.ObjectId, ref: 'Course' },              // 体育课目
    //  required: Boolean,                                                   // 是否必考,区分必考和选考
    //  physicalLevels: [String],                                            // 体能训练等级列表
    //  troopCategories: [String],                                            // 军兵种类型列表
    //  genders: [String],                                                    // 性别要求列表(男/女)
    //  isCivilServant: Boolean,                                              // 是否适用于文职人员
    //  ageEnabled: Boolean,                                                  // 是否启用年龄条件
    //  ageCondition: {                                                       // 年龄条件
    //      fromAge: Number,                                                  // 年龄
    //      toAge: Number,                                                    //
    //  },
    // });
    export default {
        name: "category",
        components: {
            formAndTable
        },
        data() {
            return {
                columns: [
                    {prop: 'standard',label: '训练大纲',handleValue:(value)=> value && value.name},
                    {prop: 'course', label: '体育课目', handleValue: (val=>{return val && val.name})},
                    // {prop: 'required', label: '是否必考', handleValue: (val=>{return !val ? '选考' : '必考'})},
                    {prop: 'physicalLevels', label: '体能训练等级', component: comRender},
                    {prop: 'troopCategories', label: '军兵种类型', component: comRender},
                    {prop: 'genders', label: '性别要求',  width: 100, component: comRender},
                    {prop: 'isCivilServant', label: '文职人员', width: 80,  handleValue: (val=>{return !val ? '否' : '是'})},
                    {prop: 'ageCondition', label: '年龄要求', width: 120,  handleValue: ((val, row)=>{return !row.ageEnabled ? '无要求' : `${val.fromAge}-${val.toAge}`})},
                ],
                schema: [
                    {fieldType: "input", placeholder: "训练大纲", label: "训练大纲", _name: "standard", standard: '',disabled:true},
                    {fieldType: "select", placeholder: "体育课目", label: "体育课目", _name: "courseV2", courseV2: '',keyOptions: [],},
                    {fieldType: "select", placeholder: "训练等级", label: "训练等级", _name: "physicalLevels", physicalLevels: [],keyOptions: [], multiple: true},
                    {fieldType: "select", placeholder: "军兵种类型", label: "军兵种类型", _name: "troopCategories", troopCategories: [],options: Object.values(TroopCategory), multiple: true},
                    {fieldType: "select", placeholder: "性别要求", label: "性别要求", _name: "genders", genders: [],options: Object.values(Gender), multiple: true},
                    {fieldType: "checkbox", placeholder: "文职人员", label: "文职人员", _name: "isCivilServant", isCivilServant: false,border:true,},
                    {fieldType: "checkbox", placeholder: "启用年龄条件", label: "启用年龄条件", _name: "ageEnabled", ageEnabled: false,border:true},
                    {fieldType: "input", placeholder: "最低年龄", label: "最低年龄", _name: "fromAge", fromAge: undefined,disabled:true, },
                    {fieldType: "input", placeholder: "最高年龄", label: "最高年龄", _name: "toAge", toAge: undefined,disabled:true},
                ]
            }
        },
        async created(){
            this.schemaPhysicalLevel.keyOptions = (await this.$backendService.queryListByKeyValue('PhysicalLevel')).list;
            setTimeout(async _=>{
                this.schema[0].standard = this.$parent.standard.name;
                this.schema[0].standard = this.$parent.standard.name;
                let sportCourseQuery = new this.$Client.Query(this.$Client['Course']);
                let $standard = this.$backendService.getParseObject('TrainStandard' , this.$parent.standard.objectId);
                sportCourseQuery.equalTo('standard', $standard);
                sportCourseQuery.equalTo('category', CourseCategory.Sport);
                this.schemaCourseV2.keyOptions = (await this.$backendService.queryListByKeyValue('Course', sportCourseQuery)).list;
            }, 500);
        },
        watch: {
            'schemaAgeEnabled.ageEnabled':{
                handler(val) {
                    this.schemaFromAge.disabled = !val ? true : false;
                    this.schemaToAge.disabled = !val ? true : false;
                    this.schemaFromAge.fromAge = !val ?  '': this.schemaFromAge.fromAge;
                    this.schemaToAge.toAge = !val ? '' : this.schemaToAge.toAge;
                },
                immediate: true
            }
        },
        computed:{
            schemaPhysicalLevel(){
                return this.schema.find(item=>item._name === 'physicalLevels')
            },
            schemaCourseV2(){
                return this.schema.find(item=>item._name === 'courseV2')
            },
            schemaAgeEnabled(){
                return this.schema.find(item=>item._name === 'ageEnabled')
            },
            schemaFromAge(){
                return this.schema.find(item=>item._name === 'fromAge')
            },
            schemaToAge(){
                return this.schema.find(item=>item._name === 'toAge')
            },
        },
        methods: {
            beforeSubmit(formData) {
                let deleteList = ['fromAge', 'toAge'];
                formData.standard = this.$parent.standard.objectId;
                formData.course = (this.schemaCourseV2.keyOptions.find(item=>{return item.name === formData.courseV2}) || {}).objectId;
                formData.ageCondition = {
                    fromAge: formData.ageEnabled ? parseInt(formData.fromAge) : 0,
                    toAge: formData.ageEnabled ? parseInt(formData.toAge) : 0,
                };
                Object.keys(formData).forEach(item=>{
                    if (deleteList.includes(item)) delete formData[item]
                });
            },
            beforeEdit(row){
                row.standard = this.$parent.standard.name;
                row.courseV2 = row.course && row.course.name;
                row.fromAge = !row.ageEnabled ? '' :row.ageCondition.fromAge;
                row.toAge = !row.ageEnabled ? '' :row.ageCondition.toAge;
            }
        },
    }
</script>

