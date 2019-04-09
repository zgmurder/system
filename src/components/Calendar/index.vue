<template>
  <div class="calendar">
    <div class="calendar-header">
      <a class="prev-btn" @click="prevBtnClick"/>
      <div class="text">
        <a v-if="varType !== 'year'" @click="varType = 'year'">{{ new Date(year,month,1).getFullYear() }}年</a>
        <a v-if="varType === 'day'" @click="varType = 'month'">{{ new Date(year,month,1).getMonth()+1 }}月</a>
        <span v-if="varType === 'year'">{{ totalYear[0] }} ~ {{ totalYear[totalYear.length-1] }}</span>
      </div>
      <a class="next-btn" @click="nextBtnClick"/>
    </div>
    <div class="calendar-body">
      <ul v-show="varType === 'day'" :class="{'has-border':border}" class="body-day">
        <li v-for="text in weekTexts" :key="text" class="week-text"><span>{{ text }}</span></li>

        <li v-for="day in prevArr" :key="day+'a'" :class="{disabled:afterDisabled && handleAfterDisabled(day,-1)}" class="is-not-curr-day" @click="dayIsClick(day,-1)"><span>{{ day }}</span></li>

        <li v-for="day in currArr" :class="[{'is-current':isCurrent(day),'is-active':isActive(day),disabled:afterDisabled && handleAfterDisabled(day,0) },hasMark(day).className]" :key="day+'b'" @click="dayIsClick(day)"><span>{{ day }}</span></li>

        <li v-for="day in nextArr" :key="day+'c'" :class="{disabled:afterDisabled && handleAfterDisabled(day,1)}" class="is-not-curr-day" @click="dayIsClick(day,1)"><span>{{ day }}</span></li>
      </ul>
      <ul v-show="varType === 'month'" :class="{'has-border':border}" class="body-month">
        <li v-for="monthItem in totalMonth" :class="[{'is-current':isCurrent(monthItem),'is-active':monthItem - 1 === month,disabled:afterDisabled && handleAfterDisabled(monthItem)},hasMark(monthItem-1).className]" :key="monthItem" @click="monthIsClick(monthItem)"><span>{{ monthItem }}月</span></li>
      </ul>
      <ul v-show="varType === 'year'" :class="{'has-border':border}" class="body-year">
        <li v-for="yearItem in totalYear" :class="{'is-current':isCurrent(yearItem),'is-active':yearItem === year,disabled:afterDisabled && handleAfterDisabled(yearItem)}" :key="yearItem" @click="yearIsClick(yearItem)"><span>{{ yearItem }}年</span></li>
      </ul>
    </div>

  </div>
</template>

