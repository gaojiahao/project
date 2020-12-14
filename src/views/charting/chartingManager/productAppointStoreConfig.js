/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-12 11:13:20
 */
export default {
    data() {
      return {
        formConfig:{
          productCode:{
              name:'产品货号',
              type:'text',
          },
          productType:{
              name:'商品分类',
              type:'text',
          },
          productName:{
              name:'产品名称',
              type:'text'
          },
          shenhe:{
            name:'制作意见',
            type:'textarea',
            disabled:true,
          },
        },
        formValidate: {
          productCode:'PD00001',
          productType:'玩具',
          productName:'积木',
          shenhe:"fdsfadsfdasfasd"
        },
        ruleValidate: {

        },
        formConfig2:{
          id:{
            name:'id',
            type:'text',
            hidden: true
          },
        },
        formValidate2: {
          id:"",
          data:{},
        },
        ruleValidate2: {

        },
      }
    }
  }