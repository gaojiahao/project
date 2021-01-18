/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-18 10:49:33
 */
export default {
  data() {
    return {
      formConfig:{
        people:{
          name:'人员分配',
          type:'select',
          dataSource:{
            type:'static',
            data:[
              {name:'李四',value:'001'},
              {name:'王五',value:'002'}
            ],
          },
          disabled: false
        },
        endDateTime:{
          name:'完成日期',
          type:'dateTime',
          disabled: false
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
          disabled: false
        },
      },
      formValidate: {
        people:'',
        endDateTime: '',
        isMoreStore: '',
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
        producName:{
          name:'产品名称',
          value:'producName',
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
              {name:'未委派',value:'0'},
              {name:'已委派',value:'1'},
              {name:'待返工',value:'2'},
              {name:'已逾期',value:'-1'},
              {name:'全部',value:'all'}
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