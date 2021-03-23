/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-22 16:10:10
 */
export default {
    data() {
      return {
        formConfig2:{
          opinion:{
            name:'审核意见',
            type:'textarea',
          },
        },
        formValidate2: {
          opinion:'',
        },
        ruleValidate2: {
          opinion: [{
              required: true,
              type: 'string',
              message: '请输入审核意见',
              trigger: 'blur'
          }],
        }, 
      }
    }
  }