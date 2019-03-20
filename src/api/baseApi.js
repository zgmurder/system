import Parse from "./parse-init";
import {Type} from "../utils/tools";
import {getUserInfo} from "./login";

const cleanData = parseObj => {
  if (parseObj instanceof Parse.Object) {
    const { ACL, createdAt, updatedAt, ...data } = {
      ...parseObj.toJSON(),
      className: parseObj.className
    };
    return data;
  }
  return parseObj;
};

const optionsToQuery = (className,options)=>{
  const query = new Parse.Query(className);
  Object.keys(options).forEach(queryFunName=>{
    if(query[queryFunName]){
      if(Type.isObject(options[queryFunName])){
        const option = options[queryFunName]
        Object.entries(option).reduce((prev, curr) => {
          return curr[1] ? prev[queryFunName](...curr) : prev;
        }, query);
      }else {
        query[queryFunName](options[queryFunName])
      }
    }
  })
  return query
}
export const queryListByOptions = (className,options)=>{
  const query = optionsToQuery(className,options)
  return query.find().then(res => res.map(cleanData));
}
export const queryCountByOptions = (className,options)=>{
  const query = optionsToQuery(className,options)
  return query.count()
}



//根据关键子查询
export const queryListByKeyValue = (className, options = {}, isDim = false,initOptions = {}, _onlyQuery = false) => {
  const query = new Parse.Query(className);
  const {contains={},equalTo={}} = initOptions
  const { sorts,pageConfig,dimLimit,...option } = options;
  let total = 0;
  //处理模糊查询，和精准查询
  const handleContains = (option,query)=>{
    Object.entries(option).reduce((prev, curr) => {
      return curr[1] ? prev.contains(...curr) : prev;
    }, query);
  }
  const handleEqualTo = (option,query)=>{
    Object.entries(option).reduce((prev, curr) => {
      return curr[1]
        ? Array.isArray(curr[1])
          ? prev.containedIn(...curr)
          : prev.equalTo(...curr)
        : prev;
    }, query);
  }
  //初始查询条件
  handleContains(contains,query)
  handleContains(equalTo,query)

  //分页
  if (!Type.isEmpty(pageConfig)){
    const {skip=1,limit} = pageConfig
    query.skip((skip - 1) * limit).limit(limit)
  }
  //排序
  if (Type.isEmpty(sorts)) query.descending("createdAt");
  else {
    const { addAscending, addDescending, descending, ascending } = sorts;
    Object.entries({
      addAscending,
      addDescending,
      descending,
      ascending
    }).reduce((prev, curr) => {
      return curr[1] ? prev[curr[0]](curr[1]) : prev;
    }, query);
  }
  
  if (isDim) {
    handleContains(option,query)
    if(dimLimit)query.limit(dimLimit);
  } else {
    handleEqualTo(option,query)
  }
  
  if(_onlyQuery)return query
  return query.find().then(res => res.map(cleanData));
};
//保存
export const saveItem = (className,data) => {
  const target = new Parse.Object(className);
  // const targetACL = new Parse.ACL();
  // targetACL.setPublicReadAccess(true);
  // targetACL.setRoleWriteAccess("Administrator", true);
  // target.setACL(targetACL);
  return target.save(data);
};
//保存多条
export const saveList = list => {
  const promiseArr = list.map(item => {
    return saveItem(item);
  });
  return Promise.all(promiseArr);
};
//删除
export const deleteItem = (className,obj) => {
  if (!(obj instanceof Parse.Object)) 
  obj = Parse.Object.fromJSON(obj);
  return obj.destroy();
};
//指针
export const toPointer = (className, objectId) => {
  const obj = new Parse.Object(className);
  obj.id = objectId;
  return obj.toPointer();
};

export const queryList = async (className, options = {}, isDim = false,initOptions) => {
  const query = queryListByKeyValue(className, options,isDim,initOptions,true)
  const list = (await query.find()).map(cleanData)
  const total = await query.count()
  return { total, list };

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
  //     if (Type.isObject(result[key]) && result[key].__type === "Relation") {
  //       const obj = item.relation(key);
  //       const data = await obj.query().find();
  //       result[key] = data.map(item => {
  //         const { objectId, name } = item.toJSON();
  //         return { objectId, name, className: item.className };
  //       });
  //     }
  //     if (
  //       Type.isArray(result[key]) &&
  //       (result[key][0] || {}).__type === "Pointer"
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
};
export const fetchTotal = className => {
  const query = new Parse.Query(className);
  return query.count();
};

//服务器时间
export const getServerDate = () => {
  var xhr = null;
  if (window.XMLHttpRequest) {
    xhr = new window.XMLHttpRequest();
  } else {
    // ie
    xhr = new ActiveObject("Microsoft");
  }
  xhr.open("GET", "/", false); //false不可变
  xhr.send(null);
  var date = xhr.getResponseHeader("Date");
  return new Date(date);
};
