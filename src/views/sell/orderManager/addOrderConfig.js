/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-23 11:23:32
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
            name:'产品编码',
            type:'text',
          },
          name:{
            name:'产品名称',
            type:'text',
          },
          categoryId:{
            name:'类目',
            type:'tree',
            dataSource:{
              type:'dynamic',
              url:'/api/GetCategoryList',
              data:[],
              params:'keyword',
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
            type:'uploadFile',
            length: 3
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
          code: [{ pattern: /^[A-Za-z0-9-_]{4,30}$/, message: '产品编码只能由字母，数字，下划线加中横线组成', trigger: 'blur' }],
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
      }
    }
  }