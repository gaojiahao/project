/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-04 20:15:10
 */
export default {
    data() {
      return {
        formConfig:{
          supplierCode:{
            name:'模块编号',
            type:'text',
          },
          supplierName:{
            name:'模块名称',
            type:'text',
            
          },
          status:{
            name:'状态',
            type:'radio',
            dataSource:{
              type:'static',
              data:[
                {name:'是',value:'true'},
                {name:'否',value:'false'}
              ],
            },
            disabled: false
          },
          comment:{
            name:'备注',
            type:'textarea',
          },
        },
        formValidate: {
          supplierCode:'',
          supplierName: '',
          status: '',
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