/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-25 15:14:20
 */
export default {
    data() {
      return {
        formConfig:{
          name:{
            name:'平台名称',
            type:'text',
          },
          code:{
            name:'平台编码',
            type:'text',
          },
          url:{
            name:'url',
            type:'text',
          },
          chargeUser:{
            name:'负责人名称',
            type:'select',
            dataSource:{
                multiple:false,
                type:'static',
                data:[
                  {
                    name: 'admin',
                    value: 12
                  },
                  {
                    name: '王二',
                    value: 13
                  },
                  {
                    name: '李四',
                    value: 14
                  },
                ],
              },
              columns:[
                {
                  name:'ID',
                  value:'id'
                },
                {
                  name:'用户',
                  value:'name'
                },
              ],
          },
        },
        formValidate: {
          name: '',
          code: '',
          url: '',
          chargeUser: null,
          merchantId:1,
          parentIndex:0,
        },
        ruleValidate: {
          name: [{
              required: true,
              message: '请输入平台名称',
              trigger: 'blur'
          }],
          code: [{
              required: true,
              type: 'string',
              message: '请输入平台编码',
              trigger: 'blur'
          }],
          url: [{
              required: true,
              type: 'string',
              message: '请输入url',
              trigger: 'blur'
          }],
          chargeUser: [{ 
            required: true, 
            message: '请选择负责人名称', 
            trigger: 'change' 
          }],
        },
        platformType:[
          {
              
          }
        ]
      }
    }
  }