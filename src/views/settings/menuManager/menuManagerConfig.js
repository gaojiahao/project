/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-24 17:09:49
 */
export default {
  data() {
    return {
      formConfig:{
        name:{
          name:'菜单名称',
          type:'text',
        },
        linkUrl:{
          name:'路由地址',
          type:'text',
          length:50
        },
        icon:{
          name:'菜单图标',
          type:'uploadImage',
          length:1,
        },
        code:{
          name:'标签',
          type:'text',
          length:50
        },
        isMenu:{
          name:'是否菜单',
          type:'radio',
          dataSource:{
            type:'static',
            data:[
              {name:'是',value:true},
              {name:'否',value:false}
            ],
          }
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
        parentId:{
          name:'父级菜单ID',
          type:'text',
          disabled:true,
          hidden:true
        },
      },
      formValidate: {
        name: '',
        linkUrl: '',
        icon:'',
        code:'',
        isMenu: true,
        enabled:true,
        parentId:0,
        children:[]
      },
      ruleValidate: {
        name: [{
          required: true,
          type: 'string',
          message: '请输入菜单名称',
          trigger: 'blur'
        }],
        linkUrl: [{
          required: true,
          type: 'string',
          message: '请输入路由地址',
          trigger: 'blur'
        }],
        code: [{
          required: true,
          type: 'string',
          message: '请输入标签',
          trigger: 'blur'
        }],
      },
      filtersConfig:{
        name:{
          name:'菜单名称',
          value:'name',
          type:'text',
        },  
        createTime:{
          name:'创建时间',
          value:'createTime',
          type:'dateTime',
        },
        status:{
          name:'状态',
          value:'status',
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