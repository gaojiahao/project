/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-22 10:03:14
 */
export default {
  data() {
    return {
      formConfig:{
        name:{
          name:'物流名称',
          type:'text',
        },
        code:{
          name:'物流编码',
          type:'text',
        },
      },
      formValidate: {
        name: '',
        code:'',
      },
      ruleValidate: {
        name: [{
            required: true,
            message: '请输入物流名称',
            trigger: 'blur'
        }],
      },
      formConfig2:{
        name:{
          name:'模板名称',
          type:'text',
        }, 
        logisticsName:{
          name:'物流名称',
          type:'text',
          hidden:true
        },
        country:{
          name:'国家',
          type:'select',
          dataSource:{
            type:'dynamic',
            url:'/api/GetAreaList',
            data:[],
          },
        },
        weightStart:{
          name:'首重',
          type:'text',
        },
        weightEnd:{
          name:'截止重量',
          type:'text',
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
          type:'text',
        },
        minWeight:{
          name:'最低计费重量',
          type:'text',
        },
        feliveryFee:{
          name:'配送费',
          type:'text',
        },
        packageFee:{
          name:'包装费',
          type:'text',
        },
        registrationFee:{
          name:'挂号费',
          type:'text',
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
          message: '请输入物流名称',
          trigger: 'blur'
        }],
        weightStart: [{
          required: true,
          message: '请输入截止重量',
          trigger: 'blur'
        }],
        weightEnd: [{
          required: true,
          message: '请输入店铺名称',
          trigger: 'blur'
        }],
      },
      filtersConfig:{}
    }
  }
}