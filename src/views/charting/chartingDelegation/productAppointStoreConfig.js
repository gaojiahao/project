/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-10 17:57:11
 */
export default {
    data() {
      const datadVali = (rule, value, callback) => {
        if (value == ''||value === undefined) {
            callback(new Error('请选择分配人员'));
        } else {
          for(var i=0;i<value.length;i++){
            for(var j in value[i]){
              if(!value[i][j]){
                callback(new Error('请选择分配人员')); 
              }
              if(j=='date'){
                if(!value[i][j][0]){
                  callback(new Error('请选择分配时间')); 
                }
              }
            }
          }
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
        formConfig2:{
          // data:{
          //   name:'分配人员',
          //   type:"distributionPeople",
          //   parmas: ['categoryId','platformId']
          // },
          morePic:{
            name:'是否多店多主图',
            type:'radio',
            dataSource:{
              type:'static',
              data:[
                {name:'是',value:'true'},
                {name:'否',value:'false'}
              ],
            },
          },
          remark:{
            name:'制作意见',
            type:'textarea',
          }
        },
        formValidate2: {
          // data:[],
          morePic:'true',
          remark:''
        },
        ruleValidate2: {
          data: [{ required: true, message: '请选择分配人员',validator: datadVali, trigger: 'change' }],
        },
      }
    }
  }