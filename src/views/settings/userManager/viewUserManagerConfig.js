/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-24 14:28:29
 */
export default {
  data() {
    const sexVali = (rule, value, callback) => {
      if (value == ''||value === undefined) {
          callback(new Error('请选择性别'));
      } else {
        callback();
      }
    };
    const enabledVali = (rule, value, callback) => {
      if (value == ''||value === undefined) {
          callback(new Error('请选择是否启用'));
      } else {
        callback();
      }
    };
    const roleIdVali = (rule, value, callback) => {
      if (value == ''||value === undefined) {
          callback(new Error('请选择所属角色'));
      } else {
        callback();
      }
    };
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
        // merchantCode:{
        //   name:'商户号',
        //   type:'text', 
        //   disabled:true 
        // },
        email:{
          name:'邮箱',
          type:'text',
        },
        phoneNumber:{
          name:'手机',
          type:'text',
          disabled:true
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
        // password:{
        //   name:'密码',
        //   type:'password',
        //   placeholder:'密码由6-20位数字加大小写字母特殊字符组成',
        // },
        isManager:{
          name:'是否主管',
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
        remark:{
          name:'备注',
          type:'textarea',
        },
        roleId:{
          name:'所属角色',
          type:'select',
          dataSource:{
            type:'dynamic',
            url:'/api/AuthRoleList',
            data:[],
            col:[
              {k:'name',v:'roleName'},
              {k:'value',v:'id'}
            ]
          },
        },
      },
      formValidate: {
        userName: '',
        roleId:'',
        merchantCode:'',
        nickName:'',
        email: '',
        phoneNumber:'',
        birthday:'',
        sex:1,
        password:'',
        isManager:false,
        enabled:true,
        remark:'',
        userRoleId:'',
      },
      ruleValidate: {
        userName: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
        }],
        merchantCode: [{
          required: true,
          message: '请输入商户号',
          trigger: 'blur'
        }],
        email: [{
            required: true,
            type: 'string',
            message: '请输入邮箱',
            trigger: 'blur'
          },
          { type: 'email', message: '请输入有效的邮箱', trigger: 'blur' }
        ],
        phoneNumber: [{
            required: true,
            type: 'string',
            message: '请输入手机',
            trigger: 'blur'
          },{ pattern: /^1[3456789]\d{9}$/, message: "手机号码格式不正确", trigger: "blur" }
        ],
        password:[{
            required: false,
            type: 'string',
            message: '请输入密码',
            trigger: 'blur'
          },{ pattern: /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,20}$/, message: "密码格式不正确", trigger: "blur" }
        ],
        status: [{ 
          required: true, 
          message: '是否启用', 
          trigger: 'change' 
        }],
        sex: [{ required: true, message: '请选择性别',validator: sexVali, trigger: 'change' }],
        // enabled: [{ required: true, message: '请选择是否启用',validator: enabledVali, trigger: 'change' }],
        roleId: [{ required: true, message: '请选择所属角色',validator: roleIdVali, trigger: 'change' }],
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