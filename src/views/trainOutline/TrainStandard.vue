<template>
  <div class="property">
    <formAndTable ref="formAndTable" :schema="schema" :columns="columns"></formAndTable>
  </div>
</template>

<script>
import formAndTable from "@/components/TableAndForm";
import { StandardState } from "@/const/index";
import swichCom from "./swich";
import { saveList,getServerDate } from "@/api/baseApi";
export default {
  components: {
    formAndTable
  },
  data() {
    return {
      columns: [
        { prop: "name", label: "大纲名称" },
        //{ prop: "state", label: "状态", noFilter: true },
        {
          prop: "active",
          label: "是否启用",
          noFilter: true,
          component: swichCom,
          notToFalse: true,
          change: (tableList, column, objectId) => {
            tableList.forEach(element => {
              if (element.objectId !== objectId) {
                  if(element[column.prop]){
                    element.endTime = getServerDate()
                  }
                  element[column.prop] = false;
              }else{
                  element.startTime = getServerDate()
              }
            });
            saveList([...tableList]).then(res => {
              this.$message.success("成功激活大纲");
              this.$refs.formAndTable.fetchTableList()
            });
          }
        },
        {prop: 'startTime', label: '启用日期',noFilter:true,handleValue:parseDate=>parseDate && this.$tools.parseTime(parseDate.iso,"{y}年{m}月{d}日")},
        {prop: 'endTime', label: '停用日期',noFilter:true,handleValue:parseDate=>parseDate && this.$tools.parseTime(parseDate.iso,"{y}年{m}月{d}日")},
        //{ label: '是否启用',component:swichCom,noFilter:true},
      ],
      schema: [
        {
          fieldType: "input",
          placeholder: "大纲名称",
          required: true,
          label: "大纲名称",
          vModel: "name"
        }
        //{fieldType: "select", placeholder: "启用状态", label: "启用状态", vModel: "state",state: '',options:Object.values(StandardState)},

        // {fieldType: "input", label: "启用状态", vModel: "state", state: '未启用',border:true,disabled:true},
        // {fieldType: "checkbox", label: "是否激活", vModel: "active", active: false,border:true,disabled:true},
      ]
    };
  },
  methods: {
    beforeSubmit(target) {
      target.active = false
      console.log(target)
    }
  }
};
</script>
