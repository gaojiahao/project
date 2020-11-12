/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-12 15:06:23
 */
export default {
  data() {
    return {
      formConfig:{
        status:{
          name:'审核',
          type:'radio',
          dataSource:{
            type:'static',
            data:[
              {name:'同意',value:'true'},
              {name:'不同意',value:'false'}
            ],
          }
        },
      },
      formValidate: {
        status:'',
      },
      ruleValidate: {
        status: [{ 
          required: true, 
          message: '是否审核', 
          trigger: 'change' 
        }],
    }, 
    }
  }
}