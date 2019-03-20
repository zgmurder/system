<template>
    <div class="TroopAnnualScoreRule">
        <div class="tip" style="padding: 10px 0"><i style="font-size: 12px;color: #f56c6c;margin-left: 10px">（tip:）提示：部队年度训练成绩由本级首长机关年度训练成绩、下一级单位年度训练成绩和部队战术（战役）训练成绩综合评定。因故未完成本级战术（战役）训练（专业合练）的部（分）队，部队年度训练成绩由本级首长机关年度训练成绩和下一级单位年度训练成绩综合评定
        </i></div>
        <el-form inline :model="formData" ref="ruleform" :rules="rules" class="formData" v-show="wrapperVisible" label-width="100px">
            <i class="el-icon-error" @click="closeModal"></i>
            <el-form-item label="大纲标准："  prop="standard">
                <el-select clearable v-model="formData.standard" placeholder="请选择大纲标准">
                    <el-option
                        v-for="item in selectStandard"
                        :key="item.name"
                        :label="item.name"
                        :value="item.objectId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="评分标准："  prop="scoreCriteria">
                <el-select filterable clearable value-key="name" v-model="scoreCriteriaData" @change="changeScoreCriteria" placeholder="请选择评分标准">
                    <el-option
                        v-for="item in ScoreCriteria"
                        :key="item.objectId"
                        :label="item.name"
                        :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="评定成绩："  prop="score">
                <el-select filterable clearable v-model="formData.score" placeholder="请选择评分标准">
                    <el-option
                        v-for="(item,index) in selectEvaluatedScore"
                        :key="item"
                        :label="item"
                        :value="index + 1">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="其他选项：" prop="withTactics">
                <el-checkbox label="是否战术成绩" v-model="formData.withTactics" ></el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button :type="btnState?'primary':'warning'" @click="onSubmit('ruleform', onSubmitCallBack)">{{btnState?'添加':'修改'}}</el-button>
            </el-form-item>
        </el-form>
        <el-table
            :data="tableData"
            border
            :max-height="maxTableHegith"
            style="width: 100%">
            <el-table-column
                prop="standard"
                label="训练大纲">
                <template slot-scope="scope">
                    <span>{{ scope.row.standard && scope.row.standard.name }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="scoreCriteria"
                label="评分标准">
                <template slot-scope="scope">
                    <span>{{scope.row.scoreCriteria}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="score"
                label="评定成绩">
                <template slot-scope="scope">
                    <span>
                        {{scope.row.scoreCriteria|parseEvaluatedScore(scope.row.score) }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                prop="isNewRecruit"
                label="是否有战术成绩">
                <template slot-scope="scope">
                    <span>{{!scope.row.withTactics && '否' || '是'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="score"
                label="成绩条件">
                <template slot-scope="scope">
                    <span v-if="scope.row.score < 2">
                        达不到及格标准
                    </span>
                    <span v-else>
                        {{scope.row.conditions|filterConditions}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                label="成绩条件编辑">
                <template slot-scope="scope">
                    <el-button size="mini"
                               type="text" @click="handleConditions(scope.row)">
                        点击编辑
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
        <div class="shadeBox" :class="{'shadeBox-wrapper':wrapperVisible}" ></div>
        <el-dialog :title="dialogTableTitle" :visible.sync="dialogTableVisible" width="60%" style="overflow: hidden">
            <el-form inline :model="subFormData" ref="subRuleform" :rules="rules" :class="{editing:editing}" label-width="100px">
                <el-form-item label="评分标准："  prop="subScoreCriteriaData">
                    <el-select filterable clearable value-key="name" v-model="subFormData.subScoreCriteriaData"  @change="changeSubScoreCriteria" placeholder="评分标准"  style="width: 130px" size="small">
                        <el-option
                            v-for="item in ScoreCriteria"
                            :key="item.objectId"
                            :label="item.name"
                            :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="战术成绩："  prop="tacticsSocre">
                    <el-select filterable clearable v-model="subFormData.tacticsSocre" :disabled=" !this.subRowData.withTactics && true || false" placeholder="成绩要求"  size="small" style="width: 130px">
                        <el-option
                            v-for="(item,index) in selectSubEvaluatedScore"
                            :key="item"
                            :label="item"
                            :value="index + 1">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="成绩要求："  prop="scoreReq">
                    <el-select filterable clearable v-model="subFormData.scoreReq" placeholder="成绩要求"  size="small" style="width: 130px">
                        <el-option
                            v-for="(item,index) in selectSubEvaluatedScore"
                            :key="item"
                            :label="item"
                            :value="index + 1">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="课目数："  prop="courseNum">
                    <el-input v-model="subFormData.courseNum" placeholder="计数"  size="small"   style="width: 130px">
                        <template slot="append" style="padding: 0 15px">项</template>
                    </el-input>
                </el-form-item>
                <el-form-item style="float: right">
                    <el-button type="primary" @click="onSubmit('subRuleform',onSubmitSubAddCallback)" v-if="!subBtnState">添加</el-button>
                    <el-button type="warning" @click="onSubmit('subRuleform',onSubmitSubAddCallback)" v-else>修改</el-button>
                </el-form-item>
            </el-form>
            <div class="dialog-table" style="max-height: 500px; overflow: auto">
                <el-table
                    border
                    :data="subTableData"
                    size="mini"
                    style="width: 100%;">
                    <el-table-column
                        label="成绩标准">
                        <template slot-scope="scope">
                            <span>{{ scope.row.scoreCriteria}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="战术成绩">
                        <template slot-scope="scope">
                            <span v-if="scope.row.tacticsSocre === 0">无要求</span>
                            <span v-else>{{ scope.row.scoreCriteria|parseEvaluatedScore(scope.row.tacticsSocre) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="成绩要求">
                        <template slot-scope="scope">
                            <span>{{ scope.row.scoreCriteria|parseEvaluatedScore(scope.row.scoreReq) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="成绩课目数">
                        <template slot-scope="scope">
                            <span>{{ scope.row.courseNum }}</span>
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
            </div>
            <div class="shadeBox" :class="{'shadeBox-wrapper':editing}" style="position: absolute;top: 0;" @click="closeSubModel"></div>
        </el-dialog>
    </div>
</template>

<script>

    // 单位体育成绩评定标准
    // const OrgSportScoreStandardSchema = new Schema({
    //  standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 训练大纲
    //  scoreCriteria: String,                           // 成绩评定标准(多级制类型)
    //  score: Number,                                   // 评定成绩
    //  withTactics: Boolean,                            // 是否有战术作业成绩
    //  conditions: [{                                   // 成绩评定条件(对象为个人单课目成绩)
    //      scoreCriteria: String,                       // 成绩评定标准(多级制类型)
    //      tacticsSocre: Number,                        // 战术作业成绩要求(0:表示无要求)
    //      scoreReq: Number,                            // 成绩要求
    //      courseNum: Number,                           // 符合成绩要求的课目数, 数组中的每个条件之间是并且的关系
    //  }]
    // });
    import {ScoreCriteria} from 'src/lib/Constants'
    import {handle} from 'src/config/mixin'
    export default {
        mixins:[handle],
        data() {
            return {
                ScoreCriteria,
                selectStandard:[],
                selectEvaluatedScore: [],
                scoreCriteriaData: {},
                // SubScoreCriteriaData: {},
                selectSubEvaluatedScore: [],
                rules:{
                    standard:[
                        { required: true, message: '请选择训练大纲',},
                    ],
                    scoreCriteria: [
                        { required: true, message: '请选择评分标准',},
                    ],
                    subScoreCriteriaData: [
                        { required: true, message: '请选择评分标准',},
                    ],
                    courseNum: [
                        { required: true, message: '请输入课目数', trigger: 'blur'},
                    ]
                },
                subRowData: {},
                dialogTableTitle: '',
                editing:false,
                dialogTableVisible:false,
                subFormData:{
                    scoreReq:undefined,
                    tacticsSocre:undefined
                },
                subTableData: [],
                subBtnState:false,
            }
        },
        created(){
            this.triggerSelect('TrainStandard','selectStandard').then(_=>{
                this.curStandard();
            });
        },
        filters:{
            parseEvaluatedScore(scoreCriteria,score) {
                return !(score) ? '' : Object.values(ScoreCriteria).find(item=>item.name === scoreCriteria).optionalScores[score-1];
            },
            filterConditions(conditions) {
                if (conditions.length > 0) {
                    let strings = '';
                    conditions.forEach(function (v, k) {
                        let scoreReq = !(v.scoreReq) ? '' : Object.values(ScoreCriteria).find(item=>item.name === v.scoreCriteria).optionalScores[v.scoreReq-1];
                        let tacticsSocre = !(v.tacticsSocre) ? '' : Object.values(ScoreCriteria).find(item=>item.name === v.scoreCriteria).optionalScores[v.tacticsSocre-1];
                        let tacticsSocreString = !(tacticsSocre) ? '' : `战术成绩为${tacticsSocre},`;
                        strings += `${tacticsSocreString}${v.courseNum}项课目成绩不低于${scoreReq}；`;
                    });
                    return strings.substring(0, strings.length-1);
                } else {
                    return ''
                }
            }
        },
        methods: {
            handleEditCallback(row){
                this.formData ={
                    ...this.cloneDeep(row),
                    standard: row.standard.objectId,
                };
                this.scoreCriteriaData = Object.values(ScoreCriteria).find(item=>item.name === row.scoreCriteria);
                this.selectEvaluatedScore = Object.values(ScoreCriteria).find(item=>item.name === row.scoreCriteria).optionalScores;
                this.formData.score = !(row.score) ? undefined : row.score;
            },
            changeScoreCriteria(item){
                this.score = '';
                this.selectEvaluatedScore = item.optionalScores || [];
                this.formData.score = undefined;
                this.formData.scoreCriteria=this.scoreCriteriaData.name
            },
            changeSubScoreCriteria(item) {
                this.selectSubEvaluatedScore = item.optionalScores || [];
                this.subFormData.scoreReq = undefined;
                this.subFormData.tacticsSocre = undefined;
                this.subFormData.scoreCriteria= item.name;
            },
            onSubmitCallBack() {
                this.formData.score = this.formData.score || 0;
                let target = {...this.formData};
                return target;
            },
            handleConditions(curRow) {
                this.dialogTableVisible = true;
                this.subFormData.objectId = curRow.objectId;
                this.subTableData = curRow.conditions;
                this.dialogTableTitle = '成绩条件';
                this.subRowData = curRow;
            },
            onSubmitSubAddCallback(formData){
                let target = {...formData};
                delete this.subFormData.subScoreCriteriaData;
                this.subFormData.courseNum = Number(this.subFormData.courseNum);
                this.subFormData.scoreReq = this.subFormData.scoreReq || 0;
                this.subFormData.tacticsSocre = this.subFormData.tacticsSocre || 0;
                if (this.editing) {
                    this.subTableData[this.subFormData.index] = this.subFormData;
                    this.subTableData = [...this.subTableData];
                }else {
                    const isRepeated = this.subTableData.some(item => {
                        return (this.subFormData.scoreCriteria === item.scoreCriteria) && (this.subFormData.scoreReq === item.scoreReq) && (this.subFormData.courseNum === item.courseNum)
                    });
                    if(isRepeated){
                        this.$message({showClose: true,
                            type:'warning',message:'不能添加重复数据'
                        });
                        return false
                    }
                    this.subTableData.push(this.subFormData);
                }
                delete this.subFormData.index;
                target = {
                    objectId: this.subFormData.objectId,
                    conditions: [...this.subTableData],
                };
                this.closeSubModel();
                this.selectSubEvaluatedScore = '';
                return target;
            },
            handleEditSub(index, row){
                this.subBtnState = true;
                this.editing = true;
                Object.assign(this.subFormData,row);
                this.subFormData.subScoreCriteriaData = Object.values(ScoreCriteria).find(item=>item.name === row.scoreCriteria);
                this.selectSubEvaluatedScore = Object.values(ScoreCriteria).find(item=>item.name === row.scoreCriteria).optionalScores;
                this.subFormData.index = index;
                this.subFormData.scoreReq = !(row.scoreReq) ? undefined : row.scoreReq;
                this.subFormData.tacticsSocre = !(row.tacticsSocre) ? undefined : row.tacticsSocre;
            },
            handleDeleteSub(index,row,differ){
                this.confirm().then(_=>{
                    const j = this.subTableData;
                    this.$delete(j,index);
                    const target = {
                        objectId:this.subFormData.objectId,
                        conditions:this.subTableData,
                    };
                    this.addOrUpdateItem(target).then(result=>{
                        this.$message({showClose: true,
                            type:'success',
                            message:'删除条件成功'
                        });
                    }).catch(result =>{
                        return false
                    })
                });
            },
            closeSubModel(){
                this.editing = false;
                this.subBtnState = false;
                const id = this.subFormData.objectId;
                this.initSubFormData();
                this.subFormData.objectId = id;
                this.$refs.subRuleform.clearValidate()
            },
            initSubFormData() {
                this.subFormData = {
                    subScoreCriteriaData: {},
                    scoreCriteria: '',                       // 成绩评定标准(多级制类型)
                    tacticsSocre: undefined,                        // 战术作业成绩要求(0:表示无要求)
                    scoreReq: undefined,                            // 成绩要求
                    courseNum: 0,                           // 符合成绩要求的课目数, 数组中的每个条件之间是并且的关系
                    index: '',
                }
            },
            initFormData() {
                this.scoreCriteriaData = {};
                this.formData = {
                    standard: '',    // 训练大纲
                    scoreCriteria: '',                           // 成绩评定标准(多级制类型)
                    score: undefined,                                   // 评定成绩
                    withTactics: false,                            // 是否有战术作业成绩
                    conditions: [],
                }
            }

        }
    }
</script>

<style scoped>
    /*.formData{*/
    /*display: grid;*/
    /*grid-template-columns: 33% 33% 33%;*/
    /*}*/
    /*.formData .el-form-item:last-child{*/
    /*width: 100%;*/
    /*display: flex;*/
    /*justify-content: flex-end;*/
    /*}*/
    .formData{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    /*.formData .el-form-item:last-child{*/
        /*width: 100%;*/
        /*display: flex;*/
        /*justify-content: flex-end;*/
    /*}*/
    .el-icon-error{
        font-size: 18px;
        position: absolute;right: -5px;z-index: 4;top:-5px;
        color: #666;
    }
    .el-icon-error:hover{
        color: #409EFF;
        cursor: pointer;
    }
    .editing{
        position: relative;
        z-index: 3;
        border:solid 1px red;
        background: #fafafa;
        padding-top: 20px;
    }
</style>

