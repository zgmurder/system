<!--
<template>
    <div class="TrainerLevel">
        <el-form inline :model="formData" ref="ruleform" :rules="rules" class="formData" v-show="wrapperVisible" label-width="80px">

            <i class="el-icon-error" @click="closeModal"></i>
            <el-form-item label="大纲标准"  prop="standard">
                <el-select clearable v-model="formData.standard" placeholder="请选择大纲标准" @change="formData.section = ''">
                    <el-option
                        v-for="item in selectStandard"
                        :key="item.name"
                        :label="item.name"
                        :value="item.objectId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="大纲分册"  prop="section">
                <el-select filterable clearable v-model="formData.section" placeholder="请选择大纲分册">
                    <el-option
                        v-for="item in selectSection"
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
            <el-form-item label="单位类型"  prop="orgType">
                <el-select filterable clearable v-model="formData.orgType" placeholder="请选择单位类型" @change="formData.orgCategories = []">
                    <el-option
                        v-for="(value,key) in selectOrgType"
                        :key="key"
                        :label="value"
                        :value="value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="单位分类"  prop="orgCategories" >
                <el-select filterable multiple v-model="formData.orgCategories" placeholder="请选择适用单位分类" @change="formData.tasks = formData.serviceReq = [], formData.majorReq = ''">
                    <el-option
                        v-for="item in selectOrgCategories"
                        :key="item"
                        :label="item"
                        :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="人员类型"  prop="personProperties">
                <el-select filterable multiple v-model="formData.personProperties" placeholder="请选择人员类型">
                    <el-option
                        v-for="(value,key) in selectPersonType"
                        :key="key"
                        :label="value"
                        :value="value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="训练要求"  prop="require">
                <el-select clearable v-model="formData.require" placeholder="训练要求">
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
            <el-form-item label="训练步骤"  prop="trainStep">
                <el-select filterable clearable v-model="formData.trainStep" placeholder="训练步骤" @change="selectChanged($event,['TrainStep','name'],handleStepResult)">
                    <el-option
                        v-for="(value,key) in selectTrainStep"
                        :key="key"
                        :label="value.name"
                        :value="value.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="训练单元"  prop="trainUnits">
                <el-select filterable clearable v-model="formData.trainUnits" multiple placeholder="训练单元">
                    <el-option
                        v-for="item in selectOrgSequences"
                        :key="item.type"
                        :label="item.name"
                        :value="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="对应任务"  prop="tasks">

                <el-select filterable multiple v-model="formData.tasks" placeholder="需要先选择单位分类">
                    <el-option
                        v-for="(item,index) in selectTask"
                        :key="index"
                        :label="item"
                        :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="勤务类型"  prop="serviceReq">
                <el-select filterable multiple v-model="formData.serviceReq" placeholder="选择勤务类型，无数据，可不选">
                    <el-option
                        v-for="(value,index) in selectServices"
                        :key="index"
                        :label="value"
                        :value="value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="专业类型"  prop="majorReq">
                <el-select filterable clearable v-model="formData.majorReq" placeholder="选择专业类型，无数据，可不选">
                    <el-option
                        v-for="(value,index) in selectMajors"
                        :key="index"
                        :label="value"
                        :value="value">
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
            <el-form-item label="课目条件"  prop="rankL2Reqs">
                <el-input type="textarea" v-model="formData.textCondition" style="width: 217px" placeholder="课目条件"></el-input>
            </el-form-item>
            <el-form-item label="课目标准"  prop="rankL2Reqs">
                <el-input type="textarea" v-model="formData.textStandard" style="width: 217px" placeholder="课目标准"></el-input>
            </el-form-item>
            <el-form-item label="考核要求"  prop="rankL2Reqs">
                <el-input type="textarea" v-model="formData.textEvaluation" style="width: 217px" placeholder="考核要求"></el-input>
            </el-form-item>
            <el-form-item label="军衔要求"  prop="rankL2Reqs">
                <el-select filterable multiple v-model="formData.rankL2Reqs" placeholder="军衔要求" @focus="triggerSelect('MilitaryRank','selectRankL2Reqs')">
                    <el-option
                        v-for="item in selectRankL2Reqs"
                        :key="item.type"
                        :label="item.name"
                        :value="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="军械类型"  prop="ordnanceTypes">
                <el-select filterable multiple v-model="formData.ordnanceTypes" placeholder="军械类型" @focus="triggerSelect('OrdnanceType','selectOrdnanceTypes')">
                    <el-option
                        v-for="item in selectOrdnanceTypes"
                        :key="item.type"
                        :label="item.name"
                        :value="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="枪手类型">
                <el-select filterable  clearable v-model="formData.gunnerType" placeholder="枪手类型" @focus="triggerSelect('GunnerType','selectGunnerType')">
                    <el-option
                        v-for="item in selectGunnerType"
                        :key="item.objectId"
                        :label="item.name"
                        :value="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <div class="form-btn">
                <span style="color: #999">若要添加子课目，需将主课目添加成功后，在主课目里的子课目点击添加，修改!!!!!!!!</span>
                <el-button-group style="width: 284px;float: right">
                    <el-button style="width: 50%" @click="initFormData">重置</el-button>
                    <el-button style="width: 50%" :type="btnState?'primary':'warning'" @click="onSubmit('ruleform')">{{btnState?'添加':'修改'}}</el-button>
                </el-button-group>
            </div>
        </el-form>
        <Filters :props="[Standard,Section,OrgCategories,PersonProperty,Require,ScoreCriteria,TrainUnits,Task,ServiceReq,MajorReq]" placeholder="输入课目名称，将自动搜索" @filterValueIsChange="filterValueIsChange" @querySearchAsync="querySearchAsync"></Filters>
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
                        <h3>{{ `${scope.row.seq}.${scope.row.name}` }}</h3>
                        <dl class="describText" style="display:flex;flex-wrap: wrap;justify-content: space-between;">
                            <dd>训练大纲：<span>{{ scope.row.standard&&scope.row.standard.name }}</span></dd>
                            <dd>大纲分册：<span>{{ scope.row.section&&scope.row.section.name }}</span></dd>
                            <dd>训练要求：<span>{{ scope.row.require }}</span></dd>
                            <dd>评分标准：<span>{{ scope.row.scoreCriteria }}</span></dd>
                            <dd>训练步骤：<span>{{ scope.row.trainStep }}</span></dd>
                            <dd>训练单元：<span>{{ scope.row.trainUnits.join(',') }}</span></dd>
                            <dd>单位类型：<span>{{ scope.row.orgType }}</span></dd>
                            <dd>人员类型：<span>{{ scope.row.personProperties.join(',') }}</span></dd>
                            <dd>单位分类：<span>{{ scope.row.orgCategories.join(',') }}</span></dd>
                            <dd>枪手类型：<span>{{ scope.row.gunnerType | handleEmptyData}}</span></dd>
                            <dd>对应任务：<span>{{ scope.row.tasks.join(',')  | handleEmptyData}}</span></dd>
                            <dd>对应勤务：<span>{{ scope.row.serviceReq | handleEmptyData}}</span></dd>
                            <dd>对应专业：<span>{{ scope.row.majorReq | handleEmptyData}}</span></dd>
                            <dd>场地要求：<span>{{ scope.row.placeTypes.join(',') | handleEmptyData}}</span></dd>
                            <dd>军衔要求：<span>{{ scope.row.rankL2Reqs.join(',') | handleEmptyData}}</span></dd>
                            <dd>军械类型：<span>{{ scope.row.ordnanceTypes.join(',') | handleEmptyData}}</span></dd>

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
                label="大纲标准" width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.standard&&scope.row.standard.name || '已停用'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                width="200"
                label="分册名称">
                <template slot-scope="scope">
                    <span>{{ scope.row.section&&scope.row.section.name }}</span>
                </template>
            </el-table-column>
            <el-table-column
                :show-overflow-tooltip="true"
                width="200"
                label="课目名称">
                <template slot-scope="scope">
                    <span>{{ `${scope.row.seq}.${scope.row.name}` }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="单位分类">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.orgCategories.length"
                            v-for="(item,index) in scope.row.orgCategories"
                            size="mini"
                            :key="index"
                            type="info">
                        {{item}}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column
                label="适用人员">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.personProperties.length"
                            v-for="(item,index) in scope.row.personProperties"
                            size="mini"
                            :key="index">
                        {{item}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                width="150"
                label="任务类型">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.tasks&&scope.row.tasks.length"
                            v-for="(item,index) in scope.row.tasks"
                            size="mini"
                            :key="index">
                        {{item}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                label="勤务类型" width="100">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.serviceReq && scope.row.serviceReq.length"
                            v-for="(item,index) in scope.row.serviceReq"
                            size="mini"
                            :key="index"
                            type="info">
                        {{item}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                label="专业类型" width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.majorReq }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="考核内容"
                width="70">
                <template slot-scope="scope">
                    <el-button size="mini"
                               type="text" @click="handleTestContents(scope.row)">
                        点击查看
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column
                label="子课目"
                width="70">
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
                        &lt;!&ndash;<div class="nextSubCourse"><i class="iconfont icon-jia" title="点击添加"></i>添加二级子课目</div>&ndash;&gt;
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
        <el-dialog :title="dialogTestTableTitle" :visible.sync="dialogTestTableVisible" width="50%">
            <el-form inline :model="testFormData" ref="testRuleform" :rules="rules" :class="{editingTest:editingTest}">
                <el-form-item label="考核内容"  prop="content">
                    <el-input v-model="testFormData.content" placeholder="考核内容" size="small"   style="width: 130px"></el-input>
                </el-form-item>
                <el-form-item label="考核要求"  prop="testReq">
                    <el-select v-model="testFormData.testReq" placeholder="考核要求" size="small"   style="width: 130px">
                        <el-option
                        v-for="(value,key) in TestRequirement"
                        :key="key"
                        :label="value"
                        :value="value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="float: right">
                <el-button type="primary" @click="onSubmit('testRuleform',onSubmitTestAddCallback)" v-if="!subTestBtnState">添加</el-button>
                <el-button type="warning" @click="onSubmit('testRuleform',onSubmitTestAddCallback)" v-else>修改</el-button>
                </el-form-item>
            </el-form>
            <el-table
                border
                size="mini"
                :row-key="getRowKeys"
                :data="subTestTableData">
                <el-table-column
                    label="考核内容">
                    <template slot-scope="scope">
                        <span>{{ scope.row.content }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="考核要求">
                    <template slot-scope="props">
                        <span>{{props.row.testReq}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="right" width="150">
                    <template slot-scope="props">
                    <el-button
                    size="mini"
                    @click="handleEditTest(props.$index, props.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDeleteTest(props.$index, props.row)">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
            <div class="shadeBox" :class="{'shadeBox-wrapper':editingTest}" style="position: absolute;top: 0;" @click="closeTestSubModel"></div>
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
    //  category: Number,                               // 课目分类, 参考Constants.CourseCategory
    //  standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 训练大纲
    //  section: { type: Schema.Types.ObjectId, ref: 'TrainSection' },    // 训练大纲
    //  isManual: Boolean,                              // 子课目是否自定义
    //  require: String,                                // 训练要求, 必训/选训/自训, 参考Constants.TrainRequirement
    //  scoreCriteria: String,                          // 评分标准, 二级制/四机制/七级制/百分制
    //  trainStep: String,                              // 训练步骤, 参考TrainStep表
    //  orgType: String,                                // 课目适用的单位类型
    //  orgCategories: [String],                        // 课目适用的单位分类列表,一般是一个
    //  personProperties: [String],                     // 课目适用的人员属性列表,一般是一个
    //  trainUnits: [String],                           // 训练单元(编制序列), 单兵/班/排/中队/大队.
    //  tasks: [String],                                   // 课目对应任务，可多选
    //  serviceReq: [String],                             // 勤务类型要求
    //  majorReq: String,                             // 专业类型要求
    //  rankL2Reqs: [String],                           // 军衔要求(军衔二级分类)
    //  ordnanceTypes: [String],                        // 配套军械类型, 参考OrdnanceType表
    //  placeTypes: [String],                           // 训练场地要求, 参考PlaceType表
    //  gunnerType: String,                             // 要求枪手类型

    //  subcourses: [SubCourseSchema],                  // 子课目列表
    //  testContents: [{                                // 考核内容列表
    //      content: String,                            // 考核内容
    //      testReq: String,                            // 必考或选考
    //  }],

    //  textCondition: String,                          // 课目条件
    //  textStandard: String,                           // 课目标准
    //  textEvaluation: String,                         // 考核要求
    // });
    import _ from 'lodash';
    import {OrgType,PersonProperty,TrainRequirement,ScoreCriteria,OrgSequences,TestRequirement} from 'src/lib/Constants'
    import {handle} from 'src/config/mixin'
    import Filters from 'src/pages/common/Filters.vue'
    import {PoliticalStatus,Gender} from 'src/lib/Constants'
    import Client from 'src/lib/Client'
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
                //selectOrgType:OrgType,
                selectOrgType:[],
                selectFilterOrgType:[],
                selectPersonType:PersonProperty,
                rules:{
                    standard:[
                        { required: true, message: '请选择大纲标准',},
                    ],
                    section:[
                        { required: true, message: '请选择大纲分册',},
                    ],
                    name:[
                        { required: true, message: '请输入课目名称',},
                    ],
                    seq:[
                        { required: true, message: '请输入课目序号',},
                    ],
                    require:[
                        { required: true, message: '请输入训练要求',},
                    ],
                    scoreCriteria:[
                        { required: true, message: '请输入评分标准',},
                    ],
                    trainStep:[
                        { required: true, message: '请输入训练步骤',},
                    ],
                    orgType:[
                        { required: true, message: '请输入单位类型',},
                    ],
                    orgCategories:[
                        { required: true, message: '请输入单位分类',},
                    ],
                    trainUnits:[
                        { required: true, message: '请输入训练单元',},
                    ],
                    personProperties:[
                        { required: true, message: '请输入人员属性',},
                    ],
                    content: [
                        { required: true, message: '请输入考核要求',},
                    ],
                    testReq: [
                        { required: true, message: '请选择考核要求',},
                    ],
                },
                selectGunnerType:[],
                selectStandard:[],
                selectOrgCategories:[],
                selectFilterOrgCategories: [],
                optionalFilterOrgCategories: [],
                optionalOrgCategories: [],
                selectTrainStep:[],
                selectTask:[],
                selectServices:[],
                selectMajors:[],
                selectPlaceType:[],
                selectRankL2Reqs:[],
                selectOrdnanceTypes:[],
                dialogTableVisible:false,
                dialogTableTitle:'',
                subTableData:[],
                nextSubTableData:[],
                subFormData:{},
                subBtnState:false,
                editing:false,
                addNextSubState:false,
                nextSubIndex:0,
                dialogTestTableVisible:false,
                dialogTestTableTitle:'',
                editingTest:false,
                subTestBtnState: false,
                subTestTableData:[],
                testFormData:{
                    testReq:undefined
                },
                TestRequirement,
                expands:[],
                Standard:{selects: undefined, value:'', textValue: true, valueKey:'objectId', placeholder: '训练大纲', equalObject: {className:'TrainCourse',name:'standard'}},
                Section: {selects: undefined, value:'', textValue: true, valueKey:'objectId', placeholder: '大纲分册', equalObject: {className:'TrainCourse',name:'section'}},
                OrgCategories: {selects: undefined, value:'', placeholder: '单位分类', equalObject: {className:'TrainCourse',name:'orgCategories'}},
                Require: {selects: TrainRequirement, value:'', placeholder: '训练要求', equalObject: {className:'TrainCourse',name:'require'}},
                ScoreCriteria: {selects: ScoreCriteria, value:'', placeholder: '评分标准', equalObject: {className:'TrainCourse',name:'scoreCriteria'}},
                TrainUnits: {selects: OrgSequences, value:'', placeholder: '训练单元', equalObject: {className:'TrainCourse',name:'trainUnits'}},
                Task: {selects: undefined, value:'', placeholder: '训练任务', equalObject: {className:'TrainCourse',name:'tasks'}},
                ServiceReq: {selects: undefined, value:'', placeholder: '勤务类型', equalObject: {className:'TrainCourse',name:'serviceReq'}},
                MajorReq: {selects: undefined, value:'', placeholder: '专业要求', equalObject: {className:'TrainCourse',name:'majorReq'}},
                PersonProperty:{selects:PersonProperty,value:'',placeholder:'人员属性',equalObject:{className:'TrainCourse',name:'personProperties'}},

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
                this.selectStandard = result.list;
                this.Standard.selects = result.list;
                this.curStandard();
            });
            this.triggerSelect('TrainSection').then(result=>{
                this.Section.selects = result.list;
            });
            this.triggerSelect('TrainStep','selectTrainStep');
        },
        watch:{
            'formData.section'(newVal,oldVal){
                if (!newVal || newVal.length === 0) return;
                this.selectChanged(newVal,['TrainSection'],this.handleSectionResult);
            },
            'formData.orgType'(newVal,oldVal){
                if (!newVal || newVal.length === 0) return;
                this.selectChanged(newVal,['OrgCategory','orgType'],this.handleOrgTypeResult);
            },
            'formData.orgCategories'(newVal,oldVal){
                if (!newVal || newVal.length === 0) return;
                this.selectChanged(newVal,['OrgCategory','name'],this.handleCategoryResult);
            },
        },
        filters:{
            handleEmptyData(data){
                return Array.isArray(data)? data.length === 0 && '无'||data:data||'无'
            }
        },
        methods: {
            handleQuery(filterObj,className = this.className) {
                this.clearFilterOptions(filterObj);
                if(!filterObj)return this.query(className);
                let [parentQuery, childQuery, childName] = [];
                filterObj.map(item=>{
                    parentQuery = parentQuery || this.query(item.className);
                    if (item.name === 'standard'){
                        let parseStandard = new Client.TrainStandard();
                        parseStandard.id = item.value;
                        parentQuery.equalTo(item.name,parseStandard);
                    } else if (item.name === 'section'){
                        let parseSection = new Client.TrainSection();
                        parseSection.id = item.value;
                        parentQuery.equalTo(item.name,parseSection);
                        this.selectChanged(item.value,['TrainSection'],this.handleFilterSectionResult);
                    } else if (item.name === 'orgCategories'){
                        parentQuery.equalTo(item.name,item.value);
                        this.selectChanged(item.value,['OrgCategory','name'],this.handleFilterCategoryResult);
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
                this.isEdit = true;
                this.formData = {
                    ...row,
                    section: row.section.objectId,
                    standard: row.standard.objectId,
                    serviceReq: row.serviceReq || []
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
            handleFilterSectionResult(result) {
                this.selectFilterOrgType = result.list[0].orgTypes;
                this.optionalFilterOrgCategories = result.list[0].orgCategories;
                this.selectChanged(this.selectFilterOrgType[0],['OrgCategory','orgType'],this.handleFilterOrgTypeResult);
            },
            handleOrgTypeResult(result){
                this.selectOrgCategories = _.intersection(result.list.map(item=>item.name), this.optionalOrgCategories);
            },
            handleFilterOrgTypeResult(result) {
                this.OrgCategories.selects = _.intersection(result.list.map(item=>item.name), this.optionalFilterOrgCategories);
            },
            handleSectionResult(result){
                this.selectOrgType = result.list[0].orgTypes;
                if (this.formData.orgType === this.selectOrgType[0]) {
                    this.selectChanged(this.selectOrgType[0],['OrgCategory','orgType'],this.handleOrgTypeResult);
                }
                this.formData.orgType = this.selectOrgType[0];
                if (this.btnState) {
                    this.formData.personProperties = this.selectPersonType = result.list[0].personProperties;
                } else {
                    this.selectPersonType = result.list[0].personProperties;
                }
                this.optionalOrgCategories = result.list[0].orgCategories;
            },
            getRowKeys(row) {
                return row.name;
            },
            toggleRowExpansion(row){
                if(!row)return;
                this.expands = [];
                row && this.expands.push(row.name);
            },
            handleCategoryResult(result){
                let Tasks = [],Services = [],Majors = [];
                result.list.map(item =>{
                    Tasks = Tasks.concat(item.optionalTasks);
                    Services = Services.concat(item.optionalServices||[]);
                    Majors = Majors.concat(item.optionalMajors)
                });
                Tasks = Tasks.map(item =>{
                    return item.name
                });
                this.selectTask = [...new Set(Tasks)];
                this.selectServices = [...new Set(Services)];
                this.selectMajors = [...new Set(Majors)];
            },
            handleFilterCategoryResult(result) {
                let Tasks = [],Services = [],Majors = [];
                result.list.map(item =>{
                    Tasks = Tasks.concat(item.optionalTasks);
                    Services = Services.concat(item.optionalServices||[]);
                    Majors = Majors.concat(item.optionalMajors)
                });
                Tasks = Tasks.map(item =>{
                    return item.name
                });
                this.Task.selects = [...new Set(Tasks)];
                this.ServiceReq.selects = [...new Set(Services)];
                this.MajorReq.selects = [...new Set(Majors)];
            },
            clearFilterOptions(filterObj) {
                if (!filterObj || filterObj.findIndex(item => item.name === 'section') < 0) {
                    this.OrgCategories.selects = undefined;
                    this.OrgCategories.value = '';
                    this.Task.selects = undefined;
                    this.Task.value = '';
                    this.ServiceReq.selects = undefined;
                    this.ServiceReq.value = '';
                    this.MajorReq.selects = undefined;
                    this.MajorReq.value = '';
                    _.remove(filterObj, (item) => item.name === 'orgCategories');
                    _.remove(filterObj, (item) => item.name === 'task');
                    _.remove(filterObj, (item) => item.name === 'serviceReq');
                    _.remove(filterObj, (item) => item.name === 'majorReq');
                } else if (filterObj.findIndex(item => item.name === 'orgCategories') < 0) {
                    this.Task.selects = undefined;
                    this.Task.value = '';
                    this.ServiceReq.selects = undefined;
                    this.ServiceReq.value = '';
                    this.MajorReq.selects = undefined;
                    this.MajorReq.value = '';
                    _.remove(filterObj, (item) => item.name === 'task');
                    _.remove(filterObj, (item) => item.name === 'serviceReq');
                    _.remove(filterObj, (item) => item.name === 'majorReq');
                }
            },
            handleSubcourses(curRow){
                this.dialogTableVisible = true;
                this.dialogTableTitle = curRow.name + '的子课目';
                this.subTableData = curRow.subcourses;
                this.subFormData.objectId = curRow.objectId;
            },
            handleTestContents(Row) {
                this.dialogTestTableVisible = true;
                this.dialogTestTableTitle = Row.name + '的考核内容';
                this.subTestTableData = Row.testContents||[];
                console.log(Row);
                this.testFormData.objectId = Row.objectId;
            },
            closeTestSubModel() {
                this.editingTest = false;
                this.subTestBtnState = false;
                const id = this.testFormData.objectId;
                this.initTestContentsData();
                this.testFormData.objectId = id;
            },
            onSubmitTestAddCallback(formData) {
                let target = {...formData};
                if (this.editingTest) {
                    this.subTestTableData[this.testFormData.index] = this.testFormData;
                    this.subTestTableData = [...this.subTestTableData];
                }else {
                    const isRepeated = this.subTestTableData.some(item => {
                        return this.testFormData.content === item.content
                    });
                    if(isRepeated){
                        this.$message({showClose: true,
                            type:'warning',message:'不能添加重复数据'
                        });
                        return false
                    }
                    this.subTestTableData.push(this.testFormData);
                }
                target = {
                    objectId: this.testFormData.objectId,
                    testContents: [...this.subTestTableData],
                };
                this.closeTestSubModel();
                return target;
            },
            handleEditTest(index, row) {
                this.subTestBtnState = true;
                this.editingTest = true;
                Object.assign(this.testFormData,row);
                this.testFormData.index = index;
            },
            handleDeleteTest(index,row,differ) {
                this.confirm().then(_=>{
                    const j = this.subTestTableData;
                    this.$delete(j,index);
                    const target = {
                        objectId:this.testFormData.objectId,
                        testContents:this.subTestTableData,
                    };
                    this.addOrUpdateItem(target).then(result=>{
                        this.$message({showClose: true,
                            type:'success',
                            message:'删除考核要求成功'
                        });
                    }).catch(result =>{
                        return false
                    })
                });
            },
            handleStepResult(result){
                this.formData.trainUnits = result.list[0].trainUnits;
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
                    require: TrainRequirement.Required,
                    subcourses: [],
                    index:'',
                }
            },
            initTestContentsData() {
                this.testFormData= {
                    objectId:'',
                    content: '',                            // 考核内容
                    testReq: '必考',                            // 必考或选考
                }
            },
            initFormData(){
                this.formData = {
                    name: '',                                   // 课目名称
                    seq: 0,                                     // 课目序号
                    standard: '',                               // 训练大纲
                    section: '',                                // 训练大纲分册
                    isManual: false,                            // 子课目是否自定义
                    require: TrainRequirement.Required,         // 训练要求, 必训/选训/自训, 参考Constants.TrainRequirement
                    scoreCriteria: ScoreCriteria.Level4.name,   // 评分标准, 二级制/四机制/七级制/百分制
                    trainStep: '',                              // 训练步骤, 参考TrainStep表
                    orgType: '',                                // 课目适用的单位类型
                    orgCategories: [],                          // 课目适用的单位分类列表,一般是一个
                    personProperties: [],                       // 课目适用的人员属性列表,一般是一个
                    trainUnits: [],                             // 训练单元(编制序列), 单兵/班/排/中队/大队.
                    tasks: [],                                   // 课目对应任务
                    serviceReq: [],                             // 勤务类型要求
                    majorReq: '',                               // 专业类型要求
                    rankL2Reqs:[],                              // 军衔要求(军衔二级分类)
                    ordnanceTypes:[],                           // 配套军械类型, 参考OrdnanceType表
                    placeTypes:[],                              // 训练场地要求, 参考PlaceType表
                    gunnerType: '',                             // 要求枪手类型

                    subcourses: [],                             // 子课目列表
                    textCondition: '',                          // 课目条件
                    textStandard: '',                           // 课目标准
                    textEvaluation: '',                         // 考核要求

                    testContents:[],                            // 考核内容列表
                    //  testContents: [{                                // 考核内容列表
                    //      content: String,                            // 考核内容
                    //      testReq: String,                            // 必考或选考
                    //  }],
                };
            },
        },
    }
</script>

-->
<template>
    <div class="property">
        <formAndTable :schema="schema" :columns="columns" > </formAndTable>

        <el-dialog
            title="查看"
            :append-to-body="true"
            :close-on-click-modal="false"
            width="70%"
            :visible.sync="dialogVisible">
            <new-com-sub-course v-if="dialogVisible" :level="2" :schema="childSchema" :columns="childColumns" :courseData="courseData" > </new-com-sub-course>
            <!--<com-form :schema="schema" :editing="!!objectId" @formFinish="formFinish"> </com-form>-->
        </el-dialog>

    </div>
</template>

<script>
    import formAndTable from '@/pages/common/new-com-formAndTable'
    import newComSubCourse from '@/pages/common/new-com-subCourse'
    import {OrgType,PersonProperty,TrainRequirement,ScoreCriteria2,OrgSequences,TestRequirement} from '@/lib/Constants'
    const ScoreCriteriaOptions = Object.values(ScoreCriteria2).map(item=>item.name);
    const OrgSequenceOptions = Object.values(OrgSequences).map(item=>item.name);
    export default {
        components: {
            formAndTable,
            newComSubCourse
        },
        data() {
            return {
                columns: [
                    {prop: 'section', label: '大纲分册',handleValue:(value)=>value.name,style:{color:'#67C23A'}},
                    {prop: 'name', label: '课目名称',style:{color:'#F56C6C'}},
                    //{prop: 'seq', label: '序号'},
                    {prop: 'orgType', label: '单位类型'},
                    {prop: 'orgCategories', label: '单位分类',handleValue:value=>value.join('、')},
                    {prop: 'personProperties', label: '人员属性',handleValue:value=>value.join('、')},
                    {prop: 'require', label: '训练要求'},
                    {prop: 'scoreCriteria', label: '评分标准'},
                    {prop: 'trainStep', label: '训练步骤'},
                    {prop: 'trainUnits', label: '训练单元',handleValue:value=>value.join('、')},
                    {prop: 'majorReq', label: '专业类型'},
                    {prop: 'tasks', label: '对应任务',handleValue:value=>value.join('、')},
                    {prop: 'subcourses', label: '子课目',
                        click:this.handleSubCourse,
                        handleValue:value=>'点击查看',style:{color:'#F56C6C',cursor: 'pointer'}
                        },
                    {prop: 'testContents', label: '考核内容',
                        click:this.handleContents,
                        handleValue:value=>'点击查看',style:{color:'#F56C6C',cursor: 'pointer'}},
                    // {prop: 'serviceReq', label: '勤务类型'},
                    // {prop: 'rankL2Reqs', label: '军衔要求'},
                    // {prop: 'ordnanceTypes', label: '军械类型'},
                    {prop: 'placeTypes', label: '场地要求',handleValue:value=>value.join('、')},
                    //{prop: 'gunnerType', label: '枪手类型'},
                    /*
                    textCondition: '',                          // 课目条件
                    textStandard: '',                           // 课目标准
                    textEvaluation: '',                         // 考核要求*/
                ],
                schema: [
                    {fieldType: "input", placeholder: "训练大纲", label: "训练大纲", _name: "standard", standard: '',disabled:true},
                    {fieldType: "select", placeholder: "大纲分册", label: "大纲分册", _name: "section", section: '',options:[],filterable:true},
                    {fieldType: "input", placeholder: "课目名称", label: "课目名称", _name: "name", name: ''},
                    {fieldType: "input-number", placeholder: "课目序号", label: "课目序号", _name: "seq", seq: 0},
                    {fieldType: "select",width:'66%', placeholder: "单位分类", label: "单位分类", _name: "orgCategories", orgCategories: [],multiple:true,options:[],},
                    {fieldType: "select", placeholder: "单位类型", label: "单位类型", _name: "orgType", orgType: '',options:[],},
                    {fieldType: "select", placeholder: "人员属性", label: "人员属性", _name: "personProperties", personProperties: [],multiple:true,options:[],},
                    {fieldType: "select", placeholder: "训练要求", label: "训练要求", _name: "require", require:'必训',options:Object.values(TrainRequirement),},
                    {fieldType: "select", placeholder: "评分标准", label: "评分标准", _name: "scoreCriteria", scoreCriteria:'四级制',options:ScoreCriteriaOptions,},
                    {fieldType: "select", placeholder: "训练步骤", label: "训练步骤", _name: "trainStep", trainStep:'',options:[],},
                    {fieldType: "select", placeholder: "训练单元", label: "训练单元", _name: "trainUnits",multiple:true, trainUnits:[],options:OrgSequenceOptions,},

                    {fieldType: "select", placeholder: "专业类型（无数据，不可选）", label: "对应专业", _name: "majorReq", majorReq: '',options:[],disabled:false},
                    {fieldType: "select",width:'66%', placeholder: "对应任务（无数据，不可选）", label: "对应任务", _name: "tasks", tasks: [],multiple:true,options:[],disabled:false},
                    {fieldType: "select",width:'50%', placeholder: "对应勤务（无数据，不可选）", label: "对应勤务", _name: "serviceReq", serviceReq: [],multiple:true,options:[],disabled:false},
                    {fieldType: "select",width:'50%', placeholder: "场地要求", label: "场地要求", _name: "placeTypes",multiple:true, placeTypes:[],options:[],},

                    {fieldType: "select", placeholder: "军械类型", label: "军械类型", _name: "ordnanceTypes",multiple:true, ordnanceTypes:[],options:[],},
                    {fieldType: "select", placeholder: "枪手类型", label: "枪手类型", _name: "gunnerType", gunnerType:'',options:[],},
                    {fieldType: "select", placeholder: "军衔要求", label: "军衔要求", _name: "rankL2Reqs",multiple:true, rankL2Reqs:[],options:[],},

                    {fieldType: "input",width:'100%', placeholder: "课目条件", label: "课目条件", _name: "textCondition", textCondition: ''},
                    {fieldType: "input",width:'100%', placeholder: "课目标准", label: "课目标准", _name: "textStandard", textStandard: ''},
                    {fieldType: "input",width:'100%', placeholder: "考核要求", label: "考核要求", _name: "textEvaluation", textEvaluation: ''},

                ],
                dialogVisible:false,
                courseData:{},
                childSchema:[],
                childColumns:[],
                courseId:'',

            }
        },
        created(){
            this._schemaLength = this.schema.length;
            setTimeout(async ()=>{
                const standardPoint = this.$backendService.getParseObject('TrainStandard',this.$parent.standard.objectId);
                this._sectionOptions = (await this.$units.queryItemByKeyValue('TrainSection','standard',standardPoint)).list;
                this.schemaObj.sectionSchema.options = this._sectionOptions.map(item=>item.name);
                this.schemaObj.trainStepSchema.options = (await this.$backendService.queryListByKeyValue('TrainStep')).list.map(item=>item.name);
                this.schemaObj.rankL2ReqsSchema.options = (await this.$backendService.queryListByKeyValue('MilitaryRank')).list.map(item=>item.name);
                this.schemaObj.ordnanceTypesSchema.options = (await this.$backendService.queryListByKeyValue('OrdnanceType')).list.map(item=>item.name);
                this.schemaObj.placeTypesSchema.options = (await this.$backendService.queryListByKeyValue('PlaceType')).list.map(item=>item.name);
                this.schemaObj.gunnerTypeSchema.options = (await this.$backendService.queryListByKeyValue('GunnerType')).list.map(item=>item.name);

            },500);
        },
        watch:{
            'schemaObj.sectionSchema.section':{
                handler(newValue){
                    if(!newValue){
                        this.schemaObj.orgTypeSchema.orgType = '';
                        this.schemaObj.orgCategoriesSchema.orgCategories = [];
                        this.schemaObj.personPropertiesSchema.personProperties = [];
                    }else {
                        const selected = this._sectionOptions.find(item=>item.name === newValue);
                        this.schemaObj.orgTypeSchema.options = selected.orgTypes;
                        selected.orgTypes.length === 1 && (this.schemaObj.orgTypeSchema.orgType = selected.orgTypes[0]);
                        this.schemaObj.orgCategoriesSchema.options = selected.orgCategories;
                        selected.orgCategories.length === 1 && (this.schemaObj.orgCategoriesSchema.orgCategories = this.$units._cloneDeep(selected.orgCategories));
                        this.schemaObj.personPropertiesSchema.options = selected.personProperties;
                        selected.personProperties.length === 1 && (this.schemaObj.personPropertiesSchema.personProperties = this.$units._cloneDeep(selected.personProperties))
                    }
                    //this._editTimeArr = [];
                },
                isDeep:true,
            },
            'schemaObj.orgCategoriesSchema.orgCategories':{
                handler(newValue){
                    if(newValue.length){
                        newValue.forEach(async orgCategory =>{
                            const result = (await this.$units.queryItemByKeyValue('OrgCategory','name',orgCategory)).list[0];
                            const majorArr = [...this.schemaObj.majorReqSchema.options,...result.optionalMajors];
                            this.schemaObj.majorReqSchema.options = this.$units._uniq(majorArr);
                            this.schemaObj.majorReqSchema.disabled = !this.schemaObj.majorReqSchema.options.length;
                            const tasksArr = [...this.schemaObj.tasksSchema.options,...result.optionalTasks.map(item=>item.name)];
                            this.schemaObj.tasksSchema.options = this.$units._uniq(tasksArr);
                            this.schemaObj.tasksSchema.disabled = !this.schemaObj.tasksSchema.options.length;
                            const serviceReqArr = [...this.schemaObj.serviceReqSchema.options,...result.optionalServices];
                            this.schemaObj.serviceReqSchema.options = this.$units._uniq(serviceReqArr);
                            this.schemaObj.serviceReqSchema.disabled = !this.schemaObj.serviceReqSchema.options.length;
                        });
                    }else {
                        this.schemaObj.tasksSchema.disabled = false;
                        this.schemaObj.majorReqSchema.disabled = false;
                        this.schemaObj.serviceReqSchema.disabled = false;
                    }
                },
                isDeep:true
            },
        },
        computed:{
            schemaObj(){
                return this.schema.reduce((prev,curr)=>{
                    prev[`${curr._name}Schema`] = curr;
                    return prev
                },{});
            }
        },
        methods:{
            beforeSubmit(target) {
                target.standard = this.$parent.standard.objectId;
                target.section = this._sectionOptions.find(item=>item.name === target.section).objectId;
                if(!target.subcourses)target.subcourses = [];
                if(!target.testContents)target.testContents = [];
            },
            beforeEdit(target){
                target.standard = this.$parent.standard.name;
                target.section = target.section.name;
            },
            handleSubCourse(scope){
                this.dialogVisible = true;
                const rootData = scope.row;
                this.courseData = {
                    rootData:rootData,
                    resourceData:rootData.subcourses,
                    type:'subcourses',
                    level:1
                };
                this.childSchema = [
                    {fieldType: "input-number", placeholder: "课目序号", label: "课目序号", _name: "seq", seq: 1,},
                    {fieldType: "input", placeholder: "课目名称", label: "课目名称", _name: "name", name: '',},
                    {fieldType: "select", placeholder: "训练要求", label: "训练要求", _name: "require", require:'必训',options:Object.values(TrainRequirement),},
                ];
                this.childColumns = [
                    {prop: 'name', label: '子课目名称',style:{color:'#F56C6C'}},
                    {prop: 'require', label: '训练要求'},
                    {prop: 'seq', label: '课目序号'},
                    {prop: 'subcourses', label: '子课目',
                        handleValue:value=>'点击查看',style:{color:'#F56C6C',cursor: 'pointer'}},
                ]
            },
            handleContents(scope){
                this.dialogVisible = true;
                const rootData = scope.row;
                this.courseData = {
                    rootData,
                    resourceData:rootData.testContents,
                    type:'testContents',
                    level:1
                };
                this.childSchema = [
                    {fieldType: "input", placeholder: "考核内容", label: "考核内容", _name: "content", content: '',},
                    {fieldType: "select", placeholder: "训练要求", label: "训练要求", _name: "testReq", testReq:'必考',options:Object.values(TestRequirement),},
                ];
                this.childColumns = [
                    {prop: 'content', label: '考核内容',style:{color:'#F56C6C',cursor: 'pointer'}},
                    {prop: 'testReq', label: '考核类型'},
                ]
            },
        }
    }
</script>
