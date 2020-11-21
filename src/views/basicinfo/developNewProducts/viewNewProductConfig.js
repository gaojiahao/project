/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-20 16:45:50
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
            productCode:'范德萨发大水',
            productName: '范德萨发',
            productType: '发生',
            characteristicLable:'发生',
            brand:'发生',
            isHavePackage:'true',
            weight:'发生',
            productSize:'范德萨'
          },
          otherInfo:{
            packaging:'发多少',
            packagingCost:'发生',
            packagingSize:'饭',
            productCharacteristic:'发生',
            comment:'发生范德萨发多少'
          },
          purchase:{
            supplier:'发多少',
            minimumPurchaseQuantity:'发多少',
            purchasePrice:'发是',
            url:'发生范德萨发',
            comment:'发的说法是的'
          },
          property:{
            color:'001',
            packaging:'反攻倒算',
            isHavePackage:'个梵蒂冈是',
            isHaveElect:'范德萨'
          },
          detailInfo:{
            detailInfo:'个梵蒂冈是豆腐干豆腐干豆腐'
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
        filtersConfig:{
          productType:{
            name:'分类',
            value:'productType',
            type:'select',
            dataSource:{
              type:'static',
              data:[
                {name:'积木',value:'001'},
                {name:'灯',value:'002'}
              ],
            },
          },
          sku:{
            name:'SKU',
            value:'sku',
            type:'text',
          },  
          color:{
            name:'颜色',
            value:'color',
            type:'text',
          },
          producName:{
            name:'产品名称',
            value:'producName',
            type:'text',
          },
          supplier:{
            name:'产商',
            value:'supplier',
            type:'text',
          },
          supplierNum:{
            name:'产商货号',
            value:'supplierNum',
            type:'text',
          },
          createTime:{
            name:'创建时间',
            value:'createTime',
            type:'dateTime',
          },
          recommendingOfficer:{
            name:'推荐人员',
            value:'recommendingOfficer',
            type:'text',
          },
          status:{
            name:'状态',
            value:'status',
            type:'radio',
            dataSource:{
              type:'static',
              data:[
                {name:'是',value:'true'},
                {name:'否',value:'false'}
              ],
            },
          },
        }
      }
    }
  }