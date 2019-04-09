<template>
  <div class="root-table">

    <div class="table-title">
      <el-button type="primary" size="mini" plain>打印</el-button>
      <span>{{ ownTableData.organization.name }}军事训练情况日登记表</span>
      <div class="table-btns"><slot :data="ownTableData"/></div>
    </div>

    <div class="table-content">
      <!--<div style="text-align: center;font-family: FZXBSJW!important;font-size: 24px!important;" class="font-family">
                    {{!isCheckDailyReport && `${ownTableData.targetOrg.name}军事训练情况日登记表` || '军事训练情况日登记表'}}
                </div>-->
      <div class="content-describe">
        <span class=" font-family">单位：<i style="text-decoration: underline">{{ ownTableData.organization.displayName }}</i></span>
        <span>时间：<i style="text-decoration: underline">{{ ownTableData.date | parseTime('{y}-{m}-{d}') }}</i></span>
      </div>
      <table border="1" cellspacing="0" cellpadding="0" class="table-height">
        <tr>
          <th colspan="5">训练人员</th>
          <th colspan="5">训练时间</th>
        </tr>
        <tr>
          <td rowspan="2">实力数</td>
          <td rowspan="2">参训人数</td>
          <td rowspan="2">参训率</td>
          <td rowspan="2" colspan="2" class="text-over">未参加人员及原因</td>
          <td rowspan="2">区分</td>
          <td colspan="2">当日训练时间</td>
          <td colspan="2">累积训练时间</td>
        </tr>
        <tr>
          <td>昼</td>
          <td>夜</td>
          <td>昼</td>
          <td>夜</td>
        </tr>
        <tr>
          <td :rowspan="ownTableData.timeStat.length" class="td-zindex" height="60">
            <input :readonly="!patternIsEdit" :value="ownTableData.personStat.total||0" type="number" @input="totalIsChange">
          </td>
          <td :rowspan="ownTableData.timeStat.length" class="td-zindex">
            <input :readonly="!patternIsEdit" :value="ownTableData.personStat.present||0" type="number" @input="presentIsChange">
          </td>
          <td :rowspan="ownTableData.timeStat.length">{{ `${ownTableData.personStat.presentRate||0}%` }}</td>
          <td :rowspan="ownTableData.timeStat.length" colspan="2" class="td-zindex">
            <textarea v-if="patternIsEdit" v-model="ownTableData.personStat.notes"/>
            <span v-else>{{ ownTableData.personStat.notes }}</span>
          </td>
          <td>{{ (ownTableData.timeStat[0]||{}).type }}</td>
          <td class="td-zindex">
            <input :readonly="!patternIsEdit" v-model.number="(ownTableData.timeStat[0]||{}).hoursInDay" type="number" @input="hoursInDayIsChange(0,$event)">
          </td>
          <td class="td-zindex">
            <input :readonly="!patternIsEdit" v-model.number="(ownTableData.timeStat[0]||{}).hoursAtNight" type="text" @input="hoursAtNightIsChange(0,$event)">
          </td>
          <td>{{ (ownTableData.timeStat[0]||{}).totalHoursInDay }}</td>
          <td>{{ (ownTableData.timeStat[0]||{}).totalHoursAtNight }}</td>
        </tr>
        <tr v-for="(item,index) in (ownTableData.timeStat||[])" v-show="index>0 && ownTableData.timeStat.length !== 1" :key="index">
          <td>{{ item.type }}</td>
          <td class="td-zindex">
            <input :readonly="!patternIsEdit" v-model.number="item.hoursInDay" type="number" @input="hoursInDayIsChange(index,$event)">
          </td>
          <td class="td-zindex">
            <input :readonly="!patternIsEdit" v-model.number="item.hoursAtNight" type="number" @input="hoursAtNightIsChange(index,$event)">
          </td>
          <td>{{ item.totalHoursInDay }}</td>
          <td>{{ item.totalHoursAtNight }}</td>
        </tr>
        <tr>
          <th colspan="5">训练内容</th>
          <th colspan="5">训练弹药</th>
        </tr>

        <tr v-for="(value,key,index) in ownTableData.contentStat" :key="key">
          <td>{{ DailySection[key.substring(0,1).toUpperCase()+key.substring(1)] }}</td>
          <td colspan="4" class="td-zindex">
            <!-- <el-autocomplete
              v-if="patternIsEdit"
              :value="ownTableData.contentStat[key]|arrayToString"
              :fetch-suggestions="querySearch"
              size="mini"
              class="autocomplete"
              placeholder="请输入内容"
              @select="handleSelect($event,ownTableData.contentStat,key)"
              @input="e=>ownTableData.contentStat[key] = e"
            /> -->
            <el-select v-if="patternIsEdit" v-model="ownTableData.contentStat[key]" collapse-tags class="autocomplete" size="mini" multiple filterable allow-create placeholder="请选择" @visible-change="visibleChange($event,key === 'Sport'?'sportOptions':'trainOptions')">
              <el-option
                v-for="(item,index) in contentOptions[key === 'Sport'?'sportOptions':'trainOptions']"
                :key="index"
                :label="makeupCourseName(item)"
                :value="item.name"/>
            </el-select>
            <span v-else class="font-family">{{ ownTableData.contentStat[key]|arrayToString }}</span>
          </td>
          <td v-if="index === 0" rowspan="2">弹药类型</td>
          <td v-if="index === 0" colspan="2">当日消耗量</td>
          <td v-if="index === 0" colspan="2">累计消耗量</td>
          <td v-if="index === 1">本级训练<br>（人均/总数）</td>
          <td v-if="index === 1">其他</td>
          <td v-if="index === 1">本级训练<br>（人均/总数）</td>
          <td v-if="index === 1">其他</td>
          <td v-if="index > 1" class="font-family">{{ (ownTableData.bulletStat[index-2]||{}).type }}</td>
          <td v-if="index > 1" :style="{'z-index': ownTableData.bulletStat[index-2] ? 4 : 0}" class="td-zindex">
            <input :value="(ownTableData.bulletStat[index-2]||{}).trainAverage" :readonly="!patternIsEdit" type="number" style="border-right: 1px solid #000;width: 50%" @input="trainAverageIsChange(index-2,$event)">
            <input :value="(ownTableData.bulletStat[index-2]||{}).train" :readonly="!patternIsEdit" type="number" style="width: 50%;left: 50%" @input="trainIsChange(index-2,$event)">
          </td>
          <td v-if="index > 1" :style="{'z-index': ownTableData.bulletStat[index-2] ? 4 : 0}" class="td-zindex">
            <input v-model.number="(ownTableData.bulletStat[index-2]||{}).others" :readonly="!patternIsEdit" type="number" @input="othersIsChange(index-2,$event)">
          </td>
          <td v-if="index > 1" class="td-zindex" style="z-index: 0">
            <input :value="(ownTableData.bulletStat[index-2]||{}).totalTrainAverage" :readonly="!patternIsEdit" type="number" style="border-right: 1px solid #000;width: 50%">
            <input :value="(ownTableData.bulletStat[index-2]||{}).totalTrain" :readonly="!patternIsEdit" type="number" style="width: 50%;left: 50%">
          </td>
          <td v-if="index > 1">{{ (ownTableData.bulletStat[index-2]||{}).totalOthers }}</td>
        </tr>
        <tr v-for="index in bulletStatLength" :key="index+'a'">
          <th v-if="index === 1" colspan="5">摩托（飞行）小时</th>
          <td v-if="index === 2" colspan="3">区分</td>
          <td v-if="index === 2">当日完成量</td>
          <td v-if="index === 2">累计完成量</td>
          <td v-if="index > 2" colspan="3" class="font-family">{{ (ownTableData.motorStat[index-3]||{}).type }}</td>
          <td v-if="index > 2" :style="{'z-index': ownTableData.motorStat[index-3] ? 4 : 0}" class="td-zindex font-family">
            <input v-if="patternIsEdit" v-model.number="(ownTableData.motorStat[index-3]||{}).count" :readonly="!patternIsEdit" type="number" @input="motorStatIsChange(index-3,$event)">
            <span v-else>{{ (ownTableData.motorStat[index-3]||{}).count }}{{ (ownTableData.motorStat[index-3]||{}).unitType }}</span>
          </td>
          <td v-if="index > 2" class="font-family">{{ (ownTableData.motorStat[index-3]||{}).total||`&#12288` }}{{ (ownTableData.motorStat[index-3]||{}).unitType }}</td>

          <td class="font-family">{{ (ownTableData.bulletStat[index+2]||{}).type }}</td>
          <td :style="{'z-index': ownTableData.bulletStat[index+2] ? 4 : 0}" class="td-zindex">
            <input :value="(ownTableData.bulletStat[index+2]||{}).trainAverage" :readonly="!patternIsEdit" type="number" style="border-right: 1px solid #000;width: 50%" @input="trainAverageIsChange(index+2,$event)">
            <input :value="(ownTableData.bulletStat[index+2]||{}).train" :readonly="!patternIsEdit" type="number" style="width: 50%;left: 50%" @input="trainIsChange(index+2,$event)">
          </td>
          <td :style="{'z-index': ownTableData.bulletStat[index+2] ? 4 : 0}" class="td-zindex">
            <input v-model.number="(ownTableData.bulletStat[index+2]||{}).others" :readonly="!patternIsEdit" type="number" @input="othersIsChange(index+2,$event)">
          </td>
          <td class="td-zindex" style="z-index: 0">
            <input :value="(ownTableData.bulletStat[index+2]||{}).totalTrainAverage" :readonly="!patternIsEdit" type="number" style="border-right: 1px solid #000;width: 50%">
            <input :value="(ownTableData.bulletStat[index+2]||{}).totalTrain" :readonly="!patternIsEdit" type="number" style="width: 50%;left: 50%">
          </td>
          <td>{{ (ownTableData.bulletStat[index+2]||{}).totalOthers }}</td>
        </tr>
      </table>

      <!--<ul class="content-explain">
                    &lt;!&ndash;<li>1.此表由中队级单位每日填写留存备查，并报大队，由大队每周五统一上报支队；不设大队的中队每周五自行上报支队。新兵训练照此执行。</li>&ndash;&gt;
                    <li>1.训练人员。“未参训人员说明”栏简要填写数量及原因。</li>
                    <li>2.训练内容。仅填写军事训练内容，政治教育、党（团）活动等其他工作不填写。</li>
                    <li>3.训练时间。昼间训练时间不含早操和体能训练时间；夜间训练时间是指落实《大纲》规定的夜训课目时间，不含夜间组织的体能等非夜训课目时间。干部训练时间不含随队训练时间。</li>
                    <li>4.训练弹药。本级训练填写实弹射击训练“人均弹药消耗数/弹药消耗总数”，其它填写参加上级抽考、比武集训和组织实兵演习演练消耗的弹药总数。</li>
                    <li>5.摩托（飞行）小时。填写所属驾驶员人均完成小时数或公里数。</li>
                </ul>-->
    </div>
    <div class="table-footer">
      <div>填写人：</div>
      <div>{{ !isCheckDailyReport && '中队主官：' || '主官：' }}<span style="color: #fff"/></div>
    </div>

    <transition name="el-zoom-in-center">
      <div v-show="patternIsEdit" class="table-shade"/>
    </transition>
  </div>
