/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-28 20:15:15
 */
export default {
    data() {
      return {
        formConfig:{
          name:{
            name:'品牌名称',
            type:'text',
          },
          code:{
            name:'品牌编码',
            type:'text',
          },
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
          code: '',
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
        }
      }
    }
  }