<template>
  <div class="calendar">
    <div class="calendar-header">
        <a class="prev-btn" @click="prevBtnClick"></a>
        <div class="text">
            <a v-if="varType !== 'year'" @click="varType = 'year'">{{new Date(year,month,1).getFullYear()}}年</a>
            <a v-if="varType === 'day'" @click="varType = 'month'">{{new Date(year,month,1).getMonth()+1}}月</a>
            <span v-if="varType === 'year'">{{totalYear[0]}} ~ {{totalYear[totalYear.length-1]}}</span>
        </div>
        <a class="next-btn" @click="nextBtnClick"></a>
    </div>
    <div class="calendar-body">
        <ul class="body-day" :class="{'has-border':border}" v-show="varType === 'day'">
            <li class="week-text" v-for="text in weekTexts" :key="text"><span>{{text}}</span></li>

            <li @click="dayIsClick(day,-1)" class="disabled" v-for="day in prevArr" :key="day+'a'"><span>{{day}}</span></li>

            <li @click="dayIsClick(day)" :class="{'is-current':isCurrent(day),'is-active':isActive(day),'has-mark':hasMark(day)}" v-for="day in currArr" :key="day+'b'"><span>{{day}}</span></li>

            <li class="disabled" @click="dayIsClick(day,1)" v-for="day in nextArr" :key="day+'c'"><span>{{day}}</span></li>
        </ul>
        <ul class="body-month"  v-show="varType === 'month'">
            <li @click="monthIsClick(monthItem)" :class="{'is-current':isCurrent(monthItem),'is-active':monthItem - 1 === month,'has-border':border}" v-for="monthItem in totalMonth" :key="monthItem"><span>{{monthItem}}月</span></li>
        </ul>
        <ul class="body-year"  v-show="varType === 'year'">
            <li @click="yearIsClick(yearItem)"  :class="{'is-current':isCurrent(yearItem),'is-active':yearItem === year,'has-border':border}"  v-for="yearItem in totalYear" :key="yearItem"><span>{{yearItem}}年</span></li>
        </ul>
    </div>
    
  </div>
</template>

<script>
import {initializeArrayWithRange,isSameDate} from './date'
const totalMonth = initializeArrayWithRange(12)
const totalQuarter = initializeArrayWithRange(4)
const WeekTexts = ["一", "二", "三", "四", "五", "六"]
const currDate = new Date()
const currYear = currDate.getFullYear()
const currMonth = currDate.getMonth()
const currDay = currDate.getDate()
export default {
  components: {},
  props: {
      fromSunday:{
          type:Boolean,
          default:false
      },
      type:{
          type:String,
          default:'day',
      },
      border:{
          type:Boolean,
          default:true
      },
      markDates:{
          type:Array,
          default:()=>[]
      }
  },
  data() {
    return {
       totalMonth,
       totalQuarter,
       year:currYear,
       month:currMonth,

       varType:this.type,
       gapYear:currYear,
       isActiveDate:[],
    };
  },
  watch: {},
  computed: {
      currMonthTotalDay(){
        return new Date(this.year,this.month+1,0).getDate()
      }, 
      prevMonthTotalDay(){
        return new Date(this.year,this.month,0).getDate()
      }, 
      currWeekNum(){
        const num = this.fromSunday ? 0 : 1
        return new Date(this.year,this.month,1).getDay()-num
      },
      prevMonthRemainDay(){
          return this.currWeekNum === -1 ? 6 : (this.currWeekNum || 7)
      },
      nextMonthRemainDay(){
          return  42-this.prevMonthRemainDay-this.currMonthTotalDay
      },
      prevArr(){
          return  initializeArrayWithRange(this.prevMonthTotalDay,this.prevMonthTotalDay-this.prevMonthRemainDay)
      },
      currArr(){
          return  initializeArrayWithRange(this.currMonthTotalDay)
      },
      nextArr(){
          return  initializeArrayWithRange(this.nextMonthRemainDay)
      },
      weekTexts(){
          const arr = [...WeekTexts]
          const index = this.fromSunday ? 0 : arr.length; 
          arr.splice(index,0,'日')
          return arr
      },
      totalYear(){
          return initializeArrayWithRange(this.gapYear+6,this.gapYear-6)
      }

  },
  methods: {
      prevBtnClick(){
        if(this.varType === 'day')this.month--;
        if(this.varType === 'month')this.year--;
        if(this.varType === 'year')this.gapYear--;
      },
      nextBtnClick(){
        if(this.varType === 'day')this.month++;
        if(this.varType === 'month')this.year++;
        if(this.varType === 'year')this.gapYear++;
      },
      dayIsClick(day,month = 0){
          this.month += month
          this.isActiveDate = [this.year,this.month,day]
          this.$emit('dayIsClick',new Date(this.year,this.month,day))
      },
      monthIsClick(month){
          //重置时间
          const date = new Date(this.year,this.month,1)
          this.year = date.getFullYear();
          this.month = month-1;
          this.varType = this.type;
      },
      yearIsClick(year){
          //重置时间
          this.gapYear = this.year = year
          this.varType = this.type
      },
      isCurrent(dayOrMonthOrYear){
          if(this.varType === 'day') return isSameDate([currYear,currMonth,currDay],[this.year,this.month,dayOrMonthOrYear])
          if(this.varType === 'month') return isSameDate([currYear,currMonth,1],[this.year,dayOrMonthOrYear-1,1])
          if(this.varType === 'year') return currYear === dayOrMonthOrYear
      },
      isActive(day){
          return isSameDate(this.isActiveDate,[this.year,this.month,day])
      },
      hasMark(day){
          const arr = this.markDates.map(item=>[item.getFullYear(),item.getMonth(),item.getDate()])
          return arr.some(item=>isSameDate(item,[this.year,this.month,day]))
      }
  },
  created() {},
  mounted() {}
};
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
                background: #40a0ffb0;
                cursor: pointer;
                color: #fff;
            }
            li.disabled{
                background: #EBEEF5;
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
        }
        .body-day{
            li{
                width: (100% / 7);
                border-radius: 50%;
            }
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
        .body-month,.body-year{
            & > li{
                width: (100% / 3);
            }
        }
    }
}
</style>