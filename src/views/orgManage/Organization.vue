<template>
  <div class="app-container">
    <tree-org
      v-if="$store.getters.organization.objectId"
      :render-content="renderContent"
      :default-expanded-keys="[$store.getters.organization.objectId]"
      border
    />
    <el-button v-else style="display:block;margin:0 auto" type="primary" icon="el-icon-plus" @click="formDialogVisible = true">添加根单位</el-button>
    <el-dialog
      :visible.sync="formDialogVisible"
      width="90%"
      @close="dialogClose"
    >
      <formSchema ref="formSchema" :schema="schema" :editing="!!objectId" @formFinish="formFinish"/>
      <!-- {{schemaObj.name}} -->
    </el-dialog>
  </div>
</template>

<script>

import treeOrg from '@/components/Tree'
import formSchema from '@/components/formSchema'
import { fromJSON, addOrg, deleteOrg } from '@/api/organization'
import { saveItem } from '@/api/baseApi'
import { OrgOptions } from './data'
import { OrgType, OrgSequences } from '@/const/index'
import { queryListByKeyValue } from '@/api/baseApi'
//  queryListByKeyValue, toPointer
// orgMajors: depart.orgMajors,
// orgMajor: depart.orgMajors[0]||'',
// nodeCode: nodeCode++,
// parentId: organization.objectId,
// orgSequence: organization.orgSequence,
// orgCategory: orgCategory,
// orgProperty: orgProperty,
// orgType: orgType,
// height: organization.height,
// serviceType: organization.serviceType,
// childrenIds: [],
// important: false,
// specialMission: '',
// formalized: false,
// scheduleUnit: false,
// planSoldierCount: 0,
// address: '',
// gis: {},
// sentryCount: 0,
// deleted: false
export default {
  name: 'TreeTableDemo',
  components: { treeOrg, formSchema },
  data() {
    return {
      formDialogVisible: false,
      schema: [
        {
          fieldType: 'input',
          placeholder: '上级单位',
          label: '上级单位',
          vModel: 'parentName',
          disabled: true
        },
        {
          fieldType: 'autocomplete',
          fetchSuggestions: this.querySearch,
          placeholder: '单位名称',
          label: '单位名称',
          vModel: 'name',
          name: '',
          required: true
        },
        {
          fieldType: 'input',
          placeholder: '单位全称',
          label: '单位全称',
          vModel: 'displayName',
          displayName: '',
          disabled: true
        },
        {
          fieldType: 'select',
          placeholder: '编制序列',
          label: '编制序列',
          vModel: 'orgSequence',
          orgSequence: undefined,
          options: OrgSequences,
          optValue: 'type',
          required: true
        },
        {
          fieldType: 'select',
          placeholder: '单位类型',
          label: '单位类型',
          vModel: 'orgType',
          orgType: '',
          options: Object.values(OrgType),
          required: true
        },
        {
          fieldType: 'select',
          placeholder: '单位分类',
          label: '单位分类',
          vModel: 'orgCategory',
          filterable: true,
          orgCategory: '',
          options: [],
          required: true
        },
        {
          fieldType: 'select',
          placeholder: '专业类型',
          label: '专业类型',
          vModel: 'orgMajors',
          orgMajors: [],
          multiple: true,
          options: []
        },
        {
          fieldType: 'select',
          placeholder: '勤务类型',
          label: '勤务类型',
          vModel: 'serviceType',
          serviceType: '',
          options: []
        },
        {
          fieldType: 'checkbox',
          label: '特殊部队',
          vModel: 'important',
          important: false,
          border: true
        },
        {
          fieldType: 'select',
          placeholder: '特殊部队',
          label: '特殊部队',
          vModel: 'specialMission',
          specialMission: '',
          options: [],
          disabled: true
        },
        {
          fieldType: 'input-number',
          placeholder: '编制数量',
          label: '编制数量',
          vModel: 'planSoldierCount',
          planSoldierCount: 0,
          min: 0
        },
        {
          fieldType: 'input-number',
          placeholder: '海拔高度',
          label: '海拔高度',
          vModel: 'height',
          height: 0,
          min: 0
        },
        {
          fieldType: 'input',
          placeholder: '单位地址',
          label: '单位地址',
          vModel: 'address',
          address: '',
          width: '100%'
        }
        // {fieldType: "checkbox", placeholder: "是否指挥员", label: "指挥员", vModel: "isCommander", isCommander: false,border:true},
      ],
      className: 'Organization2',
      currOrg: {},
      currNode: {},
      objectId: ''
    }
  },
  computed: {
    schemaObj() {
      return this.schema.reduce((prev, curr) => {
        prev[`${curr.vModel}Schema`] = curr
        return prev
      }, {})
    },
    departOptions() {
      const found = OrgOptions.find(item =>
        item.condition.orgSequence
          ? item.condition.orgSequence === this.currOrg.orgSequence
          : item.condition.orgSequences.includes(this.currOrg.orgSequence)
      )
      return (found && found.options) || []
    }
  },
  watch: {
    'schemaObj.nameSchema.name': {
      handler(newValue, oldValue) {
        if (this.currOrg.orgSequence === 1 || !this.currOrg.orgSequence) {
          this.schemaObj.displayNameSchema.displayName = newValue
        } else if (this.currOrg.orgSequence === 2) {
          this.schemaObj.displayNameSchema.displayName = this.objectId ? newValue : `${this.currOrg.displayName}${newValue}`
        } else {
          this.schemaObj.displayNameSchema.displayName = this.objectId ? (this.currOrg.parent.displayName || '') + newValue : `${this.currOrg.displayName}${newValue}`
        }
        !this.objectId && this.handleDepart(newValue)
      }
    },
    'schemaObj.orgTypeSchema.orgType': {
      async handler(newValue) {
        if (!newValue) {
          this.schemaObj.orgCategorySchema.orgCategoryS = ''
          this.schemaObj.orgCategorySchema.options = []
        } else {
          this.schemaObj.orgCategorySchema.options = await queryListByKeyValue('OrgCategory', {
            orgType: newValue
          })
        }
      }
    }
  },
  methods: {
    //
    renderContent(h, { node, data, store }) {
      return (
        <span class='custom-tree-node'>
          <span>
            <span>{data.name}</span>
            <el-tag type='success' size='mini' class='tag'>
              {OrgSequences.find(item => item.type === data.orgSequence).name}
            </el-tag>
            <el-tag type='info' size='mini' class='tag'>
              {data.orgCategory}
            </el-tag>
            <el-tag type='warning' size='mini' class='tag'>
              {data.orgType}
            </el-tag>
          </span>
          <span>
            <el-button
              size='mini'
              type='danger'
              on-click={e => {
                e.stopPropagation()
                this.deleteOrg(data, node, store)
              }}
            >
              删除
            </el-button>
            <el-button
              size='mini'
              type='info'
              on-click={e => {
                e.stopPropagation()
                this.handeEdit(data, node)
              }}
            >
              查看编辑
            </el-button>
            <el-button
              size='mini'
              type='primary'
              on-click={e => {
                e.stopPropagation()
                this.handeAdd(data, node)
              }}
            >
              添加下级单位
            </el-button>
          </span>
        </span>
      )
    },
    dialogClose() {
      this.$refs.formSchema.initForm()
      this.objectId = ''
      this.currNode = {}
      this.currOrg = {}
    },
    handeAdd(org, node) {
      this.currOrg = org
      this.currOrg.children = []
      this.currNode = node
      this.formDialogVisible = true
      // 防止初始值被污染
      setTimeout(() => {
        this.schemaObj.parentNameSchema.parentName = this.currOrg.name
        this.schemaObj.displayNameSchema.displayName = this.currOrg.name
      })
    },
    handeEdit(data, node) {
      this.formDialogVisible = true
      this.objectId = data.objectId
      this.currOrg = data
      this.currNode = node
      // const target = this.$tools.cloneDeep(data);
      setTimeout(() => {
        this.schema.forEach(item => {
          item[item.vModel] = data[item.vModel]
        })
      }, 100)
    },
    querySearch(queryString, cb) {
      queryString && this.handleString(queryString)
      let results = this.departOptions.map(item => ({ value: item.name }))
      results = queryString
        ? results.filter(item => item.value.includes(queryString))
        : results
      cb(results)
    },
    handleString(value) {
      if (!value) return
      const parentName = this.objectId ? this.currOrg.parentName : this.currOrg.name
      if (value.includes(parentName)) {
        this.$message.warning('不能输入包含上级名称，系统已自动处理')
        this.schemaObj.nameSchema.name = value.split(parentName).join('')
      }
      // if (value) this.handleChangeOrgName();
      // else this.formData.orgCategory = "";
    },
    handleDepart(newValue) {
      if (!newValue) return
      const foundDepart = this.departOptions.find(item => item.name === newValue)
      if (foundDepart) {
        this.schemaObj.orgTypeSchema.orgType = foundDepart.orgType
        this.schemaObj.orgSequenceSchema.orgSequence = foundDepart.orgSequence
      }
      const foundOrgSequence = OrgSequences.find(item =>
        item.name.includes('支队') ? newValue.includes('支队') : newValue.includes(item.name))
      if (foundOrgSequence) {
        this.schemaObj.orgTypeSchema.orgType = foundOrgSequence.describe
        this.schemaObj.orgSequenceSchema.orgSequence = newValue.includes('支队') ? '' : foundOrgSequence.type
      }
    },
    formFinish(formData) {
      // const {orgSequence,displayName,parentName,...data} = formData
      const isRoot = this.$tools.isEmpty(this.currOrg)
      if (isRoot) {
        if (formData.name.includes('总部') && formData.orgSequence === 1) {
          saveItem(this.className, formData).then(obj => {
            const org = { ...obj.toJSON(), className: obj.className }
            this.$store.commit('SET_ORG', org)
          })
        } else return this.$message.warning('请先添加总部')
      } else {
        const { className, ...data } = formData
        // if(data.name.includes('总队') && data.orgSequence === 2)
        if (this.objectId) {
          formData.objectId = this.objectId
          const currOrg = this.currOrg
          saveItem(this.className, formData).then(res => {
            Object.assign(currOrg, formData)
            this.$message.success('修改成功')
          })
        } else {
          const currNode = this.currNode
          addOrg({ ...this.currOrg, className: this.className }, data).then(res => {
            const data = this.$tools.cleanData({ ...res.toJSON(), className: res.className })
            currNode.store.append({ ...data }, currNode)
          })
        }
      }
      this.formDialogVisible = false
      // addOrg(this.currOrg,data)
    },
    async deleteOrg(data, node, store) {
      const isOk = await this.$confirm('删除该单位将删除所有下级单位及单位下的所有人员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => false)
      if (!isOk) return
      data.className = this.className
      deleteOrg(data).then(res => {
        node.parent.data && (node.parent.data.children = [])
        node.parent.removeChild(node)
        if (!node.data.parent) this.$store.commit('SET_ORG', {})
        this.$message({ showClose: true, type: 'success', message: '删除成功' })
      }).catch(res => {
        console.log(res)
      })
    }
  }
}
</script>
