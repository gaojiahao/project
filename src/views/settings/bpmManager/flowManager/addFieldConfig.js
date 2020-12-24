/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-19 10:31:43
 */
export default {
    data() {
      return {
        formConfig:{
          fieldCode:{
            name:'字段值',
            type:'text',
          },
          fieldName:{
            name:'字段名称',
            type:'text',
            
          },
          type:{
            name: '字段类型',
            type: 'select',
            dataSource:{
              type:'static',
              data:[
                {name:'文本',value:'text'},
                {name:'文本域',value:'textarea'},
                {name:'整数',value:'number'},
                {name:'小数',value:'float'},
                {name:'单选',value:'radio'},
                {name:'下拉',value:'select'},
                {name:'单项选择器',value:'selectorSingle'},
                {name:'多项选择器',value:'selectorMulti'},
                {name:'附件',value:'uploadImage'},
                {name:'标签',value:'texts'},
                {name:'商品体积',value:'size'},
              ],
            },
          }
        },
        formValidate: {
          fieldCode:'',
          fieldName: '',
          type:'',
        },
        ruleValidate:{
            
        }
      }
    }
  }