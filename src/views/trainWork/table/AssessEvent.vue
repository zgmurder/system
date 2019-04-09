<template>
  <div class="root-table">
    <div :class="{'bg-transition':!analysisTableIs}" class="body">
      <!-- <div v-if="ownTableData" class="body-title">
        <div class="title-text">
          单课目军事训练成绩登记表
          <div v-if="analysisTableIs" class="text-btns">
            <div>
              <el-button v-if="$route.path === '/TableVue'" type="danger" class="print-hidden" size="mini" plain title="打印" @click="$window.print()">打印</el-button>
              <el-button v-if="$route.path === '/TableVue'" type="danger" class="print-hidden" size="mini" plain title="导出" @click="handleExport('单课目军事训练成绩登记表', handleExportCallBack, ownTableData)">导出</el-button>
              <el-button v-if="!patternIsEdit && $route.path !== '/TableVue'" type="primary" class="print-hidden" size="mini" plain title="新窗口打开" @click="$units.showTable(ownTableData,'AssessEvent')">新窗口打开（打印）</el-button>
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
                    <p v-for="(soldier,index) in soldierOptions" :key="index" style="margin-bottom: 10px"><el-checkbox v-model="soldier.checked">{{ `${soldier.name}（${soldier.position}）` }}</el-checkbox></p>
                    <p v-if="!soldierOptions.length" style="color: #909399">无可选人员</p>
                    <el-button type="primary" size="mini" icon="el-icon-edit" style="width: 100%;position: absolute;bottom: 0;z-index: 1;left: 0" @click="addSoldier">确定添加</el-button>
                  </div>
                </el-popover>
                <el-button v-popover:popover type="warning" size="mini" icon="el-icon-edit" plain @click="fetchSoldierOptions">添加人员</el-button>
                <re-el-button type="danger" size="mini" icon="el-icon-tickets" @click="saveEdit">保存</re-el-button>
                <el-button type="primary" plain size="mini" icon="el-icon-tickets" @click="cancelEdit">取消</el-button>
              </span>
              <span v-show="!patternIsEdit">
                <el-button :disabled="!!ownTableData.state" type="success" size="mini" icon="el-icon-tickets" plain @click="parent.patternIsEdit = true" >编辑</el-button>
                <slot name="continueRegister"/>
              </span>
            </div>
          </div>
        </div>
      </div> -->
      <div class="table-title">
        <el-button type="primary" size="mini" plain>打印</el-button>
        <span>单课目军事训练成绩登记表</span>
        <div class="table-btns"><slot :data="ownTableData"/></div>
      </div>
      <div class="table-content">
        <!-- <div class="content-describe">
          <span class=" font-family">单位：<i style="text-decoration: underline">{{ ownTableData.organization.displayName }}</i></span>
          <span>时间：<i style="text-decoration: underline">{{ ownTableData.date | parseTime('{y}-{m}-{d}') }}</i></span>
        </div> -->
        <table border="1" cellspacing="0" cellpadding="0" style="line-height: 28px" class="print-portrait-height">
          <tr>
            <th colspan="2">考核课目（内容）</th>
            <th colspan="6">{{ ownTableData.testContent?`${ownTableData.course.name}（${ownTableData.testContent}）`:ownTableData.course.name }}</th>
          </tr>
          <tr>
            <th colspan="2">时间</th>
            <th colspan="2">{{ ownTableData.date }}</th>
            <th colspan="2">考核形式</th>
            <th colspan="2">{{ ownTableData.assessment.assessMethod }}</th>
          </tr>
          <tr>
            <th>单位</th>
            <th>姓名</th>
            <th>职务</th>
            <th>{{ patternIsEdit?'成绩/补考成绩':'成绩' }}</th>
            <th>单位</th>
            <th>姓名</th>
            <th>职务</th>
            <th>{{ patternIsEdit?'成绩/补考成绩':'成绩' }}</th>
          </tr>
          <tr v-for="index in rowCount" :key="index+'a'">
            <td v-if="showRow(index-1,rowOne)" :rowspan="combineRow(index-1,rowOne)">{{ handleOrgName( rowOne[index-1]) }}</td>
            <td>{{ rowOne[index-1] && rowOne[index-1].soldier.name || '　' }}</td>
            <td>{{ rowOne[index-1] && rowOne[index-1].soldier.position || '　' }}</td>
            <td :class="{'td-zindex':patternIsEdit && rowOne[index-1],active:index+'a' === activeIndex}" direction="left" style="position: relative" @mouseleave="handleMouseLeave" @mouseenter="handleMouseenter($event,rowOne[index-1],index+'a')"><!-- @mouseleave="handleMouseLeaveTable"-->
              <span v-if="rowOne[index-1]">
                <i v-if="patternIsEdit" class="el-icon-delete" style="position: absolute;right: 3px;top: 8px" @click="removeSoldier(rowOne[index-1].soldier.objectId)"/>
                <span v-if="rowOne[index-1].score < 2" :text="`（${rowOne[index-1].score?'补考':rowOne[index-1].untestedReason||''}）`" class="isRepair" >
                  {{ rowOne[index-1].score?scoreOptions[rowOne[index-1].makeupScore]:scoreOptions[rowOne[index-1].score] }}
                </span>
                <span v-else>{{ rowOne[index-1] && scoreOptions[rowOne[index-1].score] || '　' }}</span>
              </span>
            </td>

            <td v-if="showRow(index-1,rowTwo)" :rowspan="combineRow(index-1,rowTwo)">{{ rowTwo[index-1] && rowTwo[index-1].organization.name || '　' }}</td>
            <td>{{ rowTwo[index-1] && rowTwo[index-1].soldier.name || '　' }}</td>
            <td>{{ rowTwo[index-1] && rowTwo[index-1].soldier.position || '　' }}</td>
            <td :class="{'td-zindex':patternIsEdit && rowTwo[index-1],active:index+'b' === activeIndex}" direction="right" style="position: relative" @mouseleave="handleMouseLeave" @mouseenter="handleMouseenter($event,rowTwo[index-1],index+'b')"><!-- @mouseleave="handleMouseLeaveTable"-->
              <span v-if="rowTwo[index-1]">
                <i v-if="patternIsEdit" class="el-icon-delete" style="position: absolute;right: 3px;top: 8px" @click="removeSoldier(rowTwo[index-1].soldier.objectId)"/>
                <span v-if="rowTwo[index-1].score < 2" :text="`（${rowTwo[index-1].score?'补考':rowTwo[index-1].untestedReason||''}）`" class="isRepair" >
                  {{ rowTwo[index-1].score?scoreOptions[rowTwo[index-1].makeupScore]:scoreOptions[rowTwo[index-1].score] }}
                </span>
                <span v-else>{{ rowTwo[index-1] && scoreOptions[rowTwo[index-1].score] || '　' }}</span>
              </span>
            </td>
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
            <td>{{ fourStage && (ownTableData.excellentCount+'')||'' }}</td>
            <td>{{ fourStage && (ownTableData.goodCount+'')||'' }}</td>
            <td>{{ fourStage && (ownTableData.passCount+'')||'' }}</td>
            <td>{{ fourStage && (ownTableData.unpassCount+'')||'' }}</td>

            <td colspan="2">{{ !fourStage && (ownTableData.passCount+'')||'' }}</td>
            <td>{{ !fourStage && (ownTableData.unpassCount+'')||'' }}</td>
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
            <td>{{ fourStage && (ownTableData.excellentRate + '%')||'' }}</td>
            <td>{{ fourStage && (ownTableData.goodRate + '%')||'' }}</td>
            <td>{{ fourStage && (ownTableData.passRate + '%')||'' }}</td>
            <td>{{ fourStage && scoreOptions[ownTableData.score]||'' }}</td>

            <td colspan="2">{{ !fourStage && (ownTableData.passRate+'%')||'' }}</td>
            <td>{{ !fourStage && scoreOptions[ownTableData.score]||'' }}</td>
          </tr>
        </table>
        <div v-if="ownTableData" class="content-describe">
          <span>审核人：<b class="text-1"/></span>
          <span>填写人：<b class="text-1"/></span>
          <span>{{ ownTableData.date }}</span>
        </div>
      </div>

      <!-- <HandleRecord v-if="ownTableData" :object-id="ownTableData.objectId"/> -->
      <div v-show="popoverVisible" id="popover" class="el-popover el-popper" @mouseleave="handleMouseLeave" @mouseenter="mouseenterPopover">
        <p style="margin-bottom: 6px">{{ title }}</p>
        <el-radio-group ref="elRadioGroup" v-model="radioScore" size="mini" @change="handleRadioChange">
          <el-radio-button v-for="(score,index) in scoreOptions" :label="index" :key="index">{{ score }}</el-radio-button>
        </el-radio-group>
        <h4 v-if="radioScore < 2" style="margin: 10px 0;border-bottom: 1px solid #DCDFE6;text-align: center">{{ radioScore?'补考':'缺考事由' }}</h4>
        <el-radio-group v-if="radioScore === 1" v-model="radioScore1" size="mini" @change="handleRadioChange($event,true)">
          <el-radio-button v-for="(score,index) in scoreOptions" v-if="index>0" :label="index" :key="index">{{ score }}</el-radio-button>
        </el-radio-group>
        <el-input v-if="radioScore === 0" :maxlength="4" v-model="untestedReason" style="width: 100%" size="mini" @input="handleInputChange"/>
      </div>

      <transition name="el-zoom-in-center">
        <div v-show="patternIsEdit" class="table-shade"/>
      </transition>
    </div>
  </div>
