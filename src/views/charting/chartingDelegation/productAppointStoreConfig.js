/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-20 19:49:25
 */
export default {
    data() {
      return {
        formConfig:{
          code:{
                name:'产品货号',
                type:'text',
          },
          categoryId:{
            name:'分类',
            type:'text',
            hidden:true
          },
          categoryName:{
            name:'分类',
            type:'text',
          },
          productImg:{
              name:'产品图片',
              type:'uploadImage',
              disabled: true
          },
          name:{
              name:'产品名称',
              type:'text'
          },
          // selectionPeople:{
          //     name:'选品人员',
          //     type:'table'    
          // },
          // unSelectionPeople:{
          //     name:'未选人员',
          //     type:'table'    
          // },
          // appointStorePeople:{
          //     name:'派店人员',
          //     type:'table'    
          // },
        },
        formValidate: {
          code:'',
          name:'',
          categoryId:'',
          productImg:[],
        },
        ruleValidate: {

        },
        formConfig2:{
          data:{
            name:'分配人员',
            type:"distributionPeople",
            parmas: ['categoryId','platformId']
          },
          morePic:{
            name:'是否多店多主图',
            type:'radio',
            dataSource:{
              type:'static',
              data:[
                {name:'是',value:'true'},
                {name:'否',value:'false'}
              ],
            },
          },
          remark:{
            name:'制作意见',
            type:'textarea',
          }
        },
        formValidate2: {
          data:[],
          morePic:'',
          remark:''
        },
        ruleValidate2: {

        },
      }
    }
  }