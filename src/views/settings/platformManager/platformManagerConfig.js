/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-18 09:46:42
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
          chargeUserId:{
            name:'负责人名称',
            type:'select',
            dataSource:{
                multiple:false,
                type:'static',
                data:[
                  {
                    name: 'admin',
                    value: '66f3065c-4cbc-40d1-84fa-ecf8c73c72cf'
                  },
                  {
                    name: '王二',
                    value: '1ea276b5-0e68-1fa8-0182-840eb50a415a'
                  },
                  {
                    name: '李四',
                    value: '56106114-c665-8a41-a1df-3d49a1a94afb'
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
          chargeUserId: '',
          id:'',
        },
        ruleValidate: {
          name: [{
              required: true,
              message: '请输入平台编码',
              trigger: 'blur'
          }],
          code: [{
              required: true,
              type: 'string',
              message: '请输入平台code',
              trigger: 'blur'
          }],
          url: [{
              required: true,
              type: 'string',
              message: '请输入url',
              trigger: 'blur'
          }],
          chargeUserId: [{ 
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