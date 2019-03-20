<template>
    <div class="property">
        <formAndTable :schema="schema" :columns="columns" > </formAndTable>
    </div>
</template>

<script>
    import formAndTable from '@/pages/common/new-com-formAndTable'
    import {OrgType,PersonProperty} from '@/lib/Constants'
    export default {
        components: {
            formAndTable,
        },
        data() {
            return {
                columns: [
                    {prop: 'name', label: '分册名称'},
                    {prop: 'code', label: '分册编码'},
                    {prop: 'orgTypes', label: '单位类型',handleValue:value=>value.join('、')},
                    {prop: 'orgCategories', label: '单位分类',handleValue:value=>value.join('、')},
                    {prop: 'personProperties', label: '人员属性',handleValue:value=>value.join('、')},

                ],
                schema: [
                    {fieldType: "input", placeholder: "训练大纲", label: "训练大纲", _name: "standard", standard: '',disabled:true},
                    {fieldType: "input", placeholder: "分册名称", label: "分册名称", _name: "name", name: ''},
                    {fieldType: "input", placeholder: "分册编码", label: "分册编码", _name: "code", code: ''},
                    {fieldType: "select",width:'50%', placeholder: "适用的单位类型", label: "单位类型", _name: "orgTypes",multiple:true,orgTypes: [],options:Object.values(OrgType)},
                    {fieldType: "select",width:'50%', placeholder: "适用的人员属性", label: "人员属性", _name: "personProperties", personProperties:[],multiple:true,options:PersonProperty},
                    {fieldType: "select",width:'100%', placeholder: "适用的单位分类", label: "单位分类", _name: "orgCategories",multiple:true, orgCategories: [],options:[],},
                ]
            }
        },
        async created(){
            this.orgCategories.options = (await this.$backendService.queryListByKeyValue('OrgCategory')).list.map(item=>item.name);
            this.schema[0].standard = this.$parent.standard.name;
        },
        computed:{
            orgCategories(){
                return this.schema.find(item=>item._name === 'orgCategories')
            },
        },
        methods:{
            beforeSubmit(target) {
                target.standard = this.$parent.standard.objectId;
            },
            beforeEdit(target){
                target.standard = this.$parent.standard.name
            }
        }
    }
</script>
