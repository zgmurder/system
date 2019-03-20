<!--<template>-->
    <!--<div class="PersonScoreRequirement">-->
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
            <!--<el-form-item label="人员信息" prop="personProperty">-->
                <!--<el-select v-model="formData.personProperty" filterable placeholder="请选择人员信息" >-->
                    <!--<el-option-->
                        <!--v-for="value in PersonProperty"-->
                        <!--:key="value"-->
                        <!--:label="value"-->
                        <!--:value="value">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="军衔等级">-->
                <!--<el-select v-model="formData.ranks" filterable multiple  @focus="triggerMilitaryRankSelect()">-->
                    <!--<el-option-->
                        <!--v-for="item in selectRanks"-->
                        <!--:key="item"-->
                        <!--:label="item"-->
                        <!--:value="item">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="年限范围">-->
                <!--<el-col :span="6">-->
                    <!--<el-input v-model="formData.yearRange.start" size="4"></el-input>-->
                <!--</el-col>-->
                <!--<el-col class="line" :span="1">-</el-col>-->
                <!--<el-col :span="12">-->
                    <!--<el-input v-model="formData.yearRange.end" size="4">-->
                        <!--<template slot="append">年</template>-->
                    <!--</el-input>-->
                <!--</el-col>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="成绩要求">-->
                <!--<el-select v-model="formData.scoreReq" >-->
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
        <!--<Filters :props="[Standard,PersonProperties,Ranks]" placeholder="输入体育课目，将自动搜索" @filterValueIsChange="filterValueIsChange" @querySearchAsync="querySearchAsync"><p></p></Filters>-->

        <!--<el-table-->
            <!--:data="tableData"-->
            <!--border-->
            <!--stripe-->
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
                <!--label="人员信息">-->
                <!--<template slot-scope="scope">-->
                    <!--<div slot="reference" class="describe-wrapper">-->
                        <!--{{ scope.row.personProperty}}-->
                    <!--</div>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--label="军衔等级">-->
                <!--<template slot-scope="scope">-->
                    <!--<div slot="reference" class="describe-wrapper">-->
                        <!--{{ scope.row.ranks|disRanks}}-->
                    <!--</div>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--label="年限范围">-->
                <!--<template slot-scope="scope">-->
                    <!--<div slot="reference" class="describe-wrapper">-->
                        <!--{{ scope.row.yearRange.start}}-{{ scope.row.yearRange.end}}年-->
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
        <!--<div class="shadeBox" :class="{'shadeBox-wrapper':wrapperVisible}" @click="closeModal"></div>-->
    <!--</div>-->
<!--</template>-->

<!--<script>-->

<!--// 个人训练质量指标要求-->
<!--// const PersonScoreRequirementSchema = new Schema({-->
<!--//  standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 训练大纲-->
<!--//  personProperty: String,                            // 人员属性-->
<!--//  ranks: [String],                              // 军衔等级列表-->
<!--//  yearRange: {                                    // 任职年限范围-->
<!--//      start: Number,                              // 比如0-2年, 2年以上等-->
<!--//      end: Number,-->
<!--//  },-->
<!--//  scoreReq: Number,                               // 成绩要求-->
<!--// });-->
<!--import {handle} from 'src/config/mixin'-->
<!--import {PersonProperty,ScoreCriteria } from 'src/lib/Constants'-->
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
                <!--PersonProperty,-->
                <!--selectStandard:[],-->
                <!--selectRanks:[],-->
                <!--selMilitaryRank:[],-->
                <!--Ranks:{selects: undefined, value:'',  placeholder: '军衔', equalObject: {className:'PersonScoreRequirement',name:'ranks'}},-->
                <!--PersonProperties: {selects: PersonProperty, value:'',  placeholder: '人员信息', equalObject: {className:'PersonScoreRequirement',name:'personProperty'}},-->
                <!--Standard:{selects: undefined, value:'', valueKey:'objectId', textValue: true, placeholder: '训练大纲', equalObject: {className:'PersonScoreRequirement',name:'standard'}},-->
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
            <!--this.triggerSelect('MilitaryRank').then(result=>{-->
                <!--this.Ranks.selects = result.list;-->
            <!--});-->
        <!--},-->
        <!--filters: {-->
            <!--disRanks: function (value) {-->
                <!--if (!value) return '';-->
                <!--return value.toString();-->
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
                    <!--personProperty:'',-->
                    <!--ranks:[],-->
                    <!--yearRange:{-->
                        <!--start: 0,-->
                        <!--end: 1,-->
                    <!--},-->
                    <!--scoreReq:2-->
               <!--};-->
            <!--},-->
            <!--triggerMilitaryRankSelect() {-->
                <!--this.selMilitaryRank = this.triggerSelect;-->
                <!--this.queryList('MilitaryRank').then(result=>{-->
                    <!--this.selMilitaryRank = result.list;-->
                    <!--this.selectRanks = (result.list.map(item => item.name));-->
                <!--})-->
            <!--}-->
        <!--}-->

    <!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->

