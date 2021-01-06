/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-05 19:58:21
 */
export default {
    data() {
      return {
        formConfig:{
          packageName:{
            name:'模型名称',
            type:'text',
            
          },
          // sort:{
          //   name:'排序',
          //   type:'text',
            
          // },
          // status:{
          //   name:'状态',
          //   type:'radio',
          //   dataSource:{
          //     type:'static',
          //     data:[
          //       {name:'是',value:'true'},
          //       {name:'否',value:'false'}
          //     ],
          //   },
          //   disabled: false
          // },
        },
        formValidate: {
          packageName: '',
          // sort:'',
          // status: '',
        },
        ruleValidate: {
          packageName: [{
              required: true,
              type: 'string',
              message: '请输入模型名称',
              trigger: 'blur'
          }],
        }, 
      }
    }
  }