/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-20 19:55:26
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
            productImg:{
                name:'产品图片',
                type:'uploadImage'
            },
            productName:{
                name:'产品名称',
                type:'text'
            },
            selectionPeople:{
                name:'选品人员',
                type:'table'    
            },
            unSelectionPeople:{
                name:'未选人员',
                type:'table'    
            },
            appointStorePeople:{
                name:'派店人员',
                type:'table'    
            },
        },
        formValidate: {
            productCode:'PD00001',
            productType:'玩具',
            productImg:[
                {"name":"7eb99afb9d5f317c912f08b5212fd69a","url":"https://img.jbzj.com/file_images/article/201806/201862785813429.png?201852785843"},
                {"name":"7eb99afb9d5f317c912f08b5212fd69a","url":"https://img.jbzj.com/file_images/article/201806/201862785813429.png?201852785843"}],
            productName:'积木'
        },
        ruleValidate: {

        },
        formConfig2:{
            shenhe:{
                name:'审核意见',
                type:'textarea',
            },
            status:{
                name:'',
                value:'status',
                type:'radio',
                dataSource:{
                  type:'static',
                  data:[
                    {name:'通过',value:'true'},
                    {name:'不通过',value:'false'}
                  ],
                },
              },
        },
        formValidate2: {
            shenhe:'',
            status:''
        },
        ruleValidate2: {

        },
      }
    }
  }