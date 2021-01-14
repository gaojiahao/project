/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-13 19:50:42
 */
export default {
    data() {
      const levelVali = (rule, value, callback) => {
        if (value == ''||value === undefined) {
            callback(new Error('请输入分类层级'));
        } else {
          callback();
        }
      };
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
            type:'number',
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
              type: 'string',
              message: '请输入分类名称',
              trigger: 'blur'
          }],
          level: [{
            required: true,
            message: '请输入正确的分类层级',
            trigger: 'change',
            pattern: /^[0-9]\d*$/,
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
            ]
          },
        },
        formValidate2: {
          attributeName: '',
          attributeId:'',
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