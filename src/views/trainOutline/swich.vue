<template>
  <el-switch
    v-model="row[column.prop]"
    :active-text="switchText[0]"
    :inactive-text="switchText[1]"
    @change="handleChange"
    active-color="#13ce66"
    inactive-color="#ff4949"
    :disabled="row[column.prop]"
  ></el-switch>
</template>

<script>
export default {
  components: {},
  props: ["prop"],
  //   data() {
  //     return {
  //       value: this.prop[0]
  //     };
  //   },
  watch: {},
  computed: {
    column() {
      return this.prop[1];
    },
    row() {
      return this.prop[0];
    },
    switchText() {
      return this.column.swichText || ["是", "否"];
    },
    tableList() {
      return this.prop[2];
    }
  },
  methods: {
    async handleChange(value) {
      const isOk = await this.$confirm("确定录完该大纲的数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).catch(() => false);
      if (!isOk) return this.row[this.column.prop] = !value;
      this.column.change && this.column.change(this.tableList,this.column,this.row.objectId);
    }
  },
  created() {
    //console.log(this.prop);
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.wrapper {
}
</style>