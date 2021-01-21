/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-19 09:42:15
 */
export default {
  data() {
    const isTortSizeVali = (rule, value, callback) => {
      if (value == ''||value === undefined) {
        if(value===false){
          callback();   
        } else {
          callback(new Error('请选择是否侵权'));
        }
      } else {
        callback();
      }
    };
    const reasonVali = (rule, value, callback) => {
      if (value == ''||value === undefined) {
          callback(new Error('请选择原因'));
      } else {
        callback();
      }
    };
    return {
      formConfig2:{
        isTort:{
          name:'是否侵权',
          type:'radio',
          dataSource:{
            data:[
              { name:'侵权',value:true},
              { name:'不侵权',value:false},
            ]
          }
        },
        reason:{
          name:'原因',
          type:'select',
          dataSource:{
            type:'dynamic',
              url:'/api/GetSystemConfigList',
              data:[],
              parmas:{congfigType:'isTort'},
              col:[
                {k:'name',v:'name'},
                {k:'value',v:'id'}
              ]
            }
        },
        remark:{
          name:'备注',
          type:'textarea',  
        },
      },
      formValidate2: {
        goodsId:"",
        platformId:'',
        platformName:'',
        isTort:'',
        reason:'',
        remark:'',
        tortStatus:''
      },
      ruleValidate2: {
        isTort: [{
          required: true,
          message: '是否侵权',
          trigger: 'change',
          validator: isTortSizeVali
        }],
        reason: [{
          required: true,
          message: '请选择原因',
          trigger: 'change',
          validator: reasonVali
        }],
        opinion: [{
            required: true,
            type: 'string',
            message: '请输入备注',
            trigger: 'blur'
        }],
      }, 
    }
  }
}