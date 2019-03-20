
<template>
    <div class="Report"  style="position: relative">
        <div class="body"  v-loading="!tableData">
            <div class="body-title"  v-if="tableData">
                <div class="title-text">
                    单课目体育训练成绩登记表
                    <div class="text-btns"  v-if="analysisTableIs">
                        <div>
                            <el-button type="danger" v-if="$route.path === '/TableVue'" class="print-hidden" @click="$window.print()" size="mini" plain title="打印">打印</el-button>
                            <el-button type="primary" v-if="!patternIsEdit && $route.path !== '/TableVue'" class="print-hidden" @click="$units.showTable(tableData,'AssessEvent')" size="mini" plain title="新窗口打开">新窗口打开（打印）</el-button>
                        </div>

                        <div v-if="$route.path !== '/TableVue'">
                            <span v-show="patternIsEdit">
                                <el-popover
                                    ref="popover"
                                    placement="left"
                                    title="添加人员"
                                    width="300"
                                    trigger="click">
                                    <div style="max-height: 400px;overflow-y: auto;margin-bottom: 28px">
                                        <p style="margin-bottom: 10px" v-for="(soldier,index) in soldierOptions" :key="index"><el-checkbox v-model="soldier.checked">{{`${soldier.name}（${soldier.position}）`}}</el-checkbox></p>
                                        <p v-if="!soldierOptions.length" style="color: #909399">无可选人员</p>
                                        <el-button type="primary" size="mini" icon="el-icon-edit" @click="addSoldier" style="width: 100%;position: absolute;bottom: 0;z-index: 1;left: 0">确定添加</el-button>
                                    </div>
                                </el-popover>
                                <el-button  v-popover:popover type="warning" size="mini" icon="el-icon-edit" @click="fetchSoldierOptions" plain>添加人员</el-button>
                                <re-el-button type="danger" @click="saveEdit" size="mini" icon="el-icon-tickets">保存</re-el-button>
                                <el-button type="primary" @click="cancelEdit" plain size="mini" icon="el-icon-tickets">取消</el-button>
                            </span>
                            <span v-show="!patternIsEdit">
                                <el-button type="success" size="mini" icon="el-icon-tickets" plain :disabled="tableData.state !== 0"  @click="parent.patternIsEdit = true" >编辑</el-button>
                                <slot name="continueRegister"> </slot>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="body-content">
                <div class="content-table"  v-if="tableData">
                    <table border="1" cellspacing="0" cellpadding="0" style="line-height: 28px">
                        <tr>
                            <th colspan="2">组织单位</th>
                            <th colspan="3">{{tableData.organizer.displayName}}</th>
                            <th colspan="2">考核单位</th>
                            <th colspan="3">{{tableData.organization.displayName}}</th>
                        </tr>
                        <tr>
                            <th colspan="2">考核课目（内容）</th>
                            <th colspan="8">{{tableData.courseName}}</th>
                        </tr>
                        <tr>
                            <th colspan="2">时间</th>
                            <th colspan="3">{{$units.format(tableData.date)}}</th>
                            <th colspan="2">考核形式</th>
                            <th colspan="3">{{tableData.assessMethod}}</th>
                        </tr>
                        <!--<tr>
                            <th colspan="2">考核课目（内容）</th>
                            <th colspan="2">{{tableData.courseName}}</th>
                            <th>组织单位</th>
                            <th>{{tableData.organizer.displayName}}</th>
                            <th>考核单位</th>
                            <th colspan="2">{{tableData.organization.displayName}}</th>
                        </tr>
                        <tr>
                            <th colspan="2">时间</th>
                            <th colspan="2">{{$units.format(tableData.date)}}</th>
                            <th colspan="2">考核形式</th>
                            <th colspan="2">{{tableData.assessMethod}}</th>
                        </tr>-->
                        <tr>
                            <th>单位</th>
                            <th>姓名</th>
                            <th>职务</th>
                            <th>评分</th>
                            <th>
                                <div>成绩 <span v-if="tableData.course.unitType">（{{tableData.course.unitType}}）</span></div>
                            </th>
                            <th>单位</th>
                            <th>姓名</th>
                            <th>职务</th>
                            <th>评分</th>
                            <th>
                                <div>成绩<span v-if="tableData.course.unitType">（{{tableData.course.unitType}}）</span></div>
                            </th>
                        </tr>

                        <tr v-for="index in rowCount">
                            <td v-if="showRow(index-1,rowOne)" :rowspan="combineRow(index-1,rowOne)">{{rowOne[index-1] && rowOne[index-1].organization.name || '　'}}</td>
                            <td>{{rowOne[index-1] && rowOne[index-1].soldier.name || '　'}}</td>
                            <td>{{rowOne[index-1] && rowOne[index-1].soldier.position || '　'}}</td>
                            <td>{{rowOne[index-1] && handleScore(rowOne[index-1].score,rowOne[index-1].scoreCriteria)}}</td>
                            <td direction="left" :class="{'td-zindex':patternIsEdit && rowOne[index-1],active:index === activeIndex}" style="position: relative"><!--  @mouseleave="handleMouseLeave" @mouseenter="handleMouseenter($event,rowOne[index-1],index)"-->
                                <i class="el-icon-delete" v-if="rowOne[index-1] && patternIsEdit" style="position: absolute;left: -20px;top: 8px;color: #fff" @click="removeSoldier(rowOne[index-1].soldier.objectId)"></i>
                                <div v-if="patternIsEdit">
                                    <input v-if="tableData.course.countType === '数量' && rowOne[index-1]" type="number" v-model.number="(rowOne[index-1]||{}).count" @input="valueIsChange(rowOne[index-1])">
                                    <div v-if="tableData.course.countType === '时间' && rowOne[index-1]" class="countType-time">
                                        <input type="number" v-model.number="(rowOne[index-1]||{}).minute" @input="valueIsChange(rowOne[index-1])">
                                        <div>分</div>
                                        <input type="number" v-model.number="(rowOne[index-1]||{}).second" @input="valueIsChange(rowOne[index-1])">
                                        <div>秒</div>
                                    </div>
                                    <el-select v-else-if="tableData.course.countType === '' && rowOne[index-1]" size="mini"  v-model.number="(rowOne[index-1]||{}).count" @input="valueIsChange(rowOne[index-1])" placeholder="请选择或输入">
                                        <el-option
                                            v-for="(item,index) in scoreOptions"
                                            :key="item"
                                            :label="item"
                                            :value="index">
                                        </el-option>
                                    </el-select>
                                </div>
                                <span v-else>{{timeToString(rowOne[index-1] && rowOne[index-1].count)}}</span>
                            </td>

                            <td v-if="showRow(index-1,rowTwo)" :rowspan="combineRow(index-1,rowTwo)">{{rowTwo[index-1] && rowTwo[index-1].organization.name || '　'}}</td>
                            <td>{{rowTwo[index-1] && rowTwo[index-1].soldier.name || '　'}}</td>
                            <td>{{rowTwo[index-1] && rowTwo[index-1].soldier.position || '　'}}</td>
                            <td>{{rowTwo[index-1] && handleScore(rowTwo[index-1].score,rowTwo[index-1].scoreCriteria)}}</td>
                            <td direction="left" :class="{'td-zindex':patternIsEdit && rowTwo[index-1],active:index === activeIndex}" style="position: relative"><!--  @mouseleave="handleMouseLeave" @mouseenter="handleMouseenter($event,rowOne[index-1],index)"-->
                                <i class="el-icon-delete" v-if="rowTwo[index-1] && patternIsEdit" style="position: absolute;left: -20px;top: 8px;color: #fff" @click="removeSoldier(rowTwo[index-1].soldier.objectId)"></i>
                                <div v-if="patternIsEdit">
                                    <input min="0"  v-if="tableData.course.countType === '数量' && rowTwo[index-1]" type="number" v-model.number="(rowTwo[index-1]||{}).count" @input="valueIsChange(rowTwo[index-1])">
                                    <div  v-else-if="tableData.course.countType === '时间' && rowTwo[index-1]" class="countType-time">
                                        <input type="number" v-model.number="(rowTwo[index-1]||{}).minute" :min="0" @input="valueIsChange(rowTwo[index-1])">
                                        <div>分</div>
                                        <input type="number" v-model.number="(rowTwo[index-1]||{}).second" :min="0" @input="valueIsChange(rowTwo[index-1])">
                                        <div>秒</div>
                                    </div>
                                    <el-select size="mini" v-else-if="tableData.course.countType === '' && rowTwo[index-1]"  v-model.number="(rowTwo[index-1]||{}).count" @input="valueIsChange(rowTwo[index-1])" placeholder="请选择或输入">
                                        <el-option
                                            v-for="(item,index) in scoreOptions"
                                            :key="item"
                                            :label="item"
                                            :value="index">
                                        </el-option>
                                    </el-select>
                                </div>
                                {{timeToString(rowTwo[index-1] && rowTwo[index-1].count)}}
                            </td>

                        </tr>
                        <!--
                        <tr>
                            <td rowspan="5">成绩<br>统计</td>
                            <td colspan="4">按四级制评定</td>
                            <td colspan="3">按二级制评定</td>
                        </tr>
                        <tr class="line-heigt-normal">
                            <td>优秀<br>人数</td>
                            <td>良好<br>人数</td>
                            <td>及格<br>人数</td>
                            <td>不合格<br>人数</td>
                            <td colspan="2">合格<br>人数</td>
                            <td>不合格<br>人数</td>
                        </tr>
                        <tr>
                            <td>{{fourStage && (tableData.excellentCount+'')||''}}</td>
                            <td>{{fourStage && (tableData.goodCount+'')||''}}</td>
                            <td>{{fourStage && (tableData.passCount+'')||''}}</td>
                            <td>{{fourStage && (tableData.unpassCount+'')||''}}</td>

                            <td colspan="2">{{!fourStage && (tableData.passCount+'')||''}}</td>
                            <td>{{!fourStage && (tableData.unpassCount+'')||''}}</td>
                        </tr>

                        <tr class="line-heigt-normal">
                            <td>优秀率</td>
                            <td>优良率</td>
                            <td>及格率</td>
                            <td>成绩<br>评定</td>
                            <td colspan="2">合格率</td>
                            <td>成绩<br>评定</td>
                        </tr>
                        <tr>
                            <td>{{fourStage && (tableData.excellentRate + '%')||''}}</td>
                            <td>{{fourStage && (tableData.goodRate + '%')||''}}</td>
                            <td>{{fourStage && (tableData.passRate + '%')||''}}</td>
                            <td>{{fourStage && scoreOptions[tableData.score]||''}}</td>

                            <td colspan="2">{{!fourStage && (tableData.passRate+'%')||''}}</td>
                            <td>{{!fourStage && scoreOptions[tableData.score]||''}}</td>
                        </tr>-->
                    </table>
                </div>
                <div class="content-describe"  v-if="tableData">
                    <span>审核人：<b class="text-1"></b></span>
                    <span>填写人：<b class="text-1"></b></span>
                    <span>{{$units.format(tableData.date)}}</span>
                </div>
            </div>

            <div v-if="tableData" id="popover" class="el-popover el-popper" style="width: 200px" v-show="popoverVisible"  @mouseleave="handleMouseLeave" @mouseenter="mouseenterPopover">
                <p style="margin-bottom: 6px">填写成绩</p>

                <div v-if="tableData.course.countType === '时间'">
                    <el-input ref="minuteInput" size="mini" v-model.number="editObj.minute">
                        <template slot="append">分</template>
                    </el-input>
                    <el-input size="mini" style="margin-top: 5px" v-model.number="editObj.second">
                        <template slot="append">秒</template>
                    </el-input>
                </div>
               <!-- <div v-if="tableData.course.countType === ''">
                    <el-select v-model="(tableData.sportScores[props.index]||{}).count" @change="valueIsChange(props.index)" placeholder="请选择或输入">
                        <el-option
                            v-for="(item,index) in selectScore"
                            :key="item"
                            :label="item"
                            :value="index">
                        </el-option>
                    </el-select>
                </div>-->


                <!--<el-radio-group ref="elRadioGroup" v-model="radioScore" size="mini" @change="handleRadioChange">
                    <el-radio-button :label="index" :key="index" v-for="(score,index) in scoreOptions">{{score}}</el-radio-button>
                </el-radio-group>
                <h4  v-if="radioScore < 2" style="margin: 10px 0;border-bottom: 1px solid #DCDFE6;text-align: center">补考</h4>
                <el-radio-group v-if="radioScore < 2" v-model="radioScore1" size="mini" @change="handleRadioChange($event,true)">
                    <el-radio-button :label="index" :key="index" v-for="(score,index) in scoreOptions">{{score}}</el-radio-button>
                </el-radio-group>-->
            </div>

            <div v-if="!tableData" class="body-empty"><img src="/static/img/empty.png" alt=""></div>

            <transition name="el-zoom-in-center">
                <div v-show="patternIsEdit" class="shadeBox shadeBox-wrapper" @click="closePopover"></div>
            </transition>
            <!--<input v-if="(tableData.sportScores[props.index]||{}).countType === '数量'" @input="valueIsChange(props.index,$event)" type="number" v-model.number="(tableData.sportScores[props.index]||{}).count">
            <div v-else-if="(tableData.sportScores[props.index]||{}).countType === '时间'" class="time">
                <el-popover
                    ref="popover"
                    placement="left"
                    title="输入时间成绩"
                    width="150"
                    trigger="click">
                    <el-input ref="minuteInput" v-focus size="mini" v-model.number="editObj.minute">
                        <template slot="append">分</template>
                    </el-input>
                    <el-input size="mini" style="margin-top: 5px" v-model.number="editObj.second">
                        <template slot="append">秒</template>
                    </el-input>
                    <el-button slot="reference" type="text" style="width: 100%" @click="handlePopover(props.index,(tableData.sportScores[props.index]||{}).count)">{{(tableData.sportScores[props.index]||{}).count | timeToString}}</el-button>
                </el-popover>
            </div>
            <div v-else-if="(tableData.sportScores[props.index]||{}).countType === ''" class="time">
                <el-select v-model="(tableData.sportScores[props.index]||{}).count" @change="valueIsChange(props.index)" placeholder="请选择或输入">
                    <el-option
                        v-for="(item,index) in selectScore"
                        :key="item"
                        :label="item"
                        :value="index">
                    </el-option>
                </el-select>
            </div>-->
        </div>
    </div>
