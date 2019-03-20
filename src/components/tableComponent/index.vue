<template>
    <div class="com-table">
        <el-table
            v-on="$listeners"
            v-bind="$attrs">
            <el-table-column
                v-for="(column,index) in columns"
                :key="index"
                :show-overflow-tooltip="!column.component"
                v-bind="column">
                <template slot-scope="scope">
                    <component :is="column.component" :prop="[scope.row,column,$attrs.data]" v-if="column.component"> </component>
                    <span v-bind="column"
                          @click="column.click && column.click(scope)"
                          v-else-if="column.handleValue">{{column.handleValue(scope.row[column.prop], scope.row)}}</span>
                    <span v-bind="column"
                          @click="column.click && column.click(scope)"
                          v-else>{{$tools.handlerEmpty(scope.row[column.prop], scope.row)}}</span>
                    
                </template>
            </el-table-column>

            <!-- v-if="!noHandle" -->
            <el-table-column label="操作" width="150"> 
                <template slot-scope="scope">
                    <span  v-if="!($attrs.noHandle && $attrs.noHandle(scope.row))">
                        <el-button type="text" size="mini" icon="el-icon-view"
                               @click="$emit('editItem',scope.row,scope.$index)">编辑
                        </el-button>
                        <el-button type="text" size="mini" style="color:#F56C6C" icon="el-icon-share"
                                @click="$emit('deleteItem',scope.row,scope.$index)">删除
                        </el-button>
                    </span>
                    
                </template>
            </el-table-column>
            <!--<el-table-column
                v-for="(column,index) in columns"
                :show-overflow-tooltip="!column.component"
                :key="index"
                :width="column.width"
                :label="column.label">
                <template slot-scope="scope">
                    <component :is="column.component"
                               :prop="handlerProp(column.prop,scope)"
                               v-if="column.component">
                    </component>
                    <span
                        v-else
                        :class="{'is-click':!!column.click}"
                        :style="column.style && column.style(scope.row)"
                        @click="column.click && column.click(scope)">
                        {{scope.row | handler(column.prop,column.handle)|handlerEmpty}}
                        &lt;!&ndash;{{$utils.handlerEmpty(scope.row[column.prop])|handler(column.handler)}}&ndash;&gt;
                    </span>
                </template>
            </el-table-column>-->
        </el-table>

       <!-- <el-pagination
            v-if="pagination"
            @current-change="currentChange"
            :current-page="pageObj.currentPage"
            :page-size="pageObj.pageSize"
            background
            style="margin-top: 20px;float: right"
            layout="total, prev, pager, next"
            :total="pageObj.total||total">
        </el-pagination>-->

    </div>
</template>
<script>
    //import units from '@/config/tools'
    export default {
        props: {
            columns: {
                type: Array,
                required: true,
            },
        },
        
        filters: {
            handler(row,value,handleValue) {
                const arr = value.split('.');
                const target = Array.isArray(arr) && row[arr[0]] ? arr.reduce((prev,curr)=>{
                    return prev[curr]
                },row) : row[value];
                return typeof handleValue === 'function' ? handleValue(target,row) : target;
            },
            handlerEmpty(empty) {
                return units.handlerEmpty(empty)
            },
        }
    }
</script>
<style scoped>
    .is-click {
        cursor: pointer;
    }
</style>
