/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-31 10:07:23
 */
export default {
    data() {
      return {
        formConfig:{
          parentId:{
            name:'上一级类目',
            type:'text',
            disabled:true,
            hidden:true,
          },
          parentName:{
            name:'上一级类目',
            type:'text',
            disabled:true, 
          },
          name:{
            name:'分类名称',
            type:'text',
          },
          level:{
            name:'分类层级',
            type:'text',
          },
        },
        formValidate: {
          parentId:0,
          parentName:'',
          name: '',
          level: '',
          merchantId:1
        },
        ruleValidate: {
          parentId: [{
            required: false,
            message: '请选择上一级类目',
            trigger: 'blur'
          }],
          name: [{
              required: true,
              message: '请输入分类名称',
              trigger: 'blur'
          }],
        },
        formConfig2:{
          attributeId:{
            name:'属性',
            type:'select',
            isName:true,
            dataSource:{
              type:'dynamic',
              url:'/api/GetAttributeList',
              data:[],
            },
            bind:[
              {target: 'attributeName',bindValue: 'name'},
              {target: 'attributesValues' , bindValue:'attributesValues'}
            ]
          },
        },
        formValidate2: {
          attributeName: '',
          attributeId:'',
          attributesValues:[],
        },
        ruleValidate2: {
          attributeName: [{
              required: true,
              message: '请输入属性',
              trigger: 'change'
          }],
        },
      }
    }
  }