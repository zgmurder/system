<!--<template>-->
    <!--<div class="SportCourseTime">-->
        <!--<el-form inline :model="formData" ref="ruleform" :rules="rules" class="formData" v-show="wrapperVisible" label-width="100px">-->
            <!--<el-form-item label="大纲标准"  prop="standard">-->
                <!--<el-select clearable v-model="formData.standard" placeholder="请选择大纲标准">-->
                    <!--<el-option-->
                        <!--v-for="item in selectStandard"-->
                        <!--:key="item.name"-->
                        <!--:label="item.name"-->
                        <!--:value="item.objectId">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="课目分类"  prop="sportCategory">-->
                <!--<el-select filterable clearable v-model="formData.sportCategory" placeholder="请选择训练课目">-->
                    <!--<el-option-->
                        <!--v-for="item in selectSportCategory"-->
                        <!--:key="item.objectId"-->
                        <!--:label="item.name"-->
                        <!--:value="item.name">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="训练等级"  prop="physicalLevel">-->
                <!--<el-select filterable clearable v-model="formData.physicalLevel" placeholder="请选择训练等级">-->
                    <!--<el-option-->
                        <!--v-for="item in selectPhysicalLevel"-->
                        <!--:key="item.objectId"-->
                        <!--:label="item.name"-->
                        <!--:value="item.name">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="训练时间"  prop="hour">-->
                <!--<el-input-number v-model="formData.hour" style="width: 217px" :min="0"></el-input-number>-->
            <!--</el-form-item>-->

            <!--<el-form-item>-->
                <!--<el-button :type="btnState?'primary':'warning'" @click="onSubmit('ruleform')">{{btnState?'添加':'修改'}}</el-button>-->
            <!--</el-form-item>-->
        <!--</el-form>-->
        <!--<Filters :props="[Standard,PhysicalLevel]" placeholder="输入课目分类，将自动搜索" @filterValueIsChange="filterValueIsChange" @querySearchAsync="querySearchAsync"></Filters>-->

        <!--<el-table-->
            <!--:data="tableData"-->
            <!--border-->
            <!--:max-height="maxTableHegith"-->
            <!--style="width: 100%">-->
            <!--<el-table-column-->
                <!--prop="standard"-->
                <!--label="训练大纲">-->
                <!--<template slot-scope="scope">-->
                    <!--<span>{{ scope.row.standard && scope.row.standard.name }}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--prop="sportCategory"-->
                <!--:show-overflow-tooltip="true"-->
                <!--label="课目分类">-->
                <!--<template slot-scope="scope">-->
                    <!--<span>{{ scope.row.sportCategory}}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--prop="physicalLevel"-->
                <!--label="体能训练等级">-->
                <!--<template slot-scope="scope">-->
                    <!--<span>{{ scope.row.physicalLevel}}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--prop="hour"-->
                <!--label="训练时间(小时)">-->
                <!--<template slot-scope="scope">-->
                    <!--<span>{{ scope.row.hour}}</span>-->
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

    <!--// 体育课目时间表-->
    <!--// const SportTimeSchema = new Schema({-->
    <!--//  standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 训练大纲-->
    <!--// 	sportCategory: String,                                  // 体育科目分类-->
    <!--//  physicalLevel: String,                                  // 体能训练等级-->
    <!--//  hours: Number,                                          // 时间要求-->
    <!--// });-->
    <!--import {OrgType,PersonProperty} from 'src/lib/Constants'-->
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
                <!--selectSportCategory:[],-->
                <!--rules:{-->
                    <!--hour:[-->
                        <!--{ required: true, message: '请输入时间',},-->
                    <!--],-->
                    <!--standard:[-->
                        <!--{ required: true, message: '请选择训练大纲',},-->
                    <!--],-->
                    <!--sportCategory:[-->
                        <!--{ required: true, message: '请选择体育课目', },-->
                    <!--],-->
                    <!--physicalLevel:[-->
                        <!--{ required: true, message: '请选择训练等级', },-->
                    <!--],-->
                <!--},-->
                <!--Standard:{selects: undefined, value:'', valueKey:'objectId', textValue: true, placeholder: '训练大纲', equalObject: {className:'SportCourseTime',name:'standard'}},-->
                <!--PhysicalLevel:{selects: undefined, value:'', placeholder: '训练等级', equalObject: {className:'SportCourseTime',name:'physicalLevel'}},-->
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
            <!--this.triggerSelect('SportCategory').then(result=>{-->
                <!--this.selectSportCategory = result.list;-->
            <!--});-->
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
                <!--this.search.key = 'sportCategory';-->
                <!--this.search.value = string;-->
                <!--this.equalObject = undefined;-->
                <!--this.changePage(0);-->
            <!--},-->
            <!--async changePage(curPage,pageSize){-->
                <!--let query = this.handleQuery(this.equalObject);-->
                <!--if (this.search.value&&this.search.value.length>0) {-->
                    <!--query.contains(this.search.key,this.search.value);-->
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
            <!--handleEditCallback(row){-->
                <!--this.formData = {-->
                    <!--...row,-->
                    <!--standard: row.standard.objectId-->
                <!--}-->
            <!--},-->
            <!--initFormData() {-->
                <!--this.formData = {-->
                    <!--standard: '',          // 训练大纲-->
                    <!--physicalLevel:'',      // 训练等级-->
                    <!--sportCategory: '',     // 体育课目分类-->
                    <!--hours: 0-->
                <!--}-->
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
    <div class="SportTime">
        <form-and-table :columns="columns" :schema="schema" ref="formAndTable"> </form-and-table>
    </div>
</template>

<script>
    import formAndTable from '@/pages/common/new-com-formAndTable'
    import {Gender} from '@/lib/Constants'
    // 体育课目时间表
    // const SportTimeSchema = new Schema({
    //  standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 训练大纲
    // 	sportCategory: String,                                  // 体育科目分类
    //  physicalLevel: String,                                  // 体能训练等级
    //  hours: Number,                                          // 时间要求
    // });
    export default {
        name: "category",
        components: {
            formAndTable
        },
        data() {
            return {
                columns: [
                    {prop: 'standard', label: '训练大纲', handleValue:val=>val && val.name},
                    {prop: 'sportCategory', label: '课目分类'},
                    {prop: 'physicalLevel', label: '训练等级'},
                    {prop: 'hour', label: '时间要求（小时）'},
                ],
                schema: [
                    {fieldType: "input", placeholder: "训练大纲", label: "训练大纲", _name: "standard", standard: '',disabled:true},
                    {fieldType: "select", placeholder: "课目分类", label: "课目分类", _name: "sportCategory", sportCategory: '',keyOptions: [],},
                    {fieldType: "select", placeholder: "训练等级", label: "训练等级", _name: "physicalLevel", physicalLevel: '',keyOptions: [],},
                    {fieldType: "input-number", placeholder: "时间要求", label: "时间要求", _name: "hour",hour: 0},
                ]
            }
        },
        async created(){
            setTimeout(_=>{this.schema[0].standard = this.$parent.standard.name},500);
            this.schemaPhysicalLevel.keyOptions = (await this.$backendService.queryListByKeyValue('PhysicalLevel')).list;
            this.schemaSportCategory.keyOptions = (await this.$backendService.queryListByKeyValue('SportCategory')).list;
        },
        computed:{
            schemaPhysicalLevel(){
                return this.schema.find(item=>item._name === 'physicalLevel')
            },
            schemaSportCategory(){
                return this.schema.find(item=>item._name === 'sportCategory')
            },
        },
        methods: {
            beforeSubmit(formData) {
                formData.standard = this.$parent.standard.objectId;
            },
            beforeEdit(row){
                row.standard = this.$parent.standard.name;
            }
        },
    }
</script>

