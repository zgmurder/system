<template>
    <div class="TrainerLevel">
        <el-form inline :model="formData" ref="ruleform" :rules="rules" class="formData" v-show="wrapperVisible" label-width="80px">

            <i class="el-icon-error" @click="closeModal"></i>
            <el-form-item label="大纲标准"  prop="standard">
                <el-select clearable v-model="formData.standard" placeholder="请选择大纲标准">
                    <el-option
                        v-for="item in selectStandard"
                        :key="item.name"
                        :label="item.name"
                        :value="item.objectId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="课目名称"  prop="name">
                <el-input v-model="formData.name" style="width: 217px" placeholder="课目名称"></el-input>
            </el-form-item>
            <el-form-item label="课目序号"  prop="seq">
                <el-input-number v-model="formData.seq" style="width: 217px" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="课目分类"  prop="sportCategory">
                <el-select filterable clearable v-model="formData.sportCategory" placeholder="体育课目分类" @focus="triggerSelect('SportCategory','selectSportCategory')">
                    <el-option
                        v-for="item in selectSportCategory"
                        :key="item.objectId"
                        :label="item.name"
                        :value="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="训练要求"  prop="require">
                <el-select filterable clearable v-model="formData.require" placeholder="训练要求">
                    <el-option
                        v-for="(value,key) in selectTrain"
                        :key="key"
                        :label="value"
                        :value="value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="评分标准"  prop="scoreCriteria">
                <el-select filterable clearable v-model="formData.scoreCriteria" placeholder="评分标准">
                    <el-option
                        v-for="(value,key) in selectScore"
                        :key="key"
                        :label="value.name"
                        :value="value.name">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="场地要求"  prop="placeTypes">
                <el-select filterable multiple v-model="formData.placeTypes" placeholder="训练场地要求" @focus="triggerSelect('PlaceType','selectPlaceType')">
                    <el-option
                        v-for="item in selectPlaceType"
                        :key="item.objectId"
                        :label="item.name"
                        :value="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="成绩计数"  prop="countType">
                <el-select filterable clearable v-model="formData.countType" placeholder="成绩计数方式">
                    <el-option
                        v-for="(value,key) in CountType"
                        :key="key"
                        :label="value"
                        :value="value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="评分方式"  prop="isAscending">
                <el-select filterable clearable v-model="formData.isAscending" placeholder="请选择评分方式">
                    <el-option
                        v-for="item in selectAscending"
                        :key="item.name"
                        :label="item.name"
                        :value="item.tag">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="计量单位"  prop="unitType">
                <el-input  v-model="formData.unitType" style="width: 217px" placeholder="计数计量单位" :disabled="formData.countType === '数量'? false: true"></el-input>
            </el-form-item>
            <el-form-item label="课目条件"  prop="textCondition">
                <el-input type="textarea" v-model="formData.textCondition" style="width: 217px" placeholder="课目条件"></el-input>
            </el-form-item>
            <el-form-item label="课目标准"  prop="textStandard">
                <el-input type="textarea" v-model="formData.textStandard" style="width: 217px" placeholder="课目标准"></el-input>
            </el-form-item>
            <el-form-item label="考核要求"  prop="textEvaluation">
                <el-input type="textarea" v-model="formData.textEvaluation" style="width: 217px" placeholder="考核要求"></el-input>
            </el-form-item>

            <div class="form-btn">
                <span style="color: #999">若要添加子课目，需将主课目添加成功后，在主课目里的子课目点击添加，修改!!!!!!!!</span>
                <el-button-group style="width: 284px;float: right">
                    <el-button style="width: 50%" @click="initFormData">重置</el-button>
                    <el-button style="width: 50%" :type="btnState?'primary':'warning'" @click="onSubmit('ruleform')">{{btnState?'添加':'修改'}}</el-button>
                </el-button-group>
            </div>
        </el-form>
        <Filters :props="[Standard,SportCategory,Require,ScoreCriteria,PlaceTypes]" placeholder="输入课目名称，将自动搜索" @filterValueIsChange="filterValueIsChange" @querySearchAsync="querySearchAsync"></Filters>

        <el-table
            :data="tableData"
            border
            :max-height="maxTableHegith"
            style="width: 100%">
            <el-table-column
                label="详细"
                type="expand">
                <template slot-scope="scope">
                    <div class="subTableShow">
                        <h3>{{ `${scope.row.seq}. ${scope.row.name}` }}</h3>
                        <dl class="describText" style="display:flex;flex-wrap: wrap;justify-content: space-between;">
                            <dd>训练大纲：<span>{{ scope.row.standard&&scope.row.standard.name }}</span></dd>
                            <dd>课目分类：<span>{{ scope.row.sportCategory }}</span></dd>
                            <dd>训练要求：<span>{{ scope.row.require }}</span></dd>
                            <dd>评分标准：<span>{{ scope.row.scoreCriteria }}</span></dd>
                            <dd>场地要求：<span>{{ scope.row.placeTypes.join(',') | handleEmptyData}}</span></dd>
                            <dd>评分方式：<span>{{ scope.row | makeupCountType}}</span></dd>
                        </dl>
                        <h3>备注</h3>
                        <div class="subcourses" style="color: #999">
                            <p>条件：{{ scope.row.textCondition | handleEmptyData}}</p>
                            <p>标准：{{ scope.row.textStandard | handleEmptyData}}</p>
                            <p>考核：{{ scope.row.textEvaluation | handleEmptyData}}</p>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                label="大纲标准" width="200">
                <template slot-scope="scope">
                    <span>{{ scope.row.standard&&scope.row.standard.name || '已停用'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                width="200"
                label="课目名称">
                <template slot-scope="scope">
                    <span>{{ `${scope.row.seq}. ${scope.row.name}` }}</span>
                </template>
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                width="100"
                label="课目分类">
                <template slot-scope="scope">
                    <span>{{ scope.row.sportCategory }}</span>
                </template>
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                width="100"
                label="训练要求">
                <template slot-scope="scope">
                    <span>{{ scope.row.require }}</span>
                </template>
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                width="100"
                label="评分标准">
                <template slot-scope="scope">
                    <span>{{ scope.row.scoreCriteria }}</span>
                </template>
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                label="场地要求">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.placeTypes.length"
                            v-for="(item,index) in scope.row.placeTypes"
                            size="mini"
                            type="danger"
                            :key="index">
                        {{item}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                width="200"
                label="成绩计数方式">
                <template slot-scope="scope">
                    <span>{{ scope.row | makeupCountType }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="子课目"
                width="100">
                <template slot-scope="scope">
                    <el-button size="mini"
                               type="text" @click="handleSubcourses(scope.row)">
                        点击查看
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="right" width="150">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.row,handleEditCallback)">编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagination
            :total="pageConfig.total"
            :page-size="pageConfig.pageSize"
            :page-sizes="pageConfig.pageSizes"
            @sizeChange="changePage"
            @currentChange="changePage"
            :current-page="pageConfig.currentPage"></Pagination>
        <div class="shadeBox" :class="{'shadeBox-wrapper':wrapperVisible}"></div>
        <el-dialog :title="dialogTableTitle" :visible.sync="dialogTableVisible" width="80%">
            <el-form inline :model="subFormData" ref="subRuleform" :rules="rules" :class="{editing:editing}">

                <el-form-item :label="!addNextSubState?'子课目名称':'二级子课目名称'"  prop="name">
                    <el-input v-model="subFormData.name" placeholder="课目名称"></el-input>
                </el-form-item>
                <el-form-item label="课目序号"  prop="seq">
                    <el-input-number v-model="subFormData.seq" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="训练要求"  prop="require">
                    <el-select v-model="subFormData.require" placeholder="训练要求">
                        <el-option
                            v-for="(value,key) in selectTrain"
                            :key="key"
                            :label="value"
                            :value="value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="float: right">
                    <el-button type="primary" @click="onSubmit('subRuleform',onSubmitSubAddCallback)" v-if="!subBtnState">添加</el-button>
                    <el-button type="warning" @click="onSubmit('subRuleform',onSubmitSubAddCallback)" v-else>修改</el-button>
                </el-form-item>
            </el-form>
            <el-table
                border
                :data="subTableData"
                @expand-change="expandChange"
                :row-key="getRowKeys"
                :expand-row-keys="expands"
                @current-change="toggleRowExpansion"
                style="width: 100%">
                <el-table-column
                    label="二级子课目"
                    width="100"
                    type="expand">
                    <template slot-scope="props">
                        <!--<div class="nextSubCourse"><i class="iconfont icon-jia" title="点击添加"></i>添加二级子课目</div>-->
                        <el-button type="primary" icon="iconfont icon-jia" @click="addNextSub(props)">添加二级子课目</el-button>
                        <el-table
                            border
                            :data="nextSubTableData"
                            style="width: 100%">
                            <el-table-column
                                width="50"
                                label="序号">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.seq }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="课目名称">
                                <template slot-scope="scope">
                                    <el-tag size="medium">{{scope.row.name}}</el-tag>
                                </template>
                            </el-table-column>

                            <el-table-column
                                label="训练要求">
                                <template slot-scope="scope">
                                    <el-tag size="medium">{{scope.row.require}}</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" align="right" width="150">
                                <template slot-scope="props">
                                    <el-button
                                        size="mini"
                                        type="text"
                                        @click="handleDeleteSub(props.$index, props.row,1)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-table-column>
                <el-table-column
                    width="50"
                    label="序号">
                    <template slot-scope="scope">
                        <span>{{ scope.row.seq }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="课目名称">
                    <template slot-scope="props">
                        <el-tag size="medium">{{props.row.name}}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                    label="训练要求">
                    <template slot-scope="props">
                        <el-tag size="medium">{{props.row.require}}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column label="操作" align="right" width="150">
                    <template slot-scope="props">
                        <el-button
                            size="mini"
                            @click="handleEditSub(props.$index, props.row)">编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDeleteSub(props.$index, props.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="shadeBox" :class="{'shadeBox-wrapper':editing}" style="position: absolute;top: 0;" @click="closeSubModel"></div>
        </el-dialog>
    </div>
</template>

<script>

    // 子课目
    // const SubCourseSchema = Schema({
    // 	seq: Number,
    // 	name: String,
    // 	require: String,
    // 	subcourses: [SubCourseSchema],
    // });

    // 课目
    // const CourseSchema = new Schema({
    // 	name: { type: String, required: true },         // 课目名称
    //  seq: Number,                                    // 课目序号
    //  standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 训练大纲
    //  isManual: Boolean,                              // 子课目是否自定义
    //  require: String,                                // 训练要求, 必训/选训/自训, 参考Constants.TrainRequirement
    //  scoreCriteria: String,                          // 评分标准, 二级制/四机制/七级制/百分制
    //  placeTypes: [String],                           // 训练场地要求, 参考PlaceType表

    //  countType: String,                              // 课目成绩按 时间或数量 计数
    //  isAscending: Boolean,                           // true: 递增评分，false: 递减评分
    //  unitType: String,                               // 计量单位, (手动输入)（次/转/米/阶/圈等）

    //  subcourses: [SubCourseSchema],                  // 子课目列表

    //  textCondition: String,                          // 课目条件
    //  textStandard: String,                           // 课目标准
    //  textEvaluation: String,                         // 考核要求
    // });
    import {CountType,PersonProperty,TrainRequirement,ScoreCriteria,OrgSequences} from 'src/lib/Constants'
    import Filters from 'src/pages/common/Filters.vue'
    import {handle} from 'src/config/mixin'
    import Client from 'src/lib/Client'
    import _ from 'lodash'

    export default {
        mixins:[handle],
        components:{
            Filters
        },
        data() {
            return {
                selectOrgSequences:OrgSequences,
                selectScore:ScoreCriteria,
                selectTrain:TrainRequirement,
                selectPersonType:PersonProperty,
                CountType,
                selectAscending: [{name:'递增评分', tag:true}, {name:'递减评分', tag:false}],
                rules:{
                    standard:[
                        { required: true, message: '请选择大纲标准'},
                    ],
                    name:[
                        { required: true, message: '请输入课目名称',},
                    ],
                    seq:[
                        { required: true, message: '请输入课目序号',},
                    ],
                    sportCategory:[
                        { required: true, message: '请输入体育课目分类',},
                    ],
                    require:[
                        { required: true, message: '请输入职务定义名称',},
                    ],
                    scoreCriteria:[
                        { required: true, message: '请输入职务定义名称',},
                    ]
                },
                selectStandard:[],
                selectPlaceType:[],
                selectSportCategory:[],
                dialogTableVisible:false,
                dialogTableTitle:'',
                subTableData:[],
                nextSubTableData:[],
                subFormData:{},
                subBtnState:false,
                editing:false,
                addNextSubState:false,
                nextSubIndex:0,
                expands:[],
                Standard:{selects: undefined, value:'', valueKey:'objectId', textValue: true, placeholder: '训练大纲', equalObject: {className:'SportCourse',name:'standard'}},
                SportCategory:{selects: undefined, value:'', placeholder: '课目分类', equalObject: {className:'SportCourse',name:'sportCategory'}},
                Require:{selects: TrainRequirement, value:'', placeholder: '训练要求', equalObject: {className:'SportCourse',name:'require'}},
                ScoreCriteria:{selects: ScoreCriteria, value:'', placeholder: '评分标准', equalObject: {className:'SportCourse',name:'scoreCriteria'}},
                PlaceTypes:{selects: undefined, value:'', placeholder: '场地要求', equalObject: {className:'SportCourse',name:'placeTypes'}},
                equalObject: undefined,
                search: {
                    key: '',
                    value: ''
                },
            }
        },
        created(){
            this.initSubFormData();
            this.triggerSelect('TrainStandard').then(result=>{
                this.curStandard();
                this.Standard.selects = result.list;
                this.selectStandard = result.list;
            });
            this.triggerSelect('PlaceType').then(result=>{
                this.PlaceTypes.selects = result.list;
            });
            this.triggerSelect('SportCategory').then(result=>{
                this.SportCategory.selects = result.list;
            })
        },
        watch:{
            'formData.countType'(newVal, oldVal) {
                (_.isEmpty(newVal)) && (this.formData.unitType = '');
                (newVal === CountType.Time) && (this.formData.unitType = '秒');
                (oldVal === CountType.Time && newVal === CountType.Amount) && (this.formData.unitType = '');
            }
        },
        filters:{
            handleEmptyData(data){
                return Array.isArray(data)? data.length === 0 && '无'||data:data||'无'
            },
            makeupCountType(item) {
                let display = '无';
                if (item.countType === CountType.Time) {
                    item.isAscending?(display=`按${item.countType}计数,递增评分`):(display=`按${item.countType}计数,递减评分`);
                } else if (item.countType === CountType.Amount) {
                    item.isAscending?(display=`按${item.unitType}数计数,递增评分`):(display=`按${item.unitType}数计数,递减评分`);
                }
                return display;
            }
        },
        methods: {
            handleQuery(filterObj,className = this.className) {
                if(!filterObj)return this.query(className);
                let [parentQuery, childQuery, childName] = [];
                filterObj.map(item=>{
                    parentQuery = parentQuery || this.query(className);
                    if (item.name === 'standard') {
                        let parseStandard = new Client.TrainStandard();
                        parseStandard.id = item.value;
                        parentQuery.equalTo(item.name,parseStandard);
                    } else {
                        parentQuery.equalTo(item.name,item.value);
                    }
                });
                parentQuery = parentQuery || this.query(className);
                childQuery && parentQuery.matchesQuery(childName.toLowerCase(), childQuery);
                parentQuery.addAscending('createdAt');
                return parentQuery;
            },
            querySearchAsync(string){
                this.search.key = 'name';
                this.search.value = string;
                this.equalObject = undefined;
                this.changePage(0);
            },
            async changePage(curPage,pageSize){
                let query = this.handleQuery(this.equalObject);
                if (this.search.value&&this.search.value.length>0) {
                    query.contains(this.search.key,this.search.value);
                }
                query.skip(curPage).limit(pageSize||this.pageConfig.pageSize);
                const result = await this.queryList(this.className,query);
                this.pageConfig.total = result.total;
                this.tableData = result.list;
                return result;
            },
            filterValueIsChange(equalObject, num){
                (!equalObject.length && num === -1) && (this.search.value = '');
                equalObject = !equalObject.length? undefined : equalObject ;
                this.equalObject = equalObject;
                this.changePage(0);
            },
            handleEditCallback(row){
                this.formData = {
                    ...row,
                    standard: row.standard.objectId,
                }
            },
            onSubmitSubAddCallback(formData){
                let target = {...formData};
                if (this.editing) {
                    this.subTableData[this.subFormData.index] = this.subFormData;
                    this.subTableData = [...this.subTableData];
                }else {
                    const isRepeated = this.subTableData.some(item => {
                        return this.subFormData.name === item.name
                    });
                    if(isRepeated){
                        this.$message({showClose: true,
                            type:'warning',message:'不能添加重复数据'
                        });
                        return false
                    }
                    this.subTableData.push(this.subFormData);
                }
                target = {
                    objectId: this.subFormData.objectId,
                    subcourses: [...this.subTableData],
                };
                if (this.addNextSubState) {
                    let arr = target.subcourses[this.nextSubIndex].subcourses;
                    arr.push(this.subFormData);
                    this.nextSubTableData = arr;
                }
                this.closeSubModel();
                return target;
            },

            getRowKeys(row) {
                return row.name;
            },
            toggleRowExpansion(row){
                if(!row)return;
                this.expands = [];
                row && this.expands.push(row.name);
            },
            handleSubcourses(curRow){
                this.dialogTableVisible = true;
                this.dialogTableTitle = curRow.name + '的子课目';
                this.subTableData = curRow.subcourses;
                this.subFormData.objectId = curRow.objectId;
            },
            handleEditSub(index, row){
                this.subBtnState = true;
                this.editing = true;
                Object.assign(this.subFormData,row);
                this.subFormData.index = index;
            },
            handleDeleteSub(index,row,differ){
                this.confirm().then(_=>{
                    const j = differ?this.nextSubTableData:this.subTableData;
                    this.$delete(j,index);
                    const target = {
                        objectId:this.subFormData.objectId,
                        subcourses:this.subTableData,
                    };
                    this.addOrUpdateItem(target).then(result=>{
                        this.$message({showClose: true,
                            type:'success',
                            message:'删除子课目成功'
                        });
                    }).catch(result =>{
                        return false
                    })
                });
            },
            closeSubModel(){
                this.editing = false;
                this.subBtnState = false;
                this.addNextSubState = false;
                const id = this.subFormData.objectId;
                this.initSubFormData();
                this.subFormData.objectId = id;
                this.$refs.subRuleform.clearValidate()
            },
            addNextSub(props){
                this.editing = true;
                this.addNextSubState = true;
                this.nextSubIndex = props.$index;
            },
            expandChange(row,expandedRows){
                this.nextSubTableData = row.subcourses;
            },
            initSubFormData(){
                this.subFormData = {
                    objectId:'',
                    seq: 0,
                    name: '',
                    require: '',
                    subcourses: [],
                    index:'',
                }
            },
            initFormData(){
                this.formData = {
                    name: '',                                   // 课目名称
                    seq: 0,                                     // 课目序号
                    standard: '',                               // 训练大纲
                    isManual: false,                            // 子课目是否自定义
                    require: '',                                // 训练要求, 必训/选训/自训, 参考Constants.TrainRequirement
                    scoreCriteria: '',                          // 评分标准, 二级制/四机制/七级制/百分制
                    placeTypes:[],                              // 训练场地要求, 参考PlaceType表

                    countType: '',                              // 课目成绩按 时间或数量 计数
                    isAscending: false,                           // true: 递增评分，false: 递减评分
                    unitType: '',                               // 计量单位, (手动输入)（次/转/米/阶/圈等）

                    subcourses: [],                             // 子课目列表
                    textCondition: '',                          // 课目条件
                    textStandard: '',                           // 课目标准
                    textEvaluation: '',                         // 考核要求

                };
                this.$refs.ruleform && this.$refs.ruleform.clearValidate()
            },
        },
    }
</script>

<style scoped>
    .formData{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .subTableShow{
        color: #666;
    }
    .subTableShow h3{
        line-height: 32px;
        border-bottom: 1px solid #ebeef5
    }
    ._subcourses{
        line-height: 32px;
        border-bottom: 1px solid #ebeef5
    }
    .describText{
        margin-top: 20px;
        margin-bottom: 15px;
        line-height: 38px;
        color: #999;
    }
    .describText dd{
        box-sizing: border-box;
        width: 25%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        padding: 0 10px;
    }
    .describText span{
        color: #409EFF;
    }
    .subcourses{

        line-height: 32px;
        margin-top: 10px;
    }
    .subcourses>ul{
        padding-right: 20px;
        width: 100%;
    }
    .subcourses>ul span{
        float: right;
        color: red;
    }
    .el-icon-error{
        font-size: 18px;
        position: absolute;right: -5px;z-index: 4;top:-5px;
        color: #666;
    }
    .el-icon-error:hover{
        color: #409EFF;
        cursor: pointer;
    }
    .form-btn{
        width: 100%;
        line-height: 40px;
        font-size: 14px;
        margin-right: 10px;
        margin-bottom: 20px;
        border-top: 1px solid #ebeef5;
        padding-top: 15px
    }
    .beizhu{
        width: 100%;
        display: flex;
        margin-bottom: 20px;
        margin-right: 10px;
    }
    .beizhu div{
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .editing{
        position: relative;
        z-index: 3;
        border:solid 1px red;
        background: #fafafa;
        padding-top: 20px;
    }
    .nextSubCourse{
        float: right;
        line-height: 32px
    }
    .nextSubCourse:hover{
        color: red;
        cursor: pointer;
    }
</style>
