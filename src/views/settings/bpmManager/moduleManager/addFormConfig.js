/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-04 20:15:10
 */
export default {
    data() {
      return {
        formConfig:{
          id:{
            name:'ID',
            type:'text',
          },
          viewName:{
            name:'视图名称',
            type:'text',
            
          },
        },
        formValidate: {
          id:'',
          viewName: '',
        },
        ruleValidate: {
          viewName: [{
              required: true,
              type: 'string',
              message: '请输入视图名称',
              trigger: 'blur'
          }],
        }, 
      }
    }
  }