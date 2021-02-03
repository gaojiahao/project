/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-03 10:18:57
 */
export default {
    data() {
      return {
        formConfig:{
          columnName:{
            name:'字段值',
            type:'text',
          },
          displayName:{
            name:'显示名称',
            type:'text',
          },
          columnLength:{
            name: "字段长度",
            type: "number"
          },
          logicType:{
            name: '字段类型',
            type: 'select',
            dataSource:{
              type:'static',
              data:[
                // {name:'文本',value:'text'},
                // {name:'文本域',value:'textarea'},
                // {name:'整数',value:'number'},
                // {name:'小数',value:'float'},
                // {name:'单选',value:'radio'},
                // {name:'下拉',value:'select'},
                // {name:'单项选择器',value:'selectorSingle'},
                // {name:'多项选择器',value:'selectorMulti'},
                // {name:'附件',value:'uploadImage'},
                // {name:'标签',value:'texts'},
                // {name:'商品体积',value:'size'},
                {name:'布尔值',value:1}, 
              ],
            },
          }
        },
        formValidate: {
          clauseId:'',
          columnName:'',
          displayName: '',
          logicType:'',
          columnLength:0,
        },
        ruleValidate:{
          columnLength:[{ 
            type: 'number',
            message: '请输入正确字段长度', 
            trigger: 'blur',
            transform(value) {
              return Number(value);
            }
          }]   
        }
      }
    }
  }