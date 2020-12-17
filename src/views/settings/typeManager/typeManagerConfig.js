/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-17 10:10:51
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
                {name:'玩具类',value:'a'},
                {name:'电子器元件',value:'1'},
                {name:'积木类',value:'a-1'}
              ],
            }, 
          },
          name:{
            name:'分类名称',
            type:'text',
          },
          code:{
            name:'分类code',
            type:'text',
          },
          url:{
            name:'分组类别',
            type:'text',
          },
        },
        formValidate: {
          parentId:'',
          name: '',
          code: '',
          url: '',
          id:'',
        },
        ruleValidate: {
          parentId: [{
            required: false,
            message: '请输入上一级类目',
            trigger: 'blur'
          }],
          name: [{
              required: true,
              message: '请输入分类名称',
              trigger: 'blur'
          }],
          code: [{
              required: true,
              type: 'string',
              message: '请输入分类code',
              trigger: 'blur'
          }],
          url: [{
              required: false,
              type: 'string',
              message: '请输入分组类别',
              trigger: 'blur'
          }],
        },
        formConfig2:{
          property:{
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
                value:'property'
              },
            ],
          },
        },
        formValidate2: {
          property: '',
          id:'',
        },
        ruleValidate2: {
          property: [{
              required: true,
              message: '请输入属性',
              trigger: 'change'
          }],
        },
      }
    }
  }