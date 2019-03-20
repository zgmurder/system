<template>
    <div class="Report"  style="position: relative">
        <div class="body"  v-loading="!tableData" :class="{'bg-transition':!analysisTableIs}">
            <div class="body-title"  v-if="tableData">
                <div class="title-text">
                    单课目军事训练成绩登记表
                    <div class="text-btns" v-if="analysisTableIs">
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
                                <el-button type="success" size="mini" icon="el-icon-tickets" plain :disabled="!!tableData.state || (tableData.organization.orgSequence !== parent.rootOrg.orgSequence)"   @click="parent.patternIsEdit = true" >编辑</el-button>
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
                            <th colspan="2">考核课目（内容）</th>
                            <th colspan="6">{{tableData.testContent?`${tableData.courseName}（${tableData.testContent}）`:tableData.courseName}}</th>
                        </tr>
                        <tr>
                            <th colspan="2">时间</th>
                            <th colspan="2">{{$units.format(tableData.date)}}</th>
                            <th colspan="2">考核形式</th>
                            <th colspan="2">{{tableData.assessMethod}}</th>
                        </tr>
                        <tr>
                            <th>单位</th>
                            <th>姓名</th>
                            <th>职务</th>
                            <th>{{patternIsEdit?'成绩/补考成绩':'成绩'}}</th>
                            <th>单位</th>
                            <th>姓名</th>
                            <th>职务</th>
                            <th>{{patternIsEdit?'成绩/补考成绩':'成绩'}}</th>
                        </tr>
                        <tr>
                        </tr>
                        <tr v-for="index in rowCount">
                            <td v-if="showRow(index-1,rowOne)" :rowspan="combineRow(index-1,rowOne)">{{rowOne[index-1] && rowOne[index-1].organization.name || '　'}}</td>
                            <td>{{rowOne[index-1] && rowOne[index-1].soldier.name || '　'}}</td>
                            <td>{{rowOne[index-1] && rowOne[index-1].soldier.position || '　'}}</td>
                            <td direction="left" :class="{'td-zindex':patternIsEdit && rowOne[index-1],active:index === activeIndex}" style="position: relative"  @mouseleave="handleMouseLeave" @mouseenter="handleMouseenter($event,rowOne[index-1],index)"><!-- @mouseleave="handleMouseLeaveTable"-->
                                <span v-if="rowOne[index-1]">
                                    <i class="el-icon-delete" v-if="patternIsEdit" style="position: absolute;right: 3px;top: 8px" @click="removeSoldier(rowOne[index-1].soldier.objectId)"></i>
                                    <span v-if="rowOne[index-1].score < 2" class="isRepair" :text="`（${rowOne[index-1].score?'补考':rowOne[index-1].untestedReason||''}）`" >
                                        {{rowOne[index-1].score?scoreOptions[rowOne[index-1].makeupScore]:scoreOptions[rowOne[index-1].score]}}
                                    </span>
                                    <span v-else>{{rowOne[index-1] && scoreOptions[rowOne[index-1].score] || '　'}}</span>
                                </span>
                            </td>


                            <td v-if="showRow(index-1,rowTwo)" :rowspan="combineRow(index-1,rowTwo)">{{rowTwo[index-1] && rowTwo[index-1].organization.name || '　'}}</td>
                            <td>{{rowTwo[index-1] && rowTwo[index-1].soldier.name || '　'}}</td>
                            <td>{{rowTwo[index-1] && rowTwo[index-1].soldier.position || '　'}}</td>
                            <td direction="right" :class="{'td-zindex':patternIsEdit && rowTwo[index-1],active:index === activeIndex}" style="position: relative"  @mouseleave="handleMouseLeave" @mouseenter="handleMouseenter($event,rowTwo[index-1],index)"><!-- @mouseleave="handleMouseLeaveTable"-->
                                <span v-if="rowTwo[index-1]">
                                    <i class="el-icon-delete" v-if="patternIsEdit" style="position: absolute;right: 3px;top: 8px" @click="removeSoldier(rowTwo[index-1].soldier.objectId)"></i>
                                    <span v-if="rowTwo[index-1].score < 2" class="isRepair" :text="`（${rowTwo[index-1].score?'补考':rowTwo[index-1].untestedReason||''}）`" >
                                        {{rowTwo[index-1].score?scoreOptions[rowTwo[index-1].makeupScore]:scoreOptions[rowTwo[index-1].score]}}
                                    </span>
                                    <span v-else>{{rowTwo[index-1] && scoreOptions[rowTwo[index-1].score] || '　'}}</span>
                                </span>
                            </td>

                            <!--<td v-if="showRow(index-1,rowTwo)" :rowspan="combineRow(index-1,rowTwo)">{{rowTwo[index-1] && rowTwo[index-1].organization.name || '　'}}</td>
                            <td>{{rowTwo[index-1] && rowTwo[index-1].soldier.name || '　'}}</td>
                            <td>{{rowTwo[index-1] && rowTwo[index-1].soldier.position || '　'}}</td>
                            <td  direction="right" :class="{'td-zindex':patternIsEdit && rowTwo[index-1],active:index+'1' === activeIndex}" @mouseenter="handleMouseenter($event,rowTwo[index-1],index+'1')">
                                {{rowTwo[index-1] && scoreOptions[rowTwo[index-1].score] || '　'}}
                            </td>-->
                        </tr>
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
                        </tr>
                    </table>
                </div>
                <div class="content-describe"  v-if="tableData">
                    <span>审核人：<b class="text-1"></b></span>
                    <span>填写人：<b class="text-1"></b></span>
                    <span>{{$units.format(tableData.date)}}</span>
                </div>
            </div>

            <div v-if="tableData" id="popover" class="el-popover el-popper" v-show="popoverVisible"  @mouseleave="handleMouseLeave" @mouseenter="mouseenterPopover">
                <p style="margin-bottom: 6px">{{title}}</p>
                <el-radio-group ref="elRadioGroup" v-model="radioScore" size="mini" @change="handleRadioChange">
                    <el-radio-button :label="index" :key="index" v-for="(score,index) in scoreOptions">{{score}}</el-radio-button>
                </el-radio-group>
                <h4  v-if="radioScore < 2" style="margin: 10px 0;border-bottom: 1px solid #DCDFE6;text-align: center">{{radioScore?'补考':'缺考事由'}}</h4>
                <el-radio-group v-if="radioScore === 1" v-model="radioScore1" size="mini" @change="handleRadioChange($event,true)">
                    <el-radio-button v-if="index>0"  :label="index" :key="index" v-for="(score,index) in scoreOptions">{{score}}</el-radio-button>
                </el-radio-group>
                <el-input style="width: 100%" :maxlength="4"  v-if="radioScore === 0" size="mini" v-model="untestedReason" @input="handleInputChange"> </el-input>
            </div>

            <div v-if="!tableData" class="body-empty"><img src="/static/img/empty.png" alt=""></div>

            <transition name="el-zoom-in-center">
                <div v-show="patternIsEdit" class="shadeBox shadeBox-wrapper" @click="closePopover"></div>
            </transition>
        </div>
    </div>
