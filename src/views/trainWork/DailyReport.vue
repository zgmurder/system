<template>
  <div class="wrapper">
    <el-tabs v-model="activeOrgId" type="card" @tab-click="activeOrgIdIsChange">
      <el-tab-pane :label="$store.getters.organization.name" :name="$store.getters.organization.objectId"/>
      <el-tab-pane v-for="org in orgOptions" :label="org.name" :key="org.objectId" :name="org.objectId"/>
    </el-tabs>
    <div class="wrapper-body">
      <div class="body-table">
        <el-tooltip v-if="$tools.isEmpty(tableData)" :content="isRepair?'补登记':'创建按本周第一天开始依次后推'" effect="dark" placement="bottom">
          <el-button :type="isRepair?'warning':'primary'" class="creat-btn" icon="el-icon-tickets" @click="initDailyReport">{{ isRepair?'补登记':'登记' }}</el-button>
        </el-tooltip>
        <DailyReport v-else :table-data="tableData" :pattern-is-edit="patternIsEdit" :content-options="contentOptions" :this-org="currOrg">
          <template slot-scope="{data}">
            <el-button-group v-if="patternIsEdit">
              <el-button type="primary" size="mini" plain @click="cancelDailyReport">取消</el-button>
              <el-button type="success" size="mini" @click="saveDailyReport(data)">保存</el-button>
            </el-button-group>
            <el-button-group v-else>
              <el-button :disabled="!isRepair" type="danger" size="mini" @click="deleteDailyReport">删除</el-button>
              <el-button v-show="!isRepair" :disabled="noHasTableNeedCreate" type="primary" size="mini" @click="initDailyReport">继续创建</el-button>
              <el-button type="success" size="mini" @click="patternIsEdit = true">编辑</el-button>
            </el-button-group>
          </template>
        </DailyReport>
      </div>
      <Calendar ref="Calendar" v-model="activeDate" :init-date="todayDate" :mark-dates="markArr" after-disabled @change="getDailyReport" @MYchange="getDailyReportMarks"/>
    </div>
  </div>
</template>

<script>
import Calendar from '@/components/Calendar'
import { queryListByOptions, getServerDate } from '@/api/baseApi'
import { isBeforeCurrWeekDay } from '@/api/tools'
import { initDailyReport, saveDailyReport, getDailyReport, getDailyReportMarks, deleteDailyReport, positionDate } from '@/api/dailyReport'
import DailyReport from './table/DailyReport'
import Cookies from 'js-cookie'
export default {
  components: { Calendar, DailyReport },
  data() {
    const orgId = Cookies.get('orgId')
    return {
      markArr: [],
      orgOptions: [],
      activeOrgId: orgId || this.$store.getters.organization.objectId,
      tableData: {},
      patternIsEdit: false,
      todayDate: getServerDate(),
      activeDate: null,
      noHasTableNeedCreate: false,
      contentOptions: []
    }
  },
  computed: {
    isRepair() {
      return isBeforeCurrWeekDay(this.todayDate, this.activeDate || this.todayDate)
    },
    currOrg() {
      return this.orgOptions.find(item => item.objectId === this.activeOrgId) || this.$store.getters.organization
    }
  },
  created() {
    const { orgCategory, displayName } = this.$store.getters.organization
    const options = {
      notEqualTo: { orgCategory },
      contains: { displayName }
    }
    queryListByOptions('Organization2', options).then(list => {
      this.orgOptions = list
    })
    this.positionDate()
  },
  methods: {
    getDailyReport(date) {
      getDailyReport(this.activeOrgId, date).then(res => {
        this.tableData = res
      })
    },
    initDailyReport() {
      const date = this.isRepair ? this.activeDate : undefined
      initDailyReport(this.currOrg, date).then(result => {
        if (result.errorText) return this.$message.warning(result.errorText)
        this.tableData = result
        this.activeDate = result.date
        this.patternIsEdit = true
      })
    },
    saveDailyReport(data) {
      saveDailyReport(data).then(res => {
        this.tableData = res
        this.patternIsEdit = false
        this.getDailyReportMarks(res.date)
      })
    },
    getDailyReportMarks(date) {
      getDailyReportMarks(this.activeOrgId, date).then(dateArr => {
        const obj = dateArr.reduce((prev, curr) => {
          const className = curr.isRepair ? 'is-repair' : 'is-record'
          prev[className] = [...(prev[className] || []), curr.date]
          return prev
        }, {})
        this.markArr = Object.keys(obj).map(key => ({ className: key, dates: obj[key] }))
      })
    },
    deleteDailyReport() {
      if (this.tableData.objectId) {
        deleteDailyReport(this.tableData).then(res => {
          if (res.errorText) return this.$message.warning(res.errorText)
          this.$message.success('删除成功')
          this.tableData = {}
          // this.$refs.Calendar.activeDate()
          this.getDailyReportMarks(this.activeDate)
          // this.activeDate = getServerDate()
        })
      } else this.tableData = {}
    },
    cancelDailyReport() {
      this.patternIsEdit = false
      if (this.tableData.objectId) this.tableData = { ...this.tableData }
      else {
        // this.activeDate = null
        this.tableData = {}
      }
    },
    activeOrgIdIsChange() {
      Cookies.set('orgId', this.activeOrgId)
      this.getDailyReportMarks(this.activeDate || this.todayDate)
      this.positionDate()
      this.getDailyReport(this.activeDate || this.todayDate)
    },
    positionDate() {
      positionDate(this.activeOrgId).then(date => {
        this.noHasTableNeedCreate = !date || date.getDay() === 6 || !date.getDay()
        if (this.noHasTableNeedCreate) {
          const num = (date.getDay() || 7) - 5
          if (num > 0) {
            this.activeDate = new Date(date.setDate(date.getDate() - num))
            this.getDailyReport(this.activeDate)
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  padding: 10px;
    /deep/ li{
      &.is-repair,&.is-record{
        background: rgb(65, 209, 245);
        color: #fff;
      }
      &.is-repair::before{
        content: '补';
        color: #F56C6C;
        font-size: 12px;
        transform: scale(0.80);
        position: absolute;
        top:2px;
        right: 2px;
      }
      &.is-record::before{
        content: '记';
        color:#E6A23C;
        font-size: 12px;
        transform: scale(0.80);
        position: absolute;
        top:2px;
        right: 2px;
      }
  }
  .wrapper-body{
    display: flex;
    justify-content: space-between;
    .body-table{
      border:1px solid  #DCDFE6;
      width: calc(100% - 330px);
      position: relative;
      .creat-btn{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%)
      }
    }
  }

}
</style>
