/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-10 19:57:37
 */
export default {
  data() {
    return {
      formConfig:{
        shenhe:{
          name:'开发',
          type:'radio',
          dataSource:{
            type:'static',
            data:[
              {name:'是',value:'true'},
              {name:'否',value:'false'}
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
          message: '请选择开发', 
          trigger: 'change' 
        }],
      },
      formConfig2:{
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
      formValidate2: {
        shenhe:'',
      },
      ruleValidate2: {
        shenhe: [{ 
          required: true, 
          message: '请审核', 
          trigger: 'change' 
        }],
      }, 
    }
  }
}