/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-04 20:07:40
 */
export default {
  data() {
    return {
      formConfig:{
        name:{
          name:'角色名称',
          type:'text',
        },
        isEnabled:{
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
      },
      formValidate: {
        name: '',
        isEnabled:'',
      },
      ruleValidate: {
        name: [{
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
        }],
        isEnabled: [{ 
          required: true, 
          message: '是否启用', 
          trigger: 'change' 
        }],
    }, 
    }
  }
}