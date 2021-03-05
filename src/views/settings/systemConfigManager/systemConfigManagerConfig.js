/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-11 22:10:56
 */
export default {
  data() {
    return {
      formConfig:{
        name:{
          name:'名称',
          type:'text',
        },
        code:{
          name:'编码',
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
        congfigType:{
          name:'系统配置类型',
          type:'select',
          dataSource:{
            type:'static',
            data:[
              {name:'包装材料',value:'packageMaterial'},
              {name:'标签',value:'productLabel'},
              {name:'制图选项',value:'filetype'}
            ],
          }
        },
        name:{
          name:'名称',
          value:'name',
          type:'text',
        }, 
        code:{
          name:'编码',
          value:'code',
          type:'text',
        },  
        enabled:{
          name:'是否启用',
          value:'enabled',
          type:'radio',
          dataSource:{
            type:'static',
            data:[
              {name:'是',value:true},
              {name:'否',value:false}
            ],
          },
        },
        createdName:{
          name:'创建者',
          value:'createdName',
          type:'text',
        },
        createdOn:{
          name:'创建时间',
          value:'createdOn',
          type:'dateTime',
        },
        modifyTime:{
          name:'修改时间',
          value:'modifyTime',
          type:'dateTime',
        },
        modifyer:{
          name:'修改者',
          value:'modifyer',
          type:'text',
        },
      }
    }
  }
}