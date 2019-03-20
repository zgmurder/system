<!--<template>-->
    <!--<div class="BulletRequirement">-->
        <!--<el-form inline :model="formData" ref="ruleform" :rules="rules" class="formData" v-show="wrapperVisible">-->
            <!--<el-form-item label="大纲名称"  prop="standard">-->
                <!--<el-select clearable v-model="formData.standard" placeholder="请选择大纲标准">-->
                    <!--<el-option-->
                        <!--v-for="item in selectStandard"-->
                        <!--:key="item.name"-->
                        <!--:label="item.name"-->
                        <!--:value="item.objectId">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="单位分类" prop="orgCategory">-->
                <!--<el-select filterable clearable v-model="formData.orgCategory" placeholder="单位分类">-->
                    <!--<el-option-->
                        <!--v-for="item in selectorgCategory"-->
                        <!--:key="item.objectId"-->
                        <!--:label="item.name"-->
                        <!--:value="item.name">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="军械名称">-->
                <!--<el-select filterable clearable v-model="formData.ordnanceType"   placeholder="名称">-->
                    <!--<el-option-->
                        <!--v-for="item in selOrdnanceType"-->
                        <!--:key="item.objectId"-->
                        <!--:label="item.name"-->
                        <!--:value="item.name">-->
                    <!--</el-option>-->
                    <!--&lt;!&ndash; {{selOrdnanceType}} &ndash;&gt;-->
                <!--</el-select>-->
            <!--</el-form-item>-->

            <!--<el-form-item label="数量单位" >-->
                <!--<el-select clearable v-model="formData.bulletReq.numType"  placeholder="数量单位请选择">-->
                    <!--<el-option-->
                        <!--v-for="value in BulletNumType"-->
                        <!--:key="value"-->
                        <!--:label="value"-->
                        <!--:value="value">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="数量指标" >-->
                <!--<el-input v-model="formData.bulletReq.quota" size="4">-->
                    <!--<template slot="append">{{unitBybullet}}/{{numBybullet}}</template>-->
                <!--</el-input>-->
            <!--</el-form-item>-->

            <!--<el-form-item label="专业类别">-->
                <!--<el-input v-model="formData.majorType" placeholder="专业描述"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="军衔等级">-->
                <!--<el-select filterable clearable v-model="formData.rankL1"  placeholder="默认单位全员（可选项）" @focus="triggerMilitaryRankSelect()">-->
                    <!--<el-option-->
                        <!--v-for="item in selMilitaryRankL1"-->
                        <!--:key="item"-->
                        <!--:label="item"-->
                        <!--:value="item">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item>-->
                <!--<el-button :type="btnState?'primary':'warning'" @click="onSubmit('ruleform')">{{btnState?'添加':'修改'}}</el-button>-->
            <!--</el-form-item>-->
        <!--</el-form>-->
        <!--<Filters :props="[Standard,OrgCategory,OrdnanceType,RankL1]" placeholder="输入军械名称，将自动搜索" @filterValueIsChange="filterValueIsChange" @querySearchAsync="querySearchAsync"></Filters>-->

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
                <!--label="军械名称">-->
                <!--<template slot-scope="scope">-->
                    <!--<div slot="reference" class="describe-wrapper">-->
                        <!--{{scope.row.ordnanceType}}-->
                    <!--</div>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--label="数量指标">-->
                <!--<template slot-scope="scope">-->
                    <!--<div slot="reference" class="describe-wrapper">-->
                        <!--{{scope.row.bulletReq.quota}}-->
                        <!--{{scope.row.bulletReq.unitType}}-->
                        <!--/{{scope.row.bulletReq.numType}}-->
                    <!--</div>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--label="军衔等级">-->
                <!--<template slot-scope="scope">-->
                    <!--<div slot="reference" class="describe-wrapper">-->
                        <!--{{scope.row.rankL1}}-->
                    <!--</div>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--label="专业描述">-->
                <!--<template slot-scope="scope">-->
                    <!--<div slot="reference" class="describe-wrapper">-->
                        <!--{{ scope.row.majorType}}-->
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

