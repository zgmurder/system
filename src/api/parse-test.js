// import Parse from './parse-init'
const Parse = require('parse/node')
const { appId, JsKey, masterKey, serverURL } = require('../../serve/config')

Parse.initialize(appId, JsKey)
Parse.masterKey = masterKey
Parse.serverURL = serverURL
const toPointer = (className, id) => {
  const obj = new Parse.Object(className)
  obj.id = id
  return obj.toPointer()
}

// const handleData = listData => {}
// const deleteField = async field => {
//   const schema = new Parse.Schema(className)
//   schema.deleteField('standard', 'TrainStandard')
//   await schema.update()
// }
// const loadData = className => {}

// async function test(className) {
//   const options = await Parse.User.logIn('admin', 'topzen123')
//   const sectionToken = options.toJSON().sessionToken
//   const query = new Parse.Query(className)
//   query.exists('standard').select('standard')
//   const total = await query.count()
//   const listData = []

//   if (total > 100) {
//     const len = Math.ceil(total / 100)
//     for (let i = 0; i < len; i++) {
//       query.skip(i * 100).limit(100)
//       await query.find()
//     }
//   }

//   const list = await query.find()
//   const checkData = list.find(
//     item => item.toJSON().standard.objectId === undefined
//   )
//   if (checkData) return
//   // const objectIds = list.map(item => item.toJSON().standard.objectId)
//   const schema = new Parse.Schema(className)
//   schema.deleteField('standard', 'TrainStandard')
//   await schema.update()
//   list.forEach(item => {
//     const objectId = item.toJSON().standard.objectId
//     if (!objectId) return '有课目未录入大纲'
//     item.save(
//       { standard: objectId },
//       { sectionToken, useMasterKey: masterKey }
//     )
//   })

// console.log(list)
// const promiseArr = list.map(item=>{
//     const objectId = item.toJSON().standard.objectId
//     return item.save({standardTem:objectId},{sectionToken,useMasterKey:masterKey})
// })
// const savedList = await Promise.all(promiseArr)
// console.log('处理完所有数据')
// const schema = new Parse.Schema(className);
// schema.deleteField('standard','TrainStandard');
// await schema.update();
// const promiseArr2 = savedList.map(item=>{
//     const objectId = item.toJSON().standardTem
//     return item.save({standard:objectId},{sectionToken,useMasterKey:masterKey})
// })
// await Promise.all(promiseArr2)
// schema.deleteField('standardTem')
// await schema.update();

// const res = obj.toPointer()
// console.log(res)
// const a = Parse.Object.extend("TrainSection");
// const b = new Parse.Object("TrainSection");
// console.log(a,1,b)
// const a = new Parse.Object("TrainSection");
// a.unset('standard')
// a.save()
// const C = Parse.Object.extend("TrainSection");
// const a = new C();
// a.unset('standard');
// a.save()
// const schema = new Parse.Schema(className);
// console.log(schema)
// schema.addString('field');
// schema.addIndex('index_name', {'field': 1});
// schema.update();
// schema.deleteField('standard')
// schema.save()
// const schema = new Parse.Schema(className);
// schema.addString('field111');
// schema.update();
// }
// test("Course");

// async function test1() {
//   const query = new Parse.Query("Course");
//   const total = await query.count();
//   let listData = [];
//   query.exists("standard").select("standard");
//   if (total > 100) {
//     const len = Math.ceil(total / 100);
//     for (let i = 0; i < len; i++) {
//       query.skip(i * 100).limit(100);
//       const list = await query.find();
//       //listData.concat(list)
//       listData = [...listData, ...list];
//     }
//   }
//   const options = await Parse.User.logIn("admin", "topzen123");
//   const sectionToken = options.toJSON().sessionToken;
//   const checkData = listData.find(
//     item => item.toJSON().standard.objectId === undefined
//   );
//   if (checkData) return console.log(111);
//   const schema = new Parse.Schema('Course');
//   schema.deleteField("standard", "TrainStandard");
//   await schema.update();
//   listData.forEach(item => {
//     const objectId = item.toJSON().standard.objectId;
//     if (!objectId) throw "有课目未录入大纲";
//     item.save(
//       { standard: objectId },
//       { sectionToken, useMasterKey: masterKey }
//     );
//   });
// }
// async function test1() {
//   const query = new Parse.Query('Course')
//   const total = await query.count()
//   let listData = []
//   query.exists('standard').select('standard')
//   if (total > 100) {
//     const len = Math.ceil(total / 100)
//     for (let i = 0; i < len; i++) {
//       query.skip(i * 100).limit(100)
//       const list = await query.find()
//       // listData.concat(list)
//       listData = [...listData, ...list]
//     }
//   }
//   const options = await Parse.User.logIn('admin', 'topzen123')
//   const sectionToken = options.toJSON().sessionToken
//   const checkData = listData.find(
//     item => item.toJSON().standard === undefined
//   )
//   if (checkData) return console.log(111)
//   const schema = new Parse.Schema('Course')
//   schema.deleteField('standard', 'TrainStandard')
//   await schema.update()
//   listData.forEach(item => {
//     const objectId = item.toJSON().objectId
//     if (!objectId) throw '有课目未录入大纲'
//     item.save(
//       { standard: toPointer('TrainStandard', objectId) },
//       { sectionToken, useMasterKey: masterKey }
//     ).then(obj => {
//       console.log(`${obj.toJSON().name}处理完成`)
//     })
//   })
// }
// test1();

