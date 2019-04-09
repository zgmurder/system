import Parse from './parse-init'
import { queryListByOptions, queryCountByOptions, saveItem, cleanData, getServerDate, toPointer, deleteItem, queryFirstByOptions, saveList } from './baseApi'
import { PersonProperty, OrgSequence, DailySection } from '@/const/index'
import { dateToJSON, cleanDate, getCurrWeekDates, isSameDate, groupBy } from './tools'

const orgClassName = 'Organization2'
const currClassName = 'DailyReport'
const monthClassName = 'MonthReport1'

const querySoldiersCount = org => {
  const orgQuery = new Parse.Query(orgClassName)
  orgQuery.contains('displayName', org.displayName)
  return queryCountByOptions('Soldier2', {
    matchesQuery: {
      organization: orgQuery
    }
  })
}
const orgToPointer = orgId => toPointer(orgClassName, orgId)
const updateAllMonthReport1 = listDailyReport => {
  const date = listDailyReport[0].get('date')
  // const { year, month } = dateToJSON(date)
  const organization = listDailyReport[0].get('organization')
  const monthObj = groupBy(listDailyReport, parseObj => parseObj.get('date').getMonth())
  return queryListByOptions(monthClassName, {
    equalTo: { organization },
    greaterThan: { date },
    lessThan: { date: new Date(date.getFullYear() + 1, 0, 1) },
    ascending: ['date']
  }, true).then(list => {
    list.forEach(monthReport1 => {
      const month = monthReport1.get('date').getMonth()
      const monthDailyReports = monthObj[month]

      const timeStatStatic = monthReport1.get('timeStatStatic')
      timeStatStatic.forEach((stat, index) => {
        stat.totalHoursInDay = monthDailyReports.reduce((prev, curr) => prev + curr.get('timeStat')[index].hoursInDay, 0)
        stat.totalHoursAtNight = monthDailyReports.reduce((prev, curr) => prev + curr.get('timeStat')[index].hoursAtNight, 0)
        stat.allTotalHoursInDay = monthDailyReports[monthDailyReports.length - 1].get('timeStat')[index].totalHoursInDay
        stat.allTotalHoursAtNight = monthDailyReports[monthDailyReports.length - 1].get('timeStat')[index].totalHoursAtNight
      })
      monthReport1.set('timeStatStatic', timeStatStatic)

      const bulletStatStatic = monthReport1.get('bulletStatStatic')
      bulletStatStatic.forEach((stat, index) => {
        stat.totalTrainAverage = monthDailyReports.reduce((prev, curr) => prev + curr.get('bulletStat')[index].trainAverage, 0)
        stat.totalTrain = monthDailyReports.reduce((prev, curr) => prev + curr.get('bulletStat')[index].train, 0)
        stat.totalOthers = monthDailyReports.reduce((prev, curr) => prev + curr.get('bulletStat')[index].others, 0)
        stat.allTotalTrainAverage = monthDailyReports[monthDailyReports.length - 1].get('bulletStat')[index].totalTrainAverage
        stat.allTotalTrain = monthDailyReports[monthDailyReports.length - 1].get('bulletStat')[index].totalTrain
        stat.allTotalOthers = monthDailyReports[monthDailyReports.length - 1].get('bulletStat')[index].totalOthers
      })
      monthReport1.set('bulletStatStatic', bulletStatStatic)
      const motorStatStatic = monthReport1.get('motorStatStatic')
      motorStatStatic.forEach((stat, index) => {
        stat.total = monthDailyReports.reduce((prev, curr) => prev + curr.get('motorStat')[index].count, 0)
        stat.allTotal = monthDailyReports.reduce((prev, curr) => prev + curr.get('motorStat')[index].total, 0)
      })
      monthReport1.set('motorStatStatic', motorStatStatic)
    })
    return saveList(list)
  })
}
const updateAllDailyReport = dailyReport => {
  const organization = dailyReport.get('organization')
  const date = dailyReport.get('date')
  // const currMonthEndDate = new Date(isoDate.getFullYear(), isoDate.getMonth() + 1, 0)
  return queryListByOptions(currClassName, {
    equalTo: { organization },
    greaterThanOrEqualTo: { date: new Date(date.getFullYear(), date.getMonth(), 1) },
    lessThan: { date: new Date(date.getFullYear() + 1, 0, 1) },
    ascending: ['date']
  }, true).then(list => {
    const index = list.findIndex(item => isSameDate(item.get('date'), date))
    const beforeThisDateArr = list.splice(0, index + 1)
    list.reduce((prev, curr) => {
      const timeStat = curr.get('timeStat')
      const prevJSON = prev.toJSON()

      timeStat.forEach((stat, index) => {
        stat.totalHoursInDay = stat.hoursInDay + prevJSON.timeStat[index].totalHoursInDay
        stat.totalHoursAtNight = stat.hoursAtNight + prevJSON.timeStat[index].totalHoursAtNight
      })
      curr.set('timeStat', timeStat)
      const bulletStat = curr.get('bulletStat')
      bulletStat.forEach((stat, index) => {
        stat.totalTrainAverage = stat.trainAverage + prevJSON.bulletStat[index].totalTrainAverage
        stat.totalTrain = stat.train + prevJSON.bulletStat[index].totalTrain
        stat.totalOthers = stat.others + prevJSON.bulletStat[index].totalOthers
      })
      curr.set('bulletStat', bulletStat)
      const motorStat = curr.get('motorStat')
      motorStat.forEach((stat, index) => {
        stat.total = stat.count + prevJSON.motorStat[index].total
      })
      curr.set('motorStat', motorStat)
      return curr
    }, dailyReport)
    return saveList(list).then(all => beforeThisDateArr.concat(all))
  })
}
const createMonthReport = (parseDailyReport) => {
  const { year, month } = dateToJSON(parseDailyReport.get('date'))
  const organization = parseDailyReport.get('organization')
  queryFirstByOptions(monthClassName, {
    equalTo: { date: new Date(year, month + 1, 0), organization }
  }).then(res => initOrUpdateMonthReport(parseDailyReport, res && res.objectId))
}
const initOrUpdateMonthReport = (parseDailyReport, objectId) => {
  const { year, month } = dateToJSON(parseDailyReport.get('date'))
  const timeStat = parseDailyReport.get('timeStat')
  const bulletStat = parseDailyReport.get('bulletStat')
  const motorStat = parseDailyReport.get('motorStat')
  const organization = parseDailyReport.get('organization')

  const date = new Date(year, month + 1, 0)
  const timeStatStatic = timeStat.map(timeObj => {
    const { type, totalHoursInDay, totalHoursAtNight } = timeObj
    return {
      type, totalHoursInDay, totalHoursAtNight,
      allTotalHoursInDay: totalHoursInDay,
      allTotalHoursAtNight: totalHoursAtNight
    }
  })
  const bulletStatStatic = bulletStat.map(bulletObj => {
    const { type, totalTrainAverage, totalTrain, totalOthers } = bulletObj
    return {
      type, totalTrainAverage, totalTrain, totalOthers,
      allTotalTrainAverage: totalTrainAverage,
      allTotalTrain: totalTrain,
      allTotalOthers: totalOthers
    }
  })
  const motorStatStatic = motorStat.map(motorObj => {
    const { type, unitType, total } = motorObj
    return {
      type, unitType, total,
      allTotal: total
    }
  })

  const qualityStat = {
    excellentRate: 0,
    goodRate: 0,
    passRate: 0,
    evaluatedScore: 0
  }
  const placeStat = {
    createdDetails: [],
    created: [],
    nonCreated: [],
    newCreated: [],
    passRate: 0
  }
  const trainerStat = {
    officerCount: 0,
    monitorCount: 0,
    otherCount: 0,
    standardCount: 0,
    standardRate: 0
  }
  saveItem(monthClassName, { objectId, organization, date, timeStatStatic, bulletStatStatic, motorStatStatic, placeStat, trainerStat, qualityStat })
}
export const initDailyReport = async(org, date) => {
  const soldierCount = await querySoldiersCount(org)
  if (!soldierCount) return { errorText: '该单位下没有人员' }

  const isRepair = date instanceof Date
  if (!isRepair) {
    date = await positionDate(org.objectId)
    if (!date) return { errorText: '本周一到今天的登记表已经全部登记' }
    else if (date.getDay() === 6 || !date.getDay()) return { errorText: '休息日暂时不支持登记' }
  }
  const { year, month } = dateToJSON(date)
  const orgPointer = Parse.Object.fromJSON(org).toPointer()
  const prevDailyReport = await queryFirstByOptions(currClassName, {
    equalTo: { organization: orgPointer },
    lessThan: { date },
    descending: ['date']
  })

  const timeStatArr = org.orgSequence < OrgSequence.Battalion ? [PersonProperty.Officer] : [PersonProperty.Soldier, PersonProperty.Officer, PersonProperty.Supporter]
  const timeStat = timeStatArr.map((type, index) => ({
    type,
    hoursInDay: 0,
    hoursAtNight: 0,
    totalHoursInDay: prevDailyReport ? prevDailyReport.timeStat[index].totalHoursInDay : 0,
    totalHoursAtNight: prevDailyReport ? prevDailyReport.timeStat[index].totalHoursAtNight : 0
  }))

  const orgCategory = org.orgSequence < OrgSequence.Battalion ? org.orgCategory + '首长机关' : org.orgCategory
  const bulletArr = await queryListByOptions('BulletRequirement', { equalTo: { orgCategory }})
  const majorType = org.serviceType === '看守看押勤务' ? '“两看”勤务分队' : '其他勤务分队'
  const bulletStat = bulletArr.filter(ele => ele.majorType !== majorType).map((item, index) => ({
    type: item.ordnanceType,
    soldierNumber: 0,
    trainAverage: 0,
    train: 0,
    others: 0,
    totalTrainAverage: prevDailyReport ? prevDailyReport.bulletStat[index].totalTrainAverage : 0,
    totalTrain: prevDailyReport ? prevDailyReport.bulletStat[index].totalTrain : 0,
    totalOthers: prevDailyReport ? prevDailyReport.bulletStat[index].totalOthers : 0
  }))

  const motorArr = await queryListByOptions('MotorRequirement', { equalTo: { orgCategory: org.orgCategory }})
  const motorStat = motorArr.map((item, index) => ({
    type: item.motorType,
    unitType: item.unitType,
    count: 0,
    total: prevDailyReport ? prevDailyReport.motorStat[index].total : 0
  }))

  const contentStat = Object.keys(DailySection).reduce((prev, curr) => {
    prev[curr] = []
    return prev
  }, {})

  return {
    personStat: {
      total: soldierCount,
      present: 0,
      presentRate: 0,
      notes: ''
    },
    contentStat,
    timeStat,
    bulletStat,
    motorStat,
    organization: { ...org },
    date,
    isRepair
  }
}
export const positionDate = (orgId) => {
  const dateArr = getCurrWeekDates(getServerDate())
  return queryCountByOptions(currClassName, { containedIn: { date: dateArr }, equalTo: { organization: orgToPointer(orgId) }}).then(count => dateArr[count])
}
export const saveDailyReport = async tableData => {
  const organization = toPointer(orgClassName, tableData.organization.objectId)
  return saveItem(currClassName, { ...tableData, organization }).then(res => {
    const month = res.get('date').getMonth()
    updateAllDailyReport(res).then(list => {
      const monthObj = groupBy(list, parseObj => parseObj.get('date').getMonth())
      if (monthObj[month].length === 1)createMonthReport(res)
      updateAllMonthReport1(list)
    })
    return cleanData(res)
  })
}
export const getDailyReport = (orgId, date, className = currClassName) => {
  return queryFirstByOptions(className, { equalTo: { date: cleanDate(date), organization: orgToPointer(orgId) }})
}

