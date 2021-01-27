/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-27 15:44:11
 */
export default {
  data() {
    return {
      formConfig:{
        shenhe:{
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
        shenhe:'',
      },
      ruleValidate: {
        shenhe: [{ 
          required: true, 
          message: '请审核', 
          trigger: 'change' 
        }],
      },
      filtersConfig:{
        sku:{
          name:'商品编号',
          value:'sku',
          type:'text',
        },  
        color:{
          name:'供应商',
          value:'color',
          type:'select',
          dataSource:{
            type:'static',
            data:[
              {name:'供应商1',value:'001'},
              {name:'供应商2',value:'002'}
            ],
          },
        },
        producter:{
          name:'开发人员',
          value:'supplier',
          type:'select',
          dataSource:{
            type:'static',
            data:[
              {name:'李四',value:'001'},
              {name:'王五',value:'002'}
            ],
          },
        },
        name:{
          name:'名称',
          value:'name',
          type:'text',
        },
        productType:{
          name:'类目',
          value:'productType',
          type:'select',
          dataSource:{
            type:'static',
            data:[
              {name:'积木',value:'001'},
              {name:'灯',value:'002'}
            ],
          },
        },
        status:{
          name:'状态',
          value:'status',
          type:'radio',
          dataSource:{
            type:'static',
            data:[
              {name:'已选',value:'true'},
              {name:'未选',value:'false'}
            ],
          },
        },
        createTime:{
          name:'创建时间',
          value:'createTime',
          type:'dateTime',
        },
      }
    }
  }
}