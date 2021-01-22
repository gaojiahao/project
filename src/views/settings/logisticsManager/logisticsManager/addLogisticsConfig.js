/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-21 17:46:05
 */
export default {
    data() {
      return {
        formConfig:{
          name:{
            name:'物流名称',
            type:'text',
          },
          code:{
            name:'物流编码',
            type:'text',
          },
        },
        formValidate: {
          name: '',
          code:'',
        },
        ruleValidate: {
          name: [{
              required: true,
              message: '请输入物流名称',
              trigger: 'blur'
          }],
        }, 
      }
    }
  }