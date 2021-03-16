/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-16 10:38:05
 */
export default {
  data() {
    const platformIdVali = (rule, value, callback) => {
      if (value == ''||value === undefined) {
        callback(new Error('请选择平台名称'));
      } else {
        callback();
      }
    };
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
        platformId:{
          name:'平台名称',
          type:'selectCustom',
          dataSource:{

          },
          allow:false,
          createFun:'',
          multiple:true
        },
        isTort:{
          name:'是否侵权',
          type:'checkbox',
          dataSource:{
            data:[
              { name:'是',value:true},
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
        // platformId: [{
        //   required: true,
        //   message: '请选择平台名称',
        //   trigger: 'change',
        //   validator: platformIdVali
        // }],
        // isTort: [{
        //   required: true,
        //   message: '是否侵权',
        //   trigger: 'change',
        //   validator: isTortSizeVali
        // }],
        // reason: [{
        //   required: true,
        //   message: '请选择原因',
        //   trigger: 'change',
        //   validator: reasonVali
        // }],
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