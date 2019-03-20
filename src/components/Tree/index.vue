
<template>
  <el-tree 
    node-key="objectId" 
    v-bind="$attrs"
    :load="loadNode" 
    lazy 
    @check-change="handleCheckChange">
  </el-tree>
</template>
<script>
import {fromJSON} from '@/api/organization'
export default {
  data() {
    return {
    };
  },
  methods: {
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    async loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([this.$store.getters.organization]);
      }else{
        const parseObj = await fromJSON(node.data).fetch()
        const relation = parseObj.relation('children')
        const query = relation.query()
        query.ascending("createdAt");
        query.find().then(list=>{
          list = list.map(item=>({...item.toJSON(),className:item.className}))
          return resolve(list);
        })
      }
      
    }
  }
};
</script>
<style lang="scss">
.el-tree-node__content{
  height: 3rem;
  border: 1px solid #f0f0f0;
  border-top: none;
}
.el-tree{
  border-top: 1px solid #f0f0f0;
}
.custom-tree-node{
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  width: 100%;
  align-items: center;
  padding-right: 10px;
  .tag{
    margin-left: 10px;
  }
}
</style>
