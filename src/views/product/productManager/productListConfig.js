/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-10 19:49:29
 */
export default {
  data() {
    return {
      formConfig:{
        shenhe:{
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
        shenhe:'',
      },
      ruleValidate: {
        shenhe: [{ 
          required: true, 
          message: '请审核', 
          trigger: 'change' 
        }],
    }, 
    }
  }
}