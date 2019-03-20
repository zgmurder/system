
<template>
  <div class="property">
    <formAndTable :schema="schema" :columns="columns" @dialogIsClose="dialogIsClose"></formAndTable>
  </div>
</template>

<script>
import formAndTable from "@/components/TableAndForm";
import { queryListByKeyValue, toPointer } from "@/api/baseApi";
import standardMixin from "../standardMixin";
import {
  OrgType,
  PersonProperty,
  TrainRequirement,
  ScoreCriteria2,
  OrgSequences,
  TestRequirement
} from "@/const/index";
const ScoreCriteriaOptions = Object.values(ScoreCriteria2).map(
  item => item.name
);
const OrgSequenceOptions = Object.values(OrgSequences).map(item => item.name);

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
          handleValue: value => (value || {}).name,
          style: { color: "#67C23A" }
        },
        { prop: "name", label: "课目名称", style: { color: "#F56C6C" }},
        //{prop: 'seq', label: '序号'},
        //{ prop: "orgType", label: "单位类型" },
        {
          prop: "orgCategories",
          label: "单位分类",
          handleValue: value => value && value.join("、")
        },
        {
          prop: "personProperties",
          label: "人员属性",
          handleValue: value => value && value.join("、")
        },
        { prop: "require", label: "训练要求" },
        { prop: "scoreCriteria", label: "评分标准" },
        { prop: "trainStep", label: "训练步骤" },
        {
          prop: "trainUnits",
          label: "训练单元",
          handleValue: value => value && value.join("、")
        },
        // { prop: "majorReq", label: "专业类型" },
        // {
        //   prop: "tasks",
        //   label: "对应任务",
        //   handleValue: value => value &&  value.join("、")
        // },
        {
          prop: "subcourses",
          label: "子课目",
          handleValue: value => {
            return value.map(item=>{
              const {seq,name,require,subcourses} = item;
              let str = `${seq}.${name}(${require})`
              if(subcourses.length){
                str = str + '：'+subcourses.map(subItem=>{
                  const {seq,name,require,subcourses} = item;
                  return `${seq}.${name}(${require})`
                }).join('+')
              }
              return str
            }).join('；')
          },
          style: { color: "#F56C6C", cursor: "pointer" }
        },
        {
          prop: "testContents",
          label: "考核内容",
          handleValue: value => {
            return value && value.map(item=>{
              const {testReq,content} = item;
              return `${content}(${testReq})`
            }).join('；')
          },
          style: { color: "#F56C6C", cursor: "pointer" }
        }
        // {prop: 'serviceReq', label: '勤务类型'},
        // {prop: 'rankL2Reqs', label: '军衔要求'},
        // {prop: 'ordnanceTypes', label: '军械类型'},
        // {
        //   prop: "placeTypes",
        //   label: "场地要求",
        //   handleValue: value => value && value.join("、")
        // }
        //{prop: 'gunnerType', label: '枪手类型'},
        /*
                    textCondition: '',                          // 课目条件
                    textStandard: '',                           // 课目标准
                    textEvaluation: '',                         // 考核要求*/
      ],
      schema: [
        {
          fieldType: "select",
          placeholder: "大纲分册",
          label: "大纲分册",
          vModel: "section",
          optValue: "objectId",
          section: "",
          options: [],
          required: true,
          filterable: true,
          onChange: (obj, value) => (this._section = value)
        },
        {
          fieldType: "input",
          placeholder: "课目名称",
          label: "课目名称",
          vModel: "name",
          name: "",
          required: true
        },
        {
          fieldType: "input-number",
          placeholder: "课目序号",
          label: "课目序号",
          vModel: "seq",
          seq: 0,
          required: true
        },
        {
          fieldType: "select",
          width: "66%",
          placeholder: "单位分类",
          label: "单位分类",
          vModel: "orgCategories",
          orgCategories: [],
          multiple: true,
          options: [],
          required: true
        },
        {
          fieldType: "select",
          placeholder: "单位类型",
          label: "单位类型",
          vModel: "orgType",
          orgType: "",
          options: [],
          required: true
        },
        {
          fieldType: "select",
          placeholder: "人员属性",
          label: "人员属性",
          vModel: "personProperties",
          personProperties: [],
          multiple: true,
          options: [],
          required: true
        },
        {
          fieldType: "select",
          placeholder: "训练要求",
          label: "训练要求",
          vModel: "require",
          require: "必训",
          options: Object.values(TrainRequirement),
          required: true
        },
        {
          fieldType: "select",
          placeholder: "评分标准",
          label: "评分标准",
          vModel: "scoreCriteria",
          scoreCriteria: "四级制",
          options: ScoreCriteriaOptions,
          required: true
        },
        {
          fieldType: "select",
          placeholder: "训练步骤",
          label: "训练步骤",
          vModel: "trainStep",
          trainStep: "",
          options: [],
          required: true
        },
        {
          fieldType: "select",
          placeholder: "训练单元",
          label: "训练单元",
          vModel: "trainUnits",
          multiple: true,
          trainUnits: [],
          options: OrgSequenceOptions,
          required: true
        },

        {
          fieldType: "select",
          placeholder: "专业类型（无数据，不可选）",
          label: "对应专业",
          vModel: "majorReq",
          majorReq: "",
          options: [],
          disabled: false
        },
        {
          fieldType: "select",
          width: "66%",
          placeholder: "对应任务（无数据，不可选）",
          label: "对应任务",
          vModel: "tasks",
          tasks: [],
          multiple: true,
          options: [],
          disabled: false
        },
        {
          fieldType: "select",
          width: "50%",
          placeholder: "对应勤务（无数据，不可选）",
          label: "对应勤务",
          vModel: "serviceReq",
          serviceReq: [],
          multiple: true,
          options: [],
          disabled: false
        },
        {
          fieldType: "select",
          width: "50%",
          placeholder: "场地要求",
          label: "场地要求",
          vModel: "placeTypes",
          multiple: true,
          placeTypes: [],
          options: []
        },

        {
          fieldType: "select",
          placeholder: "军械类型",
          label: "军械类型",
          vModel: "ordnanceTypes",
          multiple: true,
          ordnanceTypes: [],
          options: []
        },
        {
          fieldType: "select",
          placeholder: "枪手类型",
          label: "枪手类型",
          vModel: "gunnerType",
          gunnerType: "",
          options: []
        },
        {
          fieldType: "select",
          placeholder: "军衔要求",
          label: "军衔要求",
          vModel: "rankL2Reqs",
          multiple: true,
          rankL2Reqs: [],
          options: []
        },

        {
          fieldType: "input",
          width: "100%",
          placeholder: "课目条件",
          label: "课目条件",
          vModel: "textCondition",
          textCondition: ""
        },
        {
          fieldType: "input",
          width: "100%",
          placeholder: "课目标准",
          label: "课目标准",
          vModel: "textStandard",
          textStandard: ""
        },
        {
          fieldType: "input",
          width: "100%",
          placeholder: "考核要求",
          label: "考核要求",
          vModel: "textEvaluation",
          textEvaluation: ""
        },
        {
          fieldType: "select",
          placeholder: "考核内容",
          label: "考核内容",
          width: "100%",
          vModel: "testContents",
          multiple: true,
          testContents: [],
          onChange: this.handleContents,
          filterable: true,
          allowCreate: true,
          noDataText: "输入可按回车结束，默认为'必考'，可输入格式：课目名称-选考；"
        },
        {
          fieldType: "select",
          placeholder: "子课目",
          label: "子课目",
          width: "100%",
          vModel: "subcourses",
          multiple: true,
          subcourses: [],
          onChange: this.handleCourse,
          filterable: true,
          allowCreate: true,
          noDataText: "输入可按回车结束，默认为'必训'，可输入格式：课目名称-选训；"
        },
      ],
    };
  },
  created() {
    this._schemaLength = this.schema.length;
    setTimeout(async () => {
      // console.log(this.schemaObj);

      // const standardPoint = this.$backendService.getParseObject('TrainStandard',this.$parent.standard.objectId);
      // this._sectionOptions = (await this.$units.queryItemByKeyValue('TrainSection','standard',standardPoint)).list;
      // this.schemaObj.sectionSchema.options = this._sectionOptions.map(item=>item.name);
      this.schemaObj.trainStepSchema.options = await queryListByKeyValue("TrainStep");
      this.schemaObj.rankL2ReqsSchema.options = await queryListByKeyValue(
        "MilitaryRank"
      );
      this.schemaObj.ordnanceTypesSchema.options = await queryListByKeyValue(
        "OrdnanceType"
      );
      this.schemaObj.placeTypesSchema.options = await queryListByKeyValue("PlaceType");
      this.schemaObj.gunnerTypeSchema.options = await queryListByKeyValue(
        "GunnerType"
      );
    }, 500);
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
    "schemaObj.subcoursesSchema.subcourses": {
      handler(newVal) {
        if(JSON.stringify(newVal)=== this._newVal || !newVal)return;
          this._newVal = JSON.stringify(newVal);
          this.schema.splice(this._schemaLength+1,this.schema.length-this._schemaLength)
          // this.schema.length = this._schemaLength;
          newVal.forEach((item, index) => {
            const name = item.slice(2,-3)
            this.$set(this.schema, this.schema.length, {
              fieldType: "select",
              width: "100%",
              placeholder: "该课目下的二级子课目",
              label: name,
              vModel: "subcourses_" + index,
              ["subcourses_" + index]: [],
              allowCreate: true,
              multiple: true,
              filterable: true,
              onChange: this.handleCourse,
              noDataText: "输入可按回车结束，默认为'必训'，可输入格式：课目名称-选训；"
            });
          });
      }
    },
    "schemaObj.sectionSchema.section": {
      handler(newValue) {
        if (!newValue) {
          this.schemaObj.orgTypeSchema.orgType = "";
          this.schemaObj.orgCategoriesSchema.orgCategories = [];
          this.schemaObj.orgCategoriesSchema.options = [];
          this.schemaObj.personPropertiesSchema.personProperties = [];
          this.schemaObj.personPropertiesSchema.options = [];
        } else {
          const selected = this.schemaObj.sectionSchema.options.find(
            item => item.objectId === newValue
          )||this._editSection;
          this.schemaObj.orgTypeSchema.options = selected.orgTypes;
          this.schemaObj.orgTypeSchema.orgType = selected.orgTypes[0];
          //   selected.orgTypes.length === 1 &&
          //     (this.schemaObj.orgTypeSchema.orgType = selected.orgTypes[0]);
          this.schemaObj.orgCategoriesSchema.options = selected.orgCategories;
          this.schemaObj.orgCategoriesSchema.orgCategories = [
            ...selected.orgCategories
          ];
          //   selected.orgCategories.length === 1 &&
          //     (this.schemaObj.orgCategoriesSchema.orgCategories = this.$units._cloneDeep(
          //       selected.orgCategories
          //     ));
          this.schemaObj.personPropertiesSchema.options =
            selected.personProperties;
          this.schemaObj.personPropertiesSchema.personProperties = [
            ...selected.personProperties
          ];
          //   selected.personProperties.length === 1 &&
          //     (this.schemaObj.personPropertiesSchema.personProperties = this.$units._cloneDeep(
          //       selected.personProperties
          //     ));
        }
        //this._editTimeArr = [];
      }
      //isDeep: true
    },
    "schemaObj.orgCategoriesSchema.orgCategories": {
      handler(newValue) {
        if (newValue.length) {
          newValue.forEach(async orgCategory => {
            const [result] = await queryListByKeyValue("OrgCategory", {
              name: orgCategory
            });
            const majorArr = [
              ...this.schemaObj.majorReqSchema.options,
              ...result.optionalMajors
            ];
            this.schemaObj.majorReqSchema.options = this.$tools.uniq(majorArr);
            this.schemaObj.majorReqSchema.disabled = !this.schemaObj
              .majorReqSchema.options.length;
            const tasksArr = [
              ...this.schemaObj.tasksSchema.options,
              ...result.optionalTasks.map(item => item.name)
            ];
            this.schemaObj.tasksSchema.options = this.$tools.uniq(tasksArr);
            this.schemaObj.tasksSchema.disabled = !this.schemaObj.tasksSchema
              .options.length;
            const serviceReqArr = [
              ...this.schemaObj.serviceReqSchema.options,
              ...result.optionalServices
            ];
            this.schemaObj.serviceReqSchema.options = this.$tools.uniq(
              serviceReqArr
            );
            this.schemaObj.serviceReqSchema.disabled = !this.schemaObj
              .serviceReqSchema.options.length;
          });
        } else {
          this.schemaObj.tasksSchema.disabled = false;
          this.schemaObj.majorReqSchema.disabled = false;
          this.schemaObj.serviceReqSchema.disabled = false;
        }
      }
      //isDeep: true
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
      //target.standard = this.$parent.standard.objectId;
      target.section = toPointer("TrainSection", target.section);
      target.subcourses = target.subcourses.map((item,index)=>{
        const [seq,name,require] = item.replace(/[.-]/g,',').split(',')
        const subcourses = target['subcourses_'+index].map(subItem=>{
          const [seq,name,require] = subItem.replace(/[.-]/g,',').split(',')
          return {seq,name,require}
        })
        delete target['subcourses_'+index]
        return {seq,name,require,subcourses}
      })
      target.testContents = target.testContents.map(item=>{
        const [content,testReq] = item.split('-')
        return {content,testReq}
      })
    },
    reBeforeEdit(target) {
      this._editSection = {...target.section}
      target.section = target.section.objectId;
      this._subcourses = [...target.subcourses]
      target.subcourses = target.subcourses.map(item=>{
        const {seq,name,require,subcourses} = item
        return `${seq}.${name}-${require}`
      });
      if(target.testContents){
        if(this.$tools.isArray(target.testContents)){
          target.testContents = target.testContents.map(item=>{
            const {content,testReq} = item
            return `${content}-${testReq}`
          })
        }
      }else {
        target.testContents = []
      }
        
    },
    afterEdit(row){
      setTimeout(()=>{
        this._subcourses.forEach((item,index)=>{
          this.schema[this._schemaLength+index+1][`subcourses_${index}`] = item.subcourses.map(item=>{
            const {seq,name,require,subcourses} = item
            return `${seq}.${name}-${require}`
          })
        });
      },100)
        
    },
    handleCourse(obj, value){
      obj[obj.vModel] = value.map((item, index) => {
        let str;
        str = item.indexOf(".") === 1 ? item.slice(2) : item;
        str = item.length - item.indexOf("-") === 3 ? str : str + "-必考";
        return `${index + 1}.${str}`;
      });
    },
    handleContents(obj, value){
      obj[obj.vModel] = value.map((item, index) => {
        let str;
        str = item.length - item.indexOf("-") === 3 ? item : item + "-必考";
        return str
      });
    },
    dialogIsCloseAfter() {
      const found = this.schema.find(item => item.vModel === "section");
      found[found.vModel] = this._section;
    }
  }
};
</script>
