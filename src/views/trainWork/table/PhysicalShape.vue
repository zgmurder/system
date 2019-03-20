<!--
<template>
    <div class="Report">
        <div class="body">
            <div class="body-title">
                <div class="title-text">
                    个人体育训练体型登记表
                    <div class="text-btns">
                        <div><el-button type="danger" size="mini" class="print-hidden" @click="$window.print()" plain title="打印">打印</el-button></div>
                        <slot name="handle"></slot>
                    </div>
                </div>
            </div>

            <transition name="el-zoom-in-center">
                <div class="body-content">
                    <div class="content-table" v-if="tableData">
                        <table border="1" cellspacing="0" cellpadding="0">
                            <tr>
                                <td>
                                    <table border="1" cellspacing="0" cellpadding="0" style="height: 100%">
                                        <tr>
                                            <th colspan="2">考核课目（内容）</th>
                                            <th colspan="2">体型</th>
                                            <th>时间</th>
                                            <th colspan="2">{{date|formatDate}}</th>
                                            <th colspan="2">考核形式</th>
                                            <th colspan="5">普考</th>
                                        </tr>
                                        <tr>
                                            <th>单位</th>
                                            <th>姓名</th>
                                            <th>身高cm</th>
                                            <th>体重kg</th>
                                            <th>体脂%</th>
                                            <th>体型</th>
                                            <th>成绩</th>
                                            <th>单位</th>
                                            <th>姓名</th>
                                            <th>身高cm</th>
                                            <th>体重kg</th>
                                            <th>体脂%</th>
                                            <th>体型</th>
                                            <th>成绩</th>
                                        </tr>

                                        <tr v-for="index in rowCount">
                                            <td v-if="isRenderOrg(index)" :rowspan="getOrgRowCount(index)">{{handleItem(index,'organization','name')}}</td>
                                            <td>{{handleItem(index,'soldier','name')}}</td>
                                            <td>
                                                <slot name="editScore" v-if="patternIsEdit" :index="index-1" fieldName="height"></slot>
                                                <span v-else>{{handleItem(index,'height')}}</span>
                                            </td>
                                            <td>
                                                <slot name="editScore" v-if="patternIsEdit" :index="index-1" fieldName="weight"></slot>
                                                <span v-else>{{handleItem(index,'weight')}}</span>
                                            </td>
                                            <td>
                                                <slot name="editScore" v-if="patternIsEdit" :index="index-1" fieldName="pbf"></slot>
                                                <span v-else>{{handleItem(index,'pbf')}}</span>
                                            </td>
                                            <td>
                                                <span>{{handleItem(index,'bmi')}}</span>
                                            </td>

                                            <td>{{handleItem(index,'score')|handleScore((tableData[index-1]||{}).scoreCriteria)}}</td>

                                            <td v-if="isRenderOrg(index+rowCount)" :rowspan="getOrgRowCount(index+rowCount)">{{handleItem(index+rowCount,'organization','name')}}</td>
                                            <td>{{handleItem(index+rowCount,'soldier','name')}}</td>
                                            <td>
                                                <slot name="editScore" v-if="patternIsEdit" :index="index+rowCount-1" fieldName="height"></slot>
                                                <span v-else>{{handleItem(index+rowCount,'height')}}</span>
                                            </td>
                                            <td>
                                                <slot name="editScore" v-if="patternIsEdit" :index="index+rowCount-1" fieldName="weight"></slot>
                                                <span v-else>{{handleItem(index+rowCount,'weight')}}</span>
                                            </td>
                                            <td>
                                                <slot name="editScore" v-if="patternIsEdit" :index="index+rowCount-1" fieldName="pbf"></slot>
                                                <span v-else>{{handleItem(index+rowCount,'pbf')}}</span>
                                            </td>
                                            <td>
                                                <span>{{handleItem(index+rowCount,'bmi')}}</span>
                                            </td>
                                            <td>{{handleItem(index+rowCount,'score')|handleScore((tableData[index+rowCount-1]||{}).scoreCriteria)}}</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <ul class="content-explain">
                        填写说明
                        <li class="font-family">1.此表用于记载本级对所属单位与个人军事训练考核的成绩；</li>
                        <li>2.机关由训练部门、分队由文书填写，成绩由业务部门或分队主官审核；</li>
                        <li>3.考核课目（内容）依据《军事训练大纲》填写；考核形式分为普考和抽考；其余栏目依实际情况填写。</li>
                    </ul>
                </div>
            </transition>
            <div v-if="!tableData" class="body-empty"><img src="/static/img/empty.png" alt=""></div>

            <transition name="el-zoom-in-center">
                <slot name="model"></slot>
            </transition>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import {ScoreCriteria2} from 'src/lib/Constants'
    export default{
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
            }
        },
        data(){
            return {
                date:this.$systemTime()
            }
        },
        methods:{
            handleItem(index){
                return this.tableData[index-1] && [...arguments].slice(1).reduce((prev,cur)=>{
                    return prev[cur]
                },this.tableData[index-1]) || '　'
            },
            getOrgRowCount(index) {
                index&#45;&#45;;
                if (index < this.tableData.length) {
                    let personScore = this.tableData[index];
                    return this.tableData.filter((item, i) => {
                        return (i>=index && item.organization.objectId === personScore.organization.objectId);
                    }).length;
                } else {
                    return 1;
                }
            },
            isRenderOrg(index) {
                index&#45;&#45;;
                if (index < this.tableData.length) {
                    let personScore = this.tableData[index];
                    if (index === 0 || index === this.rowCount) return true;
                    else {
                        let lastScore = this.tableData[index-1];
                        return personScore.organization.objectId !== lastScore.organization.objectId;
                    }
                } else {
                    return true;
                }
            },
            changeScore(item) {
                this.$backendService.assessEventService.evaluateAssessEventScore(this.tableData).then(_ => _);
            }
        },
        computed:{
            rowCount(){
                if (this.tableData && this.tableData && this.tableData.length>50) {
                    return Math.ceil(this.tableData.length/2);
                }else {
                    return 25
                }
            },
            /*scoreOptions(){
                const found = Object.values(ScoreCriteria2).find(item=>item.name === this.tableData.scoreSriteria);
                return found.optionalScores
            }*/
        },
        filters:{
            formatDate(date){
                return moment(date).format('YYYY年MM月DD日')
            },
            arrayToString(array){
                return array.length ? array.join(' 、 ') : ''
            },
            handleZero(num){
                return num === 0 ? '' : num
            },
            handleScore(Score,scoreSriteria='四级制'){
                const found = Object.values(ScoreCriteria2).find(item=>item.name === scoreSriteria);
                return found.optionalScores ? found.optionalScores[Score] : Score;
            },
            handleScoreSriteria(value,scoreSriteria,contains){
                if(scoreSriteria === contains)return value;
                else return ' '
            },
            timeToString(value,countType) {
                switch (countType) {
                    case '数量':
                        return value;
                    case '时间':
                        if (!value) return value;
                        const integer = (+value).toFixed(0);
                        const float = +(value - integer).toFixed(2);
                        return Math.floor(integer / 60) + "' " + (integer % 60 + float) + '"';
                    default:
                        return ScoreCriteria2.Level4.optionalScores[value]
                }
            },
        },
    }

