<template>
    <div class="property">
        <formAndTable :schema="schema" :columns="columns" > </formAndTable>
    </div>
</template>

<script>
    import formAndTable from '@/pages/common/new-com-formAndTable'
    import {StandardState} from '@/lib/Constants'
    export default {
        components: {
            formAndTable,
        },
        data() {
            return {
                columns: [
                    {prop: 'name', label: '大纲名称',},
                    {prop: 'state', label: '启用状态',},
                    {prop: 'startTime', label: '启用日期',},
                    {prop: 'endTime', label: '停用日期',},
                ],
                schema: [
                    {fieldType: "input", placeholder: "大纲名称", label: "大纲名称", _name: "name", name: ''},
                    {fieldType: "select", placeholder: "启用状态", label: "启用状态", _name: "state",disabled:true,state: '',options:Object.values(StandardState)},
                ]
            }
        },
    }
</script>
