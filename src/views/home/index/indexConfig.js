/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-30 10:47:49
 */
export default {
  data() {
    return {
      formConfig:{
        modular:{
          name:'模块',
          type:'text',
        },
        position:{
          name:'位置',
          type:'text',
          length:50
        },
      },
      formValidate: {
        modular: '',
        position: '',
      },
      formConfig2:{
        modular:{
          name:'模块',
          type:'text',
        },
        block:{
          name:'区块',
          type:'text',
        },
        position:{
          name:'位置',
          type:'text',
          length:50
        },
      },
      formValidate2: {
        modular: '',
        block:'',
        position: '',
      },
      ruleValidate: {
        
      },
      filtersConfig:{

      }
    }
  }
}