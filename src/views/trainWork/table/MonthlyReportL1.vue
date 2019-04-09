<template>
  <div class="root-table">
    <div class="body">
      <!-- <div class="body-title">
        <div v-if="tableData" class="title-text">
          {{ tableData.targetOrg.name }}军事训练情况月统计表
          <div class="text-btns">
            <div>
              <el-button v-if="$route.path === '/TableVue'" type="danger" class="print-hidden" size="mini" plain @click="$window.print()" title="打印">打印</el-button>
              <el-button v-if="!patternIsEdit && $route.path !== '/TableVue'" type="primary" class="print-hidden" size="mini" plain @click="$units.showTable(tableData,'MonthlyReportL1')" title="新窗口打开">新窗口打开（打印）</el-button>
            </div>
            <slot name="handle"/>
          </div>
        </div>
      </div> -->
      <div class="table-content">
        <!-- <div class="content-describe">
          <span>单位：<b class="text-2">{{ tableData.targetOrg.displayName }}</b></span>
          <span>时间：<b class="text-2">{{ tableData.date|formatDate }}</b></span>
        </div> -->
        <div class="content-table">
          <table border="1" cellspacing="0" cellpadding="0" class="table-height">
            <tr>
              <th colspan="5">训练时间</th>
              <th colspan="5">训练质量</th>
            </tr>
            <tr>
              <td rowspan="2">区分</td>
              <td colspan="2">本月训练时间</td>
              <td colspan="2">累积训练时间</td>
              <td rowspan="2">优秀率（%）</td>
              <td rowspan="2">优良率（%）</td>
              <td rowspan="2" colspan="2">及格率（%）</td>
              <td rowspan="2">成绩评定</td>
            </tr>
            <tr>
              <td>昼</td>
              <td>夜</td>
              <td>昼</td>
              <td>夜</td>
            </tr>
            <tr v-for="(item,index) in tableData.timeStatStatic" :key="index">
              <td>{{ item.type|handlePersonProperty }}</td>
              <td>{{ item.totalHoursInDay }}</td>
              <td>{{ item.totalHoursAtNight }}</td>
              <td>{{ item.allTotalHoursInDay }}</td>
              <td>{{ item.allTotalHoursAtNight }}</td>

              <td v-if="index === 0" :rowspan="tableData.timeStatStatic.length" class="td-zindex">
                <input :value="tableData.qualityStat.excellentRate|handleZero" :readonly="!patternIsEdit" type="number" @input="handlerInput('qualityStat','excellentRate',$event)">
              </td>
              <td v-if="index === 0" :rowspan="tableData.timeStatStatic.length" class="td-zindex">
                <input :value="tableData.qualityStat.goodRate|handleZero" :readonly="!patternIsEdit" type="number" @input="handlerInput('qualityStat','goodRate',$event)">
              </td>
              <td v-if="index === 0" :rowspan="tableData.timeStatStatic.length" colspan="2" class="td-zindex">
                <input :value="tableData.qualityStat.passRate|handleZero" :readonly="!patternIsEdit" type="number" @input="handlerInput('qualityStat','passRate',$event)">
              </td>
              <td v-if="index === 0" :rowspan="tableData.timeStatStatic.length" class="td-zindex font-family">
                <el-select v-if="patternIsEdit" v-model="tableData.qualityStat.evaluatedScore" placeholder="请选择">
                  <el-option
                    v-for="(item,index) in Level4"
                    :key="index"
                    :label="item"
                    :value="index"/>
                </el-select>
                <span v-else>{{ tableData.qualityStat.evaluatedScore|handleScore }}</span>
                <!--<input :value="tableData.qualityStat.evaluatedScore|handleZero" @input="handlerInput('qualityStat','evaluatedScore',$event)" :readonly="!patternIsEdit">-->
              </td>
            </tr>
            <tr>
              <th colspan="5">教练员</th>
              <th colspan="5">训练场地</th>
            </tr>
            <tr>
              <td>干部数量</td>
              <td>班长数量</td>
              <td>其他<br>教练员数量</td>
              <td>"四会"<br>达标数量</td>
              <td>"四会"<br>达标率（%）</td>
              <td>已建场地名称</td>
              <td>未建场地名称</td>
              <td colspan="2">新建场地名称</td>
              <td>达标率（%）</td>
            </tr>
            <tr>
              <td class="td-zindex" height="50">
                <input :value="tableData.trainerStat.officerCount|handleZero" :readonly="!patternIsEdit" type="number" @input="handlerInput('trainerStat','officerCount',$event,true)">
              </td>
              <td class="td-zindex">
                <input :value="tableData.trainerStat.monitorCount|handleZero" :readonly="!patternIsEdit" type="number" @input="handlerInput('trainerStat','monitorCount',$event,true)">
              </td>
              <td class="td-zindex">
                <input :value="tableData.trainerStat.otherCount|handleZero" :readonly="!patternIsEdit" type="number" @input="handlerInput('trainerStat','otherCount',$event,true)">
              </td>
              <td class="td-zindex">
                <input :value="tableData.trainerStat.standardCount|handleZero" :readonly="!patternIsEdit" type="number" @input="handlerInput('trainerStat','standardCount',$event,true)">
              </td>
              <td class="td-zindex">
                <input :value="tableData.trainerStat.standardRate|handleZero" :readonly="!patternIsEdit" type="number" @input="handlerInput('trainerStat','standardRate',$event)">
              </td>
              <td class="td-zindex font-family">
                <input v-model="tableData.placeStat.created" :readonly="!patternIsEdit">
              </td>
              <td class="td-zindex font-family">
                <input v-model="tableData.placeStat.nonCreated" :readonly="!patternIsEdit">
              </td>
              <td colspan="2" class="td-zindex font-family">
                <input v-model="tableData.placeStat.newCreated" :readonly="!patternIsEdit">
              </td>
              <td class="td-zindex">
                <input :value="tableData.placeStat.passRate|handleZero" :readonly="!patternIsEdit" type="number" @input="handlerInput('placeStat','passRate',$event)">
              </td>
            </tr>
            <tr>
              <th colspan="5">摩托（飞行）小时</th>
              <th colspan="5">训练弹药</th>
            </tr>
            <tr>
              <td rowspan="2" colspan="3">区分</td>
              <td rowspan="2">本月人均完成量</td>
              <td rowspan="2">累积人均完成量</td>

              <td rowspan="2">弹药类型</td>
              <td colspan="2">本月消耗量</td>
              <td colspan="2">累积消耗量</td>
            </tr>
            <tr>
              <td>本级训练<br>（人均/总数）</td>
              <td>其他</td>
              <td>本级训练<br>（人均/总数）</td>
              <td>其他</td>
            </tr>
            <tr v-for="index in bulletStatLength" :key="index+'a'">
              <td colspan="3" class="font-family">{{ (tableData.motorStatStatic[index-1]||{}).type || '　' }}</td>
              <td class="font-family">{{ (tableData.motorStatStatic[index-1]||{}).count }}{{ (tableData.motorStatStatic[index-1]||{}).unitType }}</td>
              <td class="font-family">{{ (tableData.motorStatStatic[index-1]||{}).total }}{{ (tableData.motorStatStatic[index-1]||{}).unitType }}</td>

              <td class="font-family">{{ (tableData.bulletStatStatic[index-1]||{}).type }}</td>
              <td class="td-zindex" style="z-index: 0">
                <input :value="(tableData.bulletStatStatic[index-1]||{}).trainAverage" type="number" readonly style="border-right: 1px solid #000;width: 50%">
                <input :value="(tableData.bulletStatStatic[index-1]||{}).train" type="number" readonly style="width: 50%;left: 50%">
              </td>

              <td>{{ (tableData.bulletStatStatic[index-1]||{}).others }}</td>
              <td class="td-zindex" style="z-index: 0">
                <input :value="(tableData.bulletStatStatic[index-1]||{}).totalTrainAverage" type="number" readonly style="border-right: 1px solid #000;width: 50%">
                <input :value="(tableData.bulletStatStatic[index-1]||{}).totalTrain" type="number" readonly style="width: 50%;left: 50%">
              </td>
              <td>{{ (tableData.bulletStatStatic[index-1]||{}).totalOthers }}</td>
            </tr>
          </table>
        </div>
        <div class="content-describe">
          <span>填写人：<b class="text-1">{{ tableData.createdBy }}</b></span>
          <span style="padding-right: 50px">中队主官：<b class="text-1"/></span>
        </div>
      </div>

      <!-- <p v-else style="text-align: center;color: #999"><i class="el-icon-warning"/> 登记该月份的日登记表，将自动生成</p> -->

      <transition name="el-zoom-in-center">
        <div v-show="patternIsEdit" class="table-shade"/>
      </transition>
    </div>
  </div>
