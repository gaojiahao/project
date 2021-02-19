/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-08 17:44:32
 */
export default {
    data() {
      const categoryIdVali = (rule, value, callback) => {
        if (value == ''||value === undefined) {
            callback(new Error('请选择类目'));
        } else {
          callback();
        }
      };
      return {
        formConfig:{
          code:{
            name:'商品货号',
            type:'text',
          },
          name:{
            name:'商品名称',
            type:'text',
          },
          categoryId:{
            name:'类目',
            type:'select',
            dataSource:{
              type:'dynamic',
              url:'/api/GetCategoryList',
              data:[],
              col:[
                {k:'name',v:'name'},
                {k:'value',v:'id'}
              ]
            },
            bind:{
              target: 'categoryName',
              bindValue: 'name'
            }
          },
          imgUrl:{
            name:'商品图片',
            type:'uploadImage',
            length: 3,
            disabled:true
          },
          urlOne:{
            name:'参考链接',
            type:'text',
          },
          remark:{
            name:'推荐备注',
            type:'textarea',
          },
        },
        formValidate: {
          code:'',
          name:'',
          categoryId: '',
          categoryName: '',
          imgUrl: [],
          urlOne:'',
          remark:'',
        },
        ruleValidate: {
          name: [{
              required: true,
              type: 'string',
              message: '请输入商品名称',
              trigger: 'blur'
          }],
          categoryId: [{
            required: true,
            message: '请选择类目',
            trigger: 'change',
            validator: categoryIdVali,
          }],
        },
        approvalConfig:{
          reviewRemark:{
            name:'推荐审核意见',
            type:'textarea',
          },
        },
        approvalValidate: {
          reviewType:'aaaaa',
          relatedId:'',
          isPass:'',
          reviewResult:1,
          resultName:'fdsa',
          reviewBefore:2,
          beforeName:'fdas',
          reviewRemark:'',
        },
        approvalRuleValidate: {
          reviewRemark: [{
            required: true,
            message: '请输入推荐审核意见',
            trigger: 'blur'
          }],
        }
      }
    }
  }