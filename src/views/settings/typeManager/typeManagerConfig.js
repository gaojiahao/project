/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-18 17:50:50
 */
export default {
    data() {
      const levelVali = (rule, value, callback) => {
        if (value == ''||value === undefined) {
            callback(new Error('请输入类目层级'));
        } else {
          callback();
        }
      };
      const categoryIdVali = (rule, value, callback) => {
        if (value == ''||value === undefined) {
            callback(new Error('请选择属性'));
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
            name:'类目名称',
            type:'text',
          },
          level:{
            name:'类目层级',
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
              message: '请输入类目名称',
              trigger: 'blur'
          }],
          level: [{
            required: true,
            message: '请输入正确的类目层级',
            trigger: 'change',
            pattern: /^[0-9]\d*$/,
          }],
        },
        formConfig2:{
          attributeId:{
            name:'属性',
            type:'selectorMulti',
            isName:true,
            dataSource:{
              type:'dynamic',
              url:'/api/GetAttributeList',
              data:[],
              col:[
                {k:'name',v:'name'},
                {k:'value',v:'id'}
              ]
            },
            bind:{
              target: 'attributeName',
              bindValue: 'name'
            },
            proertyContext: {
              "dataSourceCols": [
                {
                  "title": "id",
                  "key": "value",
                  "hidden": true
                },
                {
                  "title": "名称",
                  "key": "name"
                },
              ]
            },
            valueField: "id",  //值字段
            displayField: "name", //显示字段
          },
        },
        formValidate2: {
          attributeName: '',
          attributeId:[],
        },
        ruleValidate2: {
          attributeId: [{
            required: true,
            message: '请选择属性',
            trigger: 'change',
            validator: categoryIdVali,
          }],
        },
      }
    }
  }