const getMarks = (className, orgId, options = {}) => {
  const option = {
    select: ['date', 'isRepair'],
    equalTo: { organization: orgToPointer(orgId) }
  }
  return queryListByOptions(className, Object.assign(option, options)).then(list => list.map(cleanData))
}
export const getDailyReportMarks = (orgId, date, className = currClassName) => {
  const { year, month } = dateToJSON(date)
  const options = {
    greaterThanOrEqualTo: { date: new Date(year, month, 1) },
    lessThanOrEqualTo: { date: new Date(year, month + 1, 0) }
  }
  return getMarks('DailyReport', orgId, options)
}
export const getMonthReport1Marks = (orgId, date) => {
  const { year } = dateToJSON(date)
  const options = {
    greaterThanOrEqualTo: { date: new Date(year, 0, 1) },
    lessThan: { date: new Date(year + 1, 0, 1) }
  }
  return getMarks('MonthReport1', orgId, options)
}

export const deleteDailyReport = data => {
  return queryFirstByOptions(currClassName, {
    equalTo: { organization: toPointer(orgClassName, data.organization.objectId) },
    lessThan: { date: data.date },
    greaterThanOrEqualTo: { date: new Date(data.date.getFullYear(), data.date.getMonth(), 1) },
    ascending: ['date']
  }, true).then(prev => {
    if (!prev) return { errorText: '每年每个月最早的登记表不能删除' }
    else {
      return deleteItem(currClassName, data).then(() => {
        return updateAllDailyReport(prev).then(list => {
          if (list.length) return updateAllMonthReport1(list)
          else return {}
        })
      })
    }
  })
}
