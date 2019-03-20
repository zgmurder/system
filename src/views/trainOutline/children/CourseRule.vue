<template>
    <div class="CourseRule">
        <el-form inline :model="formData" ref="ruleform" :rules="rules" class="formData" v-show="wrapperVisible" label-width="120px">
            <i class="el-icon-error" @click="closeModal"></i>
            <el-form-item label="大纲标准："  prop="standard">
                <el-select clearable filterable v-model="formData.standard" placeholder="请选择大纲标准">
                    <el-option
                        v-for="item in selectStandard"
                        :key="item.name"
                        :label="item.name"
                        :value="item.objectId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="规则名称：" prop="name">
                <el-input placeholder="请输入规则名称" v-model="formData.name" style="width: 217px"></el-input>
            </el-form-item>
            <el-form-item label="课目分类："  prop="courseCategory">
                <el-select clearable filterable v-model="formData.courseCategory" placeholder="请选择课目类别" @change="clearCourse">
                    <el-option
                        v-for="item in CourseCategorys"
                        :key="item.name"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="课目名称："  prop="course">
                <el-select clearable filterable v-model="formData.course" placeholder="请选择课目" :disabled="formData.courseCategory===0">
                    <el-option
                        v-for="(item,index) in selectCourse"
                        :key="index"
                        :label="item.name"
                        :value="item.objectId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="单位分类："  prop="orgCategories">
                <el-select clearable filterable multiple v-model="formData.orgCategories" placeholder="请选择单位类别">
                    <el-option
                        v-for="item in selectOrgCategories"
                        :key="item.objectId"
                        :label="item.name"
                        :value="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="禁训天气："  prop="forbiddenWeathers">
                <el-select clearable filterable multiple v-model="formData.forbiddenWeathers" placeholder="请选择禁训天气">
                    <el-option
                        v-for="item in selectForbiddenWeathers"
                        :key="item.objectId"
                        :label="item.name"
                        :value="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="前置规则："  prop="preRule">
                <el-select clearable filterable v-model="formData.preRule" placeholder="请选择前置规则">
                    <el-option
                        v-for="item in selectPreRule"
                        :key="item.name"
                        :label="item.name"
                        :value="item.objectId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="其他选项：">
                <el-checkbox label="训练频次" v-model="formData.rateEnabled" ></el-checkbox>
                <el-checkbox label="总次数有效" v-model="formData.totalEnabled"></el-checkbox>
            </el-form-item>
            <el-form-item label="时间周期：" v-if="formData.rateEnabled" prop="rateUnit">
                <el-select filterable clearable  v-model="formData.rateUnit" placeholder="请选时间周期">
                    <el-option
                        v-for="(value,key) in TimeUnit"
                        :key="key"
                        :label="value"
                        :value="value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="次数：" v-if="formData.rateEnabled" prop="times">
                <el-input placeholder="请输入次数" v-model="formData.times" style="width: 217px">
                    <template slot="append">次</template>
                </el-input>
            </el-form-item>
            <el-form-item label="总次数：" v-if="formData.totalEnabled" prop="totalTimes">
                <el-input placeholder="请输入总次数" v-model="formData.totalTimes" style="width: 217px">
                    <template slot="append">次</template>
                </el-input>
            </el-form-item>
            <div style="width: 100%;margin-bottom: 20px ; border-top:1px solid #ebeef5; padding-top: 20px">
                <span style="color: #999; float: left; font-size: 14px;line-height: 40px">若要添加子训练规则，需将课目基本数据添加成功后，在数据列的子训练规则里点击添加，修改!!!!!!!!</span>
                <el-button-group style="width: 284px;float: right">
                    <el-button :type="btnState?'primary':'warning'" @click="onSubmit('ruleform', onSubmitCallBack)" style="float: right">{{btnState?'添加':'修改'}}</el-button>
                </el-button-group>
            </div>
        </el-form>
        <Filters :props="[Standard,CourseCategory,OrgCategories]" placeholder="输入课目名称，将自动搜索" @filterValueIsChange="filterValueIsChange" @querySearchAsync="querySearchAsync"></Filters>

        <el-table
            :data="tableData"
            border
            :max-height="maxTableHegith"
            style="width:100%">
            <el-table-column
                prop="standard"
                width="120px"
                label="训练大纲">
                <template slot-scope="scope">
                    <span>{{ scope.row.standard && scope.row.standard.name}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="name"
                width="120px"
                label="规则名称">
                <template slot-scope="scope">
                    <span>{{ scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="courseCategory"
                width="120px"
                label="课目分类">
                <template slot-scope="scope">
                    <span>{{ scope.row.courseCategory|filterCourseCategory}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="course"
                width="120px"
                label="课目名称">
                <template slot-scope="scope">
                    <span>{{ scope.row.course && scope.row.course.name}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="orgCategories"
                label="适用单位">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.orgCategories.length"
                            v-for="(item,index) in scope.row.orgCategories"
                            size="mini"
                            :key="index"
                            type="danger">
                        {{item}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                prop="forbiddenWeathers"
                label="禁训天气">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.forbiddenWeathers.length"
                            v-for="(item,index) in scope.row.forbiddenWeathers"
                            size="mini"
                            :key="index"
                            type="info">
                        {{item}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                prop="rateEnabled"
                width="80px"
                label="训练频次有效">
                <template slot-scope="scope">
                    <span>{{ !scope.row.rateEnabled && '否'|| '是'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="rateUnit"
                width="80px"
                label="时间周期">
                <template slot-scope="scope">
                    <span>{{ scope.row.rateUnit}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="times"
                width="80px"
                label="次数">
                <template slot-scope="scope">
                    <span>{{ scope.row.times}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="totalEnabled"
                width="100px"
                label="总次数有效">
                <template slot-scope="scope">
                    <span>{{ !scope.row.totalEnabled && '否' || '是'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="totalTimes"
                width="80px"
                label="总次数">
                <template slot-scope="scope">
                    <span>{{ scope.row.totalTimes}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="子规则"
                width="70">
                <template slot-scope="scope">
                    <el-button size="mini"
                               type="text" @click="handleScoreDetail(scope.row)">
                        点击查看
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column
                prop="preRule"
                width="120px"
                label="前置规则">
                <template slot-scope="scope">
                    <span>{{ scope.row.preRule && scope.row.preRule.name}}</span>
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
        <div class="shadeBox"  :class="{'shadeBox-wrapper':wrapperVisible}"></div>
        <el-dialog :title="dialogTableTitle" :visible.sync="dialogTableVisible" width="75%">
            <el-form inline :model="subFormData" ref="subRuleform" :rules="rules" :class="{editing:editing}" label-width="100px">
                <el-form-item label="优先级" prop="priority">
                    <el-input-number v-model="subFormData.priority"  :step="1" style="width: 217px" :min="0" :max="10"></el-input-number>
                </el-form-item>
                <el-form-item label="月份选择:" prop="months">
                    <el-select filterable clearable multiple v-model="subFormData.months" placeholder="选择月份" >
                        <el-option
                            v-for="item in Monthes"
                            :key="item.name"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="月内周序号:" prop="weekSeq">
                    <el-select filterable clearable multiple v-model="subFormData.weekSeq" placeholder="选择月内周序号" >
                        <el-option
                            v-for="(item) in SubWeekSeq"
                            :key="item.name"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="日期类别:" prop="dayType">
                    <el-select filterable clearable v-model="subFormData.dayType" placeholder="选择日期类别" >
                        <el-option
                            v-for="item in DayType"
                            :key="item"
                            :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="星期:" prop="weekdays">
                    <el-select filterable clearable multiple v-model="subFormData.weekdays" placeholder="选择星期" >
                        <el-option
                            v-for="item in WeekDays"
                            :key="item.name"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="节假日序号:" prop="holidays">
                    <el-select filterable clearable multiple v-model="subFormData.holidays" placeholder="选择节假日序号" >
                        <el-option
                            v-for="item in Holidays"
                            :key="item.name"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="每日时段:" prop="section">
                    <el-select filterable clearable  v-model="subFormData.section" placeholder="选择时间段" @change="handleSelectHour">
                        <el-option
                            v-for="item in DailySection"
                            :key="item"
                            :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始课时:" prop="fromHour">
                    <el-select filterable clearable  v-model="subFormData.fromHour" placeholder="选择开始课时" >
                        <el-option
                            v-for="item in selectFromHour"
                            :key="item.name"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="持续课时:" prop="hours">
                    <el-select filterable clearable  v-model="subFormData.hours" placeholder="选择持续课时" >
                        <el-option
                            v-for="item in selectHour"
                            :key="item.name"
                            :label="item.name"
                            :value="item.value">

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
                :row-key="getRowKeys"
                style="width: 100%">
                <el-table-column
                    width="80px"
                    label="优先级">
                    <template slot-scope="scope">
                        <span>{{ scope.row.priority }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="月份">
                    <template slot-scope="scope">
                        <span>{{ scope.row.months|filterObjectArr(Monthes) }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="月份周序号">
                    <template slot-scope="scope">
                        <span>{{ scope.row.weekSeq|filterWeekSeq(SubWeekSeq) }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="日期类别">
                    <template slot-scope="scope">
                        <span>{{ scope.row.dayType }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="星期">
                    <template slot-scope="scope">
                        <span>{{ scope.row.weekdays|filterObjectArr(WeekDays)}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="节假日序号">
                    <template slot-scope="scope">
                        <span>{{ scope.row.holidays|filterObjectArr(Holidays) }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    width="100px"
                    label="时间段">
                    <template slot-scope="scope">
                        <span>{{ scope.row.section }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    width="100px"
                    label="开始课时">
                    <template slot-scope="scope">
                        <span>{{ '第'+scope.row.fromHour+'课时' }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    width="100px"
                    label="持续课时">
                    <template slot-scope="scope">
                        <span>{{ '持续' + scope.row.hours+'课时' }}</span>
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
    // const ChildSchema = new Schema({
    //  priority: Number,       // 优先级: 0-10可选, 值越大优先级越高
    //  months: [Number],       // 月份选择，参考Monthes
    //  weekSeq: [Number],        // 1-5, 表示每个月第几周, 5表示最后一周

    //  dayType: String,        // 工作日; 休息日; 节假日,参考DayType
    //  weekdays: [Number],        // 星期一...星期日(0-6)，参考WeekDays
    //  holidays: [Number],     // 1-7表示节假日第几天, 255表示最后1天
    //  section: String,			  // 时间段: 早操; 上午; 下午; 夜间; 不设置为无限制;参考DailySection
    //  fromHour: Number,       // 开始课时
    //  hours: Number           // 持续课时
    // });

    // 全局课目规则(针对非军事课目)
    // const CourseRuleSchema = new Schema({
    //  standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 大纲标准
    // 	courseCategory: Number,                                             // 课目分类
    // 	course: { type: Schema.Types.ObjectId, ref: 'Course' },             // 课目对象
    //  orgCategories: [String],                                            // 适用的单位分类列表

    //  forbiddenWeathers: [String],                                        // 禁训天气

    //  rateEnabled: Boolean,                                               // 频率设置是否有效
    //  rateUnit: String,                                                   // 每周/每月，参考TimeUnit
    //  times: Number, 		                                                // 次数
    //  totalEnabled: Boolean,                                              // 总次数有效
    //  totalTimes: Number,                                                 // 总次数

    // 	childRules: [ChildSchema],                                          // 子训练规则设置
    //  preRule: { type: Schema.Types.ObjectId, ref: 'CourseRule' }         // 前置规则
    // });
    import _ from 'lodash'
    import {CourseCategorys,CourseCategory,TimeUnit,Monthes,DayType,WeekDays,DailySection} from 'src/lib/Constants'
    import {handle} from 'src/config/mixin'
    import Filters from 'src/pages/common/Filters.vue'
    import Client from 'src/lib/Client'
    export default {
        mixins:[handle],
        components:{
            Filters
        },
        data() {
            return {
                subFormData:{
                    fromHour: 0,
                    hours: 0,
                },
                selectStandard:[],
                CourseCategorys,
                selectCourse:[],
                selectOrgCategories: [],
                selectForbiddenWeathers:[],
                selectPreRule:[],
                TimeUnit,
                rules:{
                    standard:[
                        {required: true, message: '请选择训练大纲',},
                    ],
                    name:[
                        {required: true, message: '请输入规则名称',},
                    ],
                    courseCategory:[
                        {required: true, message: '请选择课目类别',},
                    ],
                },
                dialogTableTitle:'',
                dialogTableVisible: false,
                editing:false,
                subBtnState:false,
                Monthes,
                DayType,
                WeekDays,
                SubWeekSeq: [
                    {name: '第一周', value: 1},
                    {name: '第二周', value: 2},
                    {name: '第三周', value: 3},
                    {name: '第四周', value: 4},
                    {name: '第五周', value: 5},
                    {name: '最后一周', value: 255}],
                Holidays:[
                    {name:'第一天',value: 1},
                    {name:'第二天',value: 2},
                    {name:'第三天',value: 3},
                    {name:'第四天',value: 4},
                    {name:'第五天',value: 5},
                    {name:'第六天',value: 6},
                    {name:'第七天',value: 7},
                    {name:'第八天',value: 8},
                    {name:'第九天',value: 9},
                    {name:'第十天',value: 10},
                    {name:'最后一天',value: 255}],
                DailySection,
                defaultDailySchedule: {
                    eMorning: 0.5,
                    morning: 5,
                    afternoon: 5,
                    night: 2,
                },
                dailySchedule: undefined,
                selectHour:[],
                selectFromHour:[],
                subRowData:{},
                subSectionVal:'',
                subTableData: [],
                Standard:{selects: undefined, value:'', valueKey:'objectId', textValue: true, placeholder: '训练大纲', equalObject: {className:'CourseRule',name:'standard'}},
                CourseCategory:{selects: CourseCategorys, value:'', placeholder: '课目分类', equalObject: {className:'CourseRule',name:'courseCategory'}},
                OrgCategories:{selects: undefined, value:'', placeholder: '单位类型', equalObject: {className:'CourseRule',name:'orgCategories'}},
                equalObject: undefined,
                search: {
                    key: '',
                    value: ''
                },
            }
        },
        created() {
            this.dailySchedule = this.defaultDailySchedule;
            this.triggerSelect('TrainStandard').then(result=>{
                this.curStandard();
                this.Standard.selects = result.list;
                this.selectStandard = result.list;
            });
            this.triggerSelect('OrgCategory').then(result=>{
                this.selectOrgCategories = result.list;
                this.OrgCategories.selects = result.list;
            });
            this.triggerSelect('WeatherType',result=>{
                this.selectForbiddenWeathers = result.list;
            });
            this.triggerSelect('CourseRule').then(result=>{
                this.selectPreRule = result.list;
            })
        },
        watch: {
            'formData.courseCategory'(newVal, oldVal){
                if (!newVal || newVal === CourseCategory.Train) {
                    this.clearCourse();
                } else {
                    this.selectChanged(newVal, ['Course', 'category'], this.handleCourseCategoryResult);
                }
            },
            'subRowData'(newVal, oldVal) {
                if (newVal.orgCategories&&newVal.orgCategories.length>0) {
                    this.selectChanged(newVal.orgCategories[0], ['DailySchedule', 'orgCategories'], this.handleDailyScheduleResult);
                } else {
                    this.dailySchedule = this.defaultDailySchedule;
                }
            },
            'subFormData.section'(newVal, oldVal) {
                if (!newVal || newVal.length === 0) return;
                this.subSectionVal = newVal;
                this.handleSelectHourResult();
            }
        },
        filters:{
            filterCourseCategory(courseCategory) {
                return  !(courseCategory) && '' || Object.values(CourseCategorys).find(item=>item.id === courseCategory).name;
            },
            filterObjectArr(arrData, objectArr) {
                let result='';
                if (arrData.length<1) {
                    result = '';
                } else {
                    arrData.map(item=>{
                        result += Object.values(objectArr).find(items=>items.value === item).name + ',';
                    })
                }
                return result.substring(0,result.length-1);
            },
            filterWeekSeq(arrData, SubWeekSeq) {
                arrData = arrData || [];
                let strData = arrData.map(value => {
                    let found = SubWeekSeq.find(item => item.value === value);
                    return found&&found.name||'';
                });
                return strData.join(',');
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
                equalObject = equalObject.map(item=>{
                    item.value = this.handleFilterValueStr(item.value);
                    return item
                });
                equalObject = !equalObject.length? undefined : equalObject ;
                this.equalObject = equalObject;
                this.changePage(0);
            },
            onSubmitCallBack() {
                let target = {
                    ...this.formData,
                    orgCategories: _.isEmpty(this.formData.orgCategories)?undefined:this.formData.orgCategories,
                    times: !this.formData.times? 0 : Number(this.formData.times),
                    totalTimes: !this.formData.totalTimes? 0 : Number(this.formData.totalTimes),
                };
                return target;
            },
            handleEditCallback(row) {
                this.formData ={
                    ...this.cloneDeep(row),
                    standard: row.standard.objectId,
                    course: !row.course ? undefined : row.course.objectId,
                    preRule: !row.preRule ? undefined : row.preRule.objectId,
                }
            },
            handleCourseCategoryResult(result) {
                this.selectCourse = result.list;
            },
            handleScoreDetail(row) {
                this.dialogTableVisible = true;
                this.dialogTableTitle = row.name + '子规则';
                this.subFormData.objectId = row.objectId;
                this.subTableData = row.childRules || [];
                this.subRowData = row;
            },
            clearCourse() {
                this.selectCourse = [];
                this.formData.course = undefined;
            },
            handleSelectHour(row) {
                this.selectHour = [];
                this.subFormData.fromHour = 0;
                this.subFormData.hours = 0;
            },
            handleDailyScheduleResult(result) {
                this.dailySchedule = result.list[0];
                (!this.dailySchedule) && (this.dailySchedule=this.defaultDailySchedule);
            },
            handleSelectHourResult() {
                let hourNum,arrNum=[],arrFromNum=[],resultTime = this.dailySchedule;
                switch (this.subSectionVal) {
                    case '早操':
                        hourNum = resultTime.eMorning;
                        break;
                    case '上午':
                        hourNum = resultTime.morning;
                        break;
                    case '下午':
                        hourNum = resultTime.afternoon;
                        break;
                    case '夜间':
                        hourNum = resultTime.night;
                        break;
                    default: return;
                }
                hourNum = Math.ceil(hourNum);
                for(let i = 0;i<= hourNum; i++) {
                    let hourData = {},hourFormData={};
                    hourFormData.name = '第' + i + '课时';
                    hourFormData.value = Number(i);
                    hourData.name = '持续' + i + '课时';
                    hourData.value = Number(i);
                    arrNum.push(hourData);
                    arrFromNum.push(hourFormData);
                }
                this.selectFromHour = arrFromNum;
                this.selectHour = arrNum;
            },
            handleFilterValueStr(str){
                switch (str){
                    case '军事课目':
                        return 0;
                    case '体育课目':
                        return 1;
                    case '政治教育':
                        return 2;
                    case '党团活动':
                        return 3;
                    case '其它工作':
                        return 4;
                    case '自定义课目':
                        return 5;
                    default:
                        return str;
                }
            },
            onSubmitSubAddCallback(formData){
                let target = {...formData};
                if (this.editing) {
                    this.subTableData[this.subFormData.index] = this.subFormData;
                    this.subTableData = [...this.subTableData];
                } else {
                    this.subTableData.push(this.subFormData);
                }
                console.log(this.subFormData);
                target = {
                    objectId: this.subFormData.objectId,
                    childRules: [...this.subTableData],
                };
                this.closeSubModel();
                return target;
            },
            getRowKeys(row) {
                return row.name;
            },
            handleEditSub(index, row) {
                this.subBtnState = true;
                this.editing = true;
                Object.assign(this.subFormData,row);
                this.subFormData.index = index;
            },
            handleDeleteSub(index,row,differ){
                this.confirm().then(_=>{
                    const j = this.subTableData;
                    this.$delete(j,index);
                    const target = {
                        objectId:this.subFormData.objectId,
                        childRules:this.subTableData,
                    };
                    this.addOrUpdateItem(target).then(result=>{
                        this.$message({showClose: true,
                            type:'success',
                            message:'删除子训练规则成功'
                        });
                    }).catch(result =>{
                        return false
                    })
                });
            },
            closeSubModel() {
                this.editing = false;
                this.subBtnState = false;
                const id = this.subFormData.objectId;
                this.initSubFormData();
                this.subFormData.objectId = id;
                this.$refs.subRuleform && this.$refs.subRuleform.clearValidate()
            },
            initSubFormData() {
                this.subFormData = {
                     objectId: '',
                     priority: 0,                                                      // 优先级: 0-10可选, 值越大优先级越高
                     months: [],                                                       // 月份选择，参考Monthes
                     weekSeq: [],                                                      // 1-5, 表示每个月第几周, 5表示最后一周

                     dayType: '',                                                      // 工作日; 休息日; 节假日,参考DayType
                     weekdays: [],                                                     // 星期一...星期日(0-6)，参考WeekDays
                     holidays: [],                                                     // 1-7表示节假日第几天, 255表示最后1天
                     section: '',			                                           // 时间段: 早操; 上午; 下午; 夜间; 不设置为无限制;参考DailySection
                     fromHour: 0,                                                      // 开始课时
                     hours: 0                                                          // 持续课时
                }
            },
            initFormData() {
                this.formData = {
                     standard: '',                                                       // 大纲标准
                     name: '',                                                           // 规则名称
                     courseCategory: 0,                                                  // 课目分类
                     course: undefined,                                                         // 课目对象
                     orgCategories: [],                                                  // 适用的单位分类列表
                     forbiddenWeathers: [],                                              // 禁训天气
                     rateEnabled: false,                                                // 频率设置是否有效
                     rateUnit: '',                                                       // 每周/每月，参考TimeUnit
                     times: 0, 		                                                     // 次数
                     totalEnabled: false,                                               // 总次数有效
                     totalTimes: 0,                                                      // 总次数
                     childRules: [],                                                     // 子训练规则设置
                     preRule: undefined                                                         // 前置规则
                },
                this.$refs.ruleform && this.$refs.ruleform.clearValidate()
            }
        }
    }
</script>
<style scoped>
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
