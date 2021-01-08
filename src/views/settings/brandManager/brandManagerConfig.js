/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-08 16:07:43
 */
export default {
    data() {
      const platformIdVail = (rule, value, callback) => {
        if (value == ''||value === undefined) {
            callback(new Error('请选择平台名称'));
        } else {
          callback();
        }
      };
      return {
        formConfig:{
          name:{
            name:'品牌名称',
            type:'text',
          },
          // code:{
          //   name:'品牌编码',
          //   type:'text',
          // },
          platformId:{
            name:'平台名称',
            type:'select',
            dataSource:{
                type:'dynamic',
                url:'/api/GetPlatformsList',
                data:[],
            },
          },
        },
        formValidate: {
          name: '',
          // code: '',
          platformId: '',
          merchantId: 0
        },
        ruleValidate: {
          name: [{
              required: true,
              message: '请输入品牌名称',
              trigger: 'blur'
          }],
          code: [{
              required: true,
              type: 'string',
              message: '请输入品牌编码',
              trigger: 'blur'
          }],
          platformId: [{ 
            required: true, 
            message: '请选择平台名称',
            validator: platformIdVail, 
            trigger: 'change' 
          }],
        }
      }
    }
  }