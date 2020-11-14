/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-13 20:42:50
 */
export default {
  data() {
    return {
      formConfig:{
        purchasePrice:{
          name:'采购价格',
          type:'text',
          unit:'CNY'
        },
        weight:{
          name:'参考重量',
          type:'text',
          unit:'KG'
        },
      },
      formValidate: {
        purchasePrice:'',
        weight:''
      },
      ruleValidate: {
        purchasePrice: [{
          required: true,
          type: 'string',
          message: '请输入采购价格',
          trigger: 'blur'
        }],
        weight: [{
            required: true,
            type: 'string',
            message: '请输入参考重量',
            trigger: 'blur'
        }],
      }, 
    }
  }
}