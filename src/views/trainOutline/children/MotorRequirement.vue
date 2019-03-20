<!--<template>-->
    <!--<div class="MotorRequirement">-->
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
            <!--<el-form-item label="训练类型">-->
                <!--<el-select v-model="formData.motorType" filterable  placeholder="名称">-->
                    <!--<el-option-->
                        <!--v-for="item in selMotorType"-->
                        <!--:key="item.objectId"-->
                        <!--:label="item.name"-->
                        <!--:value="item.name">-->
                    <!--</el-option>-->
                    <!--{{unitByMotor}}-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="数量指标" >-->
                <!--<el-input v-model="formData.quota" size="1">-->
                    <!--<template slot="append">{{unitByMotor}}</template>-->
                <!--</el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item>-->
                <!--<el-button :type="btnState?'primary':'warning'" @click="onSubmit('ruleform')">{{btnState?'添加':'修改'}}</el-button>-->
            <!--</el-form-item>-->
        <!--</el-form>-->
        <!--<Filters :props="[Standard,OrgCategory,MotorType]" placeholder="输入军械名称，将自动搜索" @filterValueIsChange="filterValueIsChange" @querySearchAsync="querySearchAsync"><p></p></Filters>-->

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
                <!--label="训练类型">-->
                <!--<template slot-scope="scope">-->
                    <!--<div slot="reference" class="describe-wrapper">-->
                        <!--{{scope.row.motorType}}-->
                    <!--</div>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--label="数量指标">-->
                <!--<template slot-scope="scope">-->
                    <!--<div slot="reference" class="describe-wrapper">-->
                        <!--{{scope.row.quota}}-->
                        <!--{{scope.row.unitType}}-->
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

<!--// 人员指标要求-->
<!--// const MotorRequirementSchema = new Schema({-->
<!--//  standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 训练大纲-->
<!--//  orgCategory: String,                            // 单位分类-->
<!--//  motorType: String,                              // 摩托训练类型-->
<!--//  unitType: String,                               // 计量单位-->
<!--//  quota: Number,                                  // 数量配额: 训练小时数要求或行车里程数-->
<!--// });-->
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
                <!--rules:{-->
                    <!--standard:[-->
                        <!--{ required: true, message: '请输入大纲名称', trigger: 'blur' },-->
                    <!--],-->
                    <!--orgCategory:[-->
                        <!--{ required: true, message: '请输入单位分类', trigger: 'blur' },-->
                    <!--]-->
                <!--},-->
                <!--selectStandard:[],-->
                <!--selectorgCategory:[],-->
                <!--selMotorType:[],-->
                <!--MotorType:{selects: undefined, value:'',  placeholder: '训练类型', equalObject: {className:'MotorRequirement',name:'motorType'}},-->
                <!--OrgCategory: {selects: undefined, value:'',  placeholder: '单位分类', equalObject: {className:'MotorRequirement',name:'orgCategory'}},-->
                <!--Standard:{selects: undefined, value:'', valueKey:'objectId', textValue: true, placeholder: '训练大纲', equalObject: {className:'MotorRequirement',name:'standard'}},-->
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
            <!--this.triggerSelect('MotorType').then(result=>{-->
                <!--this.MotorType.selects = result.list;-->
                <!--this.selMotorType = result.list;-->
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
                    <!--motorType:'',-->
                    <!--unitType:'',-->
                    <!--quota:0-->
                <!--};-->
            <!--}-->
        <!--},-->
        <!--computed:{-->
            <!--unitByMotor:function(){-->
                <!--let unitType = '小时';-->
                <!--for(let i = 0;i<this.selMotorType.length;i++) {-->
                    <!--if(this.formData.motorType === this.selMotorType[i].name){-->
                        <!--unitType = this.selMotorType[i].unit;-->
                        <!--break;-->
                    <!--}-->
                <!--}-->
                <!--this.formData.unitType = unitType;-->
                <!--return unitType;-->
            <!--},-->
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
    // 人员指标要求
    // const MotorRequirementSchema = new Schema({
    //  standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 训练大纲
    //  orgCategory: String,                            // 单位分类
    //  motorType: String,                              // 摩托训练类型
    //  unitType: String,                               // 计量单位
    //  quota: Number,                                  // 数量配额: 训练小时数要求或行车里程数
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
                    {prop: 'motorType', label: '摩托训练类型'},
                    {prop: 'bulletReq',
                        label: '数量指标',
                        handleValue:(val, row)=>{
                            return `${row.quota} ${row.unitType}`
                        }
                    },
                ],
                schema: [
                    {fieldType: "input", placeholder: "训练大纲", label: "训练大纲", _name: "standard", standard: '',disabled:true},
                    {fieldType: "select", placeholder: "单位分类", label: "单位分类", _name: "orgCategory", orgCategory: '',keyOptions: [],},
                    {fieldType: "select", placeholder: "训练类型", label: "训练类型", _name: "motorType", motorType: '',keyOptions: [], change: this.handleChangeMotorType},
                    {fieldType: "input-number", placeholder: "数量配额", label: "数量配额", _name: "quota",quota: 0},
                    {fieldType: "input", placeholder: "计量单位", label: "计量单位", _name: "unitType",unitType: '', disabled: true},
                ]
            }
        },
        async created(){
            this.schema[0].standard = this.$parent.standard.name;
            this.schemaOrgCategory.keyOptions = (await this.$backendService.queryListByKeyValue('OrgCategory')).list;
            this.schemaMotorType.keyOptions = (await this.$backendService.queryListByKeyValue('MotorType')).list;

        },
        watch:{

        },
        computed:{
            schemaOrgCategory(){
                return this.schema.find(item=>item._name === 'orgCategory')
            },
            schemaMotorType(){
                return this.schema.find(item=>item._name === 'motorType')
            },
            schemaUnitType(){
                return this.schema.find(item=>item._name === 'unitType')
            },

        },
        methods: {
            beforeSubmit(formData) {
                formData.standard = this.$parent.standard.objectId;
                formData.quota = `${formData.quota}`;
            },
            beforeEdit(row){
                row.standard = this.$parent.standard.name;
            },
            handleChangeMotorType() {
                let unitType = '小时';
                unitType = this.schemaMotorType.keyOptions.find(item=>this.schemaMotorType.motorType === item.name).unit;
                this.schemaUnitType.unitType = unitType;
            }
        },
    }
</script>