</template>

<script>
    import {ScoreCriteria2} from '@/lib/Constants'
    export default{
        name:'SportEvent',
        props:{
            tableData:{
                type:Object,
                default:()=>{
                    return null
                }
            },
            patternIsEdit:{
                type:Boolean,
                default:false
            },
            analysisTableIs:{
                type:Boolean,
                default:true
            },
        },
        data(){
            return {
                popoverVisible:false,
                popoverWidth:'330',
                radioScore:2,
                radioScore1:0,
                title:'',
                activeIndex:-1,
                soldierOptions:[],
                editObj:{
                    minute:0,
                    second:0,
                    msec:0,
                    index:0
                },
                countType:'',
            }
        },
        watch:{
            'editObj':{
                async handler(value){
                    this.tableData.sportScores[value.index].count = this.toSecond(value);
                    await this.$backendService.assessService.evaluateSportScore(this.tableData.sportScores[value.index],this.tableData.organization)
                },
                deep:true
            },
        },
        computed:{
            rowCount(){
                return Math.max(Math.ceil(this.sportScores.length/2), 25)
            },
            scoreOptions(){
                return ScoreCriteria2.Level4.optionalScores
            },
            sportScores(){

                this.tableData && this.tableData.sportScores.forEach(item=>{
                    if(item.count){
                        const integer = (+item.count).toFixed(0);
                        const float = +(item.count - integer).toFixed(2);
                        this.$set(item,'minute',Math.floor(integer / 60));
                        this.$set(item,'second',integer % 60 + float);
                    }else {
                        this.$set(item,'minute','');
                        this.$set(item,'second','');
                    }
                });
                return this.tableData && this.tableData.sportScores || []
            },
            rowOne(){
                return this.sportScores.slice(0,this.rowCount);
            },
            rowTwo(){
                return this.sportScores.slice(this.rowCount);
            },
            fourStage(){
                return this.tableData.scoreSriteria === '四级制'
            },
            parent(){
                const findTableData = (self) =>self.tableData === undefined ? findTableData(self.$parent) : self;
                return findTableData(this.$parent)
            }
        },
        methods:{
            handleScore(Score,scoreSriteria){
                const found = Object.values(ScoreCriteria2).find(item=>item.name === scoreSriteria);
                return found.optionalScores ? found.optionalScores[Score] : Score;
            },
            timeToString(value,countType = this.tableData.course.countType) {
                if(!value)return '　';
                switch (countType) {
                    case '数量':
                        return value;
                    case '时间':
                        if (!value) return value;
                        const integer = parseInt(value);
                        const float = +(value - integer).toFixed(2);
                        return Math.floor(integer / 60) + "' " + (integer % 60 ) + '"' + (float ? (float*10).toFixed(0):'');
                    default:
                        return ScoreCriteria2.Level4.optionalScores[value]
                }
            },
            async valueIsChange(obj){
                obj.count = this.toSecond(obj);
                await this.$backendService.assessService.evaluateSportScore(obj,this.tableData.organization)
            },
            handlePopover(index,value){
                this.timeObj.index = index;
                if(!value)return value;
                const integer = +value.toFixed(0);
                const float = +(value - integer).toFixed(2);
                this.timeObj.minute = Math.floor(integer/60);
                this.timeObj.second = integer%60+float
            },
            toSecond(obj){
                return +((obj.minute||0)*60 + obj.second || 0);
            },
            async saveEdit(){
                const target = _.cloneDeep(this.tableData);
                const result = await this.$backendService.assessService.addOrUpdateAssessEvent(target);
                this.$message({showClose: true,message:'保存成功',type:'success'});
                this.parent.patternIsEdit = false;
                this.parent.tableData = result;
            },
            async cancelEdit(){
                this.parent.patternIsEdit = false;
                if(!this.tableData.objectId)return this.parent.tableData = {};
                this.parent.tableData = await this.$backendService.assessService.getAssessEventDetails(this.tableData.objectId)
            },
            async fetchSoldierOptions(){
                this.soldierOptions = await this.$backendService.assessService.getSoldierOptions(this.tableData);
                this.soldierOptions.forEach(item=>this.$set(item,'checked',false))
            },
            addSoldier(){
                const soldiers = this.soldierOptions.filter(item=>item.checked);
                soldiers.forEach(async soldier=>{
                    this.$backendService.assessService.addSoldier(this.tableData,soldier);
                });
                this.fetchSoldierOptions();
            },
            async removeSoldier(objectId){
                await this.$backendService.assessService.removeSoldier(this.tableData,objectId);
                this.closePopover()
            },
            closePopover(){
                this.popoverVisible = false;
                this.activeIndex = -1;
            },
            handleRadioChange(){
                this._sportScore.isMakeup = this.radioScore < 2;
                this._sportScore.makeupScore = this.radioScore1;
                this._sportScore.score = this.radioScore;
                this.changeScore()
            },
            mouseenterPopover(){
                clearTimeout(this._timer);
            },
            handleMouseLeave(){
                this._timer = setTimeout(()=>{
                    this.closePopover()
                },500)
            },
            handleMouseenter(e,sportScore,index){
                clearTimeout(this._timer);
                if(!this.patternIsEdit)return;
                this.popoverVisible = true;
                const popover = this.$el.querySelector('#popover');

                /*const roleRadios = popover.querySelectorAll('[role=radio]');
                if(!sportScore.isMakeup)roleRadios[sportScore.score].click();
                else this.radioScore = sportScore.score;
                this.radioScore1 = sportScore.makeupScore;*/

                this.title = `${sportScore.soldier.name}（${sportScore.soldier.position}）的成绩`;
                this.activeIndex = index;
                this._sportScore = sportScore;

                //const el = this.$refs.popover.$el;
                const isLeft = e.target.getAttribute('direction') === 'left';
                const left = isLeft ? (e.target.offsetLeft + e.target.offsetWidth + 10) : (e.target.offsetLeft - this.popoverWidth - 10);

                const styleObj = {
                    position:'absolute',
                    left: left+'px',
                    top: e.target.offsetTop+'px',
                    zIndex:1024
                };
                Object.assign(popover.style,styleObj);
            },
            combineRow(index,row){
                if(!row[index])return 1;

                const orgName = row[index].displayOrg?row[index].displayOrg.name:row[index].organization.name;
                const calculate = (orgName,index,num = 1)=>{
                    const is = row[index+1] && (row[index+1].displayOrg?row[index+1].displayOrg.name:row[index+1].organization.name) === orgName;
                    return is ? calculate(orgName,index+1,num+1) : num;
                };
                const endLength = index+calculate(orgName,index);
                return endLength > this.rowCount ? endLength - this.rowCount+2 : calculate(orgName,index)
            },
            showRow(index,row){
                if(!row[index])return true;
                const personArr = [row[index],row[index-1]];
                const orgArr = personArr.map(item=>item && (item.displayOrg?item.displayOrg.objectId:item.organization.objectId));
                return orgArr[0] !== orgArr[1]
            },
        },
    }

</script>
<style scoped lang="scss">
    @import "./common.scss";
    .active{
        background: #C0C4CC;
        color: #fff;
    }
    .isRepair{
        &:before{
            content: '(补考)';
            position: absolute;
            opacity: 0.8;
            right: 14%;
            font-size: 12px;
            color: #409EFF;
            transform: scale(0.8);
        }
    }
    .countType-time{
        display: flex;
        position: absolute;
        height: 100%;
        width: 100%;
        align-items: stretch;
        top: 0;
        &>input{
            width: 30%;
            border: none;
            padding-left: 5px;
            position: static;
        }
        &>div{
            width: 20%;
            background-color: #f5f7fa;
            color: #999;
            border: 1px solid #DCDFE6;
        }
    }
</style>