</template>

<script>
// import { handleExportCallBack } from '@/lib/exportTable/AssessEvent'
// import { handleExport } from '@/lib/excel/index'
import { ScoreCriteria2, Letters } from '@/lib/Constants'
import { evaluateAssessEventScore } from '@/api/scoreRegister'
// import HandleRecord from 'src/pages/common/HandleRecord'
export default{
  name: 'AssessEvent',
  components: {
    // HandleRecord
  },
  props: {
    tableData: {
      type: Object,
      default: () => {}
    },
    patternIsEdit: {
      type: Boolean,
      default: false
    },
    analysisTableIs: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      popoverVisible: false,
      popoverWidth: '330',
      radioScore: 2,
      radioScore1: 2,
      untestedReason: '',
      title: '',
      activeIndex: -1,
      soldierOptions: [],
      ownTableData: this.$tools.cloneDeep(this.tableData)
    }
  },
  computed: {
    rowCount() {
      return Math.max(Math.ceil(this.personScores.length / 2), 25)
    },
    scoreOptions() {
      const found = Object.values(ScoreCriteria2).find(item => item.name === this.ownTableData.scoreSriteria)
      return found.optionalScores
    },
    personScores() {
      return this.ownTableData && this.ownTableData.personScores || []
    },
    rowOne() {
      return this.personScores.slice(0, this.rowCount)
    },
    rowTwo() {
      return this.personScores.slice(this.rowCount)
    },
    fourStage() {
      return this.ownTableData.scoreSriteria === '四级制'
    },
    parent() {
      const findTableData = (self) => self.ownTableData === undefined ? findTableData(self.$parent) : self
      return findTableData(this.$parent)
    }
  },
  watch: {
    'tableData': {
      handler(newValue) {
        this.ownTableData = this.$tools.cloneDeep(this.tableData)
      }
    }
  },
  created() {
    this.changeScore()
  },
  methods: {
    // handleExport,
    // handleExportCallBack,
    async saveEdit() {
      const target = _.cloneDeep(this.ownTableData)
      const result = await this.$backendService.assessService.addOrUpdateAssessEvent(target)
      this.$message({ showClose: true, message: '保存成功', type: 'success' })
      this.parent.patternIsEdit = false
      this.parent.ownTableData = result
      this.parent.fetchTableList(...(this.parent._pageObj || []))
    },
    async cancelEdit() {
      this.parent.patternIsEdit = false
      if (!this.ownTableData.objectId) {
        this.parent.tableData = {}
        return
      }
      this.parent.ownTableData = await this.$backendService.assessEventService.getAssessEventDetails(this.ownTableData.objectId)
    },
    async fetchSoldierOptions() {
      this.soldierOptions = await this.$backendService.assessService.getSoldierOptions(this.ownTableData)
      this.soldierOptions.forEach(item => this.$set(item, 'checked', false))
    },
    addSoldier() {
      const soldiers = this.soldierOptions.filter(item => item.checked)
      soldiers.forEach(async soldier => {
        this.$backendService.assessService.addSoldier(this.ownTableData, soldier)
      })
      this.fetchSoldierOptions()
    },
    async removeSoldier(objectId) {
      await this.$backendService.assessService.removeSoldier(this.ownTableData, objectId)
      this.closePopover()
    },
    closePopover() {
      this.popoverVisible = false
      this.activeIndex = -1
    },
    handleInputChange() {
      this._personScore.untestedReason = this.untestedReason
    },
    handleRadioChange() {
      this._personScore.isMakeup = this.radioScore === 1
      this._personScore.makeupScore = this.radioScore1
      this._personScore.score = this.radioScore
      this.changeScore()
    },
    mouseenterPopover() {
      clearTimeout(this._timer)
    },
    handleMouseLeave() {
      this._timer = setTimeout(() => {
        this.closePopover()
      }, 500)
    },
    handleMouseenter(e, personScore, index) {
      clearTimeout(this._timer)
      if (!this.patternIsEdit || !personScore) return
      this.popoverVisible = true
      const popover = this.$el.querySelector('#popover')
      const roleRadios = popover.querySelectorAll('[role=radio]')

      if (!personScore.isMakeup)roleRadios[personScore.score].click()
      else this.radioScore = personScore.score
      this.radioScore1 = personScore.makeupScore || 1
      this.untestedReason = personScore.untestedReason || ''

      this.title = `${personScore.soldier.name}（${personScore.soldier.position}）的成绩`
      this.activeIndex = index
      this._personScore = personScore

      // const el = this.$refs.popover.$el;
      const isLeft = e.target.getAttribute('direction') === 'left'
      const left = isLeft ? (e.target.offsetLeft + e.target.offsetWidth + 10) : (e.target.offsetLeft - this.popoverWidth - 10)

      const styleObj = {
        position: 'absolute',
        left: left + 'px',
        top: e.target.offsetTop + 'px',
        zIndex: 1024
      }
      Object.assign(popover.style, styleObj)
    },
    combineRow(index, row) {
      if (!row[index]) return 1
      const orgName = row[index].organization.objectId
      const calculate = (orgName, index, num = 1) => {
        const is = row[index + 1] && row[index + 1].organization.objectId === orgName
        return is ? calculate(orgName, index + 1, num + 1) : num
      }
      const endLength = index + calculate(orgName, index)
      return endLength > this.rowCount ? endLength - this.rowCount + 2 : calculate(orgName, index)
    },
    showRow(index, row) {
      if (!row[index]) return true
      const personArr = [row[index], row[index - 1]]
      const orgArr = personArr.map(item => item && item.organization.objectId)
      return orgArr[0] !== orgArr[1]
    },
    changeScore() {
      evaluateAssessEventScore(this.ownTableData)
    },
    handleOrgName(row) {
      if (!row) return '　'
      else {
        const displayName = this.$store.getters.organization.displayName
        const spliceName = row.orgDisplayName.split(displayName)[1]
        return row.orgDisplayName === this.$store.getters.organization.displayName
          ? row.organization.name : spliceName
      }
    }
  }
}

</script>
<style scoped lang="scss">
    @import "./common.scss";

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
