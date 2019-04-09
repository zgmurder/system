<template>
  <div class="property">
    <formAndTable ref="formAndTable" :schema="schema" :columns="columns"/>
  </div>
</template>

<script>
import formAndTable from '@/components/TableAndForm'
import swichCom from './swich'
import { saveList, getServerDate } from '@/api/baseApi'
export default {
  components: {
    formAndTable
  },
  data() {
    return {
      columns: [
        { prop: 'name', label: '大纲名称' },
        {
          prop: 'active',
          label: '是否启用',
          noFilter: true,
          component: swichCom,
          notToFalse: true,
          change: (tableList, column, objectId) => {
            tableList.forEach(item => {
              if (item.objectId !== objectId) {
                if (item[column.prop]) {
                  item.endTime = getServerDate()
                }
                item[column.prop] = false
              } else {
                item.startTime = getServerDate()
              }
            })
            saveList([...tableList]).then(res => {
              this.$message.success('成功激活大纲')
              this.$refs.formAndTable.fetchTableList()
            })
          }
        },
        { prop: 'startTime', label: '启用日期', noFilter: true, handleValue: parseDate => parseDate && this.$tools.parseTime(parseDate, '{y}年{m}月{d}日') },
        { prop: 'endTime', label: '停用日期', noFilter: true, handleValue: parseDate => parseDate && this.$tools.parseTime(parseDate, '{y}年{m}月{d}日') }
      ],
      schema: [
        {
          fieldType: 'input',
          placeholder: '大纲名称',
          required: true,
          label: '大纲名称',
          vModel: 'name'
        }
      ]
    }
  }
}
</script>
