/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-05 20:20:31
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
            name:'类名名称',
            type:'text',
          },
          url:{
            name:'分组类别',
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
              message: '请输入类名名称',
              trigger: 'blur'
          }],
          url: [{
              required: true,
              type: 'string',
              message: '请输入分组类别',
              trigger: 'blur'
          }],
        }
      }
    }
  }