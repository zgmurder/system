<template>
  <div class="com-table">
    <el-table
      v-bind="$attrs"
      v-on="$listeners">
      <el-table-column
        v-for="(column,index) in columns"
        :key="index"
        :show-overflow-tooltip="!column.component"
        v-bind="column">
        <template slot-scope="scope">
          <component v-if="column.component" :is="column.component" :prop="[scope.row,column,$attrs.data]"/>
          <span
            v-else-if="column.handleValue"
            v-bind="column"
            @click="column.click && column.click(scope)">{{ column.handleValue(scope.row[column.prop], scope.row) }}</span>
          <span
            v-else
            v-bind="column"
            @click="column.click && column.click(scope)">{{ $tools.handlerEmpty(scope.row[column.prop], scope.row) }}</span>

        </template>
      </el-table-column>

      <!-- v-if="!noHandle" -->
      <el-table-column v-if="!noHandler" label="操作" width="150">
        <template slot-scope="scope">
          <span
            v-if="!($attrs['no-handle'] && $attrs['no-handle'](scope.row))">
            <el-button
              type="text"
              size="mini"
              icon="el-icon-view"
              @click="$emit('editItem',scope.row,scope.$index)">编辑
            </el-button>
            <el-button
              type="text"
              size="mini"
              style="color:#F56C6C"
              icon="el-icon-share"
              @click="$emit('deleteItem',scope.row,scope.$index)">删除
            </el-button>
          </span>

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
// import units from '@/config/tools'
export default {
  filters: {
    handler(row, value, handleValue) {
      const arr = value.split('.')
      const target = Array.isArray(arr) && row[arr[0]] ? arr.reduce((prev, curr) => {
        return prev[curr]
      }, row) : row[value]
      return typeof handleValue === 'function' ? handleValue(target, row) : target
    }
  },
  props: {
    columns: {
      type: Array,
      required: true
    },
    noHandler: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped>
    .is-click {
        cursor: pointer;
    }
</style>
