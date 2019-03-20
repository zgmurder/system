import { queryListByKeyValue,toPointer } from "@/api/baseApi";

export default {
  data() {
    return {
      standardForm: {
        fieldType: "select",
        placeholder: "训练大纲",
        label: "训练大纲",
        vModel: "standard",
        standard: "",
        options: [],
        optValue: "objectId",
        required: true,
        noDataText: "请录入大纲",
        onChange: (obj, value) => (this._standard = value)
      },
      standardTable: {
        prop: "standard",
        label: "大纲",
        noFilter:true,
        handleValue: value => (value||{}).name,
        filterMethod:this.filterHandler,
        filterMultiple: false
      },
      temJson:{}
    };
  },
  async created() {
    this.standardForm.options = await queryListByKeyValue("TrainStandard");
    this._standard = (this.standardForm.options[0] || {}).objectId;
    this.standardForm.standard = this._standard;
    this.standardTable.filters = this.standardForm.options.map(item => ({
      text: item.name,
      value: `${item.objectId}_${item.className}`
    }));
    
    //this.$set(this.standardTable,'filterMethod',this.filterHandler)
    //this.standardTable.filterMethod = this.filterHandler;
    this.schema.splice(0, 0, this.standardForm);
    this.columns.push(this.standardTable)
    
    // this.standardForm = null;
    // this.standardTable = null;
  },
  methods: {
    beforeSubmit(target){
      target.standard = toPointer('TrainStandard',target.standard)
      this.reBeforeSubmit && this.reBeforeSubmit(target)
    },
    beforeEdit(target){
      target.standard = target.standard.objectId;
      this.reBeforeEdit && this.reBeforeEdit(target)
    },
    filterHandler(value, row, column) {
      this.temJson[column.id] = column.property;
      return true;
    },
    dialogIsClose() {
        const found = this.schema.find(item=>item.vModel === 'standard');
        found[found.vModel] = this._standard;
        this.dialogIsCloseAfter &&  this.dialogIsCloseAfter()
    }
  }
};
