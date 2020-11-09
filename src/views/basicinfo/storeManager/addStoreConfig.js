/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-09 10:35:44
 */
export default {
    data() {
      return {
        formConfig:{
          storeName:{
            name:'平台名称',
            type:'text',
          },
          name:{
            name:'店铺名称',
            type:'text',
          },
          storeCode:{
            name:'店铺负责人',
            type:'select',
            dataSource:{
                type:'static',
                data:[
                  {name:'李四',value:'001'},
                  {name:'王五',value:'002'}
                ],
            }
          },
          account:{
            name:'店铺业务员',
            type:'select',
            dataSource:{
                type:'static',
                data:[
                  {name:'李四',value:'001'},
                  {name:'王五',value:'002'}
                ],
            }
          },
          LoginID:{
            name:'店铺代码',
            type:'text',
          },
          appKey:{
            name:'账号名称',
            type:'text',
          },
          createTime:{
            name:'LoginID',
            type:'text',
          },
          fdsf:{
            name:'appKey',
            type:'text',
          },
          dfds:{
            name:'appSercet',
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
          fdsf:'',
          dfds:''
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