</script>

<style scoped lang="scss">
    .text-over{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .line-heigt-normal{
        line-height: normal;
        padding: 10px 0;
    }
    table{
        border-color: #666;
        border-collapse: collapse;
        width: 100%;
        text-align: center;
        vertical-align: center;
        box-sizing: border-box;
        border-width:0;
        border-style:hidden;
        color: #606266;
        table-layout:fixed;
        td{
            position: relative;
            box-sizing: border-box;
            line-height: 36px;
        }
        input{
            border: none!important;
        }
    }
    .Report {
        flex: 1;
        background-color: #fff;
        color: #606266;
        position: relative;
        .body-title{
            .title-text{
                letter-spacing:3px;
                font-size: 26px;
                text-align: center;
                position: relative;
                color: #303133;
                padding: 10px 0;
                font-family: FZXBSJW!important;
                .text-btns{
                    width: 100%;
                    position: absolute;
                    z-index: 3;
                    top: -3px;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: space-between;
                    padding: 10px 0;
                }
            }
            .title-tip{
                text-align: center;
                border-bottom: 1px solid #ebeef5;
                line-height: 36px;
            }
        };
        .body-content{
            .content-describe{
                display: flex;
                padding: 0 10px;
                justify-content: space-between;
                line-height: 36px;
            }
            .content-table{
                border:2px solid #000;
                .can-edit{
                    word-break: break-all;
                    word-wrap:break-word;
                    position: relative;
                    box-sizing: border-box;
                    line-height: 36px;
                    overflow: hidden;
                    top: 0;
                    right: 0;
                    background: #fff;
                    z-index: 3;
                    height: 100%;
                    width: 100%;
                    input{
                        width: 100%;
                        text-align: center;
                        line-height: 36px;
                        height: 36px;
                        border: none!important;
                    }
                }
                .isRepair:before{
                    content: '（补考）';
                    position: absolute;
                    opacity: 0.8;
                    right: 10px;
                    font-size: 12px;
                }
                .can-edit{
                    position: relative;
                    box-sizing: border-box;
                    line-height: 36px;
                    overflow: hidden;
                    top: 0;
                    right: 0;
                    background: #fff;
                    z-index: 3;
                    height: 100%;
                    width: 100%;
                }
            }
            .content-explain{
                padding: 10px;
                line-height: 26px;
                color: #909399;
                background: #f6f6f6;
            }
        }
        .body-empty{
            text-align: center;
        }
    }
</style>
-->
<template>
    <div class="Report"  style="position: relative">
        <div class="body"  v-loading="!tableData"><!-- :class="{'bg-transition':!analysisTableIs}"-->
            <div class="body-title"  v-if="tableData">
                <div class="title-text">
                    单课目军事训练成绩登记表
                    <div class="text-btns" v-if="analysisTableIs">
                        <div>
                            <el-button type="danger" v-if="$route.path === '/TableVue'" class="print-hidden" @click="$window.print()" size="mini" plain title="打印">打印</el-button>
                            <el-button type="primary" v-if="!patternIsEdit && $route.path !== '/TableVue'" class="print-hidden" @click="$units.showTable(tableData,'AssessEvent')" size="mini" plain title="新窗口打开">新窗口打开（打印）</el-button>
                        </div>
                        <!--<slot name="handle"> </slot>-->
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
                            <th colspan="2">考核课目（内容）</th>
                            <th colspan="2">体型</th>
                            <th>时间</th>
                            <th colspan="2">{{$units.format(tableData.date)}}</th>
                            <th colspan="2">考核形式</th>
                            <th colspan="5">普考</th>
                        </tr>
                        <tr>
                            <th>单位</th>
                            <th>姓名</th>
                            <th>身高cm</th>
                            <th>体重kg</th>
                            <th>体脂%</th>
                            <th>体型</th>
                            <th>成绩</th>
                            <th>单位</th>
                            <th>姓名</th>
                            <th>身高cm</th>
                            <th>体重kg</th>
                            <th>体脂%</th>
                            <th>体型</th>
                            <th>成绩</th>
                        </tr>
                        <tr v-for="index in rowCount">
                            <td v-if="showRow(index-1,rowOne)" :rowspan="combineRow(index-1,rowOne)">{{rowOne[index-1] && rowOne[index-1].organization.name || '　'}}</td>
                            <td>{{rowOne[index-1] && rowOne[index-1].soldier.name || '　'}}</td>
                            <td :class="{'td-zindex':patternIsEdit && rowOne[index-1],active:index+'1' === activeIndex}" style="position: relative">
                                <i v-if="rowOne[index-1] && patternIsEdit"  class="el-icon-delete" style="position: absolute;left: 3px;top: 8px;z-index: 10" @click="removeSoldier(rowOne[index-1].soldier.objectId)"></i>
                                <input v-if="rowOne[index-1] && patternIsEdit" type="number" v-model.number="rowOne[index-1].height" @input="valueIsChange(index-1,'height')">
                                {{rowOne[index-1] && rowOne[index-1].height}}
                            </td>
                            <td :class="{'td-zindex':patternIsEdit && rowOne[index-1],active:index+'1' === activeIndex}">
                                <input v-if="rowOne[index-1] && patternIsEdit" type="number" v-model.number="rowOne[index-1].weight" @input="valueIsChange(index-1,'weight')">
                                {{rowOne[index-1] && rowOne[index-1].weight}}
                            </td>
                            <td :class="{'td-zindex':patternIsEdit && rowOne[index-1],active:index+'1' === activeIndex}">
                                <input v-if="rowOne[index-1] && patternIsEdit" type="number" v-model.number="rowOne[index-1].pbf" @input="valueIsChange(index-1,'pbf')">
                                {{rowOne[index-1] && rowOne[index-1].pbf}}
                            </td>
                            <td>{{rowOne[index-1] && rowOne[index-1].bmi}}</td>
                            <td>{{rowOne[index-1] && scoreOptions[rowOne[index-1].score]}}</td>


                            <td v-if="showRow(index-1,rowTwo)" :rowspan="combineRow(index-1,rowTwo)">{{rowTwo[index-1] && rowTwo[index-1].organization.name || '　'}}</td>
                            <td>{{rowTwo[index-1] && rowTwo[index-1].soldier.name || '　'}}</td>
                            <td :class="{'td-zindex':patternIsEdit && rowTwo[index-1],active:index+'1' === activeIndex}">
                                <input v-if="rowTwo[index-1] && patternIsEdit" type="number" v-model.number="rowTwo[index-1].height" @input="valueIsChange(index-1,'height')">
                                {{rowTwo[index-1] && rowTwo[index-1].height}}
                            </td>
                            <td :class="{'td-zindex':patternIsEdit && rowTwo[index-1],active:index+'1' === activeIndex}">
                                <input v-if="rowTwo[index-1] && patternIsEdit" type="number" v-model.number="rowTwo[index-1].weight" @input="valueIsChange(index-1,'weight')">
                                {{rowTwo[index-1] && rowTwo[index-1].weight}}
                            </td>
                            <td :class="{'td-zindex':patternIsEdit && rowTwo[index-1],active:index+'1' === activeIndex}">
                                <input v-if="rowTwo[index-1] && patternIsEdit" type="number" v-model.number="rowTwo[index-1].pbf" @input="valueIsChange(index-1,'pbf')">
                                {{rowTwo[index-1] && rowTwo[index-1].pbf}}
                            </td>
                            <td>{{rowTwo[index-1] && rowTwo[index-1].bmi}}</td>
                            <td>{{rowTwo[index-1] && scoreOptions[rowTwo[index-1].score]}}</td>

                        </tr>
                    </table>
                </div>
            </div>
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
                radioScore1:0,
                title:'',
                activeIndex:-1,
                soldierOptions:[],
                className:'PhysicalShape'
            }
        },
        computed:{
            rowCount(){
                return Math.max(Math.ceil(this.physicalShapes.length/2), 25)
            },
            scoreOptions(){
                let found = Object.values(ScoreCriteria2).find(item=>item.name === this.tableData.scoreCriteria);
                if (!found) found = ScoreCriteria2.Level2;
                return found.optionalScores
            },
            physicalShapes(){
                return this.tableData && this.tableData.physicalShapes || []
            },
            rowOne(){
                return this.physicalShapes.slice(0,this.rowCount);
            },
            rowTwo(){
                return this.physicalShapes.slice(this.rowCount);
            },
            parent(){
                const findTableData = (self) =>self.tableData === undefined ? findTableData(self.$parent) : self;
                return findTableData(this.$parent)
            }
        },
        methods:{
            async saveEdit(){
                const target = _.cloneDeep(this.tableData);
                const result = await this.$backendService.sportService.addOrUpdatePhysicalShapes(target);
                this.$message({showClose: true,message:'保存成功',type:'success'});
                this.parent.patternIsEdit = false;
                this.parent.tableData = result;
            },
            async cancelEdit(){
                this.parent.patternIsEdit = false;
                console.log(this.tableData.objectId)
                if(!this.tableData.objectId)return this.parent.tableData = {};
                this.parent.tableData = await this.$backendService.sportService.getPhysicalShapeDetails(this.tableData)
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
                await this.$backendService.sportService.removeSoldierForShape(this.tableData,objectId);
                this.closePopover()
            },
            closePopover(){
                this.popoverVisible = false;
                this.activeIndex = -1;
            },
            handleRadioChange(){
                this._personScore.isMakeup = this.radioScore < 2;
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
                if(!this.patternIsEdit)return;
                this.popoverVisible = true;
                const popover = this.$el.querySelector('#popover');
                const roleRadios = popover.querySelectorAll('[role=radio]');

                if(!personScore.isMakeup)roleRadios[personScore.score].click();
                else this.radioScore = personScore.score;
                this.radioScore1 = personScore.makeupScore;

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
            },


            async valueIsChange(index,fieldName){
                const {height,weight,pbf} = this.physicalShapes[index];
                if(fieldName === 'height' || fieldName === 'weight')this.physicalShapes[index].bmi = this.$backendService.sportService.calcBMI(height,weight)
                if(fieldName === 'pbf')this.physicalShapes[index].pbf = pbf > 100 ? 100 : pbf;
                let {soldier,bmi} = this.physicalShapes[index];
                this.physicalShapes[index].score = await this.$backendService.sportService.evaluateShapeScore(soldier,bmi,pbf);
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
</style>
