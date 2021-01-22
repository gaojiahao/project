import { String } from "core-js"

/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-22 10:36:38
 */
export default {
  data() {
    const countryVali = (rule, value, callback) => {
      if (value == ''||value === undefined) {
          callback(new Error('请选择国家'));
      } else {
        callback();
      }
    };
    return {
      formConfig2:{
        name:{
          name:'模板名称',
          type:'text',
        }, 
        logisticsName:{
          name:'物流名称',
          type:'text',
          disabled:true
        },
        country:{
          name:'国家',
          type:'select',
          dataSource:{
            type:'dynamic',
            url:'/api/GetAreaList',
            data:[],
            col:[
              {k:'name',v:'longName'},
              {k:'value',v:'id'}
            ]
          },
        },
        weightStart:{
          name:'首重',
          type:'number',
        },
        weightEnd:{
          name:'截止重量',
          type:'number',
        },
        billingModel:{
          name:'计费模式',
          type:'select',
          dataSource:{
            type:'static',
            data:[
              {name:'重量',value:1},
              {name:'体积',value:2}
            ],
          }
        },
        charges:{
          name:'收费标准',
          type:'number',
        },
        minWeight:{
          name:'最低计费重量',
          type:'number',
        },
        feliveryFee:{
          name:'配送费',
          type:'number',
        },
        packageFee:{
          name:'包装费',
          type:'number',
        },
        registrationFee:{
          name:'挂号费',
          type:'number',
        },
        status:{
          name:'状态',
          type:'radio',
          dataSource:{
            type:'static',
            data:[
              {name:'启用',value:1},
              {name:'禁用',value:0}
            ],
          }
        },
      },
      formValidate2:{
        name:'',
        logisticsId:'',
        logisticsName:'',
        country:'',
        weightStart:'',
        weightEnd:'',
        billingModel:'',
        charges:'',
        minWeight:'',
        feliveryFee:'',
        packageFee:'',
        registrationFee:'',
        status:''
      },
      ruleValidate2:{
        name: [{
          required: true,
          message: '请输入模板名称',
          trigger: 'blur'
        }],
        country: [{
          required: true,
          message: '请选择国家',
          trigger: 'change',
          validator: countryVali
        }],
        weightStart: [{
          required: true,
          type: 'number',
          message: '请输入首重',
          trigger: 'blur'
        }],
        weightEnd: [{
          required: true,
          type: 'number',
          message: '请输入截止重量',
          trigger: 'blur'
        }],
      },
      filtersConfig:{
        name:{
          name:'模板名称',
          value:'name',
          type:'text',
        },
      }
    }
  }
}