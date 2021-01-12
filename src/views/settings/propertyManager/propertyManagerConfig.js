/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-12 10:30:10
 */
export default {
    data() {
      const groupNameVali = (rule, value, callback) => {
        if (value == ''||value === undefined) {
            callback(new Error('请输入分类层级'));
        } else {
          callback();
        }
      };
      return {
        formConfig:{
          name:{
            name:'属性名称',
            type:'text',
          },
          groupName:{
            name:'属性组别',
            type:'text',
          },
        },
        formConfig2:{
          attributeId:{
            name:'上级属性项',
            type:'text', 
            disabled:true,
            hidden:true
          },
          attributeName:{
            name:'上级属性项',
            type:'text', 
            disabled:true,
          },
          valueName:{
            name:'属性值名称',
            type:'text',
          },
        },
        formValidate: {
          name: '',
          groupName: '',
        },
        formValidate2: {
          attributeId: '',
          attributeName:'',
          valueName: '',
        },
        ruleValidate: {
          name: [{
              required: true,
              type: 'string',
              message: '请输入属性名称',
              trigger: 'blur'
          }],
          groupName: [{
              required: true,
              type: 'string',
              message: '请输入属性组别',
              trigger: 'blur',
              validator: groupNameVali
          }],
        },
        ruleValidate2: {
          valueName: [{
              required: true,
              type: 'string',
              message: '请输入属性值名称',
              trigger: 'blur'
          }],
        },
      }
    }
  }