<template>
    <div class="PersonScoreRequirement">
        <form-and-table :columns="columns" :schema="schema" ref="formAndTable"> </form-and-table>
    </div>
</template>

<script>
    import comRender from '@/pages/common/com-render'
    import formAndTable from '@/pages/common/new-com-formAndTable'
    import {ScoreCriteria2, ScoreCriteria, PersonProperty} from '@/lib/Constants'
    // 个人训练质量指标要求
    // const PersonScoreRequirementSchema = new Schema({
    //  standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 训练大纲
    //  personProperty: String,                            // 人员属性
    //  ranks: [String],                              // 军衔等级列表
    //  yearRange: {                                    // 任职年限范围
    //      start: Number,                              // 比如0-2年, 2年以上等
    //      end: Number,
    //  },
    //  scoreReq: Number,                               // 成绩要求
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
                    {prop: 'personProperty', label: '人员属性'},
                    {prop: 'ranks', label: '军衔等级', component: comRender},
                    {prop: 'yearRange', label: '任职年限范围',handleValue:(value)=>{return `${value.start}-${value.end}年`}},
                    {prop: 'scoreReq',
                        label: '最低成绩要求',
                        width: 120,
                        handleValue:(value)=>{
                            return ScoreCriteria2.Level4.optionalScores[value];
                        }
                    },

                ],
                schema: [
                    {fieldType: "input", placeholder: "训练大纲", label: "训练大纲", _name: "standard", standard: '',disabled:true},
                    {fieldType: "select", placeholder: "人员属性", label: "人员属性", _name: "personProperty", personProperty: '',options: Object.values(PersonProperty),},
                    {fieldType: "select", placeholder: "军衔等级", label: "军衔等级", _name: "ranks", ranks: [],options: [], multiple: true},
                    {fieldType: "input-number", placeholder: "最低年限", label: "最低年限", _name: "start", start: 0,},
                    {fieldType: "input-number", placeholder: "最高年限", label: "最高年限", _name: "end", end: 0},
                    {fieldType: "select", placeholder: "最低要求", label: "最低要求", _name: "scoreReqV2", scoreReqV2: '',options: ScoreCriteria.Level4.optionalScores,},
                ]
            }
        },
        async created(){
            this.schema[0].standard = this.$parent.standard.name;
            this.schemaRanks.options = (await this.$backendService.queryListByKeyValue('MilitaryRank')).list.map(item=>item.name);
        },
        computed:{
            schemaRanks(){
                return this.schema.find(item=>item._name === 'ranks')
            },
        },
        methods: {
            beforeSubmit(formData) {
                let deletesKeys = ['start', 'end'];
                formData.yearRange = {
                    start : formData.start,
                    end : formData.end,
                };
                formData.scoreReq = ScoreCriteria2.Level4.optionalScores.findIndex(item=>item === formData.scoreReqV2);
                formData.standard = this.$parent.standard.objectId;
                Object.keys(formData).forEach(item=>{
                    if (deletesKeys.includes(item)) delete formData[item];
                })
            },
            beforeEdit(row){
                row.scoreReqV2 = ScoreCriteria2.Level4.optionalScores[row.scoreReq];
                row.standard = this.$parent.standard.name;
                row.start = row.yearRange.start;
                row.end = row.yearRange.end;
            },
        },
    }
</script>
