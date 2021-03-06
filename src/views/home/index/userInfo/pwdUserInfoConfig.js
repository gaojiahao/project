/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-06 15:53:11
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
      formConfig3:{
        original:{
          name:'原密码',
          type:'password',
          placeholder:'密码由6-20位数字加大小写字母特殊字符组成',
        },
        newPwd:{
          name:'新密码',
          type:'password',
          placeholder:'密码由6-20位数字加大小写字母特殊字符组成',
        },
      },
      formValidate3: {
        id: '',
        original:'',
        newPwd:'',
      },
      ruleValidate3: {
        original:[{
            required: true,
            type: 'string',
            message: '请输原密码',
            trigger: 'blur'
          }
        ],
        newPwd:[{
            required: true,
            type: 'string',
            message: '请输新密码',
            trigger: 'blur'
          },{ pattern: /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,20}$/, message: "密码格式不正确", trigger: "blur" }
        ],
      },
    }
  }
}