</template>

<script>
// import moment from 'moment'
// import courseUtils from 'src/lib/utils/courseUtils'
import { PersonProperty, ScoreCriteria2 } from '@/const/index'
export default{
  filters: {
    // formatDate(date) {
    //   return moment(date).format('YYYY年MM月')
    // },
    arrayToString(array) {
      return array.length ? array.join(' 、 ') : ''
    },
    handleZero(num) {
      return +num === 0 ? '' : +num
    },
    handleScore(Score) {
      return Score === 0 ? '' : ScoreCriteria2.Level4.optionalScores[Score]
    },
    handlePersonProperty(key) {
      return PersonProperty[key] ? PersonProperty[key] : key
    }
  },
  props: {
    tableData: {
      type: Object,
      default: () => {
        return null
      }
    },
    patternIsEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectPlace: []
    }
  },
  computed: {
    bulletStatLength() {
      return this.tableData.bulletStatStatic.length > 9 ? this.tableData.bulletStatStatic.length : 9
    },
    Level4() {
      return ScoreCriteria2.Level4.optionalScores
    }
  },
  created() {
    // this.triggerSelect('PlaceType').then(result => {
    // //   const list = result.list || []
    // //   this.selectPlace = list.map(item => ({ name: item.name, displayName: courseUtils.makeupCourseName(item) }))
    // })
  },
  methods: {
    // triggerSelect(className, selectes) {
    //   // if (_.isUndefined(this[selectes])) return;
    //   const query = new this.$Client.Query(this.$Client[className])
    //   return this.queryListAll(className, query).then(result => {
    //     if (!selectes) return result
    //     _.isFunction(selectes) ? selectes(result) : this[selectes] = result.list
    //   })
    // },
    // handlerInput(objName, key, e, isOk) {
    //   e.target.value = +e.target.value > 100 && !isOk ? 100 : +e.target.value
    //   this.tableData[objName][key] = +e.target.value
    // },
    // queryListAll(className, query) {
    //   return this.$backendService.queryListAll(className, query)
    // }
  }
}

</script>

<style scoped lang="scss">
    @import "./common.scss";
    .Report{
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative
    }
    @media print{
        .table-height{
            height: 700px!important;
        }
    }
    .table-height{
        min-height: 600px;
    }
    /*.text-over{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .line-heigt-normal{
        line-height: normal;
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
        line-height: 30px;

        td{
            position: relative;
        }
        td.width-1-8{
            width: 12.5%;
            padding: 10px;
            line-height: normal;
        }
        td.width-1-4{
            width: 25%;
            padding: 10px;
            line-height: normal;
        }
        td.padding-none{
            padding: 0!important;
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
                    padding: 10px;
                    padding-left: 0;
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
                justify-content: space-between;
                line-height: 36px;
            }
            .content-table{
                border:2px solid #000;
                .can-edit{
                    word-break: break-all;
                    word-wrap:break-word;
                    position: absolute;
                    box-sizing: border-box;
                    line-height: 36px;
                    overflow: hidden;
                    top: 0;
                    background: #fff;
                    z-index: 3;
                    height: 100%;
                    width: 100%;
                    input{
                        height: 100%;
                        width: 100%;
                        text-align: center;
                    }
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
    }*/
</style>
