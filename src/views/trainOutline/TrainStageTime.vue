
<template>
  <div class="property">
    <formAndTable :schema="schema" :columns="columns" @dialogIsClose="dialogIsClose"></formAndTable>
  </div>
</template>

<script>
// 训练阶段时长
// const TrainStageTimeSchema = Schema({
// 	standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 训练大纲
//  orgCategories: [String],                        // 课目适用的单位分类列表,一般是一个
// 	majorReq: [String],                             // 专业类型要求
//  stageTime: [{task:[""], time:[0]}],
// });
import formAndTable from "@/components/TableAndForm";
import { OrgType, PersonProperty } from "@/const/index";
import { queryListByKeyValue } from "@/api/baseApi";
import standardMixin from "./standardMixin";
export default {
  components: {
    formAndTable
  },
  mixins: [standardMixin],
  data() {
    return {
      columns: [
        {
          prop: "orgCategories",
          label: "单位分类",
          handleValue: value => value.join("、")
        },
        {
          prop: "majorReq",
          width: "180",
          label: "专业类型",
          handleValue: value => value.join("、")
        },
        {
          prop: "stageTime",
          label: "任务训练时长信息",
          handleValue: value =>
            value.map(item => `${item.task}：需${item.time}个月`).join("；")
        }
      ],
      schema: [
        {
          fieldType: "select",
          width: "100%",
          placeholder: "适用的单位分类",
          label: "单位分类",
          vModel: "orgCategories",
          multiple: true,
          required: true,
          orgCategories: [],
          options: [],
          filterable: true
        },
        {
          fieldType: "select",
          width: "100%",
          placeholder: "专业类型",
          label: "专业类型",
          vModel: "majorReq",
          multiple: true,
          majorReq: [],
          options: []
        },
        {
          fieldType: "select",
          width: "100%",
          placeholder: "选择任务",
          label: "选择任务",
          vModel: "stageTime",
          multiple: true,
          stageTime: [],
          required: true,
          options: []
        }

        //{fieldType: "input", placeholder: "分册名称", label: "分册名称", vModel: "orgCategories", orgCategories: ''},
        //{fieldType: "input", placeholder: "分册编码", label: "分册编码", vModel: "code", code: ''},
        //{fieldType: "select",width:'50%', placeholder: "适用的单位类型", label: "单位类型", vModel: "orgTypes",multiple:true,orgTypes: [],options:Object.values(OrgType)},
        //{fieldType: "select",width:'50%', placeholder: "适用的人员属性", label: "人员属性", vModel: "personProperties", personProperties:[],multiple:true,options:PersonProperty},
      ]
    };
  },
  async created() {
    this.schemaOrgCategories.options = await queryListByKeyValue("OrgCategory");
    // this._orgCategoriesOptions = (await this.$backendService.queryListByKeyValue('OrgCategory')).list;
    // this.schemaOrgCategories.options = this._orgCategoriesOptions.map(item=>item.name);
    // this.schema[0].standard = this.$parent.standard.name;
    this._schemaLength = this.schema.length;
    this._editTimeArr = [];
  },
  watch: {
    "schemaOrgCategories.orgCategories": {
      handler(newValue) {
         let majorArr = [],taskArr = [];
         newValue.forEach(orgCategory=>{
            const found = this.schemaOrgCategories.options.find(item=>item.name === orgCategory);
            if(!found)return;
             majorArr = [...majorArr,...found.optionalMajors];
             taskArr = [...taskArr,...found.optionalTasks];
         });
         this.schemaMajorReq.options = this.$tools.uniq(majorArr);
         this.schemaStageTime.options = this.$tools.uniq(taskArr.map(item=>item.name));
        //this._editTimeArr = [];
      }
    },
    "schemaStageTime.stageTime": {
      handler(newValue) {
        if (JSON.stringify(newValue) === this._newValue || !newValue) return;
        this._newValue = JSON.stringify(newValue);
        const oldArr = this.schema.splice(
          this._schemaLength,
          this.schema.length - this._schemaLength
        );
        newValue.forEach((item, index) => {
          this.$set(this.schema, this.schema.length, {
            fieldType: "input-number",
            placeholder: "训练时长",
            label: item+'(月)',
            vModel: "time_" + index,
            ["time_" + index]:
              this._editTimeArr[index] ||
              (oldArr[index] ? oldArr[index]["time_" + index] : 0)
          });
        });
      }
    }
  },
  computed: {
    schemaOrgCategories() {
      return this.schema.find(item => item.vModel === "orgCategories");
    },
    schemaMajorReq() {
      return this.schema.find(item => item.vModel === "majorReq");
    },
    schemaStageTime() {
      return this.schema.find(item => item.vModel === "stageTime");
    }
  },
  methods: {
    beforeSubmit(target) {
      //target.standard = this.$parent.standard.objectId;
      target.stageTime = target.stageTime.map((item, index) => {
        const obj = { task: item, time: target[`time_${index}`] };
        delete target[`time_${index}`];
        return obj;
      });
    },
    beforeEdit(target) {
      this._editTimeArr = [];
      //target.standard = this.$parent.standard.name;
      target.stageTime = target.stageTime.map(item => {
        this._editTimeArr.push(item.time);
        return item.task;
      });
    },
    dialogIsCloseAfter(){
        this._editTimeArr = [];
    }
  }
};
</script>
