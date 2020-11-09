/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-06 16:38:41
 */
export default {
    data() {
      return {
        formConfig:{
          name:{
            name:'品牌编码',
            type:'text',
          },
          code:{
            name:'品牌名称',
            type:'text',
          },
        },
        formValidate: {
          name: '',
          code: '',
        },
        ruleValidate: {
          name: [{
              required: true,
              message: '请输入品牌编码',
              trigger: 'blur'
          }],
          code: [{
              required: true,
              type: 'string',
              message: '请输入品牌名称',
              trigger: 'blur'
          }],
        }
      }
    }
  }