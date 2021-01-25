/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-25 15:10:53
 */
export default {
    data() {
      return {
        formConfig:{
          name:{
            name:'商户名称',
            type:'text',
            length:50
          },
          code:{
            name:'商户号',
            type:'text',
            length:50,
            disabled:true,
          },
          authCode:{
            name:'商编',
            type:'text',
            length:50  
          },
          chargeUser:{
            name:'负责人',
            type:'text',
          },
          telePhone:{
            name:'联系电话',
            type:'text',
          },
          address:{
            name:'联系地址',
            type:'text',
          },
          enabled:{
            name:'是否启用',
            type:'radio',
            dataSource:{
              type:'static',
              data:[
                {name:'是',value:true},
                {name:'否',value:false}
              ],
            }
          },
        },
        formValidate: {
          name: '',
          code:'',
          authCode:'',
          chargeUser:'',
          telePhone:'',
          address:'',
          enabled:true
        },
        ruleValidate: {
          name: [{
              required: true,
              message: '请输入商户名称',
              trigger: 'blur'
          }],
          telePhone: [
            {
              required: true,
              type: 'string',
              message: '请输入联系电话',
              trigger: 'blur'
            },
            { pattern: /^1[3456789]\d{9}$/, message: "手机号码格式不正确", trigger: "blur" }
          ],
        }, 
      }
    }
  }