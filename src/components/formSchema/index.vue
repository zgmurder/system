<template>
  <el-form
    class="com-form"
    :class="{'form-flex':schema.length>2}"
    ref="form"
    label-width="100px"
  >
    <el-form-item
      class="schema-form-item"
      :label="field.label"
      v-for="(field, index) in schema"
      :required="field.required"
      :error="field.error"
      :key="index"
      :style="{width: field.width}"
    >
      <component
        style="width: 100%"
        clearable
        :is="'el-'+field.fieldType"
        @input="handleInput($event,field)"
        @change="handleChange($event,field)"
        @select="handleChange($event,field)"
        :default-first-option="true"
        v-bind="field"
        v-model="field[field.vModel]"
      >
        
        <template v-if="field.options">
          <el-option
            v-for="(item,index) in field.options"
            :key="index"
            :label="handleLabelOrValue(item,field.optLabel)"
            :value="handleLabelOrValue(item,field.optValue,index)"
          ></el-option>
        </template>
      </component>
      <!-- <component v-if="field.component" :is="field.component"></component>
      <component
        clearable
        v-else
        :type="field.type"
        :multiple="field.multiple"
        :no-data-text="field.emptyText"
        :is="'el-'+field.fieldType"
        v-model="field[field._name]"
        style="width: 100%"
        :label="field.label"
        :allow-create="field.allowCreate"
        :default-first-option="field.allowCreate||field.filterable"
        :border="field.border"
        :filterable="field.allowCreate||field.filterable"
        :disabled="!!field.disabled"
        @change="(value)=>field.change && field.change(value,field)"
        :placeholder="field.placeholder"
      >
        <el-option
          v-if="field.options"
          v-for="(item,index) in field.options"
          :key="index"
          :label="item"
          :value="field.valueIsIndex ? index : item"
        ></el-option>
        <el-option
          v-if="field.keyOptions"
          v-for="(item,index) in field.keyOptions"
          :key="index"
          :label="item.name"
          :value="item.name"
        ></el-option>
      </component>-->
    </el-form-item>

    <el-form-item class="btn-box">
      <el-button v-if="!editing" type="primary" @click="onSubmit">立即创建</el-button>
      <el-button v-else type="warning" @click="onSubmit" plain>修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "com-form",
  props: {
    schema: {
      required: true
    },
    editing: {
      default: false
    }
  },
  data() {
    return {
      showMessage: false
    };
  },
  created() {
    this._initValues = this.schema.map(item => item[item.vModel]);
    this.schema.forEach(item => {
        this.$set(item, item.vModel, item[item.vModel]);
        if (item.required) this.$set(item, "error", "");
      });
    console.log(this._initValues )
  },
  watch: {},
  computed: {
    // newSchema() {
    //   this.schema.forEach(item => {
    //     this.$set(item, item.vModel, item[item.vModel]);
    //     if (item.required) this.$set(item, "error", "");
    //   });
    //   console.log(2)
    //   return this.schema;
    // }
  },
  methods: {
    onSubmit() {
      const obj = {};
      this.schema.forEach(item => {
        // if (typeof item[item.vModel] === "string")
        //   item[item.vModel] = item[item.vModel].tirm();
        if (item.required && this.$tools.isEmpty(item[item.vModel])) item.error = item.errorMassage||'此项必填';
        else if (item.validate && !item.validate(item)) item.error = item.errorMassage||'不合规则';
        else item.error = "";
        obj[item.vModel] = item[item.vModel];
      });
      const dataIsOk = !this.schema.some(item => !!item.error);
      if (dataIsOk) {
        this.$emit('formFinish',obj)
      }
    },
    initForm() {
      this.schema.splice(this._initValues.length,this.schema.length-this._initValues.length)
      this.schema.forEach((item, index) => {
        item[item.vModel] = this._initValues[index];
        item.error = "";
      });
    },
    handleInput(value, item) {
      if (item.required && !item[item.vModel]) item.error = item.errorMassage;
      else item.error = "";
      item.onInput && item.onInput(value,item)
    },
    handleChange($event,field) {
      const found = this.$tools.isArray(field.options) && field.options.find(item=>item.name === $event)
      field.onChange && field.onChange(field,$event,found)
    },
    handleLabelOrValue(item,labelOrValue,index){
      if(labelOrValue === 'index')return index
      return typeof item === 'object' ? (labelOrValue ? item[labelOrValue]:item.name) : item
    },
  }
};
</script>

<style scoped lang="scss">
.com-form {
  position: relative;
  &.form-flex {
    display: flex;
    flex-wrap: wrap;
    & > div {
      width: 33%;
    }
  }
  & > .btn-box {
    width: 100% !important;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
