/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-04 17:45:31
 */
export default {
  data() {
    return {
      formConfig:{
        userName:{
          name:'用户名',
          type:'text',
        },
        nickName:{
          name:'昵称',
          type:'text',
        },
        email:{
          name:'邮箱',
          type:'text',
        },
        phoneNumber:{
          name:'手机',
          type:'text',  
        },
        birthday:{
          name:'生日',
          type:'dateTime'
        },
        sex:{
          name:'性别',
          type:'radio',
          dataSource:{
            type:'static',
            data:[
              {name:'男',value:1},
              {name:'女',value:2}
            ],
          }
        },
        password:{
          name:'密码',
          type:'text'
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
        remark:{
          name:'备注',
          type:'textarea',
        },
        roleId:{
          name:'所属角色',
          type:'select',
          dataSource:{
            multiple:false,
            type:'static',
            data:[
              {
                name: '管理员',
                value: 'adminstomr'
              },
              {
                name: '开发人员',
                value: 'productr'
              },
              {
                name: '技术人员',
                value: 'techtor'
              },
            ],
          },
          columns:[
            {
              name:'ID',
              value:'id'
            },
            {
              name:'角色',
              value:'name'
            },
          ],
        },
      },
      formValidate: {
        userName: '',
        nickName:'',
        email: '',
        phoneNumber:'',
        birthday:'',
        sex:'',
        password:'123456',
        enabled:true,
        remark:'',
        // roleId:'',
      },
      ruleValidate: {
        userName: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
        }],
        email: [{
            required: true,
            type: 'string',
            message: '请输入邮箱',
            trigger: 'blur'
        }],
        phoneNumber: [{
          required: true,
          type: 'string',
          message: '请输入手机',
          trigger: 'blur'
        }],
        status: [{ 
          required: true, 
          message: '是否启用', 
          trigger: 'change' 
        }],
      },
      filtersConfig:{
        userName:{
          name:'用户名称',
          value:'userName',
          type:'text',
        }, 
        nickName:{
          name:'昵称',
          value:'nickName',
          type:'text',
        },  
        phoneNumber:{
          name:'手机',
          value:'phoneNumber',
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