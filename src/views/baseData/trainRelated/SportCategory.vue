
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
                    {prop: 'name', label: '课目类型',},
                ],
                schema: [
                    {fieldType: "input", placeholder: "课目类型", label: "课目类型", vModel: "name", name: '',required:true},
                ]
            }
        },
    }
</script>
