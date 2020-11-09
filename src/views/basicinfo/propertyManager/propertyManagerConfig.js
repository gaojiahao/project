/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-06 16:07:13
 */
export default {
    data() {
      return {
        formConfig:{
          name:{
            name:'上一级类目',
            type:'text',
          },
          code:{
            name:'属性名称',
            type:'text',
          },
          url:{
            name:'属性组别',
            type:'text',
          },
        },
        formValidate: {
          name: '',
          code: '',
          url: '',
          id:'',
        },
        ruleValidate: {
          name: [{
              required: true,
              message: '请输入上一级类目',
              trigger: 'blur'
          }],
          code: [{
              required: true,
              type: 'string',
              message: '请输入属性名称',
              trigger: 'blur'
          }],
          url: [{
              required: true,
              type: 'string',
              message: '请输入属性组别',
              trigger: 'blur'
          }],
        },
      }
    }
  }