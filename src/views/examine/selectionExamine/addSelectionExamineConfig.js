/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: gaojiahao
 * @LastEditTime: 2020-11-24 19:34:17
 */
export default {
    data() {
      return {
        formConfig2:{
          examine:{
            name:'审核状态',
            type:'radio',
            dataSource:{
              data:[
                { name:'通过',value:'1'},
                { name:'不通过',value:'0'},
                { name:'强制委派',value:'2'},
              ]
            }
          },
          isMainSell:{
            name:'是否主推',
            type:'radio',
            dataSource:{
              data:[
                { name:'是',value:'1'},
                { name:'否',value:'0'},
              ]
            }
          },
          reason:{
            name:'原因',
            type:'select',
            dataSource:{
              data:[
                { name:'不够大卖',value:'001'},
                { name:'调研之后没有利润',value:'002'},
                { name:'其他',value:'003'},
              ]
            }
          },
          opinion:{
            name:'备注',
            type:'textarea',
          },
        },
        formValidate2: {
          examine:'',
          isMainSell:'',
          reason:'',
          opinion:'',
        },
        ruleValidate2: {
          examine: [{
            required: true,
            type: 'string',
            message: '是否侵权',
            trigger: 'change'
          }],
          opinion: [{
              required: true,
              type: 'string',
              message: '请输入备注',
              trigger: 'blur'
          }],
        }, 
      }
    }
  }