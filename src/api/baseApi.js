import Parse from './parse-init'
import { Type } from '../utils/tools'
// import { getUserInfo } from './login'

export const cleanData = parseObj => {
  if (parseObj instanceof Parse.Object) {
    // eslint-disable-next-line no-unused-vars
    const { ACL, createdAt, updatedAt, ...data } = {
      ...parseObj.toJSON(),
      className: parseObj.className
    }
    Object.keys(data).forEach(key => {
      if (Type.isObject(data[key]) && data[key].iso)data[key] = new Date(data[key].iso)
      else { data[key] = cleanData(data[key]) }
    })
    return data
  }
  return parseObj
}

const optionsToQuery = (className, options) => {
  const query = new Parse.Query(className)
  return optionsMixToQuery(query, options)
}
const optionsMixToQuery = (query, options) => {
  Type.isObject(options) && Object.keys(options).forEach(queryFunName => {
    if (query[queryFunName]) {
      if (Type.isObject(options[queryFunName])) {
        const option = options[queryFunName]
        Object.entries(option).reduce((prev, curr) => {
          return curr[1] ? prev[queryFunName](...curr) : prev
        }, query)
      } else {
        query[queryFunName](options[queryFunName])
      }
    }
  })
  return query
}
export const queryListByOptions = (className, options, isCleanData = false) => {
  const query = optionsToQuery(className, options)
  return query.find().then(res => !isCleanData ? res.map(cleanData) : res)
}
export const queryListAndTotal = (className, options, isCleanData = false) => {
  const query = optionsToQuery(className, options)
  query.include('*').descending('createdAt')
  return Promise.all([query.find(), query.count()]).then(([list, total]) => {
    return { list: !isCleanData ? list.map(cleanData) : list, total }
  })
  // return query.find().then(res => !isCleanData ? res.map(cleanData) : res)
}
export const queryCountByOptions = (className, options) => {
  const query = optionsToQuery(className, options)
  return query.count()
}
export const queryFirstByOptions = (className, options, isCleanData = false) => {
  const query = optionsToQuery(className, options)
  return query.first().then(res => !isCleanData ? cleanData(res) : res)
}
export const queryListByQueryAndOptions = (query, options, isCleanData = false) => {
  query = optionsMixToQuery(query, options)
  return query.find().then(res => !isCleanData ? res.map(cleanData) : res)
}
export const queryListByRelationAndOptions = (row, name, options, isCleanData = false) => {
  const parseObj = Parse.Object.fromJSON(row)
  let query = parseObj.relation(name).query()
  query = optionsMixToQuery(query, options)
  return query.find().then(res => !isCleanData ? res.map(cleanData) : res)
}

// 根据关键子查询
export const queryListByKeyValue = (className, options = {}, isDim = false, initOptions = {}, TypeonlyQuery = false) => {
  const query = new Parse.Query(className)
  const { contains = {}, equalTo = {}} = initOptions
  const { sorts, pageConfig, dimLimit, ...option } = options
  // 处理模糊查询，和精准查询
  const handleContains = (option, query) => {
    Object.entries(option).reduce((prev, curr) => {
      return curr[1] ? prev.contains(...curr) : prev
    }, query)
  }
  const handleEqualTo = (option, query) => {
    Object.entries(option).reduce((prev, curr) => {
      return curr[1]
        ? Array.isArray(curr[1])
          ? prev.containedIn(...curr)
          : prev.equalTo(...curr)
        : prev
    }, query)
  }
  // 初始查询条件
  handleContains(contains, query)
  handleContains(equalTo, query)

  // 分页
  if (!Type.isEmpty(pageConfig)) {
    const { skip = 1, limit } = pageConfig
    query.skip((skip - 1) * limit).limit(limit)
  }
  // 排序
  if (Type.isEmpty(sorts)) query.descending('createdAt')
  else {
    const { addAscending, addDescending, descending, ascending } = sorts
    Object.entries({
      addAscending,
      addDescending,
      descending,
      ascending
    }).reduce((prev, curr) => {
      return curr[1] ? prev[curr[0]](curr[1]) : prev
    }, query)
  }

  if (isDim) {
    handleContains(option, query)
    if (dimLimit)query.limit(dimLimit)
  } else {
    handleEqualTo(option, query)
  }

  if (TypeonlyQuery) return query
  return query.find().then(res => res.map(cleanData))
}
// 保存
export const saveItem = (className, data) => {
  Object.keys(data).forEach(key => {
    if (Type.isObject(data[key]) && data[key].__type === 'Object') {
      const { className, objectId } = data[key]
      data[key] = toPointer(className, objectId)
    }
  })
  const target = new Parse.Object(className)
  delete data.className
  // const targetACL = new Parse.ACL();
  // targetACL.setPublicReadAccess(true);
  // targetACL.setRoleWriteAccess("Administrator", true);
  // target.setACL(targetACL);
  return target.save(data)
}
// 保存多条
export const saveList = list => {
  console.log(list)

  if (!(list[0] instanceof Parse.Object)) {
    list = list.map(item => Parse.Object.fromJSON(item).set(item).unset('className'))
  }

  return Parse.Object.saveAll(list)
  // const promiseArr = list.map(item => {
  //   return saveItem(item)
  // })
  // return Promise.all(promiseArr)
}
// 删除
export const deleteItem = (className, obj) => {
  if (!(obj instanceof Parse.Object)) {
    const { objectId } = obj
    obj = Parse.Object.fromJSON({ objectId, className })
  }
  return obj.destroy()
}
// 指针
export const toPointer = (className, objectId) => {
  const obj = new Parse.Object(className)
  obj.id = objectId
  return obj.toPointer()
}

