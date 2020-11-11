/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-11 18:37:46
 */
export default {
    data() {
      return {
        formConfig:{
          productInfo:{
            field:{
            productCode:{
              name:'商品编号',
              type:'text',
            },
            productName:{
              name:'商品名称',
              type:'text',
            },
            productType:{
              name:'分类',
              type:'select',
              dataSource:{
                type:'static',
                data:[
                  {name:'积木',value:'001'},
                  {name:'灯',value:'002'}
                ],
              }
            },
            characteristicLable:{
              name:'特性标签',
              type:'texts',
            },
            brand:{
              name:'品牌',
              type:'text',
            },
            isHavePackage:{
              name:'是否带包装',
              type:'radio',
              dataSource:{
                type:'static',
                data:[
                  {name:'是',value:'true'},
                  {name:'否',value:'false'}
                ],
              }
            },
            weight:{
              name:'商品重量',
              type:'text',
              unit:'kg'
            },
            productSize:{
              name:'商品尺寸',
              type:'size',
            },
            }
          },
          otherInfo:{
            field:{
              packaging:{
                name:'包装材料',
                type:'select',
                dataSource:{
                  type:'static',
                  data:[
                    {name:'积木',value:'001'},
                    {name:'灯',value:'002'}
                  ],
                }
              }, 
              packagingCost:{
                name:'包装成本',
                type:'text',
                unit:'CNY'
              }, 
              packagingSize:{
                name:'包装尺寸',
                type:'size',
              },
              productCharacteristic:{
                name:'商品特点',
                type:'textarea',
              },
              comment:{
                name:'备注',
                type:'textarea',
              },
            }
          }
        },
        formValidate: {
          productInfo:{
            productCode:'',
            productName: '',
            productType: '',
            characteristicLable:'',
            brand:'',
            isHavePackage:'',
            weight:'',
            productSize:''
          },
          otherInfo:{
            packaging:'',
            packagingCost:'',
            packagingSize:'',
            productCharacteristic:'',
            comment:''
          }
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