/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-21 17:35:01
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
      filtersConfig:{
        name:{
          name:'物流名称',
          value:'name',
          type:'text',
        }, 
        code:{
          name:'物流编码',
          value:'code',
          type:'text',
        },  
        createdBy:{
          name:'创建者',
          value:'createdBy',
          type:'text',
        },
        createdOn:{
          name:'创建时间',
          value:'createdOn',
          type:'dateTime',
        },
        modifyBy:{
          name:'修改者',
          value:'modifyBy',
          type:'text',
        },
        modifyOn:{
          name:'修改时间',
          value:'modifyOn',
          type:'dateTime',
        },
        status:{
          name:'状态',
          value:'status',
          type:'radio',
          dataSource:{
            type:'static',
            data:[
              {name:'已启用',value:'true'},
              {name:'未启用',value:'false'}
            ],
          },
        },
      }
    }
  }
}