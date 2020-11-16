/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-16 10:33:30
 */
export default {
  data() {
    return {
      resultFormConfig:{
        researchUrl:{
          name:'调研链接',
          type:'select',
          dataSource:{
            type:'static',
            data:[
              {name:'www.baidu.com',value:'www.baidu.com'},
              {name:'www.sohu.com',value:'www.sohu.com'}
            ],
          }
        },
        researchPrice:{
          name:'调研价格',
          type:'select',
          dataSource:{
            type:'static',
            data:[
              {name:'100',value:'100'},
              {name:'200',value:'200'}
            ],
          }
        },
      },
      resultFormValidate: {
        researchUrl:'',
        researchPrice:''
      },
      resultRuleValidate: {
        researchUrl: [{ 
          required: true, 
          message: '请选择调研链接', 
          trigger: 'change' 
        }],
        researchPrice: [{ 
          required: true, 
          message: '请选择调研价格', 
          trigger: 'change' 
        }],
      }, 
    }
  }
}