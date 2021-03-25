/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-25 11:16:40
 */
export default {
    data() {
      const areaLevelVali = (rule, value, callback) => {
        if (value == ''||value === undefined) {
            callback(new Error('请选择层级'));
        } else {
          callback();
        }
      };
      return {
        formConfig:{
          longName:{
            name:'英文名称',
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
          chinaName:'',
          longName: '',
          abbreviation:'',
          areaLevel:'',
          directLevel:'',
        },
        ruleValidate: {
          longName: [{
              required: true,
              message: '请输入英文名称',
              trigger: 'blur'
          }],
          abbreviation: [{
            required: true,
            message: '请输入简称',
            trigger: 'blur'
          }],
          chinaName: [{
            required: true,
            message: '请输入中文名称',
            trigger: 'blur'
          }],
          areaLevel: [{
            required: true,
            message: '请选择层级',
            trigger: 'change',
            validator: areaLevelVali
        }],
        }, 
      }
    }
  }