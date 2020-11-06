/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-06 14:55:17
 */
export default {
    data() {
      return {
        formConfig:{
          name:{
            name:'上一级类目',
            type:'text',
          },
          code:{
            name:'类名名称',
            type:'text',
          },
          url:{
            name:'分组类别',
            type:'text',
          },
        },
        formValidate: {
          name: '',
          code: '',
          url: '',
          id:'',
        },
        ruleValidate: {
          name: [{
              required: true,
              message: '请输入上一级类目',
              trigger: 'blur'
          }],
          code: [{
              required: true,
              type: 'string',
              message: '请输入类名名称',
              trigger: 'blur'
          }],
          url: [{
              required: true,
              type: 'string',
              message: '请输入分组类别',
              trigger: 'blur'
          }],
        },
        formConfig2:{
          proy:{
            name:'属性',
            type:'select',
            dataSource:{
              multiple:false,
              type:'static',
              data:[
                {
                  name: '材质',
                  value: 'metel'
                },
                {
                  name: '颜色',
                  value: 'color'
                },
                {
                  name: '大小',
                  value: 'size'
                },
              ],
            },
            columns:[
              {
                name:'ID',
                value:'id'
              },
              {
                name:'属性',
                value:'proy'
              },
            ],
          },
        },
        formValidate2: {
          proy: '',
          id:'',
        },
        ruleValidate2: {
          proy: [{
              required: true,
              message: '请输入属性',
              trigger: 'change'
          }],
        },
      }
    }
  }