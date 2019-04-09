import Parse from './parse-init'
import OrgData from './OrgData'
import { OrgType } from '@/const/index'
import { saveItem } from './baseApi'

export function fromJSON(json) {
  return Parse.Object.fromJSON(json)
}
export async function addOrg(target, formData) {
//   const organization = new Parse.Object(target.className);
//   const {className,...data} = formData
  const targetOrg = await fromJSON(target).fetch()
  formData.parent = targetOrg
  //   organization.setACL(targetACL);
  return saveItem(targetOrg.className, { ...formData, isLeaf: false }).then(res => {
    const children = targetOrg.relation('children')
    children.add(res)
    targetOrg.set('isLeaf', true).save()
    addDepart(res)
    return res
  })
}
export const queryRootOrg = async() => {
  const query = new Parse.Query('Organization2')
  query.containedIn('parentId', [undefined, ''])
  return await query.first()
}
// 自动添加下级部门
export const addDepart = org => {
  const orgObj = org.toJSON()
  orgObj.className = org.className
  let { orgType, orgCategory } = orgObj
  // eslint-disable-next-line no-unused-vars
  const { orgSequence, displayName, objectId, children, parent, ACL, ...data } = orgObj
  const matchDepart = OrgData.find(
    item => item.orgType === orgType && item.orgSequence === orgSequence
  )
  if (matchDepart && matchDepart.deparments) {
    const deparments = matchDepart.deparments
    deparments.forEach(async item => {
      const { name, orgMajors } = item
      orgType = OrgType.Department
      if (orgType === OrgType.Troop) {
        orgCategory = `${orgCategory}首长机关`
        orgType = OrgType.LeaderOffice
      }
      const dataObj = {
        ...data,
        name,
        orgMajors,
        orgCategory,
        orgType,
        orgSequence,
        parentName: orgObj.name,
        displayName: displayName + name
      }
      addOrg(orgObj, dataObj)
    })
  }
}
export const deleteOrg = async data => {
  if (!(data instanceof Parse.Object))data = await fromJSON(data).fetch()
  const relation = data.relation('children')
  const query = relation.query()
  const list = await query.find()
  list.forEach(item => deleteOrg(item))

  const userQuery = new Parse.Query('_User')
  userQuery.equalTo('organization', data.toPointer())
  const userList = await userQuery.find()
  Parse.Object.destroyAll(userList)
  return data.destroy()
}
export const queyrLowerOrgByKeyValue = async(data, options = {}) => {
  if (!(data instanceof Parse.Object))data = await fromJSON(data).fetch()
  const relation = data.relation('children')
  const query = relation.query()
  Object.entries(options).forEach(item => {
    item[1] && query.contains(...item).limit(10)
  })
  return query.find()
}