<script>
import { initializeArrayWithRange, isSameDate, dateToJSON } from './date'
const totalMonth = initializeArrayWithRange(12)
const totalQuarter = initializeArrayWithRange(4)
const WeekTexts = ['一', '二', '三', '四', '五', '六']
export default {
  components: {},
  model: {
    prop: 'active',
    event: 'change'
  },
  props: {
    fromSunday: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'day'
    },
    border: {
      type: Boolean,
      default: true
    },
    markDates: {
      type: Array,
      default: () => []
    },
    initDate: {
      type: Date,
      default: () => new Date()
    },
    afterDisabled: {
      type: Boolean,
      default: false
    },
    active: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    return {
      totalMonth,
      totalQuarter,
      year: this.initDate.getFullYear(),
      month: this.initDate.getMonth(),

      varType: this.type,
      gapYear: this.initDate.getFullYear()
      // isActiveDate: []
    }
  },
  computed: {
    currMonthTotalDay() {
      return new Date(this.year, this.month + 1, 0).getDate()
    },
    prevMonthTotalDay() {
      return new Date(this.year, this.month, 0).getDate()
    },
    currWeekNum() {
      const num = this.fromSunday ? 0 : 1
      this.$emit('MYchange', new Date(this.year, this.month + 1, 0))
      return new Date(this.year, this.month, 1).getDay() - num
    },
    prevMonthRemainDay() {
      return this.currWeekNum === -1 ? 6 : (this.currWeekNum || 7)
    },
    nextMonthRemainDay() {
      return 42 - this.prevMonthRemainDay - this.currMonthTotalDay
    },
    prevArr() {
      return initializeArrayWithRange(this.prevMonthTotalDay, this.prevMonthTotalDay - this.prevMonthRemainDay)
    },
    currArr() {
      return initializeArrayWithRange(this.currMonthTotalDay)
    },
    nextArr() {
      return initializeArrayWithRange(this.nextMonthRemainDay)
    },
    weekTexts() {
      const arr = [...WeekTexts]
      const index = this.fromSunday ? 0 : arr.length
      arr.splice(index, 0, '日')
      return arr
    },
    totalYear() {
      return initializeArrayWithRange(this.gapYear + 6, this.gapYear - 6)
    }
    // currMonthAndYear() {
    //   const date = new Date(this.year, this.month, 1)
    //   this.$emit('MYchange', date)
    //   return [this.year, this.month]
    // }

  },
  created() {},
  mounted() {},
  methods: {
    prevBtnClick() {
      if (this.varType === 'day') this.month--
      if (this.varType === 'month') this.year--
      if (this.varType === 'year') this.gapYear--
    },
    nextBtnClick() {
      if (this.varType === 'day') this.month++
      if (this.varType === 'month') this.year++
      if (this.varType === 'year') this.gapYear++
    },
    dayIsClick(day, month = 0) {
      this.month += month
      // this.isActiveDate = [this.year, this.month, day]
      // this.$emit('dayIsClick', new Date(this.year, this.month, day))
      this.$emit('change', new Date(this.year, this.month, day))
    },
    monthIsClick(month) {
      // 重置时间
      const date = new Date(this.year, this.month, 1)
      this.year = date.getFullYear()
      this.month = month - 1
      this.varType = this.type
      this.$emit('change', new Date(this.year, this.month + 1, 0))
    },
    yearIsClick(year) {
      // 重置时间
      this.gapYear = this.year = year
      this.varType = this.type
    },
    isCurrent(dayOrMonthOrYear) {
      const { year, month, day } = dateToJSON(this.initDate)
      if (this.varType === 'day') return this.year === year && this.month === month && dayOrMonthOrYear === day
      if (this.varType === 'month') return this.year === year && dayOrMonthOrYear === month + 1
      if (this.varType === 'year') return year === dayOrMonthOrYear
    },
    isActive(day) {
      return isSameDate(this.active, [this.year, this.month, day])
    },
    hasMark(pramsDay) {
    //   const arr = this.markDates.map(item => [item.getFullYear(), item.getMonth(), item.getDate()])
    //   return arr.some(item => isSameDate(item, [this.year, this.month, day]))
      const thisDate =
      this.varType === 'day' ? new Date(this.year, this.month, pramsDay)
        : this.varType === 'month' ? new Date(this.year, pramsDay + 1, 0) : new Date(pramsDay, 12, 0)

      // const thisDate = new Date(this.year, this.month, pramsDay)
      return this.markDates.reduce((prev, curr) => {
        if (curr instanceof Date) {
          const { year, month, day } = dateToJSON(curr)
          if (new Date(year, month, day) - thisDate === 0)prev.className = 'has-mark'
          return prev
        } else {
          const has = curr.dates.some(item => {
            const { year, month, day } = dateToJSON(item)
            return new Date(year, month, day) - thisDate === 0
          })
          has && (prev.className = curr.className)
          return prev
        }
      }, {})
    },
    activeDate(date) {
      // if (date instanceof Date) {
      //   const { year, month, day } = dateToJSON(date)
      //   this.year = year
      //   this.month = month
      //   this.isActiveDate = [this.year, this.month, day]
      // } else this.isActiveDate = []
    },
    handleAfterDisabled(dayOrMonthOrYear, isAddMonth) {
      const { year } = dateToJSON(this.initDate)
      if (this.varType === 'day') return this.initDate.getTime() < new Date(this.year, this.month + isAddMonth, dayOrMonthOrYear).getTime()
      if (this.varType === 'month') return this.initDate.getTime() < new Date(this.year, dayOrMonthOrYear - 1, 1).getTime()
      if (this.varType === 'year') return dayOrMonthOrYear > year
    }
  }
}
</script>
<style lang="scss" scoped>
.calendar {
    // width: 800px;
    width:320px;
    .calendar-header{
        display: flex;
        padding: 15px;
        justify-content: space-between;
        border: 1px solid #DCDFE6;
        border-bottom: none;
        a:hover{
            color: #409EFF;
            border-color: #409EFF;
        };
        &>.prev-btn{
            display: block;
            width: 12px;
            height: 12px;
            border-top: 2px solid #909399;
            border-left: 2px solid #909399;
            transform: rotate(-45deg);
        }
        &>.next-btn{
            display: block;
            width: 12px;
            height: 12px;
            border-top: 2px solid #909399;
            border-right: 2px solid #909399;
            transform: rotate(45deg);
        }
    }
    .calendar-body{
        .body-day,.body-month,.body-year{
            display: flex;
            list-style: none;
            flex-wrap: wrap;
            padding: 0;
            margin: 0;
            border: 1px solid #DCDFE6;
            li{
                text-align: center;
                padding-bottom:14%;
                box-sizing: border-box;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                span{
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
            li:not(.week-text):hover{
                background: rgba(79, 163, 247, 0.69);
                cursor: pointer;
                color: #fff;
            }
            li.is-not-curr-day{
                background: #F2F6FC;
                color: #DCDFE6;
                border-radius: none
            }
            li.is-current{
                // background: #E6A23C;
                color:#409EFF
            }
            li.has-mark{
                background: #F56C6C;
                color:#fff
            }
            li.is-active{
                background: #409EFF;
                color:#fff
            }
            li.disabled{

                background: #EBEEF5;
                color: #DCDFE6;
                pointer-events:none;
                &:hover{
                    background: #EBEEF5;
                    color: #DCDFE6;
                }
            }
        }
        .body-day,.body-month,.body-year{
            &.has-border{
                border-top:none;
                border-right:none;
                &>li{
                    border-top: 1px solid #DCDFE6;
                    border-right: 1px solid #DCDFE6;
                    border-radius: initial;
                }
            }
        }
        .body-day{
            li{
                width: (100% / 7);
                border-radius: 50%;
            }

        }
        .body-month,.body-year{
            & > li{
                width: (100% / 3);
            }
        }
    }
}
</style>
