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
            <!-- <el-pagination
                @current-change="fetchTableList"
                :current-page="curPage"
                :page-size="10"
                background
                layout="total, prev, pager, next"
                :total="total">
            </el-pagination> -->
            <el-pagination
                @size-change="handlePage($event,'limit')"
                @current-change="handlePage($event,'skip')"
                :current-page="options.pageConfig.skip"
                background
                :page-sizes="[10, 20, 50, 100]"
                :page-size="options.pageConfig.limit"
                layout="total, sizes, prev, pager, next, jumper"
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
                <el-input size="mini" placeholder="请输入内容" clearable v-model="options[filterName]" @input="handleSearch(false)">
                    <el-select v-model="filterName" slot="prepend" style="width:70px" placeholder="请选择">
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
    import {queryList,saveItem,deleteItem,fetchTotal,toPointer} from '@/api/baseApi'
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
                },
                options:{
                    pageConfig:{
                        skip:1,
                        limit:10
                    }
                },
                isDim:false,
                filterName:''
            }
        },
        computed:{
            className(){
                if(this.$parent.className)return this.$parent.className
                const arr = this.$route.path.split('/');
                const className = arr[arr.length - 1];
                return className.slice(0, 1).toUpperCase() + className.slice(1);  
            },
            searchColumns(){
                return this.columns.filter(item=>!item.noFilter)
            },
            parentDim(){
                return this.$parent.$data.isDim
            }
        },
        watch: {
            'filterName':{
                handler(newValue,oldValue){
                    if(oldValue)this.options[oldValue] = '';
                },
                immediate:false
            }
        },
        created(){
            //this._initSchema = this.$units._cloneDeep(this.schema);
            // const {options,isDim} = this.$parent.$data;
            // this.$tools.isEmpty(options) && Object.assign(this.options,options);
            // this.isDim = isDim
            this.filterName = this.columns[0].prop;
            //this.filterOptions.contains[0] = this.columns[0].prop;
            this.fetchTableList();
            setTimeout(()=>{
                this.$refs.search && (this.$refs.search.style['z-index'] = 5)
            },1000);
        },
        beforeDestroy() {
            this.$refs.search.style['z-index'] = -1
        },
        methods: {
            handleSearch(isChange,filterName){
                // boolean && (this.filterOptions.contains[1] = '' );
                // console.log(this.filterName,filterName)
                clearTimeout(this.timer)
                this.timer = setTimeout(()=>{
                    this.isDim = true
                    this.options.pageConfig.skip = 1
                    this.fetchTableList()
                },500)
            },
            handlePage(value,name){
                // console.log(skip,limit)
                this.options.pageConfig[name] = value;
                if(name === 'limit')this.options.pageConfig.skip = 1;
                this.fetchTableList()
            },
            async fetchTableList(curPage,filterArr){
                // this.curPage = curPage || this.curPage
                const result = await queryList(this.className,this.options,this.isDim,this.$parent.initOptions);
                this.tableList = result.list;
                this.total = result.total;
                this.isDim = false;
            },
            dialogIsClose(){
                this.$refs.formSchema.initForm()
                this.objectId = undefined;
                this.$emit('dialogIsClose')
            },
            async formFinish(formData){
                this.$parent.beforeSubmit && this.$parent.beforeSubmit(formData);
                if(this.objectId)formData.objectId = this.objectId;
                await saveItem(this.className,formData)
                this.dialogVisible = false;
                this.$message({showClose: true,type: 'success', message: this.objectId ? '修改成功' : '添加成功'});
                this.fetchTableList()
            },
            async deleteItem(row) {
                const isOk = await this.$confirm('确定要删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'                     
                }).catch(()=>false)
                if(!isOk)return;
                await deleteItem(this.className,row);
                this.$message({showClose: true,type: 'success', message: '删除成功',});
                this.fetchTableList()
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
            
            handleTableFilter(value){
                const key = Object.keys(value)[0];
                const property = (this.$parent.temJson||{})[key];
                let equalToValue = value[key][0]
                if(equalToValue){
                    const arr = equalToValue.split('_')
                    equalToValue = arr[0]
                    if(arr[1])equalToValue = toPointer(arr[1],arr[0])
                }
                this.filterOptions.equalTo[property] = equalToValue;
                this.fetchTableList(1)
            }
        }
    }
</script>
<style lang="scss">
    .search{
        position:fixed;
        top:0;
        left:50%;
        display:flex;
        z-index: -1;
        padding: 10px;
    }
</style>