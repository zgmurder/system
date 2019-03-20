
<!--<template>-->
    <!--<div class="TimeRequirement">-->
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
            <!--<el-form-item label="人员信息" prop="personProperty">-->
                <!--<el-select filterable clearable v-model="formData.personProperty" placeholder="请选择人员信息" >-->
                    <!--<el-option-->
                        <!--v-for="value in PersonProperty"-->
                        <!--:key="value"-->
                        <!--:label="value"-->
                        <!--:value="value">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-row :gutter="1">-->
            <!--<el-form-item label="本年训练"  prop="timeReq">-->
                <!--<el-input v-model="formData.timeReq.months" min="1" max="12">-->
                    <!--<template slot="append">月</template>-->
                <!--</el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="每月训练" prop="timeReq">-->
                <!--<el-input v-model="formData.timeReq.daysPerMonth">-->
                    <!--<template slot="append">天</template>-->
                <!--</el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="本年训练" prop="timeReq">-->
                <!--<el-input v-model="formData.timeReq.days"  >-->
                    <!--{{dateOneYear}}-->
                    <!--<template slot="append">天数</template>-->
                <!--</el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="每周训练" prop="timeReq">-->
                <!--<el-input v-model="formData.timeReq.daysPerWeek" >-->
                    <!--<template slot="append">天</template>-->
                <!--</el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="每天训练" prop="timeReq">-->
                    <!--<el-input v-model="formData.timeReq.hoursPerDay" >-->
                        <!--<template slot="append">小时</template>-->
                    <!--</el-input>-->
            <!--</el-form-item>-->

            <!--<el-form-item label="本年训练" prop="timeReq">-->
                <!--<el-input v-model="formData.timeReq.hours" >-->
                    <!--{{hoursOneYear}}-->
                    <!--<template slot="append">小时</template>-->
                <!--</el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="本年机动" prop="timeReq">-->
                <!--<el-input v-model="formData.timeReq.flexibleDays" >-->
                    <!--<template slot="append">天</template>-->
                <!--</el-input>-->
            <!--</el-form-item>-->

            <!--<el-form-item label="夜训比率" prop="timeReq">-->
                <!--<el-input v-model="formData.timeReq.rateAtNight" >-->
                    <!--<template slot="append">%</template>-->
                <!--</el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="本年夜训" prop="timeReq">-->
                <!--<el-input v-model="formData.timeReq.hoursAtNight">-->
                    <!--{{hoursAtNightOneYear}}-->
                    <!--<template slot="append">小时</template>-->
                <!--</el-input>-->
            <!--</el-form-item>-->


            <!--</el-row>-->
            <!--<el-form-item>-->
                <!--<el-button :type="btnState?'primary':'warning'" @click="onSubmit('ruleform')">{{btnState?'添加':'修改'}}</el-button>-->
            <!--</el-form-item>-->
        <!--</el-form>-->
        <!--<Filters :props="[Standard,OrgCategory,PersonProperties]" placeholder="输入体育课目，将自动搜索" @filterValueIsChange="filterValueIsChange" @querySearchAsync="querySearchAsync"><p></p></Filters>-->
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
                <!--label="人员信息">-->
                <!--<template slot-scope="scope">-->
                    <!--<div slot="reference" class="describe-wrapper">-->
                        <!--{{scope.row.personProperty}}-->
                    <!--</div>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--label="时间要求">-->
                <!--<template slot-scope="scope">-->
                    <!--<div slot="reference" class="describe-wrapper">-->
                        <!--年度训练月数：{{scope.row.timeReq.months}}(月) <br>-->
                        <!--年度训练天数：{{scope.row.timeReq.days}} (天)<br>-->
                        <!--年度训练小时数：{{scope.row.timeReq.hours}} (小时)<br>-->
                        <!--年度夜训小时数：{{scope.row.timeReq.hoursAtNight}} (小时)<br>-->
                        <!--年度夜巡比率：{{scope.row.timeReq.rateAtNight}}(%)<br>-->
                        <!--月度训练天数：{{scope.row.timeReq.daysPerMonth}} (天)<br>-->
                        <!--每周训练天数：{{scope.row.timeReq.daysPerWeek}} (天)<br>-->
                        <!--每天训练小时数：{{scope.row.timeReq.hoursPerDay}} (小时)<br>-->
                        <!--机动天数：{{scope.row.timeReq.flexibleDays}}(天)-->
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
<!--// 时间指标要求-->
<!--// const TimeRequirementSchema = new Schema({-->
<!--//  standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 训练大纲-->
<!--//  orgCategory: String,                            // 单位分类-->
<!--//  personProperty: String,                         // 人员属性分类-->
<!--//  timeReq: {-->
<!--//      months: Number,                             // 年度训练月数-->
<!--//      days: Number,                               // 年度训练天数-->
<!--//      hours: Number,                              // 年度训练小时数-->
<!--//      daysPerMonth: Number,                       // 月度训练天数-->
<!--//      daysPerWeek: Number,                        // 每周训练天数-->
<!--//      hoursPerDay: Number,                        // 每天训练小时数-->
<!--//      hoursAtNight: Number,                       // 年度夜训小时数-->
<!--//      rateAtNight: Number,                        // 年度夜巡比率-->
<!--//      flexibleDays: Number                        // 机动天数-->
<!--//  }-->
<!--// });-->
    <!--import {handle} from 'src/config/mixin'-->
    <!--import {PersonProperty} from 'src/lib/Constants'-->
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
                    <!--],-->
                    <!--personProperty:[-->
                        <!--{ required: true, message: '请输入人员属性', trigger: 'blur' },-->
                    <!--]-->
                <!--},-->
                <!--PersonProperty,-->
                <!--selectStandard:[],-->
                <!--selectorgCategory:[],-->
                <!--OrgCategory: {selects: undefined, value:'',  placeholder: '单位分类', equalObject: {className:'TimeRequirement',name:'orgCategory'}},-->
                <!--Standard:{selects: undefined, value:'', valueKey:'objectId', textValue: true,placeholder: '训练大纲', equalObject: {className:'TimeRequirement',name:'standard'}},-->
                <!--PersonProperties:{selects: PersonProperty, value:'',placeholder: '人员属性', equalObject: {className:'TimeRequirement',name:'personProperty'}},-->
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
        <!--computed:{-->
            <!--dateOneYear:function(){-->
                <!--let dataYear = 0;-->
                <!--if(0 == (this.formData.timeReq.months&&this.formData.timeReq.daysPerMonth)){-->
                    <!--dataYear = this.formData.timeReq.days;-->
                <!--}else{-->
                    <!--dataYear = this.formData.timeReq.months*this.formData.timeReq.daysPerMonth;-->
                <!--}-->
                <!--return this.formData.timeReq.days = dataYear;-->
            <!--},-->
            <!--hoursOneYear:function(){-->
                <!--let tmpData = 0;-->
                <!--if(0 == (this.formData.timeReq.months&&this.formData.timeReq.daysPerMonth)){-->
                    <!--tmpData = this.formData.timeReq.hours;-->
                <!--}else{-->
                    <!--tmpData = this.formData.timeReq.months*this.formData.timeReq.daysPerMonth*this.formData.timeReq.hoursPerDay;-->
                <!--}-->
                <!--return this.formData.timeReq.hours = tmpData;-->
            <!--},-->
            <!--hoursAtNightOneYear:function(){-->
                <!--let tmpData = 0;-->
                <!--if(0 == (this.formData.timeReq.rateAtNight&&this.formData.timeReq.hours)){-->
                    <!--tmpData = this.formData.timeReq.hoursAtNight;-->
                <!--}else{-->
                    <!--tmpData = this.formData.timeReq.rateAtNight*this.formData.timeReq.hours/100;-->
                <!--}-->
                <!--return this.formData.timeReq.hoursAtNight = Math.round(tmpData);-->
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
                    <!--orgCategory:'',-->
                    <!--personProperty:'',-->
                    <!--timeReq:{-->
                        <!--months:0,-->
                        <!--days:0,-->
                        <!--hours:0,                              // 年度训练小时数-->
                        <!--daysPerMonth: 0,                       // 月度训练天数-->
                        <!--daysPerWeek: 0,                        // 每周训练天数-->
                        <!--hoursPerDay: 0,                        // 每天训练小时数-->
                        <!--hoursAtNight: 0,                       // 年度夜训小时数-->
                        <!--rateAtNight:0 , // 年度夜巡比率-->
                        <!--flexibleDays: 0                        // 机动天数-->
                    <!--}-->
                <!--};-->
            <!--},-->
        <!--}-->
    <!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--.el-row {-->
    <!--margin-bottom: 20px;-->
<!--}-->
<!--.el-col {-->
    <!--border-radius: 3px;-->
  <!--}-->