</template>

<script>
import { DailySection } from '@/const/index'
import { getCourse, makeupCourseName } from '@/api/baseApi'
export default{
  filters: {
    arrayToString(arr) {
      if (Array.isArray(arr)) return arr.join(' 、 ')
      else return arr
    }
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

    isCheckDailyReport: {
      type: Boolean,
      default: false
    },
    thisOrg: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      DailySection,
      ownTableData: this.$tools.cloneDeep(this.tableData),
      contentOptions: {
        sportOptions: [],
        trainOptions: []
      }
    }
  },
  computed: {
    bulletStatLength() {
      return this.ownTableData.bulletStat.length > 12 ? this.ownTableData.bulletStat.length - 3 : 10
    }
  },
  watch: {
    'tableData': {
      handler(newValue) {
        this.ownTableData = this.$tools.cloneDeep(this.tableData)
      }
    }
  },

  methods: {
    makeupCourseName,
    visibleChange(value, key) {
      if (value && !this.contentOptions[key].length) {
        const parames = key === 'sportOptions' ? undefined : this.thisOrg
        getCourse(parames).then(list => {
          this.contentOptions[key] = list
        })
      }
    },
    handleItem(name, index, ...args) {
      const value = this.ownTableData[name][index - 1] && args.reduce((prev, cur) => {
        return prev[cur]
      }, this.ownTableData[name][index - 1])
      return value || (value === 0 ? value : '　')
    },
    trainAverageIsChange(index, e) {
      const bulletStat = this.tableData.bulletStat
      const obj = this.ownTableData.bulletStat[index]
      obj.trainAverage = +e.target.value
      obj.totalTrainAverage = +e.target.value + bulletStat[index].totalTrainAverage - bulletStat[index].trainAverage
    },
    trainIsChange(index, e) {
      const bulletStat = this.tableData.bulletStat
      const obj = this.ownTableData.bulletStat[index]
      obj.train = +e.target.value
      obj.totalTrain = +e.target.value + bulletStat[index].totalTrain - bulletStat[index].train
    },
    motorStatIsChange(index, e) {
      const motorStat = this.tableData.motorStat
      const obj = this.ownTableData.motorStat[index]
      obj.total = +e.target.value + motorStat[index].total - motorStat[index].count
    },
    othersIsChange(index, e) {
      const bulletStat = this.tableData.bulletStat
      const obj = this.ownTableData.bulletStat[index]
      obj.totalOthers = +e.target.value + bulletStat[index].totalOthers - bulletStat[index].others
    },
    hoursInDayIsChange(index, e) {
      const timeStat = this.tableData.timeStat
      const obj = this.ownTableData.timeStat[index]
      obj.totalHoursInDay = +e.target.value + timeStat[index].totalHoursInDay - timeStat[index].hoursInDay
    },
    hoursAtNightIsChange(index, e) {
      const timeStat = this.tableData.timeStat
      const obj = this.ownTableData.timeStat[index]
      obj.totalHoursAtNight = +e.target.value + timeStat[index].totalHoursAtNight - timeStat[index].hoursAtNight
    },
    totalIsChange(e) {
      const target = e.target
      this.ownTableData.personStat.total = target.value
      this.ownTableData.personStat.presentRate = +(this.ownTableData.personStat.present * 100 / this.ownTableData.personStat.total).toFixed(1)
    },
    presentIsChange(e) {
      const target = e.target
      this.ownTableData.personStat.present = target.value
      if (+target.value > this.ownTableData.personStat.total) {
        this.ownTableData.personStat.present = this.ownTableData.personStat.total
      }
      this.ownTableData.personStat.presentRate = +(this.ownTableData.personStat.present * 100 / this.ownTableData.personStat.total).toFixed(1)
    },
    print() {
      window.print()
    }
  }
}

</script>

<style scoped lang="scss">
    @import "./common.scss";
    .autocomplete{
        position: absolute;
        width: 100%;
        left: 0;
        height: 100%;
        top: 50%;
        transform: translateY(-50%);
      /deep/ .el-input--mini{
        position: absolute;
         height: inherit;
      }
      /deep/ .el-input--mini .el-input__inner{
        border: none;
        height: 27px;
      }
    }
</style>
