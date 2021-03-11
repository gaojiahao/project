/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-11 15:01:30
 */
export default {
  data() {
    const imgVali = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('请上传文件'));
      } else {
        callback();
      }
    };
    return {
      formConfig3:{
        // fileType:{
        //   name:"制作类型",
        //   type:"text",
        // },
        fileTypeName:{
          name:"制作类型",
          type:"text",
        },
        userId:{
          name:'制作人员',
          type:'text',
        },
        remark:{
          name:'制作意见',
          type:'textarea',
        },
        startTime:{
          name:'开始时间',
          type:'dateTime',
        },
        endTime:{
          name:'结束时间',
          type:'dateTime',
        },
      },
      formValidate3: {
        fileType:'',
        fileTypeName:'',
        userId:'',
        remark: '',
        startTime:'',
        endTime:'',
      },
      ruleValidate3: {
        
      },
      formConfig2:{
        img:{
          name:"文件",
          type:"uploadImage",
        },
      },
      formValidate2:{
        img:[]
      },
      ruleValidate2: {
        img: [{ 
          required: true, 
          message: '请上传文件', 
          trigger: 'change',
          validator: imgVali
        }],  
      },
    }
  }
}