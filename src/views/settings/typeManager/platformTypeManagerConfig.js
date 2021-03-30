/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-30 10:16:47
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
      const platformIdVali = (rule, value, callback) => {
        if (value == ''||value === undefined) {
            callback(new Error('请选择平台名称'));
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
          platformId:{
            name:'平台名称',
            type:'select',
            isName:true,
            dataSource:{
                type:'dynamic',
                url:'/api/GetPlatformsList',
                data:[],
            },
            bind:{
              target: 'platformName',
              bindValue: 'name'
            },
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
          platformId:'',
          platformName:'',
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
            trigger: 'blur',
            validator:levelVali
          }],
          platformId: [{ required: true, message: '请选择平台名称',validator: platformIdVali, trigger: 'change' }],
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