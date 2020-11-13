/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-13 10:07:42
 */
export default {
    data() {
      return {
        formConfig:{
          supplierCode:{
            name:'客户编号',
            type:'text',
          },
          supplierName:{
            name:'客户名称',
            type:'text',
            
          },
          phone:{
            name:'联系电话',
            type:'text',
          },
          contacts:{
            name:'联系人',
            type:'text',
          },
          address:{
            name:'地址',
            type:'text',
          },
          email:{
            name:'邮箱',
            type:'text',
          },
          comment:{
            name:'备注',
            type:'textarea',
          },
        },
        formValidate: {
          supplierCode:'',
          supplierName: '',
          phone: '',
          contacts:'',
          address:'',
          email:'',
          comment:''
        },
        ruleValidate: {
          supplierCode: [{
              required: true,
              type: 'string',
              message: '请输入供应商编号',
              trigger: 'blur'
          }],
          supplierName: [{
              required: true,
              type: 'string',
              message: '请输入供应商名称',
              trigger: 'blur'
          }],
          phone: [{
            required: true,
            type: 'string',
            message: '请输入联系电话',
            trigger: 'blur'
          }],
          contacts: [{

          }],
          address: [{

          }],
          email: [{

          }],
          comment: [{

          }],
        }, 
      }
    }
  }