<!--// 弹药消耗指标-->
<!--// const TimeRequirementSchema = new Schema({-->
<!--//  standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 训练大纲-->
<!--//  orgCategory: String,                            // 单位分类-->
<!--//  ordnanceType: String,                           // 军械名称-->
<!--//  majorType:string                                    // 专业类型-->
<!--//  rankL1: String,                                 // 军衔一级分类(可选)-->
<!--//  bulletReq: {-->
<!--//      quota: Number,                              // 数量配额-->
<!--//      unitType: String,                           // 计量单位-->
<!--//      numType: Number,                            // 数量类型(单人/单炮/总量)-->
<!--//  }-->
<!--// });-->
<!--import _ from 'lodash';-->
<!--import {handle} from 'src/config/mixin'-->
<!--import {BulletNumType} from 'src/lib/Constants'-->
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
                <!--BulletNumType,-->
                <!--selectStandard:[],-->
                <!--selectorgCategory:[],-->
                <!--selOrdnanceType:[],-->
                <!--selMilitaryRank:[],-->
                <!--selMilitaryRankL1:[],-->
                <!--RankL1:{selects: undefined, value:'',  placeholder: '军衔等级', equalObject: {className:'BulletRequirement',name:'rankL1'}},-->
                <!--OrdnanceType: {selects: undefined, value:'',  placeholder: '军械名称', equalObject: {className:'BulletRequirement',name:'ordnanceType'}},-->
                <!--OrgCategory: {selects: undefined, value:'',  placeholder: '单位分类', equalObject: {className:'BulletRequirement',name:'orgCategory'}},-->
                <!--Standard:{selects: undefined, value:'', valueKey:'objectId', textValue:true, placeholder: '训练大纲', equalObject: {className:'BulletRequirement',name:'standard'}},-->
                <!--equalObject: undefined,-->
                <!--search: {-->
                    <!--key: '',-->
                    <!--value: ''-->
                <!--},-->
            <!--}-->
        <!--},-->
        <!--async created(){-->
            <!--this.triggerSelect('TrainStandard').then(result=>{-->
                <!--this.Standard.selects = result.list;-->
                <!--this.selectStandard = result.list;-->
                <!--this.curStandard();-->
            <!--});-->
            <!--this.triggerSelect('OrgCategory').then(result=>{-->
                <!--this.OrgCategory.selects = result.list;-->
                <!--this.selectorgCategory = result.list;-->
                <!--console.log(this.selectorgCategory, 99999)-->
            <!--});-->
            <!--let result = (await this.$backendService.queryListByKeyValue('OrdnanceType')).list;-->
            <!--console.log(result.list, 8888)-->
            <!--this.triggerSelect('OrdnanceType').then(result=>{-->
                <!--this.OrdnanceType.selects = result.list;-->
                <!--this.selOrdnanceType = result.list;-->
            <!--});-->
            <!--this.triggerSelect('MilitaryRank').then(result=>{-->
                <!--this.RankL1.selects = _.uniq(result.list.map(item => item.rankLevel1));-->
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
            <!--initFormData(){-->
                <!--this.formData = {-->
                    <!--standard:'',-->
                    <!--orgCategory:'',-->
                    <!--majorType:'',-->
                    <!--ordnanceType:'',-->
                    <!--rankL1:'',-->
                    <!--bulletReq:{-->
                        <!--quota: 0,-->
                        <!--unitType: '',-->
                        <!--numType: '',-->
                    <!--}-->
                <!--};-->
            <!--},-->
            <!--triggerMilitaryRankSelect() {-->
                <!--this.selMilitaryRank = this.triggerSelect-->
                <!--this.queryList('MilitaryRank').then(result=>{-->
                    <!--this.selMilitaryRank = result.list;-->
                    <!--this.selMilitaryRankL1 = _.uniq(result.list.map(item => item.rankLevel1));-->
                <!--})-->
            <!--}-->
        <!--},-->
        <!--computed:{-->
            <!--unitBybullet:function(){-->
                <!--let unitType = '发';-->
                <!--for(let i = 0;i<this.selOrdnanceType.length;i++) {-->
                    <!--if(this.formData.ordnanceType === this.selOrdnanceType[i].name){-->
                        <!--unitType = this.selOrdnanceType[i].bulletUnit;-->
                        <!--break;-->
                    <!--}-->
                <!--}-->
                <!--this.formData.bulletReq.unitType = unitType;-->
                <!--return unitType;-->
            <!--},-->
            <!--numBybullet:function(){-->
                <!--let numType='人.年';-->
                <!--if('总量' === this.formData.bulletReq.numType) {-->
                    <!--numType = '年';-->
                <!--}else if ('单炮'===this.formData.bulletReq.numType){-->
                    <!--numType='炮.年';-->
                <!--}else if('单枪' === this.formData.bulletReq.numType){-->
                    <!--numType='枪.年';-->
                <!--}else if('单班组' === this.formData.bulletReq.numType){-->
                    <!--numType='班.年';-->
                <!--}else{-->

                <!--}-->

                <!--this.formData.bulletReq.numType = numType-->
                <!--return numType;-->
            <!--}-->

        <!--}-->

    <!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
<template>
    <div class="BMIStandard">
        <form-and-table :columns="columns" :schema="schema" ref="formAndTable"> </form-and-table>
    </div>
</template>

<script>
    import formAndTable from '@/pages/common/new-com-formAndTable'
    import {BulletNumType} from '@/lib/Constants'
    // 弹药消耗指标
    // const TimeRequirementSchema = new Schema({
    //  standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 训练大纲
    //  orgCategory: String,                            // 单位分类
    //  ordnanceType: String,                           // 军械名称
    //  majorType:string                                    // 专业类型
    //  rankL1: String,                                 // 军衔一级分类(可选)
    //  bulletReq: {
    //      quota: Number,                              // 数量配额
    //      unitType: String,                           // 计量单位
    //      numType: Number,                            // 数量类型(单人/单炮/总量)
    //  }
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
                    {prop: 'ordnanceType', label: '军械名称'},
                    {prop: 'bulletReq',
                        label: '数量指标',
                        handleValue:(value)=>{
                            return `${value.quota} ${value.unitType} / ${value.numType}`
                        }
                    },
                    {prop: 'majorType', label: '专业类型'},
                    {prop: 'rankL1', label: '军衔等级'},
                ],
                schema: [
                    {fieldType: "input", placeholder: "训练大纲", label: "训练大纲", _name: "standard", standard: '',disabled:true},
                    {fieldType: "select", placeholder: "单位分类", label: "单位分类", _name: "orgCategory", orgCategory: '',keyOptions: [],},
                    {fieldType: "select", placeholder: "军械名称", label: "军械名称", _name: "ordnanceType", ordnanceType: '',keyOptions: [], change: this.handleChangeOrdnanceType},
                    {fieldType: "select", placeholder: "数量单位", label: "数量单位", _name: "bulletReqNumType", bulletReqNumType: '',options: Object.values(BulletNumType),},
                    {fieldType: "input-number", placeholder: "数量指标", label: "数量指标", _name: "bulletReqQuota",bulletReqQuota: 0},
                    {fieldType: "input", placeholder: "计量单位", label: "计量单位", _name: "bulletReqUnitType",bulletReqUnitType: '', disabled: true },
                    {fieldType: "input", placeholder: "专业类型", label: "专业类型", _name: "majorType",majorType: '', },
                    {fieldType: "select", placeholder: "军衔等级", label: "军衔等级", _name: "rankL1", rankL1: '', options:[], },
                ]
            }
        },
        async created(){
            this.schema[0].standard = this.$parent.standard.name;
            this.schemaOrgCategory.keyOptions = (await this.$backendService.queryListByKeyValue('OrgCategory')).list;
            this.schemaOrdnanceType.keyOptions = (await this.$backendService.queryListByKeyValue('OrdnanceType')).list;
            this.selOrdnanceType = [...this.schemaOrdnanceType.keyOptions];
            let result = (await this.$backendService.queryListByKeyValue('MilitaryRank')).list;
            this.schemaRankL1.options = _.uniq(result.map(item => item.rankLevel1));
        },
        watch:{
            'schemaBulletReqNumType.bulletReqNumType':{
                handler(newValue){
                    const arr = ['人.年','枪.年','炮.年','班.年','年'];
                    if(arr.includes(newValue))return;
                    const mapArr = Object.values(BulletNumType);
                    const index = mapArr.findIndex(item=>item === newValue);
                    this.schemaBulletReqNumType.bulletReqNumType = arr[index];
                },
                isDeep:true
            },

        },
        computed:{
            schemaOrgCategory(){
                return this.schema.find(item=>item._name === 'orgCategory')
            },
            schemaOrdnanceType(){
                return this.schema.find(item=>item._name === 'ordnanceType')
            },
            schemaRankL1(){
                return this.schema.find(item=>item._name === 'rankL1')
            },
            schemaBulletReqNumType(){
                return this.schema.find(item=>item._name === 'bulletReqNumType')
            },
            schemaBulletReqUnitType(){
                return this.schema.find(item=>item._name === 'bulletReqUnitType')
            },
        },
        methods: {
            beforeSubmit(formData) {
                let deletesKeys = ['bulletReqQuota', 'bulletReqNumType', 'bulletReqUnitType'];
                formData.bulletReq = {
                    quota: formData.bulletReqQuota,
                    numType: formData.bulletReqNumType,
                    unitType: formData.bulletReqUnitType,
                };
                formData.standard = this.$parent.standard.objectId;
                Object.keys(formData).forEach(item=>{
                    if (deletesKeys.includes(item)) delete formData[item];
                })
            },
            beforeEdit(row){
                row.bulletReqUnitType = row.bulletReq.unitType;
                row.bulletReqNumType = row.bulletReq.numType;
                row.bulletReqQuota = row.bulletReq.quota;
                row.standard = this.$parent.standard.name;
            },
            handleChangeOrdnanceType() {
                let unitType = '发';
                unitType = (this.schemaOrdnanceType.keyOptions.find(item=>{ return this.schemaOrdnanceType.ordnanceType === item.name}) || {}).bulletUnit;
                this.schemaBulletReqUnitType.bulletReqUnitType = unitType;
            },

        },
    }
</script>
