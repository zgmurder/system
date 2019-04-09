<template>
  <div class="User">
    <formAndTable :schema="schema" :columns="columns" :no-handle="noHandle"/>
  </div>
</template>

<script>
import formAndTable from '@/components/TableAndForm'
import { queryListByKeyValue, toPointer } from '@/api/baseApi'
import { UserRoles } from '@/const/index'
const Roles = UserRoles.filter(item => item.role !== 0)
export default {
  name: 'User',
  components: {
    formAndTable
  },
  data() {
    return {
      columns: [
        { prop: 'username', label: '用户名', noHandle: true },
        {
          prop: 'role',
          label: '角色',
          handleValue: value => value !== undefined &&
            UserRoles.find(item => item.role === value).nameCh
        },
        {
          prop: 'organization',
          label: '单位',
          handleValue: value => value && value.displayName
        }
      ],
      noHandle: row => {
        console.log(row)
        return row.role === 0
      },
      schema: [
        {
          fieldType: 'autocomplete',
          fetchSuggestions: this.querySearch,
          placeholder: '单位名称',
          label: '单位名称',
          vModel: 'organization',
          organization: '',
          required: true,
          width: '100%',
          onChange: (item, obj) => {
            this.org = { ...obj }
            const initArr = [obj.value, '123456', '123456', 1]
            this.schema.forEach((item, index) => {
              if (index) item[item.vModel] = initArr[index - 1]
            })
          }
        },
        {
          fieldType: 'input',
          width: '100%',
          placeholder: '用户名',
          label: '用户名',
          vModel: 'username',
          required: true
        },
        {
          fieldType: 'input',
          width: '100%',
          placeholder: '密码',
          label: '密码',
          required: true,
          type: 'password',
          vModel: 'password'
        },
        {
          fieldType: 'input',
          width: '100%',
          required: true,
          placeholder: '确认密码',
          label: '确认密码',
          vModel: 'password',
          type: 'password',
          onInput: (value, item) => {
            if (!value) return (item.error = '')
            if (value !== this.schemaPassword.password) { item.error = item.errorMassage }
          },
          validate: item => item[item.vModel] === this.schemaPassword.password,
          errorMassage: '密码不一致'
        },
        {
          fieldType: 'select',
          width: '100%',
          placeholder: '选择角色',
          label: '选择角色',
          required: true,
          vModel: 'role',
          optLabel: 'nameCh',
          optValue: 'role',
          options: Roles
        }
      ],
      className: '_User',
      org: {}
    }
  },
  computed: {
    schemaUsername() {
      return this.schema.find(item => item.vModel === 'username')
    },
    schemaPassword() {
      return this.schema.find(item => item.vModel === 'password')
    }
  },
  methods: {
    async querySearch(queryString = '', cb) {
      let str
      const { orgSequence, displayName } = this.$store.getters.organization
      if (orgSequence < 2) str = queryString
      else {
        if (displayName.includes(queryString)) str = displayName
        else str = displayName + queryString
      }
      const result = await queryListByKeyValue(
        'Organization2',
        {
          displayName: str,
          orgType: '队',
          sorts: {
            ascending: 'orgSequence'
          }
        },
        true
      )
      const arr = result.map(item => ({
        value: item.displayName,
        objectId: item.objectId,
        orgSequence: item.orgSequence,
        orgMajors: item.orgMajors
      }))
      cb(arr)
    },
    beforeSubmit(target) {
      target.organization = toPointer('Organization2', this.org.objectId)
    },
    beforeEdit(target) {
      target.organization =
        target.organization && target.organization.displayName
    }
  }
}
</script>
