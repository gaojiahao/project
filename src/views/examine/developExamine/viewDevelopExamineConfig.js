/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-16 12:15:12
 */
export default {
    data() {
      return {
        formConfig2:{
          opinion:{
            name:'侵权审核意见',
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
              message: '请输入侵权审核意见',
              trigger: 'blur'
          }],
        }, 
      }
    }
  }