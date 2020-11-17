/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-04 15:57:15
 */
export default {
  data() {
    return {
      formConfig:{
        name:{
          name:'菜单名称',
          type:'text',
        },
        displayName:{
          name:'菜单显示名称',
          type:'text',
        },
        url:{
          name:'路由地址',
          type:'text',
        },
        isMenu:{
          name:'是否菜单',
          type:'radio',
          dataSource:{
            type:'static',
            data:[
              {name:'是',value:'true'},
              {name:'否',value:'false'}
            ],
          }
        },
        isEnabled:{
          name:'启用',
          type:'radio',
          dataSource:{
            type:'static',
            data:[
              {name:'是',value:'true'},
              {name:'否',value:'false'}
            ],
          }
        },
        parentId:{
          name:'父级菜单ID',
          type:'text',
        },
      },
      formValidate: {
        name: '',
        displayName: '',
        url: '',
        isMenu: '',
        isEnabled:'',
        parentId:'',
        children:[]
      },
      ruleValidate: {
        name: [{
            required: true,
            message: '请输入菜单名称',
            trigger: 'blur'
        }],
        displayName: [{
            required: true,
            type: 'string',
            message: '请输入菜单显示名称',
            trigger: 'blur'
        }],
        url: [{
            required: true,
            type: 'string',
            message: '请输入路由地址',
            trigger: 'blur'
        }],
        isMenu: [{ 
          required: true, 
          message: '请选择是否菜单', 
          trigger: 'change' 
        }],
        isEnabled: [{ 
          required: true, 
          message: '请选择是否启用', 
          trigger: 'change' 
        }],
        parentId: [{

        }],
    }, 
    }
  }
}