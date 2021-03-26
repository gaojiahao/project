/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-26 16:36:16
 */
export default {
    data() {
      return {
        formConfig2:{
          reviewRemark:{
            name:'审核意见',
            type:'textarea',
          },
        },
        formValidate2: {
          reviewRemark:'',
        },
        ruleValidate2: {
          reviewRemark: [{
              required: true,
              type: 'string',
              message: '请输入审核意见',
              trigger: 'blur'
          }],
        }, 
      }
    }
  }