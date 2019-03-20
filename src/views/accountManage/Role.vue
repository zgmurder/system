<template>
  <div class="Role">
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="role" label="角色ID" width="180"></el-table-column>
      <el-table-column prop="nameCh" label="中文名称" width="180"></el-table-column>
      <el-table-column prop="nameEn" label="英文名称" width="180"></el-table-column>
      <el-table-column prop="withOrg" label="是否有单位">
          <template slot-scope="scope">
                <span style="color:#F56C6C">{{$tools.handlerEmpty(scope.row.withOrg)}}</span>
            </template>
      </el-table-column>
      <!-- <el-table-column prop="allowBS" label="地址"></el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import { UserRoles } from "@/const/index";

export default {
  name: "Role",
  data() {
    return {
      tableData: UserRoles
    };
  }
};
</script>
