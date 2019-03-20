<template>
  <div class="wrapper">
    <el-tabs v-model="activeOrgId" type="card">
        <el-tab-pane :label="$store.getters.organization.name" :name="$store.getters.organization.objectId"> </el-tab-pane>
        <el-tab-pane v-for="org in orgOptions" :label="org.name" :key="org.objectId" :name="org.objectId"> </el-tab-pane>
    </el-tabs>
    <div class="wrapper-body">
      <div class="body-table">
        <el-button class="creat-btn" v-if="$tools.isEmpty(tableData)" @click="startCreated" type="primary" icon="el-icon-tickets">创建</el-button>
        <DailyReport :table-data="tableData" v-else/>
      </div>
      <Calendar @dayIsClick="dayIsClick" :markDates="arr"/>
    </div>
  </div>
</template>

<script>
import Calendar from "@/components/Calendar";
import { queryListByOptions } from "@/api/baseApi";
import { getTableInfoByOrg } from "@/api/dailyReport";
import DailyReport from "./table/DailyReport";
export default {
  components: { Calendar,DailyReport },
  data() {
    return {
      arr: [new Date(2019, 2, 21), new Date(2019, 2, 22), new Date(2019, 2, 23)],
      orgOptions:[],
      activeOrgId:this.$store.getters.organization.objectId,
      tableData:{}
    };
  },
  created() {
    const options = {
      notEqualTo:{
        orgCategory:this.$store.getters.organization.orgCategory
      },
      contains:{
        displayName:this.$store.getters.organization.displayName
      }
    }
    queryListByOptions('Org',options).then(list=>{
      this.orgOptions = list
    })
  },
  methods: {
    dayIsClick(date) {
      console.log(date);
    },
    startCreated(){
       getTableInfoByOrg(this.$store.getters.organization).then(result=>{
        this.tableData = result
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  padding: 10px;
  .wrapper-body{
    display: flex;
    justify-content: space-between;
    .body-table{
      border:1px solid  #DCDFE6;
      width: calc(100% - 330px);
      position: relative;
      .creat-btn{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%)
      }
    }
  }
}
</style>