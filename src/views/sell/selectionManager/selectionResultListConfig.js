/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-19 17:05:32
 */
export default {
    data() {
      return {
        formConfig:{
          purchasePrice:{
            name:'被委派人',
            type:'select',
            dataSource:{
              type:'static',
              data:[
                {name:'李四',value:'001'},
                {name:'王五',value:'002'}
              ],
            }
          },
        },
        formValidate: {
          purchasePrice:'',
        },
        ruleValidate: {
          purchasePrice: [{
            required: true,
            type: 'string',
            message: '请选择被委派人',
            trigger: 'change'
          }],
        }, 
        filtersConfig:{
            productCode:{
              name:'商品编号',
              value:'productType',
              type:'text',
            },
            productName:{
              name:'产品名称',
              value:'sku',
              type:'text',
            },  
            supplier:{
              name:'供应商',
              value:'color',
              type:'text',
            },
            recommendingOfficer:{
              name:'开发员',
              value:'producName',
              type:'text',
            },

            status:{
              name:'状态',
              value:'status',
              type:'radio',
              dataSource:{
                type:'static',
                data:[
                  {name:'是',value:'true'},
                  {name:'否',value:'false'}
                ],
              },
            },
        }
      }
    }
  }