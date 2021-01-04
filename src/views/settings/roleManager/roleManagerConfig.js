/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-31 17:47:18
 */
export default {
  data() {
    return {
      formConfig:{
        roleName:{
          name:'角色名称',
          type:'text',
        },
        roleCode:{
          name:'角色编码',
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
        isAdmin:{
          name:'是否管理员',
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
        roleName: '',
        roleCode:'',
        enabled:true,
        isAdmin:false,
        merchantId:0,
        moduleIdList:[]
      },
      ruleValidate: {
        name: [{
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
        }],
        isEnabled: [{ 
          required: true, 
          message: '是否启用', 
          trigger: 'change' 
        }],
      },
      filtersConfig:{
        roleName:{
          name:'角色名称',
          value:'roleName',
          type:'text',
        }, 
        roleCode:{
          name:'角色编码',
          value:'roleCode',
          type:'text',
        },  
        createTime:{
          name:'创建时间',
          value:'createTime',
          type:'dateTime',
        },
        enabled:{
          name:'是否启用',
          value:'enabled',
          type:'radio',
          dataSource:{
            type:'static',
            data:[
              {name:'已启用',value:true},
              {name:'未启用',value:false}
            ],
          },
        },
        modifyTime:{
          name:'修改时间',
          value:'modifyTime',
          type:'dateTime',
        },
        creater:{
          name:'创建者',
          value:'creater',
          type:'text',
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