/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-25 15:04:05
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
      formConfig:{
        code:{
          name:'产品货号',
          type:'text',
        },
        categoryId:{
          name:'类目',
          type:'text',
          hidden:true
        },
        categoryName:{
          name:'类目',
          type:'text',
        },
        productImg:{
            name:'产品图片',
            type:'uploadImage',
            disabled: true
        },
        name:{
            name:'产品名称',
            type:'text'
        },
        // selectionPeople:{
        //     name:'选品人员',
        //     type:'table'    
        // },
        // unSelectionPeople:{
        //     name:'未选人员',
        //     type:'table'    
        // },
        // appointStorePeople:{
        //     name:'派店人员',
        //     type:'table'    
        // },
      },
      formValidate: {
        code:'',
        name:'',
        categoryId:'',
        productImg:[],
      },
      ruleValidate: {

      },
      formConfig3:{
        // fileType:{
        //   name:"制作类型",
        //   type:"text",
        // },
        fileTypeName:{
          name:"制作类型",
          type:"text",
        },
        quantity:{
          name:"制作数量",
          type:"text",
        },
        userName:{
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
        quantity:'',
        userName:'',
        remark: '',
        startTime:'',
        endTime:'',
      },
      ruleValidate3: {
        
      },
      formConfig2:{
        img:{
          name:"文件",
          type:"uploadFile",
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