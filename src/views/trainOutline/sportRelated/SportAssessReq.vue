
<template>
    <div class="SportAssessReq">
        <form-and-table :columns="columns" :schema="schema" ref="formAndTable"> </form-and-table>
    </div>
</template>

<script>
    import formAndTable from "@/components/TableAndForm";
    import { queryListByKeyValue, toPointer } from "@/api/baseApi";
    import standardMixin from "../standardMixin";
    import {Gender, CourseCategory, TroopCategory} from "@/const/index";
    // 课目时间表
    // const SportTimeSchema = new Schema({
    //  standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 训练大纲
    //  course: { type: Schema.Types.ObjectId, ref: 'Course' },              // 体育课目
    //  required: Boolean,                                                   // 是否必考,区分必考和选考
    //  physicalLevels: [String],                                            // 体能训练等级列表
    //  troopCategories: [String],                                            // 军兵种类型列表
    //  genders: [String],                                                    // 性别要求列表(男/女)
    //  isCivilServant: Boolean,                                              // 是否适用于文职人员
    //  ageEnabled: Boolean,                                                  // 是否启用年龄条件
    //  ageCondition: {                                                       // 年龄条件
    //      fromAge: Number,                                                  // 年龄
    //      toAge: Number,                                                    //
    //  },
    // });
    export default {
        name: "category",
        components: {
            formAndTable
        },
        mixins: [standardMixin],
        data() {
            return {
                columns: [
                    {prop: 'course', label: '体育课目', handleValue: (val=>{return val && val.name})},
                    // {prop: 'required', label: '是否必考', handleValue: (val=>{return !val ? '选考' : '必考'})},
                    {prop: 'physicalLevels', label: '体能训练等级',handleValue:(value)=>value && value.join('、')},
                    {prop: 'troopCategories', label: '军兵种类型',handleValue:(value)=>value && value.join('、')},
                    {prop: 'genders', label: '性别要求',handleValue:(value)=>value && value.join('、')},
                    {prop: 'isCivilServant', label: '文职人员',  handleValue: (val=>{return !val ? '否' : '是'})},
                    {prop: 'ageCondition', label: '年龄要求', handleValue: ((val, row)=>{return !row.ageEnabled ? '' : `${val.fromAge}-${val.toAge}`})},
                ],
                schema: [
                    {fieldType: "select",required: true, placeholder: "体育课目", filterable:true, label: "体育课目", vModel: "course", course: '',options: [],optValue:'objectId'},
                    {fieldType: "select",required: true, placeholder: "训练等级", label: "训练等级", vModel: "physicalLevels", physicalLevels: [],options: [], multiple: true},
                    {fieldType: "select",required: true, placeholder: "军兵种类型", label: "军兵种类型", vModel: "troopCategories", troopCategories: [],options: Object.values(TroopCategory), multiple: true},
                    {fieldType: "select",required: true, placeholder: "性别要求", label: "性别要求", vModel: "genders", genders: [],options: Object.values(Gender), multiple: true},
                    {fieldType: "checkbox", placeholder: "文职人员", label: "文职人员", vModel: "isCivilServant", isCivilServant: false,border:true,},
                    {fieldType: "checkbox", placeholder: "启用年龄条件", label: "启用年龄条件", vModel: "ageEnabled", ageEnabled: false,border:true},
                    {fieldType: "input", placeholder: "最低年龄", label: "最低年龄", vModel: "fromAge", fromAge: undefined,disabled:true, },
                    {fieldType: "input", placeholder: "最高年龄", label: "最高年龄", vModel: "toAge", toAge: undefined,disabled:true},
                ]
            }
        },
        async created(){
            setTimeout(async _=>{
                this.schemaPhysicalLevel.options = await queryListByKeyValue("PhysicalLevel");
                this.schemaCourse.options = await queryListByKeyValue("SportCourse");
                //this.schemaSportCategory.options = await queryListByKeyValue("SportCategory");
                //this.schemaPhysicalLevel.options = (await this.$backendService.queryListByKeyValue('PhysicalLevel')).list;
                // this.schema[0].standard = this.$parent.standard.name;
                // this.schema[0].standard = this.$parent.standard.name;
                // let sportCourseQuery = new this.$Client.Query(this.$Client['Course']);
                // let $standard = this.$backendService.getParseObject('TrainStandard' , this.$parent.standard.objectId);
                // sportCourseQuery.equalTo('standard', $standard);
                // sportCourseQuery.equalTo('category', CourseCategory.Sport);
                // this.schemaCourse.options = (await this.$backendService.queryListByKeyValue('Course', sportCourseQuery)).list;
            }, 500);
        },
        watch: {
            'schemaAgeEnabled.ageEnabled':{
                handler(val) {
                    this.schemaFromAge.disabled = !val ? true : false;
                    this.schemaToAge.disabled = !val ? true : false;
                    this.schemaFromAge.fromAge = !val ?  '': this.schemaFromAge.fromAge;
                    this.schemaToAge.toAge = !val ? '' : this.schemaToAge.toAge;
                },
                immediate: true
            }
        },
        computed:{
            schemaPhysicalLevel(){
                return this.schema.find(item=>item.vModel === 'physicalLevels')
            },
            schemaCourse(){
                return this.schema.find(item=>item.vModel === 'course')
            },
            schemaAgeEnabled(){
                return this.schema.find(item=>item.vModel === 'ageEnabled')
            },
            schemaFromAge(){
                return this.schema.find(item=>item.vModel === 'fromAge')
            },
            schemaToAge(){
                return this.schema.find(item=>item.vModel === 'toAge')
            },
        },
        methods: {
            reBeforeSubmit(formData) {
                let deleteList = ['fromAge', 'toAge'];
                // formData.standard = this.$parent.standard.objectId;
                formData.course = toPointer('SportCourse',formData.course)
                formData.ageCondition = {
                    fromAge: formData.ageEnabled ? parseInt(formData.fromAge) : 0,
                    toAge: formData.ageEnabled ? parseInt(formData.toAge) : 0,
                };
                Object.keys(formData).forEach(item=>{
                    if (deleteList.includes(item)) delete formData[item]
                });
            },
            reBeforeEdit(row){
                row.course = row.course && row.course.objectId;
                row.fromAge = !row.ageEnabled ? '' :row.ageCondition.fromAge;
                row.toAge = !row.ageEnabled ? '' :row.ageCondition.toAge;
            }
        },
    }
</script>

