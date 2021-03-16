/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-16 14:12:25
 */
export default {
  data() {
    return {
      formConfig2:{
        reviewRemark:{
          name:'备注',
          type:'textarea',
        },
      },
      formValidate2: {
        reviewType:'recommendGoodsReview',
        relatedId:'',
        isPass:'',
        reviewResult:0,
        reviewBefore:'',  //审核前 放的当前产品状态
        reviewRemark:''  //
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