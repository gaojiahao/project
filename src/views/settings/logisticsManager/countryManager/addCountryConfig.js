/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-25 10:58:41
 */
export default {
    data() {
      return {
        formConfig:{
          longName:{
            name:'全称',
            type:'text',
            length:50
          },
          abbreviation:{
            name:'简称',
            type:'text',
            length:50
          },
          chinaName:{
            name:'中文名称',
            type:'text',
            length:50  
          },
          areaLevel:{
            name:'层级',
            type:'select',
            dataSource:{
              type:'static',
              data:[
                {name:'洲',value:1},
                {name:'国',value:2},
                {name:'州',value:3},
                {name:'城市',value:4}
              ],
            }  
          },
          directLevel:{
            name:'直观级别 州，市等',
            type:'text',
            length:50  
          },
        },
        formValidate: {
          longName: '',
          abbreviation:'',
          chinaName:'',
          areaLevel:'',
          directLevel:'',
        },
        ruleValidate: {
          longName: [{
              required: true,
              message: '请输入全称',
              trigger: 'blur'
          }],
        }, 
      }
    }
  }