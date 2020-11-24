/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: gaojiahao
 * @LastEditTime: 2020-11-24 11:05:43
 */
export default {
    data() {
      return {
        formConfig:{
          productInfo:{
            field:{
            productCode:{
              container:"productInfo",
              name:'商品编号',
              type:'text',
              disabled: false
            },
            productName:{
              name:'商品名称',
              type:'text',
              disabled: false
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
              disabled: false
            },
            characteristicLable:{
              name:'特性标签',
              type:'texts',
              disabled: false
            },
            brand:{
              name:'品牌',
              type:'text',
              disabled: false
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
              disabled: false
            },
            weight:{
              name:'商品重量',
              type:'text',
              unit:'kg',
              disabled: false
            },
            productSize:{
              name:'商品尺寸',
              type:'size',
              disabled: false
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
              packagingWeight:{
                name:'包装重量',
                type:'text',
                unit:'KG'
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
              // url:{
              //   name:'参考链接',
              //   type:'selectorSingle',
              //   disabled: false, //是否禁用
              //   hidden: false,    //是否隐藏
              //   dataSource: {
              //     // "data": {
              //     //   "hFields": [
              //     //     "userId",
              //     //     "mobile",
              //     //     "email",
              //     //     "entityId",
              //     //     "area",
              //     //     "area",
              //     //     "colId"
              //     //   ],
              //     //   "params": {},
              //     //   "url": "/H_roleplay-si/ds/listUsers"
              //     // },
              //     // "type": "remoteData"
              //     data:[
              //       {id:1,platform:'亚马逊',url:"www.baidu.com",comment:"无"},
              //       {id:2,platform:'ebay',url:"www.sogou.com",comment:"无1"},
              //       {id:3,platform:'京东',url:"www.sohu.com",comment:"无2"}
              //     ]
              //   },
              //   proertyContext: {
              //     "dataSourceCols": [
              //       {
              //         "title": "id",
              //         "key": "id"
              //       },
              //       {
              //         "title": "平台",
              //         "key": "platform"
              //       },
              //       {
              //         "title": "参考链接",
              //         "key": "url"
              //       },
              //       {
              //         "title": "备注",
              //         "key": "comment"
              //       },
              //     ]
              //   },
              //   valueField: "id",  //值字段
              //   displayField: "url", //显示字段
              // },
              url:{
                name:'参考链接',
                type:'selectorMulti',
                disabled: false, //是否禁用
                hidden: false,    //是否隐藏
                dataSource: {
                  data:[
                    {id:1,platform:'亚马逊',url:"www.baidu.com",comment:"无"},
                    {id:2,platform:'ebay',url:"www.sogou.com",comment:"无1"},
                    {id:3,platform:'京东',url:"www.sohu.com",comment:"无2"}
                  ]
                },
                proertyContext: {
                  "dataSourceCols": [
                    {
                      "title": "id",
                      "key": "id"
                    },
                    {
                      "title": "平台",
                      "key": "platform"
                    },
                    {
                      "title": "参考链接",
                      "key": "url"
                    },
                    {
                      "title": "备注",
                      "key": "comment"
                    },
                  ]
                },
                valueField: "id",  //值字段
                displayField: "url", //显示字段
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
            packagingWeight:'',
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
          weight:[{ 
            type: 'number',
            message: '请输入正确的商品重量', 
            trigger: 'blur',
            transform(value) {
              return Number(value);
            }
          }]
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
          modifyTime:{
            name:'修改时间',
            value:'modifyTime',
            type:'dateTime',
          },
          creater:{
            name:'创建者',
            value:'creater',
            type:'text',
          },
          modifyer:{
            name:'修改者',
            value:'modifyer',
            type:'text',
          },
        }
      }
    }
  }