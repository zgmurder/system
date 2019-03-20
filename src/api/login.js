import request from '@/utils/request'
import Parse from './parse-init'
import { resolve } from 'path'

// Parse.Query
/**
 * query.containedIn(key,values) = dataArr.filter(data=>values.find(item=>item === data[key])) notContainedIn = !containedIn
 *
 * query.contains(key,substring) = dataArr.filter(data=>data[key].includes(substring))
 *
 * query.containsAll(keyToArr,values) = dataArr.filter(data=>values.every(item=>data[key].includes(item)))
 *
 * query.containsAllStartingWith(keyToArr,values) = dataArr.filter(data=>values.every(item=>data[key].startWith(item)))
 *
 * query.count() = dataArr.length
 *
 * query.descending(key) = big => small
 *
 * query.distinct(key) = [...new Set(dataArr.map(item=>item[key]))]
 *
 * query.doesNotExist(key) = dataArr.filter(data=>!data[key])   !exists
 *
 * query.each(callback) = dataArr.forEach(callback)
 *
 * query.endsWith(key,substring) = dataArr.filter(data=>data[key].find(item=>item.endWith(substring)))
 *
 * query.equalTo(key,valueObj) = dataArr.filter(data=>data[key].includes(valueObj))
 *
 * query.first() = dataArr[0]
 *
 * query.get(objectId) = dataArr.find(item=>item.objectId === objectId)
 *
 * query.include(key) = dataArr.map(item=>item[key]===pointer?item[key])
 */

// export function loginByUsername(username, password) {
//   const data = {
//     username,
//     password
//   }
//   return request({
//     url: '/login/login',
//     method: 'post',
//     data
//   })
// }
const queryTest = function() {
  const query = new Parse.Query(Parse.User)
  // query.doesNotExist('str')
  // query.exists('arr')
  // query
  // query.select(['str','username','org'])
  // query.include('org')
  // query.find().then(res=>{
  //   return res.map(item=>{
  //     const {ACL,createdAt,updatedAt,...data} = item.toJSON()
  //     return data
  //   })
  // }).then(result=>{
  //   //res = res.map(item=>item.toJSON())
  //   console.log(result,111)
  // })
  query.get('r1Wa3hJauf').then(res => {
    res.setPassword('123456')
  })
}
export function loginByUsername(username, password) {
  return Parse.User.logIn(username, password)
}

export function logout() {
  return Parse.User.logOut()
}

export function hasAdmin() {
  const query = new Parse.Query(Parse.User)
  query.equalTo('username', 'admin')
  return query.find()
}
// export function logout() {
//   return request({
//     url: '/login/logout',
//     method: 'post'
//   })
// }

// export function getUserInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }
export function getUserInfo() {
  return Parse.User.current()
}
export function getUserOrg(objectId) {
  const query = new Parse.Query(Parse.User)
  return query.get(objectId)
}
export async function signUp() {
  const roleACL = new Parse.ACL()
  roleACL.setPublicReadAccess(true)
  roleACL.setPublicWriteAccess(true)
  const role = new Parse.Role('Administrator', roleACL)
  const parseRole = await role.save()
  const user = new Parse.User()
  const obj = {
    username: 'admin',
    password: 'topzen123'
  }
  user.set(obj)
  const parseUser = await user.signUp()
  // var	moderators	=	/*	Query	for	some	Parse.Role	*/
  // var wallPost = new Parse.Object("WallPost");
  // var postACL = new Parse.ACL();
  parseRole.getUsers().add(parseUser)
  // wallPost.setACL(postACL);
  // wallPost.save();

  return parseRole.save()
}
