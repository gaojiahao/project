/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-11 15:20:33
 */
export default {
    data() {
      return {
        formConfig:{
          storeName:{
            name:'商品货号',
            type:'text',
          },
          storeCode:{
            name:'商品分类',
            type:'select',
            dataSource:{
                type:'static',
                data:[
                  {name:'积木',value:'001'},
                  {name:'灯',value:'002'}
                ],
            }
          },
          imgs:{
            name:'产品图片',
            type:'uploadImage',
            
          },
          LoginID:{
            name:'商品名称',
            type:'text',
          },
          appKey:{
            name:'参考链接',
            type:'text',
          },
          createTime:{
            name:'推荐备注',
            type:'textarea',
          },
        },
        formValidate: {
          storeName:'',
          storeCode: '',
          imgs: [],
          LoginID:'',
          appKey:'',
          createTime:'',
        },
        ruleValidate: {
          storeName: [{
              required: true,
              type: 'string',
              message: '请输入商品货号',
              trigger: 'blur'
          }],
          LoginID: [{
              required: true,
              type: 'string',
              message: '请输入商品名称',
              trigger: 'blur'
          }],
          storeCode: [{ 
            required: true, 
            message: '商品分类', 
            trigger: 'change' 
          }],
      }, 
      }
    }
  }