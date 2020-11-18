/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-17 20:38:31
 */
export default {
  data() {
    return {
      formConfig:{
        status:{
          name:'审核',
          type:'radio',
          dataSource:{
            type:'static',
            data:[
              {name:'同意',value:'true'},
              {name:'不同意',value:'false'}
            ],
          }
        },
      },
      formValidate: {
        status:'',
      },
      ruleValidate: {
        status: [{ 
          required: true, 
          message: '是否审核', 
          trigger: 'change' 
        }],
      }, 
      filtersConfig:{
        sku:{
          name:'供应商编号',
          value:'sku',
          type:'text',
        },  
        color:{
          name:'供应商名称',
          value:'color',
          type:'text',
        },
        producName:{
          name:'联系电话',
          value:'producName',
          type:'text',
        },
        supplier:{
          name:'联系人',
          value:'supplier',
          type:'text',
          type:'select',
            dataSource:{
              type:'static',
              data:[
                {name:'李四',value:'001'},
                {name:'王五',value:'002'}
              ],
            },
        },
        supplierNum:{
          name:'地址',
          value:'supplierNum',
          type:'text',
        },
        recommendingOfficer:{
          name:'邮箱',
          value:'recommendingOfficer',
          type:'text',
        },
        createTime:{
          name:'创建时间',
          value:'createTime',
          type:'dateTime',
        },
        status:{
          name:'状态',
          value:'status',
          type:'radio',
          dataSource:{
            type:'static',
            data:[
              {name:'已审核',value:'true'},
              {name:'未审核',value:'false'}
            ],
          },
        },
      }
    }
  }
}