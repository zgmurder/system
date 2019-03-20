<!--<template>-->
    <!--<div class="PoliticsCourse">-->
        <!--<el-form inline :model="formData" ref="ruleform" :rules="rules" class="formData" v-show="wrapperVisible" label-width="100px">-->

            <!--<el-form-item label="训练课目"  prop="name">-->
                <!--<el-input v-model="formData.name" style="width: 217px" placeholder="课目名称"></el-input>-->
            <!--</el-form-item>-->

            <!--<el-form-item label="课目序号"  prop="seq">-->
                <!--<el-input-number v-model="formData.seq" style="width: 217px" :min="0"></el-input-number>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="场地要求"  prop="placeTypes">-->
                <!--<el-select filterable multiple v-model="formData.placeTypes" placeholder="训练场地要求" @focus="triggerSelect('PlaceType','selectPlaceType')">-->
                    <!--<el-option-->
                        <!--v-for="item in selectPlaceType"-->
                        <!--:key="item.objectId"-->
                        <!--:label="item.name"-->
                        <!--:value="item.name">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item>-->
                <!--<el-button :type="btnState?'primary':'warning'" @click="onSubmit('ruleform')">{{btnState?'添加':'修改'}}</el-button>-->
            <!--</el-form-item>-->
        <!--</el-form>-->
        <!--<Filters :props="[PlaceTypes]" placeholder="输入课目名称，将自动搜索" @filterValueIsChange="filterValueIsChange" @querySearchAsync="querySearchAsync"></Filters>-->

        <!--<el-table-->
            <!--:data="tableData"-->
            <!--border-->
            <!--:max-height="maxTableHegith"-->
            <!--style="width: 100%">-->

            <!--<el-table-column-->
                <!--:show-overflow-tooltip="true"-->
                <!--label="训练课目" width="200">-->
                <!--<template slot-scope="scope">-->
                    <!--<span>{{ `${scope.row.seq}. ${scope.row.name}` }}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--:show-overflow-tooltip="true"-->
                <!--label="场地要求">-->
                <!--<template slot-scope="scope">-->
                    <!--<el-tag v-if="scope.row.placeTypes.length"-->
                            <!--v-for="(item,index) in scope.row.placeTypes"-->
                            <!--size="mini"-->
                            <!--type="danger"-->
                            <!--:key="index">-->
                        <!--{{item}}-->
                    <!--</el-tag>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="操作" align="right" width="150">-->
                <!--<template slot-scope="scope">-->
                    <!--<el-button-->
                        <!--size="mini"-->
                        <!--@click="handleEdit(scope.row)">编辑</el-button>-->
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

    <!--// 政治课目-->
    <!--// const CourseTimeSchema = new Schema({-->
    <!--// 	name: { type: String, required: true },         // 课目名称-->
    <!--//  seq: Number,                                    // 课目序号-->
    <!--//  course: { type: Schema.Types.ObjectId, ref: 'Course' },    // 训练课目-->
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
                <!--selectOrgType:OrgType,-->
                <!--selectPersonType:PersonProperty,-->
                <!--rules:{-->
                    <!--name:[-->
                        <!--{ required: true, message: '请输入课目名称' },-->
                    <!--],-->
                    <!--seq:[-->
                        <!--{ required: true, message: '请输入课目序号'},-->
                    <!--],-->
                    <!--course:[-->
                        <!--{ required: true, message: '请选择训练课目'},-->
                    <!--],-->
                <!--},-->
                <!--selectCourse:[],-->
                <!--selectPlaceType:[],-->
                <!--PlaceTypes:{selects:undefined, value:'', placeholder: '训练场地', equalObject: {className:'PoliticsCourse',name:'placeTypes'}},-->
                <!--equalObject: undefined,-->
                <!--search: {-->
                    <!--key: '',-->
                    <!--value: ''-->
                <!--},-->
            <!--}-->
        <!--},-->
        <!--watch:{-->

        <!--},-->
        <!--created(){-->
            <!--this.triggerSelect('PlaceType').then(result => {-->
                <!--this.PlaceTypes.selects = result.list;-->
            <!--});-->
        <!--},-->
        <!--methods: {-->
            <!--handleQuery(filterObj,className = this.className) {-->
                <!--if(!filterObj)return this.query(className);-->
                <!--let [parentQuery, childQuery, childName] = [];-->
                <!--filterObj.map(item=>{-->
                    <!--parentQuery = parentQuery || this.query(className);-->
                    <!--parentQuery.equalTo(item.name,item.value);-->
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
            <!--initFormData() {-->
                <!--this.formData = {-->
                    <!--name: '',              // 课目名称-->
                    <!--seq: 0,                // 课目序号-->
                    <!--course:'',             // 训练课目-->
                    <!--placeTypes:[],-->
                <!--};-->
            <!--},-->
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
    <div class="PoliticsCourse">
        <form-and-table :columns="columns" :schema="schema" ref="formAndTable"> </form-and-table>
    </div>
</template>

<script>
    import formAndTable from '@/pages/common/new-com-formAndTable'
    import {Gender} from '@/lib/Constants'
    // 政治课目
    // const CourseTimeSchema = new Schema({
    // 	name: { type: String, required: true },         // 课目名称
    //  seq: Number,                                    // 课目序号
    //  course: { type: Schema.Types.ObjectId, ref: 'Course' },    // 训练课目
    // });
    export default {
        name: "category",
        components: {
            formAndTable
        },
        data() {
            return {
                columns: [
                    {prop: 'name', label: '课目名称', handleValue:(val, row)=>{return `${row.seq}.${row.name}`}},
                    {prop: 'placeTypes', label: '场地要求', handleValue:(value)=>{return value.join('，')}},
                ],
                schema: [
                    {fieldType: "input", placeholder: "课目名称", label: "课目名称", _name: "name", name: '',},
                    {fieldType: "input-number", placeholder: "课目序号", label: "课目序号", _name: "seq",seq: 0},
                    {fieldType: "select", placeholder: "场地要求", label: "场地要求", _name: "placeTypes", placeTypes: [], keyOptions: [], multiple: true,},
                ]
            }
        },
        async created(){
            this.schema[0].standard = this.$parent.standard.name;
            this.schemaPlaceTypes.keyOptions = (await this.$backendService.queryListByKeyValue('PlaceType')).list;
        },
        computed:{
            schemaPlaceTypes(){
                return this.schema.find(item=>item._name === 'placeTypes')
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
