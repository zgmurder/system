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
                    {prop: 'name', label: '天气名称',},
                ],
                schema: [
                    {fieldType: "input", placeholder: "天气名称", label: "天气名称", vModel: "name", name: '',required:true},
                ]
            }
        },
    }
</script>
