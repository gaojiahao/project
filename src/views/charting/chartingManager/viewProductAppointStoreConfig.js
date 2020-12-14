/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-12 11:19:59
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
        },
        formValidate2: {
          data:{"img":[{"status":"finished","name":"新店入驻.png","size":783,"percentage":100,"uid":1607743148758,"showProgress":false,"response":{"id":101},"url":"https://img.jbzj.com/file_images/article/201806/201862785813429.png?201852785843"}],"music":[],"vdieo":[],"threed":[]}
        },
        ruleValidate2: {

        },
      }
    }
  }