/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-06 18:19:24
 */
export default {
  data() {
    return {
      formConfig:{
        storeName:{
          name:'店铺名称',
          type:'text',
        },
        name:{
          name:'负责人',
          type:'text',
        },
        storeCode:{
          name:'店铺代码',
          type:'text',
        },
        account:{
          name:'账号名称',
          type:'text',
        },
        LoginID:{
          name:'LoginID',
          type:'text',
        },
        appKey:{
          name:'appKey',
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
          }
        },
        createTime:{
          name:'创建时间',
          type:'text',
        },
      },
      formValidate: {
        storeName:'',
        name: '',
        storeCode: '',
        account: '',
        LoginID:'',
        appKey:'',
        status:'',
        createTime:'',
      },
      ruleValidate: {
        storeName: [{
            required: true,
            message: '请输入店铺名称',
            trigger: 'blur'
        }],
        name: [{
            required: true,
            type: 'string',
            message: '请输入负责人',
            trigger: 'blur'
        }],
        status: [{ 
          required: true, 
          message: '是否启用', 
          trigger: 'change' 
        }],
    }, 
    }
  }
}