<template>
    <div class="BMIStandard">
        <form-and-table :columns="columns" :schema="schema" ref="formAndTable"> </form-and-table>
    </div>
</template>

<script>
    import formAndTable from '@/pages/common/new-com-formAndTable'
    import {Gender} from '@/lib/Constants'
    // 体型合格标准
    // const BMIStandardSchema = new Schema({
    //  standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 训练大纲
    //  gender: String,                                 // 性别
    //  ageRange: {                                     // 年龄范围
    //      from: Number,
    //      to: Number
    //  },
    //  bmiRange: {                                     // 体脂范围
    //      from: Number,
    //      to: Number
    //  }
    // });
    export default {
        name: "category",
        components: {
            formAndTable
        },
        data() {
            return {
                columns: [
                    {prop: 'standard',label: '训练大纲',handleValue:(value)=> value && value.name},
                    {prop: 'gender', label: '性别', width: 100},
                    {prop: 'ageRange',
                        label: '年龄范围',
                        handleValue:(value)=>{
                            return `${value.from} - ${value.to}`
                        }},
                    {prop: 'bmiRange',
                        label: '体型范围',
                        handleValue:(value)=>{
                            return `${value.from} - ${value.to}`
                        }},
                ],
                schema: [
                    {fieldType: "input", placeholder: "训练大纲", label: "训练大纲", _name: "standard", standard: '',disabled:true},
                    {fieldType: "select", placeholder: "性别", label: "性别", _name: "gender", gender: '',options: Object.values(Gender),},
                    {fieldType: "input-number", placeholder: "最小年龄", label: "最小年龄", _name: "ageFrom",ageFrom: 0},
                    {fieldType: "input-number", placeholder: "最大年龄", label: "最大年龄", _name: "ageTo", },
                    {fieldType: "input-number", placeholder: "最小体型", label: "最小体型", _name: "bmiFrom", },
                    {fieldType: "input-number", placeholder: "最大体型", label: "最大体型", _name: "bmiTo", },
                ]
            }
        },
        async created(){
            this.schema[0].standard = this.$parent.standard.name;
        },
        computed:{

        },
        methods: {
            beforeSubmit(formData) {
                const deleteKeys = ['ageFrom','ageTo','bmiFrom','bmiTo'];
                formData.ageRange = {
                    from:formData.ageFrom,
                    to:formData.ageTo,
                };
                formData.bmiRange = {
                    from:formData.bmiFrom,
                    to:formData.bmiTo,
                };
                formData.standard = this.$backendService.getParseObject('TrainStandard',this.$parent.standard.objectId);
                Object.keys(formData).forEach(key=>{
                    if(deleteKeys.includes(key))delete formData[key]
                })
            },
            beforeEdit(row){
                row.ageFrom = row.ageRange.from;
                row.ageTo = row.ageRange.to;
                row.bmiFrom = row.bmiRange.from;
                row.bmiTo = row.bmiRange.to;
                row.standard = this.$parent.standard.name;
            }
        },
    }
</script>
