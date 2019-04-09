<template>
  <div class="root-page">
    <formSchema v-show="$tools.isEmpty(tableData)" :schema="schema" class="form-schema" @formFinish="formFinish">
      <h4 slot="title" class="title">
        <!-- <el-button class="title-btn" assess-course-category="text" size="mini">添加考核事件</el-button> -->
        <span>登记课目成绩</span>
        <!-- <el-button class="title-btn" assess-course-category="text" size="mini">查看已登记课目</el-button> -->
      </h4>
    </formSchema>
    <component v-if="!$tools.isEmpty(tableData)" :pattern-is-edit="patternIsEdit" :is="componentName" :table-data="tableData">
      <template slot-scope="{data}">
        <el-button-group v-if="patternIsEdit">
          <el-button type="primary" size="mini" plain @click="cancelDailyReport">取消</el-button>
          <el-button type="success" size="mini" @click="saveDailyReport(data)">保存</el-button>
        </el-button-group>
        <el-button-group v-else>
          <!-- <el-button :disabled="!isRepair" type="danger" size="mini" @click="deleteDailyReport">删除</el-button> -->
          <el-button type="primary" size="mini" @click="goingCreat">继续创建</el-button>
          <el-button type="success" size="mini" @click="patternIsEdit = true">编辑</el-button>
        </el-button-group>
      </template>
    </component>
  </div>
</template>

<script>
import formSchema from '@/components/formSchema'
import { AssessCourseCategory, SportTestCategories } from '@/const/index'
import { queryListByOptions, toPointer, getCourse, getServerDate, makeupCourseName } from '@/api/baseApi'
import { initAssessEvent, saveAssessEvent } from '@/api/scoreRegister'
import SportEvent from './table/SportEvent'
import AssessEvent from './table/AssessEvent'
import PhysicalShape from './table/PhysicalShape'
export default {
  components: {
    formSchema,
    SportEvent,
    AssessEvent,
    PhysicalShape
  },
  props: {},
  data() {
    return {
      schema: [
        {
          fieldType: 'select',
          width: '100%',
          placeholder: '考核事件',
          label: '考核事件',
          required: true,
          vModel: 'assessment',
          valueKey: 'objectId',
          options: []
        },
        {
          fieldType: 'select',
          width: '100%',
          placeholder: '考核单位',
          label: '考核单位',
          required: true,
          vModel: 'organization',
          valueKey: 'objectId',
          options: [],
          onChange: (obj, value) => {
            const disabled = !value
            this.schemaObj.assessCourseCategorySchema.assessCourseCategory = AssessCourseCategory.Train
            this.schemaObj.assessCourseCategorySchema.disabled = disabled
            this.schemaObj.sportTestCategorySchema.sportTestCategory = SportTestCategories[0]
            this.schemaObj.courseSchema.disabled = disabled
            this.schemaObj.trainerSchema.disabled = disabled
            this.getCourse(AssessCourseCategory.Train)
          }
        },
        {
          fieldType: 'date-picker',
          width: '100%',
          placeholder: '考核日期',
          label: '考核日期',
          required: true,
          vModel: 'date',
          date: getServerDate()
        },
        {
          fieldType: 'radio-group',
          width: '100%',
          placeholder: '登记类型',
          label: '登记类型',
          required: true,
          vModel: 'assessCourseCategory',
          assessCourseCategory: AssessCourseCategory.Train,
          disabled: true,
          options: AssessCourseCategory,
          onChange: (item, value) => {
            if (value === AssessCourseCategory.Train) { this.schemaObj.sportTestCategorySchema.sportTestCategory = SportTestCategories[0] }
            this.schemaObj.courseSchema.required = !(value === AssessCourseCategory.Shape)
            getCourse(value)
          }
        },
        {
          controlBy: { name: 'assessCourseCategory', handle: value => value === AssessCourseCategory.Sport },
          fieldType: 'radio-group',
          width: '100%',
          placeholder: '课目类别',
          label: '课目类别',
          required: true,
          vModel: 'sportTestCategory',
          sportTestCategory: SportTestCategories[0],
          options: SportTestCategories
        },
        {
          controlBy: { name: 'sportTestCategory', handle: value => value === SportTestCategories[1] },
          fieldType: 'radio-group',
          width: '100%',
          placeholder: '组序号',
          label: '组序号',
          required: true,
          vModel: 'groupId',
          optValue: 'index',
          groupId: 0,
          options: ['序号1', '序号2', '序号3', '序号4']
        },
        {
          controlBy: { name: 'assessCourseCategory', handle: value => value !== AssessCourseCategory.Shape },
          fieldType: 'select',
          width: '100%',
          placeholder: '选择课目',
          label: '选择课目',
          required: true,
          vModel: 'course',
          disabled: true,
          valueKey: 'objectId',
          options: []
        },
        {
          controlBy: { name: 'assessCourseCategory', handle: value => value === '军事课目' },
          fieldType: 'select',
          width: '100%',
          placeholder: '教练员',
          label: '教练员',
          vModel: 'trainer',
          disabled: true,
          options: []
        }
      ],
      tableData: {},
      componentName: 'AssessEvent',
      patternIsEdit: true
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
  watch: {},
  created() {
    const { displayName, objectId } = this.$store.getters.organization
    const options = {
      notEqualTo: { orgType: '部门' },
      contains: { displayName }
    }
    queryListByOptions('Assessment', {
      equalTo: {
        organization: toPointer('Organization2', objectId)
      }
    }).then(list => {
      this.schemaObj.assessmentSchema.options = list
    })
    queryListByOptions('Organization2', options).then(list => {
      this.schemaObj.organizationSchema.options = list
    })
    // queryListByOptions('Course', {
    //   containsAll: {
    //     orgCategories: [orgCategory]
    //   }
    // }).then(list => {
    //   console.log(list)

    // })
  },

  methods: {
    getCourse(category) {
      const targetOrg = this.schemaObj.organizationSchema.organization
      const groupId = this.schemaObj.groupIdSchema.groupId + 1
      const sportTestCategory = this.schemaObj.sportTestCategorySchema.sportTestCategory
      if (targetOrg) {
        if (category === AssessCourseCategory.Shape) return
        const parmas = category === AssessCourseCategory.Train ? targetOrg : { groupId, sportTestCategory }
        getCourse(parmas).then(list => {
          this.schemaObj.courseSchema.options = list.map(item => ({
            ...item, name: makeupCourseName(item)
          }))
        })
      }
    },
    formFinish(data) {
      initAssessEvent(data).then(initData => {
        this.patternIsEdit = true
        this.tableData = initData
      })
    },
    cancelDailyReport() {
      this.patternIsEdit = false
      if (this.tableData.objectId) this.tableData = { ...this.tableData }
      else {
        // this.activeDate = null
        this.tableData = {}
      }
    },
    saveDailyReport(data) {
      saveAssessEvent(data).then(res => {
        this.tableData = res
        this.patternIsEdit = false
        // this.getDailyReportMarks(res.date)
      })
    },
    goingCreat() {
      this.schemaObj.courseSchema.course = undefined
      this.tableData = {}
    }
  }
}
</script>
<style lang="scss" scoped>
.root-page{

    .title{
      padding-left: 30px;
      text-align: center;
      width: 100%;
      line-height: 28px;
      display: flex;
      justify-content: space-between
    }
  .form-schema{
    width: 600px;
    border:1px solid #E4E7ED;
    background: #fafafa;
    margin: 0 auto;
    padding-right: 30px;
    margin-top:30px
  }
}

</style>
