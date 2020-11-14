/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-04 18:18:16
 */
export default {
  data() {
    return {
      formConfig:{
        userName:{
          name:'用户名',
          type:'text',
        },
        email:{
          name:'邮箱',
          type:'text',
        },
        status:{
          name:'是否启用',
          type:'radio',
          dataSource:{
            type:'static',
            data:[
              {name:'是',value:'true'},
              {name:'否',value:'false'}
            ],
          }
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
        id:'',
        tenantCode: '',
        userName: '',
        email: '',
        status:'',
        roleId:'',
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
        status: [{ 
          required: true, 
          message: '是否启用', 
          trigger: 'change' 
        }],
    }, 
    }
  }
}