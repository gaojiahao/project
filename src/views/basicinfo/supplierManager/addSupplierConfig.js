/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-10 22:48:15
 */
export default {
    data() {
      return {
        formConfig:{
          name:{
            name:'供应商名称',
            type:'text',
          },
          code:{
            name:'供应商编号',
            type:'text',
            
          },
          telePhone:{
            name:'联系电话',
            type:'text',
          },
          changeUser:{
            name:'联系人',
            type:'text',
          },
          address:{
            name:'联系地址',
            type:'text',
          },
          email:{
            name:'邮箱',
            type:'text',
          },
          remark:{
            name:'备注',
            type:'textarea',
          },
        },
        formValidate: {
          name:'',
          code: '',
          telePhone: '',
          changeUser:null,
          address:'',
          email:'',
          remark:''
        },
        ruleValidate: {
          code: [{
              required: true,
              type: 'string',
              message: '请输入供应商编号',
              trigger: 'blur'
          }],
          name: [{
              required: true,
              type: 'string',
              message: '请输入供应商名称',
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
          contacts: [{

          }],
          email: [
            { required: false, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入有效的邮箱', trigger: 'blur' }
          ],
          comment: [{

          }],
        }, 
      }
    }
  }