export const queryList = async(className, options = {}, isDim = false, initOptions) => {
  const query = queryListByKeyValue(className, options, isDim, initOptions, true)
  const list = (await query.find()).map(cleanData)
  const total = await query.count()
  return { total, list }

  // console.log(getUserInfo())
  // //兼容旧数据检测字段
  // const query = new Parse.Query(className);
  // const schema = await new Parse.Schema(className).get().catch(e => {
  //   return new Parse.Schema(className).save();
  // });

  // //关系查询
  // const relation = [];
  // for (const [key, obj] of Object.entries(schema.fields)) {
  //   if (obj.type === "Array" || obj.type === "Relation") {
  //     relation.push(key);
  //   }
  // }
  // query.includeAll();
  // query.skip((currpage - 1) * 10).limit(10);

  // //检索
  // const { contains, equalTo } = filterOptions;
  // if (!Type.isEmpty(contains) || !Type.isEmpty(equalTo)) {
  //   const field = schema.fields[contains[0]];
  //   if (contains[1]) {
  //     if (field.type === "Pointer") {
  //       const matchQuery = new Parse.Query(field.targetClass);
  //       matchQuery.contains("name", contains[1]);
  //       query.matchesQuery(contains[0], matchQuery);
  //     } else {
  //       query.contains(...contains);
  //     }
  //   }
  //   Object.entries(equalTo).reduce((prev, curr) => {
  //     return (curr[1] && prev.equalTo(...curr)) || prev;
  //   }, query);
  // }
  // query.descending("createdAt");
  // const res = await query.find();
  // const total = await query.count();
  // const list = res.map(item => {
  //   const result = cleanData(item);
  //   relation.forEach(async key => {
  //     if (Type.isObject(result[key]) && result[key].TypeTypetype === "Relation") {
  //       const obj = item.relation(key);
  //       const data = await obj.query().find();
  //       result[key] = data.map(item => {
  //         const { objectId, name } = item.toJSON();
  //         return { objectId, name, className: item.className };
  //       });
  //     }
  //     if (
  //       Type.isArray(result[key]) &&
  //       (result[key][0] || {}).TypeTypetype === "Pointer"
  //     ) {
  //       const arr = result[key].map(item =>
  //         Parse.Object.fromJSON(item).fetch()
  //       );
  //       const data = await Promise.all(arr);
  //       //result[key] = data.map(item=>cleanData({ ...item.toJSON(), className: item.className }))
  //       result[key] = data.map(item => {
  //         const { objectId, name } = item.toJSON();
  //         return { objectId, name, className: item.className };
  //       });
  //     }
  //   });
  //   return result;
  // });
  // return { total, list };
}
export const fetchTotal = className => {
  const query = new Parse.Query(className)
  return query.count()
}

// 服务器时间
export const getServerDate = () => {
  let xhr = null
  if (window.XMLHttpRequest) {
    xhr = new window.XMLHttpRequest()
  } else {
    // ie
    // eslint-disable-next-line no-undef
    xhr = new ActiveObject('Microsoft')
  }
  xhr.open('GET', '/', false) // false不可变
  xhr.send(null)
  // eslint-disable-next-line no-unused-vars
  const dateObj = new Date(xhr.getResponseHeader('Date'))
  // new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate())
  // new Date(2019,2,24)
  return new Date(2019, 2, 24)
}
export const getCourse = org => {
  if (!Type.isObject(org)) return queryListByOptions('SportCourse')
  const { serviceType, orgCategory, groupId, sportTestCategory } = org
  if (!groupId || !sportTestCategory) {
    const standardQuery = new Parse.Query('TrainStandard')
    standardQuery.equalTo('active', true)
    return queryListByOptions('Course', {
      matchesQuery: {
        standard: standardQuery
      },
      equalTo: {
        serviceReq: serviceType
      },
      contains: {
        orgCategories: orgCategory
      },
      addAscending: ['createdAt']
    })
  } else {
    return queryListByOptions('SportCourse')
  }
}
export const makeupCourseName = (item) => {
  if (Type.isEmpty(item)) return ''
  let name = `${item.seq}.${item.name}`
  item.personProperties && item.personProperties.length === 1 && (name = `${name}(${item.personProperties[0]})`)
  item.tasks && item.tasks.length === 1 && (name = `${name}(${item.tasks[0]})`)
  !Type.isEmpty(item.gunnerType) && (name = `${name}(${item.gunnerType}训)`)
  !Type.isEmpty(item.serviceReq) && (name = `${name}(${item.serviceReq.join(';')})`)
  !Type.isEmpty(item.majorReq) && (name = `${name}(${item.majorReq})`)
  !Type.isEmpty(item.major) && (name = `${name}(${item.major})`)

  // const courseRanks = item.rankL2Reqs || item.ranks
  // if (!Type.isEmpty(courseRanks) && !name.includes('士官')) {
  //   if (courseRanks.length === 1) {
  //     name = `${name}(${courseRanks[0]})`
  //   } else {
  //     let ranks = Type.uniq(courseRanks.map(rank => MapRankToLevel2(rank)))
  //     if (ranks.length > 2) {
  //       ranks = Type.uniq(courseRanks.map(rank => MapRankToLevel1(rank)))
  //     }
  //     name = `${name}(${ranks.join('、')}训)`
  //   }
  // }
  return name
}
