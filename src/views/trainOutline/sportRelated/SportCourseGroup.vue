
<template>
    <div class="SportAssessReq">
        <form-and-table :columns="columns" :schema="schema" ref="formAndTable"> </form-and-table>
    </div>
</template>

<script>
    import formAndTable from "@/components/TableAndForm";
    import { queryListByKeyValue, toPointer } from "@/api/baseApi";
    import {Gender, CourseCategory, TroopCategory} from '@/const/index'
    import standardMixin from "../standardMixin";
    // 体育专项训练课目组
    // const SportCourseGroupSchema = new Schema({
    //  standard: { type: Schema.Types.ObjectId, ref: 'TrainStandard' },    // 训练大纲
    //  groupId: Number,                                                    // 课目组编号
    //  itemSeq: Number,                                                    // 课目序号
    //  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],           // 体育课目列表
    //  physicalLevel: String,                                              // 体能训练等级
    //  troopCategory: String,                                              // 军兵种类型
    //  gender: String,                                                     // 性别要求
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
                    {prop: 'groupId', label: '课目组编号',},
                    {prop: 'courses', label: '体育课目', handleValue: ((val, row)=>{return this.filterCourse(row)})},
                    {prop: 'physicalLevel', label: '体能训练等级',},
                    {prop: 'troopCategory', label: '军兵种类型',},
                    {prop: 'gender', label: '性别要求', },
                ],
                schema: [
                    {fieldType: "select",width:'66%',required: true, placeholder: "体育课目", label: "体育课目", vModel: "courses", courses: [],options: [],optValue:'objectId', multiple: true},
                    {fieldType: "input-number",required: true, placeholder: "课目组编号", label: "课目组编号", vModel: "groupId", groupId: 1, min: 0},
                    {fieldType: "input-number",required: true, placeholder: "课目序号", label: "课目序号", vModel: "itemSeq", itemSeq: 1, min: 0},
                    {fieldType: "select", placeholder: "训练等级",required: true, label: "训练等级", vModel: "physicalLevel", physicalLevels: '',options: [],},
                    {fieldType: "select", placeholder: "军兵种类型",required: true, label: "军兵种类型", vModel: "troopCategory", troopCategories: '',options: Object.values(TroopCategory),},
                    {fieldType: "select", placeholder: "性别要求",required: true, label: "性别要求", vModel: "gender", gender: '',options: Object.values(Gender),},
                ]
            }
        },
        async created(){
            setTimeout(async _=>{
                this.schemaPhysicalLevel.options = await queryListByKeyValue('PhysicalLevel');
                this.schemaCourse.options = await queryListByKeyValue("SportCourse");
                // this.schema[0].standard = this.$parent.standard.name;
                // let sportCourseQuery = new this.$Client.Query(this.$Client['Course']);
                // let $standard = this.$backendService.getParseObject('TrainStandard' , this.$parent.standard.objectId);
                // sportCourseQuery.equalTo('standard', $standard);
                // sportCourseQuery.equalTo('category', CourseCategory.Sport);
                // this.schemaCourse.options = (await this.$backendService.queryListByKeyValue('Course', sportCourseQuery)).list;
            }, 500);
            
        },
        computed:{
            schemaPhysicalLevel(){
                return this.schema.find(item=>item.vModel === 'physicalLevel')
            },
            schemaCourse(){
                return this.schema.find(item=>item.vModel === 'courses')
            },

        },
        methods: {
            reBeforeSubmit(formData) {
                // let deleteList = ['course'];
                // let $coursesArr = [];
                // this.schemaCourse.options.forEach(item=>{
                //     if (formData.course.includes(item.name)) $coursesArr.push(item.objectId);
                // });
                formData.courses = formData.courses.map(item=>({__type:'Pointer',objectId:item,className:'SportCourse'}));
                // Object.keys(formData).forEach(item=>{
                //     if (deleteList.includes(item)) delete formData[item]
                // });
            },
            reBeforeEdit(row){
                row.courses = [...row.courses].map(item => item.objectId);
            },
            filterCourse(row) {
                if (this.$tools.isEmpty(row.courses)) return '';
                const names = row.courses.map(item => item.name);
                return `${row.itemSeq}. ${names.join('; ')}`;
            }
        },
    }
</script>