</template>

<script>
    import {ScoreCriteria2} from '@/lib/Constants'
    export default{
        name:'AssessEvent',
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
            }
        },
        data(){
           return {
               popoverVisible:false,
               popoverWidth:'330',
               radioScore:2,
               radioScore1:2,
               untestedReason:'',
               title:'',
               activeIndex:-1,
               soldierOptions:[],
           }
        },
        computed:{
            rowCount(){
                return Math.max(Math.ceil(this.personScores.length/2), 25)
            },
            scoreOptions(){
                const found = Object.values(ScoreCriteria2).find(item=>item.name === this.tableData.scoreSriteria);
                return found.optionalScores
            },
            personScores(){
                return this.tableData && this.tableData.personScores || []
            },
            rowOne(){
                return this.personScores.slice(0,this.rowCount);
            },
            rowTwo(){
                return this.personScores.slice(this.rowCount);
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
            async saveEdit(){
                const target = _.cloneDeep(this.tableData);
                console.log(target,333);
                const result = await this.$backendService.assessService.addOrUpdateAssessEvent(target);
                this.$message({showClose: true,message:'保存成功',type:'success'});
                this.parent.patternIsEdit = false;
                this.parent.tableData = result;
                this.parent.fetchTableList(...this.parent._pageObj)
            },
            async cancelEdit(){
                this.parent.patternIsEdit = false;
                if(!this.tableData.objectId)return this.parent.tableData = {};
                this.parent.tableData = await this.$backendService.assessEventService.getAssessEventDetails(this.tableData.objectId)
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
            handleInputChange(){
                this._personScore.untestedReason = this.untestedReason;
            },
            handleRadioChange(){
                this._personScore.isMakeup = this.radioScore === 1;
                this._personScore.makeupScore = this.radioScore1;
                this._personScore.score = this.radioScore;
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
            handleMouseenter(e,personScore,index){
                clearTimeout(this._timer);
                if(!this.patternIsEdit || !personScore)return;
                this.popoverVisible = true;
                const popover = this.$el.querySelector('#popover');
                const roleRadios = popover.querySelectorAll('[role=radio]');

                if(!personScore.isMakeup)roleRadios[personScore.score].click();
                else this.radioScore = personScore.score;
                this.radioScore1 = personScore.makeupScore||1;
                this.untestedReason = personScore.untestedReason||'';

                this.title = `${personScore.soldier.name}（${personScore.soldier.position}）的成绩`;
                this.activeIndex = index;
                this._personScore = personScore;

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
                const orgName = row[index].organization.name;
                const calculate = (orgName,index,num = 1)=>{
                    const is = row[index+1] && row[index+1].organization.name === orgName;
                    return is ? calculate(orgName,index+1,num+1) : num;
                };
                const endLength = index+calculate(orgName,index);
                return endLength > this.rowCount ? endLength - this.rowCount+2 : calculate(orgName,index)
            },
            showRow(index,row){
                if(!row[index])return true;
                const personArr = [row[index],row[index-1]];
                const orgArr = personArr.map(item=>item && item.organization.objectId);
                return orgArr[0] !== orgArr[1]
            },
            async changeScore() {
                await this.$backendService.assessEventService.evaluateAssessEventScore(this.tableData)
            }
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
        &:after{
            content: attr(text);
            opacity: 0.8;
            right: 14%;
            font-size: 12px;
            color: #409EFF;
            transform: scale(0.8);
        }
    }
    .bg-transition{
        background-color: rgba(0,0,0,0)!important;
    }
</style>
