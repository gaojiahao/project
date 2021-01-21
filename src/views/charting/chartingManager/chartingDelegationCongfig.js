/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-20 20:04:47
 */
export default {
  data() {
    return {
      formConfig:{
        date:{
          name:"时间",
          type:"dateTimes",
          disabled:true,
        },
        shenhe:{
          name:'制作意见',
          type:'textarea',
          disabled:true,
        },
        isMoreStore:{
          name:'是否多店多主图',
          type:'radio',
          dataSource:{
            type:'static',
            data:[
              {name:'是',value:'1'},
              {name:'否',value:'0'},
            ],
          },
          disabled: true
        },
      },
      formValidate: {
        date:["2020-12-10 05:05","2021-01-22 05:05"],
        shenhe:'dsfadsfdasfadsf',
        isMoreStore: '1',
      },
      ruleValidate: {
        people: [{ 
          required: true, 
          message: '请选择人员分配', 
          trigger: 'change' 
        }],
        endDateTime: [{ 
          required: true, 
          message: '请选择完成日期', 
          trigger: 'change' 
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
              {name:'待制作',value:'0'},
              {name:'已完成',value:'1'},
              {name:'待确认',value:'2'},
              {name:'已逾期',value:'-1'},
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