<!--<template>-->
    <!--<div class="SportCourseTime">-->
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
            <!--<el-form-item label="训练等级："  prop="physicalLevel">-->
                <!--<el-select filterable clearable v-model="formData.physicalLevel" placeholder="请选择训练等级">-->
                    <!--<el-option-->
                        <!--v-for="item in selectPhysicalLevel"-->
                        <!--:key="item.objectId"-->
                        <!--:label="item.name"-->
                        <!--:value="item.name">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="总分/单项：">-->
                <!--<el-select filterable clearable v-model="formData.isTotal" placeholder="总分/单项">-->
                    <!--<el-option-->
                        <!--v-for="item in selectIsTotal"-->
                        <!--:key="item.name"-->
                        <!--:label="item.name"-->
                        <!--:value="item.tag">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="评分标准："  prop="scoreCriteria">-->
                <!--<el-select filterable clearable value-key="name" v-model="scoreCriteriaData" @change="changeScoreCriteria" placeholder="请选择评分标准">-->
                    <!--<el-option-->
                        <!--v-for="item in ScoreCriteria"-->
                        <!--:key="item.objectId"-->
                        <!--:label="item.name"-->
                        <!--:value="item">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="评定成绩："  prop="evaluatedScore">-->
                <!--<el-select filterable clearable v-model="formData.evaluatedScore" placeholder="请选择评分标准">-->
                    <!--<el-option-->
                        <!--v-for="(item,index) in selectEvaluatedScore"-->
                        <!--:key="item"-->
                        <!--:label="item"-->
                        <!--:value="index + 1">-->
                    <!--</el-option>-->
                <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="得分:"  prop="scoreCondtion">-->
                <!--<el-input v-model="changeNum" style="width: 217px"  placeholder="请输入分数" size="1"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item>-->
                <!--<el-button :type="btnState?'primary':'warning'" @click="onSubmit('ruleform', onSubmitCallBack)">{{btnState?'添加':'修改'}}</el-button>-->
            <!--</el-form-item>-->
        <!--</el-form>-->
        <!--<Filters :props="[Standard,PhysicalLevel,ScoreCriterias]" placeholder="输入军械名称，将自动搜索" @filterValueIsChange="filterValueIsChange" @querySearchAsync="querySearchAsync"><p></p></Filters>-->

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
                <!--prop="physicalLevel"-->
                <!--label="训练等级">-->
                <!--<template slot-scope="scope">-->
                    <!--<span>{{ scope.row.physicalLevel}}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--prop="isTotal"-->
                <!--label="总分/单项">-->
                <!--<template slot-scope="scope">-->
                    <!--<span>{{ !scope.row.isTotal && '单项' || '总分' }}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--prop="scoreCriteria"-->
                <!--label="评分标准">-->
                <!--<template slot-scope="scope">-->
                    <!--<span>{{scope.row.scoreCriteria}}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--prop="evaluatedScore"-->
                <!--label="评定成绩">-->
                <!--<template slot-scope="scope">-->
                    <!--<span>-->
                        <!--{{scope.row.scoreCriteria|parseEvaluatedScore(scope.row.evaluatedScore) }}-->
                    <!--</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
                <!--prop="scoreCondtion"-->
                <!--label="得分">-->
                <!--<template slot-scope="scope">-->
                    <!--<span>{{scope.row.scoreCondtion}}</span>-->
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

    <!--// 个人军事体育训练成绩评定标准-->
    <!--// const PersonSportScoreStandardSchema = new Schema({-->
    <!--//  standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 训练大纲-->
    <!--//  physicalLevel: String,                                              // 体能训练等级-->
    <!--//  isTotal: Boolean,                                                   // true: 总分; false:单项-->
    <!--//  scoreCriteria: String,                                              // 评分标准(七级制)-->
    <!--//  evaluatedScore: Number,                                             // 评定成绩-->
    <!--//  scoreCondtion: Number                                               // 得分-->
    <!--// });-->
    <!--import {ScoreCriteria, TroopCategory} from 'src/lib/Constants'-->
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
                <!--TroopCategory,-->
                <!--ScoreCriteria,-->
                <!--changeNum:0,-->
                <!--selectIsTotal: [{name:'单项', tag: false}, {name:'总分', tag:true}],-->
                <!--selectEvaluatedScore: [],-->
                <!--scoreCriteriaData: {},-->
                <!--rules:{-->
                    <!--standard:[-->
                        <!--{ required: true, message: '请选择训练大纲',},-->
                    <!--],-->
                    <!--physicalLevel: [-->
                        <!--{ required: true, message: '请选择训练等级',},-->
                    <!--],-->
                    <!--scoreCondtion: [-->
                        <!--{ required: true, message: '请输入分数',trigger: 'blur' },-->
                    <!--],-->
                    <!--scoreCriteria: [-->
                        <!--{ required: true, message: '请选择评分标准',},-->
                    <!--],-->
                <!--},-->
                <!--Standard:{selects: undefined, value:'', valueKey:'objectId', textValue: true, placeholder: '训练大纲', equalObject: {className:'PersonSportScoreStandard',name:'standard'}},-->
                <!--PhysicalLevel:{selects: undefined, value:'', placeholder: '训练等级', equalObject: {className:'PersonSportScoreStandard',name:'physicalLevel'}},-->
                <!--ScoreCriterias:{selects: ScoreCriteria, value:'', placeholder: '评分标准', equalObject: {className:'PersonSportScoreStandard',name:'scoreCriteria'}},-->
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
        <!--computed: {-->
            <!--filterTroopCategory(){-->
                <!--return Object.values(TroopCategory).map(item => ({text: item, value: item}));-->
            <!--},-->
        <!--},-->
        <!--filters:{-->
            <!--parseEvaluatedScore(scoreCriteria,evaluatedScore) {-->
                <!--return !(evaluatedScore) ? '' : Object.values(ScoreCriteria).find(item=>item.name === scoreCriteria).optionalScores[evaluatedScore-1];-->
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
                    <!--standard: row.standard.objectId,-->
                <!--};-->
                <!--this.scoreCriteriaData = Object.values(ScoreCriteria).find(item=>item.name === row.scoreCriteria);-->
                <!--this.selectEvaluatedScore = Object.values(ScoreCriteria).find(item=>item.name === row.scoreCriteria).optionalScores;-->
                <!--this.changeNum = row.scoreCondtion;-->
            <!--},-->
            <!--changeScoreCriteria(item){-->
                <!--this.evaluatedScore = '';-->
                <!--this.selectEvaluatedScore = item.optionalScores;-->
                <!--this.formData.scoreCriteria=this.scoreCriteriaData.name;-->
                <!--this.formData.evaluatedScore = undefined;-->
            <!--},-->
            <!--onSubmitCallBack() {-->
                <!--this.formData.evaluatedScore = this.formData.evaluatedScore || 0;-->
                <!--let target = {...this.formData};-->
                <!--target.scoreCondtion = parseInt(this.changeNum);-->
                <!--return target;-->
            <!--},-->
            <!--initFormData() {-->
                <!--this.scoreCriteriaData = {};-->
                <!--this.changeNum = 0;-->
                <!--this.formData = {-->
                     <!--standard: '',    // 训练大纲-->
                     <!--physicalLevel: '',                                               // 体能训练等级-->
                     <!--isTotal: false,                                                 // true: 总分; false:单项-->
                     <!--scoreCriteria: '',                                           // 评分标准(七级制)-->
                     <!--evaluatedScore: '',                                              // 评定成绩-->
                     <!--scoreCondtion: 100 ,                                              // 得分-->
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
    <div class="PersonSportScoreStandard">
        <form-and-table :columns="columns" :schema="schema" ref="formAndTable"> </form-and-table>
    </div>
</template>

<script>
    import formAndTable from '@/pages/common/new-com-formAndTable'
    import {ScoreCriteria, TroopCategory, ScoreCriteria2} from '@/lib/Constants'
    // 个人军事体育训练成绩评定标准
    // const PersonSportScoreStandardSchema = new Schema({
    //  standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 训练大纲
    //  physicalLevel: String,                                              // 体能训练等级
    //  isTotal: Boolean,                                                   // true: 总分; false:单项
    //  scoreCriteria: String,                                              // 评分标准(七级制)
    //  evaluatedScore: Number,                                             // 评定成绩
    //  scoreCondtion: Number                                               // 得分
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
                    {prop: 'physicalLevel', label: '体能等级'},
                    {prop: 'isTotal',
                        label: '总分/单项',
                        handleValue:(value)=>{
                            return !value ? '单项' : '总分';
                        }},
                    {prop: 'scoreCriteria',label: '评分标准',},
                    {prop: 'evaluatedScore',
                        label: '评定成绩',
                        handleValue:(value, row)=>{
                        return this.handleScoreCriteria(row.scoreCriteria, value);
                        }},
                    {prop: 'scoreCondtion',label: '得分', width: 100,},
                ],
                schema: [
                    {fieldType: "input", placeholder: "训练大纲", label: "训练大纲", _name: "standard", standard: '',disabled:true},
                    {fieldType: "select", placeholder: "体能等级", label: "体能等级", _name: "physicalLevel", physicalLevel: '', keyOptions: [],},
                    {fieldType: "select", placeholder: "总分/单项", label: "总分/单项", _name: "isTotalV2", isTotalV2: '', options: [],},
                    {fieldType: "select", placeholder: "评分标准", label: "评分标准", _name: "scoreCriteria", scoreCriteria: '', keyOptions: ScoreCriteria, change: this.handleChangeScoreCriteria},
                    {fieldType: "select", placeholder: "评分标准", label: "评分标准", _name: "evaluatedScoreV2", evaluatedScoreV2: '', options: [],},
                    {fieldType: "input-number", placeholder: "得分", label: "得分", _name: "scoreCondtion",scoreCondtion: 0},

                ]
            }
        },
        async created(){
            this.schema[0].standard = this.$parent.standard.name;
            this.schemaPhysicalLevel.keyOptions = (await this.$backendService.queryListByKeyValue('PhysicalLevel')).list;
            this.schemaIsTotal.options = ['单项', '总分'];
        },
        watch:{
            'schemaScoreCriteria.scoreCriteria':{
                handler(newValue){
                    this.schemaEvaluatedScore.options = (Object.values(ScoreCriteria).find(item=>item.name === newValue)|| {}).optionalScores;
                },
                isDeep:true
            }
        },
        computed:{
            schemaPhysicalLevel(){
                return this.schema.find(item=>item._name === 'physicalLevel')
            },
            schemaIsTotal(){
                return this.schema.find(item=>item._name === 'isTotalV2')
            },
            schemaScoreCriteria(){
                return this.schema.find(item=>item._name === 'scoreCriteria')
            },
            schemaEvaluatedScore(){
                return this.schema.find(item=>item._name === 'evaluatedScoreV2')
            },
        },
        methods: {
            beforeSubmit(formData) {
                const deleteKeys = ['isTotalV2','evaluatedScoreV2'];
                const optionalScores = Object.values(ScoreCriteria2).find(item=>item.name === formData.scoreCriteria).optionalScores;
                formData.isTotal = formData.isTotalV2 !== '总分' ? false : true;
                formData.evaluatedScore = optionalScores.findIndex(item=> item === formData.evaluatedScoreV2);
                formData.standard = this.$parent.standard.objectId;
                Object.keys(formData).forEach(key=>{
                    if(deleteKeys.includes(key))delete formData[key]
                })
            },
            beforeEdit(row){
                row.evaluatedScoreV2 = this.handleScoreCriteria(row.scoreCriteria,row.evaluatedScore);
                row.isTotalV2 = !row.isTotal ? '单项' : '总分';
                row.standard = this.$parent.standard.name;
            },
            handleScoreCriteria(scoreCriteria,score) {
                return !(score) ? '' : Object.values(ScoreCriteria).find(item=>item.name === scoreCriteria).optionalScores[score-1];
            },
            handleChangeScoreCriteria() {
                this.schemaEvaluatedScore.evaluatedScoreV2 = '';
            }
        },
    }
</script>

