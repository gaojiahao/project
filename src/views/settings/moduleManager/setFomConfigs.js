/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-07 14:55:06
 */
export default {
    data() {
      return {
        formConfig:{
            containerCode:{
            name:'容器编码',
            type:'text',
          },
          containerName:{
            name:'容器名称',
            type:'text',
            
          },
        },
        formValidate: {
            containerCode:'',
            containerName: '',
        },
        ruleValidate:{
            
        }
      }
    }
  }