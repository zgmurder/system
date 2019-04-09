<template>
  <div class="property">
    <tableSchema
      :data="tableList"
      v-bind="$attrs"
      :columns="columns"
      border
      stripe
      v-on="$listeners"
      @filter-change="handleTableFilter"
      @deleteItem="deleteItem"
      @editItem="editItem"/>
    <div :style="{'justify-content':btnShow?'space-between':'flex-end'}" class="btn-and-page">
      <el-button v-show="btnShow" class="btn" type="primary" icon="el-icon-plus" circle @click="dialogVisible = true"/>
      <el-pagination
        :current-page.sync ="options.skip"
        :page-sizes="[10, 20, 50, 100]"
        :page-size.sync="options.limit"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSearch"
        @current-change="fetchTableList"/>
    </div>
    <el-dialog
      :title="objectId?'修改数据':'添加数据'"
      :append-to-body="true"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="80%"
      @close="dialogIsClose">
      <formSchema ref="formSchema" :schema="schema" :editing="!!objectId" @formFinish="formFinish"/>
    </el-dialog>
    <div ref="search" class="search">
      <el-input v-model="options.contains[filterName]" size="mini" placeholder="请输入内容" clearable @input="handleSearch">
        <el-select slot="prepend" v-model="filterName" style="width:70px" placeholder="请选择">
          <el-option v-for="(item,index) in searchColumns" :label="item.searchLabel || item.label.slice(-2)" :value="item.prop" :key="index"/>
        </el-select>
      </el-input>
      <!-- <el-button  size="mini"  type="primary" style="margin-left:-5px;z-index:3" icon="el-icon-search" :disabled="!searchText" @click="handleSearch"></el-button> -->
    </div>

  </div>
</template>

<script>
import tableSchema from '@/components/tableComponent'
import formSchema from '@/components/formSchema'
import { saveItem, deleteItem, toPointer, queryListAndTotal } from '@/api/baseApi'
export default {
  name: 'TableAndForm',
  components: {
    tableSchema,
    formSchema
  },
  props: {
    columns: {
      type: Array,
      required: true
    },
    schema: {
      type: Array,
      required: true
    },
    btnShow: {
      type: Boolean,
      default: true
    }

  },
  data() {
    return {
      tableList: [],
      curPage: 1,
      dialogVisible: false,
      objectId: undefined,
      total: 0,
      filterOptions: {
        contains: ['', ''],
        equalTo: {}
      },
      options: {
        skip: 1,
        limit: 10,
        contains: {}
      },
      isDim: false,
      filterName: ''
    }
  },
  computed: {
    className() {
      if (this.$parent.className) return this.$parent.className
      const arr = this.$route.path.split('/')
      const className = arr[arr.length - 1]
      return className.slice(0, 1).toUpperCase() + className.slice(1)
    },
    searchColumns() {
      return this.columns.filter(item => !item.noFilter)
    }
  },
  watch: {
    'filterName': {
      handler(newValue, oldValue) {
        if (oldValue) {
          this.options.contains[oldValue] = ''
          this.fetchTableList()
        }
      },
      immediate: false
    }
  },
  created() {
    this.filterName = this.columns[0].prop
    this.fetchTableList()
    setTimeout(() => {
      this.$refs.search && (this.$refs.search.style['z-index'] = 5)
    }, 1000)
  },
  beforeDestroy() {
    this.$refs.search.style['z-index'] = -1
  },
  methods: {
    handleSearch() {
      window.clearTimeout(this.timer)
      this.timer = window.setTimeout(() => {
        this.fetchTableList()
      }, 500)
    },
    fetchTableList(curPage, filterArr) {
      const skip = (this.options.skip - 1) * this.options.limit
      queryListAndTotal(this.className, { ...this.options, skip }).then(({ list, total }) => {
        this.tableList = list
        this.total = total
      })
    },
    dialogIsClose() {
      this.$refs.formSchema.initForm()
      this.objectId = undefined
      this.$emit('dialogIsClose')
    },
    async formFinish(formData) {
      this.$parent.beforeSubmit && this.$parent.beforeSubmit(formData)
      if (this.objectId)formData.objectId = this.objectId

      await saveItem(this.className, formData)
      this.dialogVisible = false
      this.$message({ showClose: true, type: 'success', message: this.objectId ? '修改成功' : '添加成功' })
      this.fetchTableList()
    },
    async deleteItem(row) {
      const isOk = await this.$confirm('确定要删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => false)
      if (!isOk) return
      await deleteItem(this.className, row)
      this.$message({ showClose: true, type: 'success', message: '删除成功' })
      this.fetchTableList()
    },
    editItem(row) {
      this.dialogVisible = true
      this.objectId = row.objectId
      const target = this.$tools.cloneDeep(row)
      this.$parent.beforeEdit && this.$parent.beforeEdit(target)
      setTimeout(() => {
        this.schema.forEach(item => {
          item[item.vModel] = target[item.vModel]
        })
      }, 100)
      setTimeout(() => {
        this.$parent.afterEdit && this.$parent.afterEdit(target)
      }, 200)
    },
    handleTableFilter(value) {
      console.log(value)

      // const key = Object.keys(value)[0]
      // const property = (this.$parent.temJson || {})[key]
      // let equalToValue = value[key][0]
      // if (equalToValue) {
      //   const arr = equalToValue.split('_')
      //   equalToValue = arr[0]
      //   if (arr[1])equalToValue = toPointer(arr[1], arr[0])
      // }
      // this.filterOptions.equalTo[property] = equalToValue
      // this.fetchTableList(1)
    }
  }
}
</script>
<style lang="scss">
.btn-and-page{
  display: flex;
  justify-content:space-between;
  padding:10px;
  }
.search{
    position:fixed;
    top:0;
    left:50%;
    display:flex;
    z-index: -1;
    padding: 10px;
}
</style>
