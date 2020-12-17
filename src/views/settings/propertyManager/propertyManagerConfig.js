/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-17 15:11:14
 */
export default {
    data() {
      return {
        formConfig:{
          parentId:{
            name:'上一级类目',
            type:'select', 
            dataSource:{
              type:'static',
              data:[
                {name:'材质',value:'a'},
                {name:'金属',value:'1'},
                {name:'颜色',value:'a-1'}
              ],
            }, 
          },
          name:{
            name:'属性名称',
            type:'text',
          },
          code:{
            name:'属性code',
            type:'text',
          },
          url:{
            name:'属性组别',
            type:'text',
          },
        },
        formValidate: {
          parentId: '',
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
              message: '请输入属性名称',
              trigger: 'blur'
          }],
          url: [{
              required: true,
              type: 'string',
              message: '请输入属性组别',
              trigger: 'blur'
          }],
        },
      }
    }
  }