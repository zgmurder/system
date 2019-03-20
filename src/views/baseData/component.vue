<template>
    <div class="property">
        <tableSchema
            border
            stripe
            :data="tableList"
            v-bind="$attrs"
            @filter-change='handleTableFilter'
            @deleteItem="deleteItem"
            @editItem="editItem"
            :columns="columns">
        </tableSchema>
        <div style="display: flex;justify-content: space-between;padding:10px">
            <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true" circle> </el-button>
            <el-pagination
                @current-change="fetchTableList"
                :current-page="curPage"
                :page-size="10"
                background
                layout="total, prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
        <el-dialog
            :title="objectId?'修改数据':'添加数据'"
            :append-to-body="true"
            :close-on-click-modal="false"
            @close="dialogIsClose"
            width="80%"
            :visible.sync="dialogVisible">
            <formSchema ref="formSchema" :schema="schema" :editing="!!objectId" @formFinish="formFinish"> </formSchema>
        </el-dialog>
        <div class="search" ref="search">
                <el-input size="mini" placeholder="请输入内容" clearable v-model="filterOptions.contains[1]" @input="handleSearch">
                    <el-select v-model="filterOptions.contains[0]" slot="prepend" style="width:70px" placeholder="请选择">
                        <el-option :label="item.label.slice(-2)" :value="item.prop" v-for="(item,index) in searchColumns" :key="index"></el-option>
                    </el-select>
                </el-input>
                <!-- <el-button  size="mini"  type="primary" style="margin-left:-5px;z-index:3" icon="el-icon-search" :disabled="!searchText" @click="handleSearch"></el-button> -->
            </div>
        
    </div>
</template>

<script>
    import tableSchema from '@/components/tableComponent'
    import formSchema from '@/components/formSchema'
    import {queryList,saveItem,deleteItem,fetchTotal} from '@/api/baseApi'
    export default {
        name: "property",
        components: {
            tableSchema,
            formSchema
        },
        props:{
            columns: {
                type: Array,
                required: true,
            },
            schema: {
                type: Array,
                required: true,
            },
            
        },
        data() {
            return {
                tableList:[],
                curPage:1,
                dialogVisible:false,
                objectId:undefined,
                total:0,
                filterOptions:{
                    contains:['',''],
                    equalTo:{}
                }
            }
        },
        computed:{
            className(){
                const arr = this.$route.path.split('/');
                const className = arr[arr.length - 1];
                return className.slice(0, 1).toUpperCase() + className.slice(1);  
            },
            searchColumns(){
                return this.columns.filter(item=>!item.noFilter)
            }
        },
        created(){
            //this._initSchema = this.$units._cloneDeep(this.schema);
            this.filterOptions.contains[0] = this.columns[0].prop;
            this.fetchTableList();
            setTimeout(()=>{
                this.$refs.search && (this.$refs.search.style['z-index'] = 5)
            },1000)
        },
        beforeDestroy() {
            this.$refs.search.style['z-index'] = -1
        },
        methods: {
            handleSearch(){
                clearTimeout(this.timer)
                this.timer = setTimeout(()=>{
                    this.fetchTableList(1)
                },500)
            },
            async fetchTableList(curPage,filterArr){
                this.curPage = curPage || this.curPage
                const result = await queryList(this.className,this.curPage,this.filterOptions);
                this.tableList = result.list;
                this.total = result.total
                //this.pageConfig.total = result.total;
                // const query = new this.$Client.Query(this.$Client[this.className]);
                // if(curPage){
                //     this._curPage = curPage;
                //     query.skip((curPage-1)*this.pageConfig.pageSize).limit(this.pageConfig.pageSize);
                // }else query.limit(this.pageConfig.pageSize);
                // const result = (await this.$backendService.queryList(this.className, query));
                // this.tableList = result.list;
                // this.pageConfig.total = result.total;
            },
            dialogIsClose(){
                // const findSchema = (self) => !self.schema ? findSchema(self.$parent) : self.schema;
                // const schema = findSchema(this.$parent);
                // schema.length = this._initSchema.length;
                // schema.forEach((item,index)=>{
                //     const obj = this._initSchema[index];
                //     item[item._name] = obj[obj._name]
                // });
                // findSchema(this.$parent);
                // this.objectId = undefined;
                this.$refs.formSchema.initForm()
                this.objectId = undefined;
                this.$emit('dialogIsClose')
            },
            async formFinish(formData){
                this.$parent.beforeSubmit && this.$parent.beforeSubmit(formData);
                if(this.objectId)formData.objectId = this.objectId;
                formData.className = this.className;
                await saveItem(formData)
                this.dialogVisible = false;
                this.$message({showClose: true,type: 'success', message: this.objectId ? '修改成功' : '添加成功'});
                this.fetchTableList()
                // await this.$backendService.addOrUpdateItem(this.className, formData);
                // this.dialogVisible = false;
                // this.$message({showClose: true,type: 'success', message: this.objectId ? '修改成功' : '添加成功'});
                // this.fetchTableList(this._curPage)
            },
            async deleteItem(row) {
                const isOk = await this.$confirm('确定要删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'                     
                }).catch(()=>false)
                if(!isOk)return;
                row.className = this.className;
                await deleteItem(row);
                this.$message({showClose: true,type: 'success', message: '删除成功',});
                this.fetchTableList()
                // const isOk = await this.$units.confirm('确定要删除吗？');
                // if(!isOk)return;
                // await this.$backendService.deleteItem(this.className, row);
                // this.$message({showClose: true,type: 'success', message: '删除成功',});
                // this.fetchTableList(this._curPage)
            },
            editItem(row) {
                this.dialogVisible = true;
                this.objectId = row.objectId;
                const target = this.$tools.cloneDeep(row);
                this.$parent.beforeEdit && this.$parent.beforeEdit(target);
                setTimeout(()=>{
                    this.schema.forEach(item => {
                        item[item.vModel] = target[item.vModel];
                    });
                },100)
                setTimeout(()=>{
                    this.$parent.afterEdit && this.$parent.afterEdit(target);
                },200)
            },
            //filterHandler
            
            handleTableFilter(value){
                const key = Object.keys(value)[0];
                const property = this._temJson[key];
                this.filterOptions.equalTo[property] = value[key][0];
                
                this.fetchTableList(1)
            }
        }
    }
</script>
<style lang="scss">
    .search{
        position:fixed;
        top:10px;
        left:50%;
        display:flex;
        z-index: -1;
    }
</style>