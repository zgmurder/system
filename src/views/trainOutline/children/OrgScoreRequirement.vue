<!--<template>-->
    <!--<div class="OrgScoreRequirement">-->
        <!--<el-form inline :model="formData" ref="ruleform" :rules="rules" class="formData" v-show="wrapperVisible">-->
            <!--<el-form-item label="大纲名称"  prop="standard">-->
                <!--<el-select v-model="formData.standard" placeholder="请选择大纲标准">-->
                    <!--<el-option-->
                        <!--v-for="item in selectStandard"-->
                        <!--:key="item.name"-->
                        <!--:label="item.name"-->
                        <!--:value="item.objectId">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="单位分类" prop="orgCategory">-->
                <!--<el-select v-model="formData.orgCategory" filterable placeholder="单位分类">-->
                    <!--<el-option-->
                        <!--v-for="item in selectorgCategory"-->
                        <!--:key="item.objectId"-->
                        <!--:label="item.name"-->
                        <!--:value="item.name">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="最低要求">-->
                <!--&lt;!&ndash; <el-input v-model="formData.scoreReq" ></el-input> &ndash;&gt;-->
                <!--<el-select v-model="formData.scoreReq">-->
                    <!--<el-option-->
                        <!--v-for="(value,index) in ScoreCriteria.Level4.optionalScores"-->
                        <!--:label="value"-->
                        <!--:key="value"-->
                        <!--:value="(index+1)">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item>-->
                <!--<el-button :type="btnState?'primary':'warning'" @click="onSubmit('ruleform')">{{btnState?'添加':'修改'}}</el-button>-->
            <!--</el-form-item>-->
        <!--</el-form>-->
        <!--<Filters :props="[Standard,OrgCategory]" placeholder="输入体育课目，将自动搜索" @filterValueIsChange="filterValueIsChange" @querySearchAsync="querySearchAsync"><p></p></Filters>-->

        <!--<el-table-->
            <!--:data="tableData"-->
            <!--border-->
            <!--stripe-->
            <!--:max-height="maxTableHegith"-->
            <!--style="width: 100%">-->
            <!--<el-table-column-->
                <!--label="大纲名称">-->
                <!--<template slot-scope="scope">-->
                    <!--<div slot="reference" class="describe-wrapper">-->
                        <!--{{ scope.row.standard&&scope.row.standard.name }}-->
                    <!--</div>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--label="单位分类">-->
                <!--<template slot-scope="scope">-->
                    <!--<div slot="reference" class="describe-wrapper">-->
                        <!--{{ scope.row.orgCategory}}-->
                    <!--</div>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--label="最低要求">-->
                <!--<template slot-scope="scope">-->
                    <!--<div slot="reference" class="describe-wrapper">-->
                        <!--{{ scope.row.scoreReq > 0 ? ScoreCriteria.Level4.optionalScores[scope.row.scoreReq-1] : '' }}-->
                    <!--</div>-->
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

<!--// 单位训练质量指标要求-->
<!--// const OrgScoreRequirementSchema = new Schema({-->
<!--//  standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 训练大纲-->
<!--//  orgCategory: String,                            // 单位分类-->
<!--//  scoreReq: Number,                              // 最低成绩要求-->
<!--// });-->
<!--import {handle} from 'src/config/mixin'-->
<!--import {ScoreCriteria } from 'src/lib/Constants'-->
<!--import Filters from 'src/pages/common/Filters.vue'-->
<!--import Client from 'src/lib/Client'-->
    <!--export default {-->
        <!--mixins:[handle],-->
        <!--components:{-->
            <!--Filters-->
        <!--},-->
        <!--data() {-->
            <!--return {-->
                <!--rules:{-->
                    <!--standard:[-->
                        <!--{ required: true, message: '请输入大纲名称', trigger: 'blur' },-->
                    <!--],-->
                    <!--orgCategory:[-->
                        <!--{ required: true, message: '请输入单位分类', trigger: 'blur' },-->
                    <!--]-->
                <!--},-->
                <!--ScoreCriteria,-->
                <!--selectStandard:[],-->
                <!--selectorgCategory:[],-->
                <!--OrgCategory: {selects: undefined, value:'',  placeholder: '单位分类', equalObject: {className:'OrgScoreRequirement',name:'orgCategory'}},-->
                <!--Standard:{selects: undefined, value:'', valueKey:'objectId', textValue: true, placeholder: '训练大纲', equalObject: {className:'OrgScoreRequirement',name:'standard'}},-->
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
            <!--this.triggerSelect('OrgCategory').then(result=>{-->
                <!--this.OrgCategory.selects = result.list;-->
                <!--this.selectorgCategory = result.list;-->
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
            <!--initFormData(){-->
                <!--this.formData = {-->
                    <!--standard:'',-->
                    <!--orgCategory:'',-->
                    <!--scoreReq:2-->
               <!--};-->
            <!--}-->
        <!--}-->

    <!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->

<template>
    <div class="OrgScoreRequirement">
        <form-and-table :columns="columns" :schema="schema" ref="formAndTable"> </form-and-table>
    </div>
</template>

<script>
    import formAndTable from '@/pages/common/new-com-formAndTable'
    import {ScoreCriteria2, ScoreCriteria} from '@/lib/Constants'
    // const OrgScoreRequirementSchema = new Schema({
    //  standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 训练大纲
    //  orgCategory: String,                            // 单位分类
    //  scoreReq: Number,                              // 最低成绩要求
    // });
    export default {
        name: "category",
        components: {
            formAndTable,
        },
        data() {
            return {
                columns: [
                    {prop: 'standard',label: '训练大纲',handleValue:(value)=> value && value.name},
                    {prop: 'orgCategory', label: '单位分类'},
                    {prop: 'scoreReq',
                        label: '最低成绩要求',
                        handleValue:(value)=>{
                            return ScoreCriteria2.Level4.optionalScores[value];
                        }
                    },

                ],
                schema: [
                    {fieldType: "input", placeholder: "训练大纲", label: "训练大纲", _name: "standard", standard: '',disabled:true},
                    {fieldType: "select", placeholder: "单位分类", label: "单位分类", _name: "orgCategory", orgCategory: '',keyOptions: [],},
                    {fieldType: "select", placeholder: "最低要求", label: "最低要求", _name: "scoreReqV2", scoreReqV2: '',options: ScoreCriteria.Level4.optionalScores,},
                ]
            }
        },
        async created(){
            this.schema[0].standard = this.$parent.standard.name;
            this.schemaOrgCategory.keyOptions = (await this.$backendService.queryListByKeyValue('OrgCategory')).list;
        },
        computed:{
            schemaOrgCategory(){
                return this.schema.find(item=>item._name === 'orgCategory')
            },
        },
        methods: {
            beforeSubmit(formData) {
                let deletesKeys = ['scoreReqV2',];
                formData.scoreReq = ScoreCriteria2.Level4.optionalScores.findIndex(item=>item === formData.scoreReqV2);
                formData.standard = this.$parent.standard.objectId;
                Object.keys(formData).forEach(item=>{
                    if (deletesKeys.includes(item)) delete formData[item];
                })
            },
            beforeEdit(row){
                row.scoreReqV2 = ScoreCriteria2.Level4.optionalScores[row.scoreReq];
                row.standard = this.$parent.standard.name;
            },
        },
    }
</script>
