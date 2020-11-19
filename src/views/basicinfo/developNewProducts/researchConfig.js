/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-19 11:26:18
 */
export default {
    data() {
      return {
        formConfig:{
          purchasePrice:{
            name:'调研平台',
            type:'select',
            dataSource:{
              type:'static',
              data:[
                {name:'亚马逊',value:'001'},
                {name:'速卖通',value:'002'}
              ],
            }
          },
          weight:{
            name:'调研链接',
            type:'text',
          },
        },
        formValidate: {
          purchasePrice:'',
          weight:'',
          dateTime:''
        },
        ruleValidate: {
          purchasePrice: [{
            required: true,
            type: 'string',
            message: '请输入调研平台',
            trigger: 'change'
          }],
          weight: [{
              required: true,
              type: 'string',
              message: '请输入调研链接',
              trigger: 'blur'
          }],
        }, 
      }
    }
  }