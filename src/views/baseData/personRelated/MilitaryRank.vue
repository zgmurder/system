<template>
    <div class="property">
        <formAndTable :schema="schema" :columns="columns" > </formAndTable>
    </div>
</template>

<script>
    import formAndTable from '@/components/TableAndForm'
    export default {
        components: {
            formAndTable,
        },
        data() {
            return {
                columns: [
                    {prop: 'name', label: '军衔名称',},
                    {prop: 'rankLevel1', label: '一级分类',},
                    {prop: 'rankLevel2', label: '二级分类',},
                    {prop: 'levelCode', label: '等级码',},
                ],
                schema: [
                    {fieldType: "input", placeholder: "军衔名称", label: "军衔名称", vModel: "name", name: '',required:true},
                    {fieldType: "input", placeholder: "一级分类", label: "一级分类", vModel: "rankLevel1", rankLevel1: '',required:true},
                    {fieldType: "input", placeholder: "二级分类", label: "二级分类", vModel: "rankLevel2", rankLevel2: '',required:true},
                    {fieldType: "input-number", placeholder: "二级分类", label: "二级分类", vModel: "levelCode", levelCode: 0},
                ]
            }
        },
    }
</script>
