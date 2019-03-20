<!--<template>-->
    <!--<div class="PBFStandard">-->
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
            <!--<el-form-item  label="性别："   prop="gender">-->
                <!--<el-select filterable clearable v-model="formData.gender" placeholder="请选性别">-->
                    <!--<el-option-->
                        <!--v-for="(value,key) in Gender"-->
                        <!--:key="key"-->
                        <!--:label="value"-->
                        <!--:value="value">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item  label="最小年龄：" prop="ageRange">-->
                <!--<el-input-number v-model="formData.ageRange.from"  style="width: 217px" :min="0" :max="100"></el-input-number>-->
            <!--</el-form-item>-->
            <!--<el-form-item  label="最大年龄：" prop="ageRange">-->
                <!--<el-input-number v-model="formData.ageRange.to" style="width: 217px" :min="0" :max="100"></el-input-number>-->
            <!--</el-form-item>-->
            <!--<el-form-item  label="最低体脂(%)：" prop="pbfRange">-->
                <!--<el-input-number v-model="formData.pbfRange.from"  :step="0.1" style="width: 217px" :min="0" :max="100"></el-input-number>-->
            <!--</el-form-item>-->
            <!--<el-form-item  label="最高体脂(%)：" prop="pbfRange">-->
                <!--<el-input-number v-model="formData.pbfRange.to"  :step="0.1"  style="width: 217px" :min="0" :max="100"></el-input-number>-->
            <!--</el-form-item>-->
            <!--<el-form-item>-->
                <!--<el-button :type="btnState?'primary':'warning'" @click="onSubmit('ruleform')">{{btnState?'添加':'修改'}}</el-button>-->
            <!--</el-form-item>-->
        <!--</el-form>-->
        <!--<Filters :props="[Standard,Genders]" placeholder="输入军械名称，将自动搜索" @filterValueIsChange="filterValueIsChange" @querySearchAsync="querySearchAsync"><p></p></Filters>-->

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
                <!--prop="genders"-->
                <!--label="性别(男/女)">-->
                <!--<template slot-scope="scope">-->
                    <!--{{scope.row.gender}}-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--prop="ageRange"-->
                <!--label="年龄范围">-->
                <!--<template slot-scope="scope">-->
                    <!--<span>{{scope.row.ageRange.from+' - '+scope.row.ageRange.to}}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--prop="bmiRange"-->
                <!--label="体脂范围">-->
                <!--<template slot-scope="scope">-->
                    <!--<span>{{scope.row.pbfRange.from+'% - '+scope.row.pbfRange.to + '%'}}</span>-->
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

    <!--// 体脂合格标准-->
    <!--// const PBFStandardSchema = new Schema({-->
    <!--//  standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 训练大纲-->
    <!--//  gender: String,                                 // 性别-->
    <!--//  ageRange: {                                     // 年龄范围-->
    <!--//      from: Number,-->
    <!--//      to: Number-->
    <!--//  },-->
    <!--//  pbfRange: {                                     // 体脂范围,单位百分比-->
    <!--//      from: Number,-->
    <!--//      to: Number-->
    <!--//  }-->
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
                <!--selectSportCategory:[],-->
                <!--TroopCategory,-->
                <!--Gender,-->
                <!--mrssage: 40,-->
                <!--rules:{-->
                    <!--standard:[-->
                        <!--{ required: true, message: '请选择训练大纲',},-->
                    <!--],-->
                    <!--gender: [-->
                        <!--{ required: true, message: '请选择性别', },-->
                    <!--],-->
                    <!--// 'ageRange.from': [-->
                    <!--//     { required: true, message: '请选择性别', },-->
                    <!--// ],-->
                <!--},-->
                <!--Genders:{selects: Gender, value:'', placeholder: '性别', equalObject: {className:'PBFStandard',name:'gender'}},-->
                <!--Standard:{selects: undefined, value:'', valueKey:'objectId', textValue:true, placeholder: '训练大纲', equalObject: {className:'PBFStandard',name:'standard'}},-->
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
        <!--},-->
        <!--computed: {-->
            <!--filterTroopCategory(){-->
                <!--return Object.values(TroopCategory).map(item => ({text: item, value: item}));-->
            <!--},-->
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
                <!--this.search.key = 'ordnanceType';-->
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
                <!--this.formData ={-->
                    <!--...this.cloneDeep(row),-->
                    <!--standard: row.standard.objectId-->
                <!--}-->
            <!--},-->
            <!--initFormData() {-->
                <!--this.formData = {-->
                    <!--standard: '',    // 训练大纲-->
                    <!--gender: '',                                 // 性别-->
                    <!--ageRange: {                                     // 年龄范围-->
                        <!--from: 0,-->
                        <!--to: 40-->
                    <!--},-->
                    <!--pbfRange: {                                     // 体脂范围-->
                        <!--from: 0,-->
                        <!--to: 50-->
                    <!--}-->
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
    <div class="PBFStandard">
        <form-and-table :columns="columns" :schema="schema" ref="formAndTable"> </form-and-table>
    </div>
</template>

<script>
    import formAndTable from '@/pages/common/new-com-formAndTable'
    import {Gender} from '@/lib/Constants'
    // 体脂合格标准
    // const PBFStandardSchema = new Schema({
    //  standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 训练大纲
    //  gender: String,                                 // 性别
    //  ageRange: {                                     // 年龄范围
    //      from: Number,
    //      to: Number
    //  },
    //  pbfRange: {                                     // 体脂范围,单位百分比
    //      from: Number,
    //      to: Number
    //  }
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
                    {prop: 'gender', label: '性别', width: 100},
                    {prop: 'ageRange',
                        label: '年龄范围',
                        handleValue:(value)=>{
                            return `${value.from} - ${value.to}`
                        }},
                    {prop: 'pbfRange',
                        label: '体脂范围(%)',
                        handleValue:(value)=>{
                            return `${value.from} - ${value.to}`
                        }},
                ],
                schema: [
                    {fieldType: "input", placeholder: "训练大纲", label: "训练大纲", _name: "standard", standard: '',disabled:true},
                    {fieldType: "select", placeholder: "性别", label: "性别", _name: "gender", gender: '',options: Object.values(Gender),},
                    {fieldType: "input-number", placeholder: "最小年龄", label: "最小年龄", _name: "ageFrom",ageFrom: 0},
                    {fieldType: "input-number", placeholder: "最大年龄", label: "最大年龄", _name: "ageTo", },
                    {fieldType: "input-number", placeholder: "最小体型", label: "最小体型", _name: "pbfFrom", },
                    {fieldType: "input-number", placeholder: "最大体型", label: "最大体型", _name: "pbfTo", },
                ]
            }
        },
        async created(){
            this.schema[0].standard = this.$parent.standard.name;
        },
        computed:{

        },
        methods: {
            beforeSubmit(formData) {
                const deleteKeys = ['ageFrom','ageTo','pbfFrom','pbfTo'];
                formData.ageRange = {
                    from:formData.ageFrom,
                    to:formData.ageTo,
                };
                formData.pbfRange = {
                    from:formData.pbfFrom,
                    to:formData.pbfTo,
                };
                formData.standard = this.$parent.standard.objectId;
                Object.keys(formData).forEach(key=>{
                    if(deleteKeys.includes(key))delete formData[key]
                })
            },
            beforeEdit(row){
                row.ageFrom = row.ageRange.from;
                row.ageTo = row.ageRange.to;
                row.pbfFrom = row.pbfRange.from;
                row.pbfTo = row.pbfRange.to;
                row.standard = this.$parent.standard.name;
            }
        },
    }
</script>

