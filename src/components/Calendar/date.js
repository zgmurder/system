
export const initializeArrayWithRange = (end, start = 0) =>
  Array.from({ length: end - start }).map((v, i) => i + start + 1)

export const dateToJSON = date => ({ year: date.getFullYear(), month: date.getMonth(), day: date.getDate() })

export const dateToArr = date => Object.values(dateToJSON(date))

export const isSameDate = (currDate, otherDate) => {
  if (!currDate || !otherDate) return false
  const currArr = currDate instanceof Date ? dateToArr(currDate) : currDate
  const otherArr = otherDate instanceof Date ? dateToArr(otherDate) : otherDate
  const length = currArr.length || otherArr.length
  return currArr.filter(v => otherArr.includes(v)).length === length
}
export const isAfterDate = (currDate, otherDate) => currDate.getTime() < otherDate.getTime()
export const isBeforeDate = (currDate, otherDate) => currDate.getTime() > otherDate.getTime()