// const bbbb = ()=>{
//   const str = 's.dfsdfsdfsd-sdfsdf'
//   const str1 = str.replace(/[.-]/g,',')
//   console.log(str1.split(','))
// }
// bbbb()
// const handleSportCourse = async(className) => {
//   const query = new Parse.Query('Course')
//   query.equalTo('category', 1)
//   const list = (await query.find()).map(item => {
//     const { ACL, createdAt, updatedAt, objectId, ...data } = item.toJSON()
//     return data
//   })
//   list.forEach(async item => {
//     const obj = new Parse.Object('SportCourse')
//     obj.save(item).then(parseObj => { console.log(parseObj.get('name')) })
//   })

//   await (new Parse.Schema('SportCourse')).get().catch(e => {
//     // new Parse.Schema("SportCourse").save();

//   })
// }
// handleSportCourse()

// async function handleSportAssessReq(){
//   const options = await Parse.User.logIn("admin", "topzen123");
//   const sectionToken = options.toJSON().sessionToken;
//   const query = new Parse.Query('SportAssessReq');
//   const sportQuery = new Parse.Query('SportCourse');
//   query.includeAll()
//   const list = await query.find()
//   const schema = new Parse.Schema('SportAssessReq');
//   schema.deleteField("course", "Course");
//   await schema.update();
//   list.forEach(async item=>{
//     sportQuery.equalTo('name',item.get('course').name)
//     const obj = (await sportQuery.find())[0]
//     item.set('course',obj.toPointer())
//     item.save({ sectionToken, useMasterKey: masterKey }).then(obj=>console.log(obj.get('name')))
//   })

// }
// handleSportAssessReq()

// async function handleSportAssessReq(){
//   // const options = await Parse.User.logIn("admin", "topzen123");
//   // const sectionToken = options.toJSON().sessionToken;
//   const query = new Parse.Query('Org');
//   query.containedIn('name','山东')
//   const list = await query.find()
//   console.log(list)
//   // const sportQuery = new Parse.Query('SportCourse');
//   // query.includeAll()
//   // const list = await query.find()
//   // const schema = new Parse.Schema('SportAssessReq');
//   // schema.deleteField("course", "Course");
//   // await schema.update();
//   // list.forEach(async item=>{
//   //   sportQuery.equalTo('name',item.get('course').name)
//   //   const obj = (await sportQuery.find())[0]
//   //   item.set('course',obj.toPointer())
//   //   item.save({ sectionToken, useMasterKey: masterKey }).then(obj=>console.log(obj.get('name')))
//   // })
// }
// handleSportAssessReq()
// async function handleSportAssessReq(){
//   const options = await Parse.User.logIn("admin", "topzen123");
//   const sectionToken = options.toJSON().sessionToken;
//   const roleACL = new Parse.ACL()
//   roleACL.setPublicReadAccess(true)
//   roleACL.setPublicWriteAccess(true)
//   const role = new Parse.Role('Reader', roleACL)
//   await role.save()
//   // obj.save(data,{ sectionToken, useMasterKey: masterKey })
//   //query.containedIn('name','山东')
//   // const list = await query.find()
//   // console.log(list)

// }
// handleSportAssessReq()

// 可模糊检索
// const getOwnProperyNames = () => {
//   const orgQuery = new Parse.Object('DailyReport')

// }
// getOwnProperyNames()
const Type = (function() {
  const type = {}
  const typeArr = ['String', 'Object', 'Number', 'Array', 'Undefined', 'Function', 'Null', 'Symbol']
  typeArr.forEach(item => {
    type[`is${item}`] = obj => Object.prototype.toString.call(obj) === '[object ' + item + ']'
  })
  type.isBoolean = obj => typeof obj === 'boolean'
  type.isEmpty = obj => JSON.stringify(obj) === '[]' || JSON.stringify(obj) === '{}' || !obj
  return type
})()

const optionsToQuery = (className, options) => {
  const query = new Parse.Query(className)
  Object.keys(options).forEach(queryFunName => {
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

const queryListByOptions = (className, options, Token) => {
  const query = optionsToQuery(className, options)
  return query.find(Token)
}
const getToken = (username = 'admin', password = 'topzen123') => {
  return Parse.User.logIn(username, password).then(user => ({ sessionToken: user.get('sessionToken'), useMasterKey: masterKey }))
}

const detachSportCourse = async(targetClassName, options) => {
  const Token = await getToken()
  const { className, ...option } = options
  const list = await queryListByOptions(className, option, Token)

  list.forEach(async parseObj => {
    const ACL = parseObj.get('ACL')
    const objInstance = new Parse.Object(targetClassName)
    // eslint-disable-next-line no-unused-vars
    const { objectId, createdAt, updatedAt, ...data } = parseObj.toJSON()
    const result = await objInstance.save({ ...data, ACL })
    console.log(result.get('name') + '完成')
  })
}
// 将军事课目里的体育课目抽离到单独的体育课目表sportCourse
// detachSportCourse('SportCourse', {
//   className: 'Course',
//   equalTo: {
//     category: 1
//   }
// })
const testEmptyObj = () => {
  // const arr = {{className:'aaa',data:'bbb'}}
  // console.log(Parse.Object.fromJSON({ className: 'aaa', data: 'bbb' }))
  const str1 = '一'
  const str2 = '二'
  const str3 = '三'
  console.log(str2 > str3)
}
testEmptyObj()
