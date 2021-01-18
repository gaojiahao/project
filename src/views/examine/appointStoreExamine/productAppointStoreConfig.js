/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-18 14:58:06
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
        filtersConfig:{
          productType:{
            name:'分类',
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
          sku:{
            name:'SKU',
            value:'sku',
            type:'text',
          },  
          color:{
            name:'颜色',
            value:'color',
            type:'text',
          },
          producName:{
            name:'产品名称',
            value:'producName',
            type:'text',
          },
          supplier:{
            name:'产商',
            value:'supplier',
            type:'text',
          },
          supplierNum:{
            name:'产商货号',
            value:'supplierNum',
            type:'text',
          },
          createTime:{
            name:'创建时间',
            value:'createTime',
            type:'dateTime',
          },
          recommendingOfficer:{
            name:'推荐人员',
            value:'recommendingOfficer',
            type:'text',
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
          modifyTime:{
            name:'修改时间',
            value:'modifyTime',
            type:'dateTime',
          },
          creater:{
            name:'创建者',
            value:'creater',
            type:'text',
          },
          modifyer:{
            name:'修改者',
            value:'modifyer',
            type:'text',
          },
        }
      }
    }
  }