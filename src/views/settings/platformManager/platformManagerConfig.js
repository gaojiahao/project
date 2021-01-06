/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-05 16:38:35
 */
export default {
    data() {
      const chargeUserVail = (rule, value, callback) => {
        if (value == ''||value === undefined) {
            callback(new Error('请选择负责人名称'));
        } else {
          callback();
        }
      };
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
              type:'dynamic',
              url:'/api/GetUserInfoList',
              data:[],
              col:[
                {k:'name',v:'userName'},
                {k:'value',v:'id'}
              ]
            },
          },
        },
        formValidate: {
          name: '',
          code: '',
          url: '',
          chargeUser: '',
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
            message: '请选择负责人',
            validator: chargeUserVail, 
            trigger: 'change' 
          }],
        },
      }
    }
  }