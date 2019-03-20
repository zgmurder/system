
<template>
  <div class="property">
    <formAndTable
      :schema="schema"
      ref="formAndTable"
      :columns="columns"
      @dialogIsClose="dialogIsClose"
    ></formAndTable>
  </div>
</template>

<script>
import formAndTable from "@/components/TableAndForm";
//import newComSubCourse from '@/pages/common/new-com-subCourse'
import {
  OrgType,
  PersonProperty,
  TrainRequirement,
  ScoreCriteria2,
  OrgSequences,
  TestRequirement
} from "@/const/index";
import { queryListByKeyValue, toPointer } from "@/api/baseApi";
import standardMixin from "../standardMixin";
const ScoreCriteriaOptions = Object.values(ScoreCriteria2).map(
  item => item.name
);
const OrgSequenceOptions = Object.values(OrgSequences).map(item => item.name);
// 课目时间表
// const CourseTimeSchema = new Schema({
//  course: [{ type: Schema.Types.ObjectId, ref: 'Course' }],    // 训练课目
//  standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 训练大纲
//  section: { type: Schema.Types.ObjectId, ref: 'TrainSection' },    // 训练大纲
//  orgCategories: [String],                        // 课目适用的单位分类列表
//  personProperties: [String],                     // 课目适用的人员属性列表,一般是一个
//  serviceReq: String,                             // 勤务类型
//  task: [String],                                   // 训练任务(可选)
//  hoursInDay: Number,                             // 昼训时间要求
//  hoursAtNight: Number,                           // 夜训时间要求
// });
export default {
  components: {
    formAndTable
  },
  mixins: [standardMixin],
  data() {
    return {
      columns: [
        {
          prop: "section",
          label: "大纲分册",
          handleValue: value => value.name,
          style: { color: "#67C23A" }
        },
        {
          prop: "course",
          label: "课目名称",
          style: { color: "#F56C6C" },
          handleValue: course => (course || {}).name
        }, //handleValue:value=>value && value.map(item=>item.name).join('、')
        {
          prop: "orgCategories",
          label: "单位分类",
          handleValue: value => value.join("、")
        },
        {
          prop: "personProperties",
          label: "人员属性",
          handleValue: value => value.join("、")
        },
        {
          prop: "task",
          label: "对应任务"
          //handleValue: value => value.join("、")
        },
        {
          prop: "subjects",
          label: "训练课题",
          handleValue: value => value && value.join("、"),
          style: { color: "#67C23A" }
        }
      ],
      schema: [
        //{fieldType: "input",width:'50%', placeholder: "训练大纲", label: "训练大纲", vModel: "standard", standard: '',disabled:true},
        {
          fieldType: "select",
          placeholder: "大纲分册",
          label: "大纲分册",
          vModel: "section",
          optValue: "objectId",
          width: "66%",
          section: "",
          options: [],
          required: true,
          filterable: true,
          onChange: (obj, value) => (this._section = value)
        },
        {
          fieldType: "select",
          width: "50%",
          placeholder: "课目名称",
          label: "课目名称",
          vModel: "course",
          filterable: true,
          required: true,
          optValue: "objectId",
          options: []
        },
        // {fieldType: "input-number", placeholder: "课目序号", label: "课目序号", vModel: "seq", seq: 0},
        {
          fieldType: "select",
          placeholder: "人员属性",
          label: "人员属性",
          width: "50%",
          required: true,
          vModel: "personProperties",
          personProperties: [],
          multiple: true,
          options: []
        },
        // {fieldType: "select", placeholder: "单位类型", label: "单位类型", vModel: "orgType", orgType: '',options:[],},
        {
          fieldType: "select",
          width: "66%",
          placeholder: "单位分类",
          label: "单位分类",
          required: true,
          vModel: "orgCategories",
          orgCategories: [],
          multiple: true,
          options: []
        },
        {
          fieldType: "select",
          placeholder: "对应任务",
          label: "对应任务",
          vModel: "task",
          required: true,
          task: '',
          options: [],
          disabled: false
        },
        {
          fieldType: "select",
          placeholder: "训练课题",
          label: "训练课题",
          vModel: "subjects",
          width: "66%",
          subjects: [],
          options: [],
          multiple: true,
          disabled: false
        },
        {
          fieldType: "select",
          placeholder: "对应勤务",
          label: "对应勤务",
          vModel: "serviceReq",
          serviceReq: "",
          options: [],
          disabled: false
        }
      ]
    };
  },

  watch: {
    "schemaObj.standardSchema.standard": {
      async handler(newVal) {
        if (!newVal) return (this.schemaObj.sectionSchema.options = []);
        this.schemaObj.sectionSchema.options = await queryListByKeyValue(
          "TrainSection",
          {
            standard: toPointer("TrainStandard", newVal)
          }
        );
      }
    },
    "schemaObj.sectionSchema.section": {
      async handler(newValue) {
        const isEdit = this.$refs.formAndTable.objectId;
        !isEdit && (this.schemaObj.courseSchema.course = "");
        if (!newValue) {
          this.schemaObj.personPropertiesSchema.personProperties = [];
          this.schemaObj.personPropertiesSchema.options = [];
          this.schemaObj.orgCategoriesSchema.orgCategories = [];
          this.schemaObj.orgCategoriesSchema.options = [];
          this.schemaObj.courseSchema.options = [];
        } else {
          const section =
            this.schemaObj.sectionSchema.options.find(
              item => item.objectId === newValue
            ) || this._editSection;
          
          !isEdit &&
            (this.schemaObj.personPropertiesSchema.personProperties = [
              ...section.personProperties
            ]);
          this.schemaObj.personPropertiesSchema.options = [
            ...section.personProperties
          ];
          !isEdit &&
            (this.schemaObj.orgCategoriesSchema.orgCategories = [
              ...section.orgCategories
            ]);
          this.schemaObj.orgCategoriesSchema.options = [
            ...section.orgCategories
          ];

          this.schemaObj.courseSchema.options = await queryListByKeyValue(
            "Course",
            {
              section: toPointer("TrainSection", newValue)
            }
          );
        }
      }
    },
    "schemaObj.courseSchema.course": {
      handler(newValue) {
        if (newValue && this.schemaObj.courseSchema.options.length) {
          const course = this.schemaObj.courseSchema.options.find(
            item => item.objectId === newValue
          );
          if (course) {
            //   this.schemaObj.taskSchema.task = this.$tools.uniq([
            //     ...course.tasks,
            //     ...this.schemaObj.taskSchema.task
            //   ]);
            this.schemaObj.taskSchema.options = this.$tools.uniq([
              ...course.tasks,
              ...this.schemaObj.taskSchema.options
            ]);
            //   this.schemaObj.serviceReqSchema.serviceReq = this.$tools.uniq([
            //     ...course.serviceReq,
            //     ...this.schemaObj.serviceReqSchema.serviceReq
            //   ]);
            this.schemaObj.serviceReqSchema.options = this.$tools.uniq([
              ...course.serviceReq,
              ...this.schemaObj.serviceReqSchema.options
            ]);
            //this.schemaObj.majorReqSchema.majorReq = course.majorReq;
          }
        }
      }
    },
    "schemaObj.taskSchema.task": {
      async handler(newValue) {
          if(newValue){
            const orgCategory = await queryListByKeyValue(
            "OrgCategory",
            {
                name: this.schemaObj.orgCategoriesSchema.orgCategories[0]
            });
            const found = orgCategory[0].optionalTasks.find(item=>item.name === newValue)
            if(found){
                this.schemaObj.subjectsSchema.options = [...found.optionalSubjects]
                const isEdit = this.$refs.formAndTable.objectId;
                !isEdit && (this.schemaObj.subjectsSchema.subjects = [...found.optionalSubjects])
            }
          }
      }
    }
  },
  computed: {
    schemaObj() {
      return this.schema.reduce((prev, curr) => {
        prev[`${curr.vModel}Schema`] = curr;
        return prev;
      }, {});
    }
  },
  methods: {
    reBeforeSubmit(target) {
      target.section = toPointer("TrainSection", target.section);
      target.course = toPointer("Course", target.course)
    },
    reBeforeEdit(target) {
      this._editSection = { ...target.section };
      target.section = target.section.objectId;
      target.course = target.course.objectId;
    }
  }
};
</script>
