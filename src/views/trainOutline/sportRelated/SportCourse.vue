
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
  TestRequirement,
  CountType
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
        { prop: "name", label: "课目名称", style: { color: "#F56C6C" }},
        //{prop: 'seq', label: '序号'},
        //{ prop: "orgType", label: "单位类型" },
        {
          prop: "sportCategory",
          label: "课目分类",
          //handleValue: value => value && value.join("、")
        },
        {
          prop: "require",
          label: "训练要求",
          //handleValue: value => value && value.join("、")
        },
        { prop: "scoreCriteria", label: "评分标准" },
        { prop: "placeTypes", label: "场地要求" },
        {
          prop: "countType",
          label: "计数方式",
          //handleValue: value => value && value.join("、")
        },
        { prop: "isAscending", label: "计数方式",
            handleValue:(value,row)=>this.makeupCountType(row)
        },
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
        // {
        //   prop: "testContents",
        //   label: "考核内容",
        //   handleValue: value => {
        //     return value && value.map(item=>{
        //       const {testReq,content} = item;
        //       return `${content}(${testReq})`
        //     }).join('；')
        //   },
        //   style: { color: "#F56C6C", cursor: "pointer" }
        // }
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
        // {
        //   fieldType: "select",
        //   placeholder: "大纲分册",
        //   label: "大纲分册",
        //   vModel: "section",
        //   optValue: "objectId",
        //   section: "",
        //   options: [],
        //   required: true,
        //   filterable: true,
        //   onChange: (obj, value) => (this._section = value)
        // },
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
          placeholder: "课目分类",
          label: "课目分类",
          vModel: "sportCategory",
          sportCategory: '',
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
          scoreCriteria: "百分制",
          options: ScoreCriteriaOptions,
          required: true
        },
        {
          fieldType: "select",
          placeholder: "场地要求",
          label: "场地要求",
          vModel: "placeTypes",
          filterable:true,
          multiple: true,
          placeTypes: [],
          options: []
        },
        {
          fieldType: "select",
          placeholder: "计数单位",
          label: "计数单位",
          vModel: "countType",
          countType: "",
          options: CountType,
          //required: true
        },
        {
          fieldType: "select",
          placeholder: "计数方式",
          label: "计数方式",
          vModel: "isAscending",
          optValue:'value',
          options: [{name:'递增评分',value:true},{name:'递减评分',value:false}],
          //required: true
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
      this.schemaObj.sportCategorySchema.options = await queryListByKeyValue("SportCategory");
      this.schemaObj.placeTypesSchema.options = await queryListByKeyValue("PlaceType");
    }, 500);
  },
  watch: {
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
      target.subcourses = target.subcourses.map((item,index)=>{
        const [seq,name,require] = item.replace(/[.-]/g,',').split(',')
        const subcourses = target['subcourses_'+index].map(subItem=>{
          const [seq,name,require] = subItem.replace(/[.-]/g,',').split(',')
          return {seq,name,require}
        })
        delete target['subcourses_'+index]
        return {seq,name,require,subcourses}
      })
      target.isAscending = Boolean(target.isAscending)
    },
    reBeforeEdit(target) {
      this._subcourses = [...target.subcourses]
      target.subcourses = target.subcourses.map(item=>{
        const {seq,name,require,subcourses} = item
        return `${seq}.${name}-${require}`
      });
      target.isAscending = target.countType ? target.isAscending : undefined
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
    makeupCountType(item) {
        let display = '';
        if (item.countType === CountType.Time) {
            item.isAscending?(display=`按${item.countType}计数,递增评分`):(display=`按${item.countType}计数,递减评分`);
        } else if (item.countType === CountType.Amount) {
            item.isAscending?(display=`按${item.unitType}数计数,递增评分`):(display=`按${item.unitType}数计数,递减评分`);
        }
        return display;
    }
  }
};
</script>
