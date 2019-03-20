<template>
    <div class="SportScoreStandard">
        <el-form inline :model="formData" ref="ruleform" :rules="rules" class="formData" v-show="wrapperVisible" label-width="120px">
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
            <el-form-item label="训练课目："  prop="course">
                <el-select filterable clearable v-model="formData.course" placeholder="请选择训练课目">
                    <el-option
                        v-for="item in selectSportCourse"
                        :key="item.name"
                        :label="item.name"
                        :value="item.objectId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="训练等级："  prop="physicalLevels">
                <el-select filterable clearable multiple v-model="formData.physicalLevels" placeholder="请选择训练等级">
                    <el-option
                        v-for="item in selectPhysicalLevel"
                        :key="item.objectId"
                        :label="item.name"
                        :value="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item  label="军兵种类型："   prop="troopCategories">
                <el-select filterable clearable multiple v-model="formData.troopCategories" placeholder="请选军兵种类型">
                    <el-option
                        v-for="(value,key) in TroopCategory"
                        :key="key"
                        :label="value"
                        :value="value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item  label="性别(男/女)："   prop="gender">
                <el-select filterable clearable v-model="formData.gender" placeholder="请选性别">
                    <el-option
                        v-for="(value,key) in Gender"
                        :key="key"
                        :label="value"
                        :value="value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="其他选项：">
                <el-checkbox label="是否为文职" v-model="formData.isCivilServant" ></el-checkbox>
                <el-checkbox label="是否为高原" v-model="formData.isHighland"></el-checkbox>
            </el-form-item>
            <el-form-item  label="最低海拔："   v-if="formData.isHighland === true" prop="ageCondition">
                <el-input-number v-model="formData.heightRange.from"  :step="100" style="width: 217px" :min="0" :max="10000"></el-input-number>
            </el-form-item>
            <el-form-item  label="最高海拔："   v-if="formData.isHighland === true" prop="ageCondition">
                <el-input-number v-model="formData.heightRange.to" :step="100" style="width: 217px" :min="0" :max="10000"></el-input-number>
            </el-form-item>
            <el-form-item label="评分标准："  prop="scoreCriteria">
                <el-select filterable clearable value-key="name" v-model="scoreCriteriaData"  @change="changeScoreCriteria" placeholder="请选择评分标准">
                    <el-option
                        v-for="item in ScoreCriteria"
                        :key="item.objectId"
                        :label="item.name"
                        :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item  label="评分对象："   prop="scoreTarget">
                <el-select filterable clearable v-model="formData.scoreTarget" placeholder="请选对象">
                    <el-option
                        v-for="(value,key) in ScoreTarget"
                        :key="key"
                        :label="value"
                        :value="value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="formData.scoreTarget==='个人'" class="highScoreDetail">
                <label>满分成绩细则：</label>
                <span>
                    超过100分，课目每递增(递减)<el-input v-model="formData.highScoreDetail.countStep" style="width: 70px" size="1"></el-input>个(秒)增加<el-input v-model="formData.highScoreDetail.scoreStep" style="width: 70px" size="1"></el-input>分。
                </span>
            </el-form-item>
            <el-form-item v-if="formData.scoreTarget==='个人'&&formData.isHighland === true" class="highScoreDetail">
                <label>海拔影响：</label>
                <span>
                    海拔每增加<el-input v-model="formData.heightFactor.heightStep"  style="width: 70px"></el-input>米时间标准递增<el-input v-model="formData.heightFactor.countStep" style="width: 70px"> </el-input>秒。
                </span>
            </el-form-item>
            <div style="width: 100%;margin-bottom: 20px ; border-top:1px solid #ebeef5; padding-top: 20px">
                <span style="color: #999; float: left; font-size: 14px;line-height: 40px">若要添加评分细则，需将课目基本数据添加成功后，在数据列的评分细则里点击添加，修改!!!!!!!!</span>
                <el-button-group style="width: 284px;float: right">
                    <el-button :type="btnState?'primary':'warning'" @click="onSubmit('ruleform', onSubmitCallBack)" style="float: right">{{btnState?'添加':'修改'}}</el-button>
                </el-button-group>
            </div>
        </el-form>
        <Filters :props="[Standard,ScoreCriterias,TroopCategories,Genders]" placeholder="输入课目名称，将自动搜索" @filterValueIsChange="filterValueIsChange" @querySearchAsync="querySearchAsync"></Filters>

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
                        <h3>{{ scope.row.course && scope.row.course.name }}</h3>
                        <div class="subcourses" style="color: #999">
                            <p  v-if="scope.row.scoreTarget==='个人'" >满分细则：超过100分，课目每{{!(scope.row.course && scope.row.course.isAscending)&&'递减'||'递增'}} {{scope.row.highScoreDetail.countStep}} {{scope.row.course && scope.row.course.unitType}}增加 {{scope.row.highScoreDetail.scoreStep}} 分。</p>
                            <p  v-if="scope.row.scoreTarget==='个人' && scope.row.isHighland === true" >海拔影响：海拔每增加 {{scope.row.heightFactor.heightStep}} 米时间标准递增 {{scope.row.heightFactor.countStep}} 秒。</p>
                            <p v-if="scope.row.scoreTarget==='集体'">暂无</p>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="standard"
                label="训练大纲">
                <template slot-scope="scope">
                    <span>{{ scope.row.standard && scope.row.standard.name }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="course"
                label="体育课目">
                <template slot-scope="scope">
                    <span>{{ scope.row.course && scope.row.course.name }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="physicalLevel"
                label="体能训练等级">
                <template slot-scope="scope">
                    {{scope.row.physicalLevels|filterTags}}
                </template>
            </el-table-column>
            <el-table-column
                prop="troopCategory"
                label="军兵种类型">
                <template slot-scope="scope">
                    {{scope.row.troopCategories|filterTags}}
                </template>
            </el-table-column>
            <el-table-column
                prop="genders"
                width="100"
                label="性别(男/女)">
                <template slot-scope="scope">
                    {{scope.row.gender}}
                </template>
            </el-table-column>
            <el-table-column
                prop="isCivilServant"
                width="100"
                label="文职(是/否)">
                <template slot-scope="scope">
                    {{!scope.row.isCivilServant&&'否'||'是'}}
                </template>
            </el-table-column>
            <el-table-column
                prop="isHighland"
                width="100"
                label="高原(是/否)">
                <template slot-scope="scope">
                    {{!scope.row.isHighland&&'否'||'是'}}
                </template>
            </el-table-column>
            <el-table-column
                prop="isHighland"
                label="海拔范围">
                <template slot-scope="scope">
                    {{ !scope.row.isHighland && '无要求' || scope.row.heightRange.from+' - '+scope.row.heightRange.to}}
                </template>
            </el-table-column>
            <el-table-column
                prop="scoreCriteria"
                label="评分标准">
                <template slot-scope="scope">
                    {{scope.row.scoreCriteria}}
                </template>
            </el-table-column>
            <el-table-column
                prop="scoreTarget"
                label="评分对象">
                <template slot-scope="scope">
                    {{scope.row.scoreTarget}}
                </template>
            </el-table-column>
            <el-table-column
                label="评分细则"
                width="70">
                <template slot-scope="scope">
                    <el-button size="mini"
                               type="text" @click="handleScoreDetail(scope.row)">
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
        <el-dialog :title="dialogTableTitle" :visible.sync="dialogTableVisible" width="60%" style="overflow: hidden" :lock-scroll="lockScroll">
            <el-form inline :model="subFormData.individual" ref="subRuleform" :rules="rules" :class="{editing:editing}" label-width="100px">
                <el-form-item label="年龄段："   v-if="subRowData.scoreTarget==='个人'"  prop="ageRange">
                    <el-input-number v-model="subFormData.individual.ageRange.from"   :min="0" :max="100"  size="small"></el-input-number>
                    {{'-'}}
                    <el-input-number v-model="subFormData.individual.ageRange.to"   :min="0" :max="100"  size="small"></el-input-number>
                </el-form-item>
                <el-form-item >
                    <el-form-item label="计数："  prop="count">
                        <el-input v-if="subRowData.course && subRowData.course.unitType==='秒'" v-model="subFormData.countMin" placeholder="计数"  size="small"   style="width: 130px">
                            <template slot="append" style="padding: 0 15px">分</template>
                        </el-input>
                        <el-input v-if="subRowData.scoreTarget==='个人'" v-model="subFormData.individual.count" placeholder="计数"  size="small"   style="width: 130px">
                            <template slot="append" style="padding: 0 15px">{{subRowData.course && subRowData.course.unitType}}</template>
                        </el-input>
                        <el-input v-if="subRowData.scoreTarget==='集体'" v-model="subFormData.group.count" placeholder="计数"  size="small"  style="width: 130px">
                            <template slot="append" style="padding: 0 15px">{{subRowData.course && subRowData.course.unitType}}</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="得分："  prop="score" style="margin-left: -30px" v-if="subRowData.scoreCriteria === '百分制'">
                        <el-input v-if="subRowData.scoreTarget==='个人'" v-model="subFormData.individual.score" placeholder="得分" size="small" style="width: 130px"></el-input>
                        <el-input v-if="subRowData.scoreTarget==='集体'" v-model="subFormData.group.score" placeholder="得分" size="small"  style="width: 130px"></el-input>
                    </el-form-item>
                    <el-form-item label="评定成绩:" v-if="!(subRowData.scoreCriteria === '百分制')">
                        <el-select filterable v-model="subFormData.evaluatedScore" placeholder="评分标准" size="small"  style="width: 130px">
                            <el-option
                                v-for="(item,index) in selectEvaluatedScore"
                                :key="item"
                                :label="item"
                                :value="index + 1">
                            </el-option>
                        </el-select>
                    </el-form-item>
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
                        label="年龄">
                        <template slot-scope="scope">
                            <span>{{ subRowData.scoreTarget === '个人' && (scope.row && (scope.row.ageRange.from+' - '+ scope.row.ageRange.to)) || '无年龄要求'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="成绩">
                        <template slot-scope="scope">
                            <span>{{ scope.row.count|filterCount(subRowData) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="得分">
                        <template slot-scope="scope">
                            <span>{{ scope.row.score|filterScore(subRowData) }}</span>
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

    // 体育课目考核要求
    // const SportScoreStandardSchema = new Schema({
    //  standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 训练大纲
    //  course: { type: Schema.Types.ObjectId, ref: 'Course' },              // 体育课目
    //  physicalLevels: [String],                                            // 体能训练等级列表
    //  troopCategories: [String],                                            // 军兵种类型列表
    //  gender: String,                                                       // 性别要求(男/女)
    //  isCivilServant: Boolean,                                              // 是否为文职人员
    //  isHighland: Boolean,                                                  // 是否为高原地区
    //  heightRange: {                                                        // 海拔范围
    //      from: Number,
    //      to: Number,
    //  },
    //  scoreCriteria: String,                                                // 评分标准
    //  scoreTarget: String,                                                  // 评分对象（个人/集体），见ScoreTarget
    //  scoreDetail: {
    //      individual: [{                                                   // 个人成绩细则(评分对象为个人时有效)
    //          ageRange: {from: Number, to: Number},                        // 年龄范围
    //          count: Number,                                               // 成绩计数
    //          score: Number,                                               // 得分
    //      }],
    //      group: [{                                                        // 集体成绩细则(评分对象为集体时有效)
    //          count: Number,                                               // 成绩计数
    //          score: Number,                                               // 得分
    //      }]
    //  },
    //  highScoreDetail: {                                                   // 超过100分后的成绩计算方式
    //      countStep: Number,                                               // 成绩计数增量或减量
    //      scoreStep: Number                                                // 得分增量
    //  },
    //  heightFactor: {                                                      // 海拔影响
    //      heightStep: Number,                                              // 海拔增量
    //      countStep: Number,                                               // 成绩计数增量
    //  }
    // });
    import {ScoreTarget, Gender, ScoreCriteria, TroopCategory, CountType} from 'src/lib/Constants'
    import {handle} from 'src/config/mixin'
    import _ from 'lodash'
    import Filters from 'src/pages/common/Filters.vue'
    import Client from 'src/lib/Client'
    export default {
        mixins:[handle],
        components:{
            Filters
        },
        data() {
            return {
                selectStandard:[],
                selectSportCourse:[],
                selectPhysicalLevel: [],
                TroopCategory,
                ScoreCriteria,
                Gender,
                ScoreTarget,
                scoreCriteriaData: {},
                subRowData:{},
                lockScroll: false,
                rules:{
                    standard:[
                        { required: true, message: '请选择训练大纲',},
                    ],
                    course:[
                        { required: true, message: '请选择训练课目', },
                    ],
                    physicalLevels:[
                        { required: true, message: '请选择训练等级', },
                    ],
                    troopCategories: [
                        { required: true, message: '请选择军兵种', },
                    ],
                    gender: [
                        { required: true, message: '请选择性别', },
                    ],
                    ageRange: [
                        { type: 'object', required: true, message: '请输入年龄范围',},
                    ],
                    count: [
                        { required: true, message: '请输入计数',},
                    ],
                    score: [
                        { required: true, message: '请输入分数',},
                    ],
                },
                dialogTableTitle:'',
                dialogTableVisible:false,
                editing:false,
                subBtnState:false,
                addNextSubState:false,
                nextSubIndex:0,
                subFormData:{},
                subTableData:[],
                selectEvaluatedScore: [],
                Standard:{selects: undefined, value:'', valueKey:'objectId',textValue: true, placeholder: '训练大纲', equalObject: {className:'PersonSportScoreStandard',name:'standard'}},
                ScoreCriterias:{selects: ScoreCriteria, value:'', placeholder: '评分标准', equalObject: {className:'PersonSportScoreStandard',name:'scoreCriteria'}},
                TroopCategories:{selects: TroopCategory, value:'', placeholder: '军兵种类型', equalObject: {className:'PersonSportScoreStandard',name:'troopCategories'}},
                Genders:{selects: Gender, value:'', placeholder: '性别', equalObject: {className:'PersonSportScoreStandard',name:'gender'}},
                equalObject: undefined,
                search: {
                    key: '',
                    value: ''
                },
            }
        },
        created(){
            this.triggerSelect('TrainStandard').then(result=>{
                this.Standard.selects = result.list;
                this.selectStandard = result.list;
                this.curStandard();
            });
            this.triggerSelect('SportCourse','selectSportCourse');
            this.triggerSelect('PhysicalLevel','selectPhysicalLevel');
            this.initSubFormData();
        },
        computed: {
            filterTroopCategory(){
                return Object.values(TroopCategory).map(item => ({text: item, value: item}));
            },
        },
        filters: {
            filterCount(count, subRowData) {
                if (subRowData.course && subRowData.course.unitType === '秒') {
                    let mint,num,second,pointSecond;
                    if ( count>=60) {
                        mint = Math.floor(count/60) + ' \' ';
                    } else {
                        mint = '';
                    }
                    second = parseInt(count%60);
                    num = parseInt(count%60*10)/10;
                    pointSecond = Math.round((num - second)*10);
                    if (second<10) {
                        second = '0' + second;
                    }
                    return  mint + second +'" ' + pointSecond;
                } else {
                    return count;
                }
            },
            filterScore(score, subRowData) {
                if (subRowData.scoreCriteria === '百分制') {
                    return score;
                } else {
                    return Object.values(ScoreCriteria).find(item=>item.name === subRowData.scoreCriteria).optionalScores[score - 1]
                }
            },
            filterTags(tags) {
                return tags?tags.join('; '):'';
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
                    let courseQuery = this.query('TrainCourse');
                    courseQuery.contains(this.search.key,this.search.value);
                    query.matchesQuery('course', courseQuery);
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
                this.formData ={
                    ...this.cloneDeep(row),
                    standard: row.standard.objectId,
                    course: row.course.objectId
                };
                this.selectEvaluatedScore = Object.values(ScoreCriteria).find(item=>item.name === row.scoreCriteria).optionalScores;
                this.scoreCriteriaData = Object.values(ScoreCriteria).find(item=>item.name === row.scoreCriteria);
            },
            changeScoreCriteria(item){
                this.formData.scoreCriteria=this.scoreCriteriaData.name;
                this.selectEvaluatedScore = item.optionalScores;
            },
            onSubmitCallBack() {
                let target = {
                    ...this.formData,
                     highScoreDetail: {
                         countStep: Number(this.formData.highScoreDetail.countStep),
                         scoreStep: Number(this.formData.highScoreDetail.scoreStep),
                     },
                     heightFactor: {
                         heightStep:Number(this.formData.heightFactor.heightStep),
                         countStep: Number(this.formData.heightFactor.countStep),
                     }
                };
                return target;
            },
            handleScoreDetail(curRow){
                this.dialogTableVisible = true;
                this.dialogTableTitle = curRow.course.name + '评分细则';
                this.subTableData = curRow.scoreTarget === ScoreTarget.Individual? (curRow.scoreDetail.individual||[]):(curRow.scoreDetail.group||[]);
                this.subRowData = curRow;
                this.selectEvaluatedScore = Object.values(ScoreCriteria).find(item=>item.name === curRow.scoreCriteria).optionalScores;
                this.initSubFormData();
                this.subFormData.objectId = curRow.objectId;
            },
            onSubmitSubAddCallback(formData){
                let target = undefined;
                let subFormData = this.cloneDeep(this.subFormData);

                if(this.subRowData.scoreTarget === ScoreTarget.Individual) {
                    if (this.subRowData.scoreCriteria === '百分制') {
                        subFormData.individual.score = Number(subFormData.individual.score);
                    } else {
                        subFormData.individual.score = subFormData.evaluatedScore;
                    }
                    delete subFormData.evaluatedScore;

                    if (this.subRowData.course && this.subRowData.course.countType === CountType.Time) {
                        subFormData.individual.count = Number(subFormData.countMin) * 60 + Number(subFormData.individual.count);
                    } else {
                        subFormData.individual.count = Number(subFormData.individual.count);
                    }
                    if (this.editing) {
                        this.subTableData[subFormData.index] = subFormData.individual;
                        this.subTableData = [...this.subTableData];
                    }else {
                        let isRepeated = this.subTableData.some(item => {
                            return _.eq(item, subFormData.individual);
                        });
                        if(isRepeated){
                            this.$message({showClose: true,
                                type:'warning',message:'不能添加重复数据'
                            });
                            return false
                        }
                        this.subTableData.push(subFormData.individual);
                    }

                    target = {
                        objectId: subFormData.objectId,
                        scoreDetail:{
                            individual:this.subTableData
                        },
                    };
                } else {
                    if (this.subRowData.scoreCriteria === '百分制') {
                        subFormData.group.score = Number(subFormData.group.score);
                    } else {
                        subFormData.group.score = subFormData.evaluatedScore;
                    }
                    if (this.subRowData.course && this.subRowData.course.countType === CountType.Time) {
                        subFormData.group.count = Number(subFormData.countMin) * 60 + Number(subFormData.group.count);
                    } else {
                        subFormData.group.count = Number(subFormData.group.count);
                    }

                    if (this.editing) {
                        this.subTableData[subFormData.index] = subFormData.group;
                        this.subTableData = [...this.subTableData];
                    }else {
                        let isRepeated = this.subTableData.some(item => {
                            return _.eq(item, subFormData.group);
                        });
                        if(isRepeated){
                            this.$message({showClose: true,
                                type:'warning',message:'不能添加重复数据'
                            });
                            return false
                        }
                        this.subTableData.push(subFormData.group);
                    }

                    target = {
                        objectId: subFormData.objectId,
                        scoreDetail:{
                            group:this.subTableData
                        },
                    };
                }

                if (this.editing) this.closeSubModel();
                return target;
            },
            getRowKeys(row) {
                return row.name;
            },
            handleEditSub(index, row){
                this.subBtnState = true;
                this.editing = true;
                let subFormData = this.subRowData.scoreTarget === ScoreTarget.Individual? this.subFormData.individual : this.subFormData.group;
                Object.assign(subFormData,{...this.cloneDeep(row)});
                this.subFormData.index = index;
                if (this.subRowData.course && (this.subRowData.course.countType === CountType.Time)) {
                    this.subFormData.countMin = Math.floor(row.count/60);
                    if (this.subRowData.scoreTarget ===ScoreTarget.Individual){
                        this.subFormData.individual.count  = parseInt(row.count%60*10)/10;
                    } else{
                        this.subFormData.group.count  = parseInt(row.count%60*10)/10;
                    }
                }
                if (this.subRowData.scoreCriteria !== '百分制') {
                    if (this.subRowData.scoreTarget ===ScoreTarget.Individual){
                        this.subFormData.evaluatedScore = this.subFormData.individual.score;
                    } else{
                        this.subFormData.evaluatedScore = this.subFormData.group.score;
                    }
                }
            },
            handleDeleteSub(index,row,differ){
                this.confirm().then(_=>{
                    const j = this.subTableData;
                    this.$delete(j,index);
                    let target = {};
                    if(this.subRowData.scoreTarget === '个人') {
                        target = {
                            objectId: this.subFormData.objectId,
                            scoreDetail:{
                                individual: this.subTableData,
                            }

                        };
                    } else {
                        target = {
                            objectId: this.subFormData.objectId,
                            scoreDetail:{
                                group: this.subTableData,
                            }
                        };
                    }
                    this.addOrUpdateItem(target).then(result=>{
                        this.$message({showClose: true,
                            type:'success',
                            message:'删除成绩细则成功'
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
            initSubFormData() {
                this.subFormData = {
                    countMin: 0,
                    evaluatedScore: 2,
                    individual: {                                                   // 个人成绩细则(评分对象为个人时有效)
                            ageRange: {
                                from: 0,
                                to: 24
                            },                                                      // 年龄范围
                            count: 0,                                               // 成绩计数
                            score: 0,                                               // 得分
                        },
                    group: {                                                        // 集体成绩细则(评分对象为集体时有效)
                            count: 0,                                               // 成绩计数
                            score: 0,                                               // 得分
                    },
                }
            },
            initFormData() {
                this.scoreCriteriaData = {};
                this.formData = {
                    standard: '',    // 训练大纲
                    course: '',              // 体育课目
                    physicalLevels: [],                                            // 体能训练等级列表
                    troopCategories: [],                                            // 军兵种类型列表
                    gender: '',                                                       // 性别要求(男/女)
                    isCivilServant: false,                                              // 是否为文职人员
                    isHighland: false,                                                  // 是否为高原地区
                    heightRange: {                                                        // 海拔范围
                        from: 0,
                        to: 0,
                    },
                    scoreCriteria: '',                                                // 评分标准
                    scoreTarget: '',                                                  // 评分对象（个人/集体），见ScoreTarget
                    scoreDetail: {
                        individual: [],
                        group: [],
                    },                                                   // 成绩细则
                    highScoreDetail: {                                                   // 超过100分后的成绩计算方式
                        countStep: 0,                                               // 成绩计数增量或减量
                        scoreStep: 0                                                // 得分增量
                    },
                    heightFactor: {                                                      // 海拔影响
                        heightStep: 0,                                              // 海拔增量
                        countStep: 0,                                               // 成绩计数增量
                    }                                         // 得分
                };
                this.$refs.ruleform && this.$refs.ruleform.clearValidate()
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
    .formData .el-form-item:last-child{
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
    .highScoreDetail{
        width: 100%;
        height: 20px;
        padding: 10px;
        border-top: 1px solid #dcdfe6;
    }
    .highScoreDetail span{
        font-size: 14px;
        color: #606266;
    }
    .highScoreDetail label{
        font-size: 14px;
        color: #606266;
    }
    .highScoreDetail span input{
        width: 60px;
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
    .last-el-form-item .el-form-item__content{
        width: 100%;
    }
    .SportScoreStandard .dialog-table .cellClassName{
        padding: 3px 0;
    }

</style>

