/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-16 10:21:27
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
              disabled: true
            },
            productName:{
              name:'商品名称',
              type:'text',
              disabled: true
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
              },
              disabled: true
            },
            characteristicLable:{
              name:'特性标签',
              type:'texts',
              disabled: true
            },
            brand:{
              name:'品牌',
              type:'text',
              disabled: true
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
              },
              disabled: true
            },
            weight:{
              name:'商品重量',
              type:'text',
              unit:'kg',
              disabled: true
            },
            productSize:{
              name:'商品尺寸',
              type:'size',
              disabled: true
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
          },
          purchase:{
            field:{
              supplier:{
                name:'供应商名称',
                type:'text',
              }, 
              minimumPurchaseQuantity:{
                name:'最小采购量',
                type:'text',
              }, 
              purchasePrice:{
                name:'采购单价',
                type:'text',
              },
              url:{
                name:'参考链接',
                type:'text',
              },
              comment:{
                name:'备注',
                type:'textarea',
              },
            }  
          },
          property:{
            field:{
              color:{
                name:'颜色',
                type:'select',
                dataSource:{
                  type:'static',
                  data:[
                    {name:'积木',value:'001'},
                    {name:'灯',value:'002'}
                  ],
                }
              },
              packaging:{
                name:'材料',
                type:'select',
                dataSource:{
                  type:'static',
                  data:[
                    {name:'积木',value:'001'},
                    {name:'灯',value:'002'}
                  ],
                }
              },
              isHavePackage:{
                name:'是否包装',
                type:'select',
                dataSource:{
                  type:'static',
                  data:[
                    {name:'积木',value:'001'},
                    {name:'灯',value:'002'}
                  ],
                }
              },
              isHaveElect:{
                name:'是否带电',
                type:'select',
                dataSource:{
                  type:'static',
                  data:[
                    {name:'积木',value:'001'},
                    {name:'灯',value:'002'}
                  ],
                }
              },
            }
          },
          detailInfo:{
            field:{
              detailInfo:{
                name:'详细信息',
                type:'textarea', 
              }  
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
          },
          purchase:{
            supplier:'',
            minimumPurchaseQuantity:'',
            purchasePrice:'',
            url:'',
            comment:''
          },
          property:{
            color:'',
            packaging:'',
            isHavePackage:'',
            isHaveElect:''
          },
          detailInfo:{
            detailInfo:''
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