/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-26 10:53:58
 */
export default {
    data() {
      const platformIdVali = (rule, value, callback) => {
        if (value == '') {
            callback(new Error('请选择平台名称'));
        } else {
          callback();
        }
    };
      return {
        formConfig:{
          name:{
            name:'店铺名称',
            type:'text',
          },
          code:{
            name:'店铺代号',
            type:'text',
          },
          account:{
            name:'账号名称',
            type:'text',
          },
          login_Id:{
            name:'login_Id',
            type:'text',
          },
          app_Key:{
            name:'app_Key',
            type:'text',
          },
          app_Secret:{
            name:'app_Secret',
            type:'text',
          },
          remark:{
            name:'备注',
            type:'textarea',
          },
          platformId:{
            name:'平台名称',
            type:'select',
            isName:true,
            dataSource:{
                type:'dynamic',
                url:'/api/GetPlatformsList',
                data:[],
            },
            bind:{
              target: 'platformName',
              bindValue: 'name'
            }
          },
        },
        formValidate: {
          name: '',
          code:'',
          account: '',
          login_Id: '',
          app_Key:'',
          app_Secret:'',
          platformId:'',
          platformName:'',
          remark:'',
        },
        ruleValidate: {
          name: [{
              required: true,
              message: '请输入店铺名称',
              trigger: 'blur'
          }],
          code: [{
              required: true,
              message: '请输入店铺代码',
              trigger: 'blur'
          }],
          platformId: [{ validator: platformIdVali, trigger: 'change' }],
      }, 
      }
    }
  }