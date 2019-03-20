<!--<template>-->
    <!--<div class="DailySchedule">-->
        <!--<el-form inline :model="formData" ref="ruleform" :rules="rules" class="formData" v-show="wrapperVisible" label-width="120px">-->
            <!--<el-form-item label="单位分类" prop="orgCategories">-->
                <!--<el-select filterable multiple v-model="formData.orgCategories" placeholder="单位分类">-->
                    <!--<el-option-->
                        <!--v-for="item in selectorgCategory"-->
                        <!--:key="item.objectId"-->
                        <!--:label="item.name"-->
                        <!--:value="item.name">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="早操">-->
                <!--<el-input-number v-model="formData.eMorning" :min="0" :max="6"></el-input-number>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="上午">-->
                <!--<el-input-number v-model="formData.morning" :min="0" :max="6"></el-input-number>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="下午">-->
                <!--<el-input-number v-model="formData.afternoon" :min="0" :max="6"></el-input-number>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="夜训">-->
                <!--<el-input-number v-model="formData.night" :min="0" :max="6"></el-input-number>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="体能训练">-->
                <!--<el-input-number v-model="formData.sport" :min="0" :max="6"></el-input-number>-->
            <!--</el-form-item>-->
            <!--<el-form-item>-->
                <!--<el-button :type="btnState?'primary':'warning'" @click="onSubmit('ruleform')">{{btnState?'添加':'修改'}}</el-button>-->
            <!--</el-form-item>-->
        <!--</el-form>-->
        <!--<el-table-->
            <!--:data="tableData"-->
            <!--border-->
            <!--:max-height="maxTableHegith"-->
            <!--style="width:100%">-->
            <!--<el-table-column-->
                <!--label="单位分类">-->
                <!--<template slot-scope="scope">-->
                    <!--<div slot="reference" class="describe-wrapper">-->
                    <!--<el-tag v-if="scope.row.orgCategories&&scope.row.orgCategories.length"-->
                            <!--v-for="(item,index) in scope.row.orgCategories"-->
                            <!--size="mini"-->
                            <!--:key="index"-->
                            <!--type="info">-->
                        <!--{{item}}-->
                    <!--</el-tag>-->
                    <!--</div>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--label="早操">-->
                <!--<template slot-scope="scope">-->
                    <!--<div slot="reference" class="describe-wrapper">-->
                        <!--{{ scope.row.eMorning}}-->
                    <!--</div>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--label="上午">-->
                <!--<template slot-scope="scope">-->
                    <!--<div slot="reference" class="describe-wrapper">-->
                        <!--{{scope.row.morning}}-->
                    <!--</div>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--label="下午">-->
                <!--<template slot-scope="scope">-->
                    <!--<div slot="reference" class="describe-wrapper">-->
                        <!--{{ scope.row.afternoon }}-->
                    <!--</div>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--label="夜训">-->
                <!--<template slot-scope="scope">-->
                    <!--<div slot="reference" class="describe-wrapper">-->
                        <!--{{ scope.row.night }}-->
                    <!--</div>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--label="体能训练">-->
                <!--<template slot-scope="scope">-->
                    <!--<div slot="reference" class="describe-wrapper">-->
                        <!--{{ scope.row.sport }}-->
                    <!--</div>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="操作" align="right" width="150">-->
                <!--<template slot-scope="scope">-->
                    <!--<el-button-->
                        <!--size="mini"-->
                        <!--@click="handleEdit(scope.row, handleEditCallback)">编辑</el-button>-->
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
    <!--// 每日作息时间-->
    <!--// const DailyScheduleSchema = new Schema({-->
    <!--//  orgCategory: String,                            // 单位分类-->
    <!--//  eMorning: Number,                              // 早操课时数-->
    <!--//  morning: Number,                                // 上午课时数-->
    <!--//  afternoon: Number,                              // 下午课时数(包含体能训练时间)-->
    <!--//  night: Number,                                  // 夜训课时数-->
    <!--//  sport: Number                                   // 下午体能训练课时数-->
    <!--// });-->
    <!--import _ from 'lodash'-->
    <!--import {CourseCategorys,TimeUnit,Monthes,DayType,WeekDays,DailySection} from 'src/lib/Constants'-->
    <!--import {handle} from 'src/config/mixin'-->
    <!--export default {-->
        <!--mixins:[handle],-->
        <!--data() {-->
            <!--return {-->
                <!--selectorgCategory: [],-->
                <!--rules:{-->
                    <!--orgCategories:[-->
                        <!--{ required: true, message: '请输入单位分类', trigger: 'blur' },-->
                    <!--]-->
                <!--},-->
            <!--}-->
        <!--},-->
        <!--created() {-->
            <!--this.triggerSelect('OrgCategory','selectorgCategory');-->
        <!--},-->
        <!--methods: {-->

            <!--handleEditCallback(row) {-->
                <!--console.log(row)-->
                <!--this.formData ={-->
                    <!--...this.cloneDeep(row),-->
                    <!--orgCategories: row.orgCategories||[]-->
                <!--}-->
                <!---->
            <!--},-->

            <!--initFormData() {-->
                <!--this.formData = {-->
                    <!--orgCategories:[],-->
                    <!--eMorning:0,-->
                    <!--morning:0,-->
                    <!--afternoon: 0,-->
                    <!--night:0,-->
                    <!--sport:0-->
                <!--},-->
                <!--this.$refs.ruleform && this.$refs.ruleform.clearValidate()-->
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
    <!--.el-icon-error{-->
        <!--font-size: 18px;-->
        <!--position: absolute;right: -5px;z-index: 4;top:-5px;-->
        <!--color: #666;-->
    <!--}-->
    <!--.el-icon-error:hover{-->
        <!--color: #409EFF;-->
        <!--cursor: pointer;-->
    <!--}-->
    <!--.editing{-->
        <!--position: relative;-->
        <!--z-index: 3;-->
        <!--border:solid 1px red;-->
        <!--background: #fafafa;-->
        <!--padding-top: 20px;-->
    <!--}-->
<!--</style>-->

<template>
    <div class="DailySchedule">
        <form-and-table :columns="columns" :schema="schema" ref="formAndTable"> </form-and-table>
    </div>
</template>

<script>
    import comRender from '@/pages/common/com-render'
    import formAndTable from '@/pages/common/new-com-formAndTable'
    // 每日作息时间
    // const DailyScheduleSchema = new Schema({
    //  orgCategory: String,                            // 单位分类
    //  eMorning: Number,                              // 早操课时数
    //  morning: Number,                                // 上午课时数
    //  afternoon: Number,                              // 下午课时数(包含体能训练时间)
    //  night: Number,                                  // 夜训课时数
    //  sport: Number                                   // 下午体能训练课时数
    // });
    export default {
        name: "category",
        components: {
            formAndTable
        },
        data() {
            return {
                columns: [
                    {prop: 'orgCategories', label: '单位分类',component: comRender},
                    {prop: 'eMorning', label: '早操课时', width: 100,},
                    {prop: 'morning', label: '上午课时', width: 100,},
                    {prop: 'afternoon', label: '下午课时', width: 100,},
                    {prop: 'night', label: '夜训课时', width: 100,},
                    {prop: 'sport', label: '体能训练', width: 100,},
                ],
                schema: [
                    {fieldType: "select", placeholder: "单位分类", label: "单位分类", _name: "orgCategories", orgCategories: [],keyOptions: [], multiple: true},
                    {fieldType: "input-number", placeholder: "早操课时", label: "早操课时", _name: "eMorning",eMorning: 0},
                    {fieldType: "input-number", placeholder: "上午课时", label: "上午课时", _name: "morning", morning: 0},
                    {fieldType: "input-number", placeholder: "下午课时", label: "下午课时", _name: "afternoon", afternoon: 0},
                    {fieldType: "input-number", placeholder: "夜训课时", label: "夜训课时", _name: "night", night: 0},
                    {fieldType: "input-number", placeholder: "体能训练", label: "体能训练", _name: "sport", sport: 0},
                ]
            }
        },
        async created(){
            this.schemaOrgCategory.options = (await this.$backendService.queryListByKeyValue('OrgCategory')).list.map(item=>item.name);
        },
        computed:{
            schemaOrgCategory(){
                return this.schema.find(item=>item._name === 'orgCategories')
            },
        },
        methods: {
            beforeSubmit(formData) {

            },
            beforeEdit(row){

            }
        },
    }
</script>

