<template>
  <div class="soldier">
    <formAndTable ref="formAndTable" :schema="schema" :columns="columns" />
  </div>
</template>

<script>
import formAndTable from '@/components/TableAndForm'
import { queryListByKeyValue, toPointer } from '@/api/baseApi'
import { Gender, CourseCategory, TroopCategory, PoliticalStatus, SoldierCategories } from '@/const/index'
export default {
  name: 'Soldier',
  components: {
    formAndTable
  },
  data() {
    return {
      columns: [
        { prop: 'name', label: '姓名' },
        { prop: 'cardId', label: '证号' },
        { prop: 'gender', label: '性别', width: '50px' },
        { prop: 'birthday', label: '年龄', handleValue: (value) => value && this.$tools.parseTime(value, '{y}年{m}月{d}日') },
        { prop: 'politicalStatus', label: '政治面貌' },
        { prop: 'height', label: '身高(cm)' },
        { prop: 'weight', label: '体重(kg)' },
        { prop: 'organization', label: '所属单位', handleValue: org => org.name },
        { prop: 'position', label: '职务' },
        { prop: 'soldierCategory', label: '人员类别' },
        { prop: 'rank', label: '军衔等级' },
        { prop: 'enlistedAt', label: '兵龄', handleValue: (value) => value && this.$tools.parseTime(value, '{y}年{m}月{d}日') },
        { prop: 'positionAt', label: '上任日期', handleValue: (value) => value && this.$tools.parseTime(value, '{y}年{m}月{d}日') }
      ],
      schema: [
        { fieldType: 'input', placeholder: '人员姓名', label: '人员姓名', vModel: 'name', required: true, name: '小王',
          onInput: (value, item) => {
            if (!value) { item.error = '' }
            if (value.length < 2 || value.length > 4) { item.error = item.errorMassage }
          },
          validate: item => item[item.vModel].length > 1 && item[item.vModel].length < 5,
          errorMassage: '名字长度为2-4个'
        },
        { fieldType: 'input', placeholder: '个人证号', label: '个人证号', vModel: 'cardId', required: true, cardId: 1243244555443 },
        { fieldType: 'select', placeholder: '性别', label: '性别', vModel: 'gender', required: true, options: Object.values(Gender), gender: '男' },
        { fieldType: 'date-picker', placeholder: '出生日期', label: '出生日期', vModel: 'birthday', required: true, birthday: new Date(1992, 10, 18) },
        { fieldType: 'select', placeholder: '政治面貌', label: '政治面貌', vModel: 'politicalStatus', required: true, options: PoliticalStatus, politicalStatus: '党员' },
        { fieldType: 'input', placeholder: '身高(cm)', label: '身高(cm)', vModel: 'height', required: true, height: 172 },
        { fieldType: 'input', placeholder: '体重(kg)', label: '体重(kg)', vModel: 'weight', required: true, weight: 55 },
        { fieldType: 'autocomplete', fetchSuggestions: this.querySearch, placeholder: '单位名称', label: '单位名称', vModel: 'organization', organization: '', required: true,
          onChange: (obj, value, found) => {
            this.schemaObj.majorTypeSchema.options = [...value.orgMajors]
            this.editOrg = value || {}
            const orgSequence = value.orgSequence > 6 ? 6 : value.orgSequence
            queryListByKeyValue('Position', { orgSequence: orgSequence, sorts: { ascending: 'sortCode' }}).then(list => {
              this.schemaObj.positionSchema.options = list
            })
          }
        }, //, fetchSuggestions: this.querySearch
        { fieldType: 'select', placeholder: '当前职务', label: '当前职务', vModel: 'position', required: true, options: [] },
        { fieldType: 'select', placeholder: '人员类别', label: '人员类别', vModel: 'soldierCategory', required: true, options: SoldierCategories,
          onChange: (obj, value) => {
            this.schemaObj.rankSchema.options = []
            this.schemaObj.rankSchema.rank = ''
            this.schemaObj.positionAtSchema.positionAt = null
            this.schemaObj.positionAtSchema.required = false
            this.schemaObj.positionAtSchema.disabled = true
            if (value.includes('警官')) {
              value = '军官'
              this.schemaObj.positionAtSchema.required = true
              this.schemaObj.positionAtSchema.disabled = false
              this.schemaObj.positionAtSchema.positionAt = new Date(2005, 1, 1)
            }
            if (value.includes('文职人员') || !value) {
              this.schemaObj.rankSchema.disabled = true
              this.schemaObj.rankSchema.required = false
            } else {
              queryListByKeyValue('MilitaryRank', { rankLevel1: value }).then(list => {
                this.schemaObj.rankSchema.disabled = !list.length
                this.schemaObj.rankSchema.options = list
                this.schemaObj.rankSchema.required = true
              })
            }
          }
        },
        { fieldType: 'select', placeholder: '军衔等级', label: '军衔等级', vModel: 'rank', options: [], disabled: true, required: true },
        { fieldType: 'date-picker', placeholder: '上任日期', label: '上任日期', vModel: 'positionAt', required: false, disabled: true },
        { fieldType: 'date-picker', placeholder: '入伍日期', label: '入伍日期', vModel: 'enlistedAt', required: true, enlistedAt: new Date(2000, 1, 1) },
        { fieldType: 'checkbox', placeholder: '其他选项', label: '保障人员', border: true, vModel: 'isSupporter', onChange: (obj, value) => {
          if (value) {
            queryListByKeyValue('SupporterMajor').then(list => {
              this.schemaObj.majorTypeSchema.options = list
            })
          }
        } },
        { fieldType: 'select', placeholder: '专业类型', label: '专业类型', vModel: 'majorType', options: [] },
        { fieldType: 'select', placeholder: '枪手类型', label: '枪手类型', vModel: 'gunnerType', options: [] },

        { fieldType: 'input', placeholder: '联系电话', label: '联系电话', vModel: 'phoneNum' },
        { fieldType: 'input', placeholder: '血型', label: '血型', vModel: 'bloodType' },
        { fieldType: 'input', placeholder: '国籍', label: '国籍', vModel: 'nationality' },
        { fieldType: 'input', placeholder: '籍贯', label: '籍贯', vModel: 'fromCity' },
        { fieldType: 'input', placeholder: '户口所在地', label: '户口所在地', vModel: 'currentCity' },
        { fieldType: 'input', placeholder: '最高学历', label: '最高学历', vModel: 'highestDegree' },
        { fieldType: 'input', placeholder: '毕业院校', label: '毕业院校', vModel: 'graduatedSchool' },
        { fieldType: 'input', placeholder: '所学专业', label: '所学专业', vModel: 'graduatedMajor' }
      ],
      className: 'Soldier2',
      initOptions: { contains: {
        orgDisplayName: this.$store.getters.organization.orgSequence > 1 && this.$store.getters.organization.name || ''
      }},
      editOrg: {}
    }
  },
  computed: {
    schemaObj() {
      return this.schema.reduce((prev, curr) => {
        prev[`${curr.vModel}Schema`] = curr
        return prev
      }, {})
    }
  },
  watch: {
    'schemaObj.organizationSchema.organization': {
      handler(newValue) {
        if (newValue) {
          console.log(newValue)
          // queryListByKeyValue()
        }
      }
      // isDeep: true
    }
  },
  created() {
    if (this.$store.getters.organization.objectId) {
      this.equalTo = {
        organization: toPointer('Organization2', this.$store.getters.organization.objectId)
      }
    }
    queryListByKeyValue('GunnerType').then(list => {
      this.schemaObj.gunnerTypeSchema.options = list
    })
  },
  methods: {
    async querySearch(queryString, cb) {
      let str
      const { orgSequence, displayName } = this.$store.getters.organization
      if (orgSequence < 2)str = queryString
      else {
        if (displayName.includes(queryString))str = displayName
        else str = displayName + queryString
      }
      const result = await queryListByKeyValue(
        'Organization2',
        { displayName: str, sorts: {
          ascending: 'orgSequence'
        }},
        true
      )
      const arr = result
        .map(item => {
          const { name, objectId, orgSequence, orgMajors, orgType, displayName } = item
          let value = name
          if (orgType === '部门')value = displayName.split(this.$store.getters.organization.name)[1]
          return { value, objectId, orgSequence, orgMajors, displayName }
        })
      cb(arr)
    },
    beforeSubmit(target) {
      target.organization = toPointer('Organization2', this.editOrg.objectId)
      const found = this.schemaObj.positionSchema.options.find(item => item.name === target.position)
      if (found) {
        target.isMaster = found.isMaster
        target.positionCode = found.sortCode
      }
      target.orgSequence = this.editOrg.orgSequence
      target.orgDisplayName = this.editOrg.displayName
    },
    beforeEdit(target) {
      console.log(target.organization)

      target.organization = target.organization.name
    }
  }
}
</script>