<!--.el-input{-->
    <!--width:200px;-->
<!--}-->
<!--</style>-->

<template>
    <div class="PersonRequirement">
        <form-and-table :columns="columns" :schema="schema" ref="formAndTable"> </form-and-table>
    </div>
</template>

<script>
    import formAndTable from '@/pages/common/new-com-formAndTable'
    import {PersonProperty} from '@/lib/Constants'
    // 时间指标要求
    // const TimeRequirementSchema = new Schema({
    //  standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 训练大纲
    //  orgCategory: String,                            // 单位分类
    //  personProperty: String,                         // 人员属性分类
    //  timeReq: {
    //      months: Number,                             // 年度训练月数
    //      days: Number,                               // 年度训练天数
    //      hours: Number,                              // 年度训练小时数
    //      daysPerMonth: Number,                       // 月度训练天数
    //      daysPerWeek: Number,                        // 每周训练天数
    //      hoursPerDay: Number,                        // 每天训练小时数
    //      hoursAtNight: Number,                       // 年度夜训小时数
    //      rateAtNight: Number,                        // 年度夜巡比率
    //      flexibleDays: Number                        // 机动天数
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
                    {prop: 'standard',label: '训练大纲',handleValue:(value)=> value && value.name, width: 160},
                    {prop: 'orgCategory', label: '单位分类', width: 200},
                    {prop: 'personProperty', label: '人员属性', width: 120},
                    {prop: 'timeReq',
                        label: '参训率',
                        handleValue:(value)=>{
                            return `年度训练月数：${value.months}(月),
                                    年度训练天数：${value.days}(天)，
                                    年度训练小时数：${value.hours} (小时)，
                                    年度夜训小时数：${value.hoursAtNight} (小时)，
                                    年度夜巡比率：${value.rateAtNight}(%)，
                                    月度训练天数：${value.daysPerMonth} (天)，
                                    每周训练天数：${value.daysPerWeek} (天)，
                                    每天训练小时数：${value.hoursPerDay} (小时)，
                                    机动天数：${value.flexibleDays}(天)`;
                        }
                    },
                ],
                schema: [
                    {fieldType: "input", placeholder: "训练大纲", label: "训练大纲", _name: "standard", standard: '',disabled:true},
                    {fieldType: "select", placeholder: "单位分类", label: "单位分类", _name: "orgCategory", orgCategory: '',keyOptions: [],},
                    {fieldType: "select", placeholder: "人员属性", label: "人员属性", _name: "personProperty", personProperty: '',options: Object.values(PersonProperty),},
                    {fieldType: "input-number", placeholder: "年度训练月数", label: "年度训练月数", _name: "months", months: '',},
                    {fieldType: "input-number", placeholder: "年度训练天数", label: "年度训练天数", _name: "days", days: '',},
                    {fieldType: "input-number", placeholder: "年度训练小时", label: "年度训练小时", _name: "hours", hours: '',},
                    {fieldType: "input-number", placeholder: "年度夜训小时", label: "年度夜训小时", _name: "hoursAtNight", hoursAtNight: '',},
                    {fieldType: "input-number", placeholder: "年度夜巡比率", label: "年度夜巡比率", _name: "rateAtNight", rateAtNight: '',},
                    {fieldType: "input-number", placeholder: "月度训练天数", label: "月度训练天数", _name: "daysPerMonth", daysPerMonth: '',},
                    {fieldType: "input-number", placeholder: "每周训练天数", label: "每周训练天数", _name: "daysPerWeek", daysPerWeek: '',},
                    {fieldType: "input-number", placeholder: "每天训练小时", label: "每天训练小时", _name: "hoursPerDay", hoursPerDay: '',},
                    {fieldType: "input-number", placeholder: "机动天数", label: "机动天数", _name: "flexibleDays", flexibleDays: '',},
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
                const deleteKeys = ['months','days','hours','hoursAtNight','daysPerMonth','daysPerWeek','hoursPerDay','flexibleDays', 'rateAtNight'];
                formData.standard = this.$parent.standard.objectId;
                formData.timeReq = {
                    months : formData.months,
                    days : formData.days,
                    hours : formData.hours,
                    hoursAtNight : formData.hoursAtNight,
                    daysPerMonth : formData.daysPerMonth,
                    rateAtNight : formData.rateAtNight,
                    daysPerWeek : formData.daysPerWeek,
                    hoursPerDay : formData.hoursPerDay,
                    flexibleDays : formData.flexibleDays,
                };

                Object.keys(formData).forEach(item=>{
                    if (deleteKeys.includes(item)) delete formData[item]
                })
            },
            beforeEdit(row){
                row.standard = this.$parent.standard.name;
                row.months = row.timeReq.months;
                row.days = row.timeReq.days;
                row.hours = row.timeReq.hours;
                row.hoursAtNight = row.timeReq.hoursAtNight;
                row.rateAtNight = row.timeReq.rateAtNight;
                row.daysPerMonth = row.timeReq.daysPerMonth;
                row.daysPerWeek = row.timeReq.daysPerWeek;
                row.hoursPerDay = row.timeReq.hoursPerDay;
                row.flexibleDays = row.timeReq.flexibleDays;
            },
        },
    }
</script>
