/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-08 16:49:46
 */
export default {
    data() {
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
              trigger: 'blur'
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