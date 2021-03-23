/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-23 14:53:47
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
        name:{
          name:'产品名称',
          value:'name',
          type:'text',
        },
        code:{
          name:'产品编码',
          value:'code',
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