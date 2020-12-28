/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-26 12:43:57
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
                {name:'玩具类',value:1},
                {name:'电子器元件',value:2},
                {name:'积木类',value:3}
              ],
            }, 
          },
          name:{
            name:'分类名称',
            type:'text',
          },
          url:{
            name:'分组类别',
            type:'text',
          },
        },
        formValidate: {
          parentId:0,
          name: '',
          url: '',
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