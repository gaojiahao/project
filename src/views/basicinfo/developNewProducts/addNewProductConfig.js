/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-11 09:31:39
 */
export default {
    data() {
      const categoryIdVali = (rule, value, callback) => {
        if (value == ''||value === undefined) {
            callback(new Error('请选择分类'));
        } else {
          callback();
        }
      };
      const brandIdVali = (rule, value, callback) => {
        if (value == ''||value === undefined) {
            callback(new Error('请选择品牌'));
        } else {
          callback();
        }
      };
      const productSizeVali = (rule, value, callback) => {
        if (value == ''||value === undefined) {
            callback(new Error('请输入商品尺寸'));
        } else {
          callback();
        }
      };
      const materialSizeVali = (rule, value, callback) => {
        if (value == ''||value === undefined) {
            callback(new Error('请选择包装材料'));
        } else {
          callback();
        }
      };
      const packagingSizeVali = (rule, value, callback) => {
        if (value == ''||value === undefined) {
            callback(new Error('请输入包装尺寸'));
        } else {
          callback();
        }
      };
      const supplierIdSizeVali = (rule, value, callback) => {
        if (value == ''||value === undefined) {
            callback(new Error('请选择供应商名称'));
        } else {
          callback();
        }
      };
      const packageCostVali = (rule, value, callback) => {
        if (value == ''||value === undefined) {
            callback(new Error('请输入包装成本'));
        } else {
          callback();
        }
      };
      return {
        productInfo:{
          code:{
            name:'商品编号',
            type:'text',
          },
          name:{
            name:'商品名称',
            type:'text',
            disabled: false
          },
          categoryId:{
            name:'分类',
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
          },
          characteristic:{
            name:'特性标签',
            type:'texts',
          },
          brandId:{
            name:'品牌',
            type:'select',
            dataSource:{
              type:'dynamic',
              url:'/api/GetBrandList',
              data:[],
            },
            bind:{
              target: 'brandName',
              bindValue: 'name'
            }
          },
          isPackage:{
            name:'是否带包装',
            type:'radio',
            dataSource:{
              type:'static',
              data:[
                {name:'是',value:true},
                {name:'否',value:false}
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
          material:{
            name:'包装材料',
            type:'select',
            dataSource:{
              type:'static',
              data:[
                {name:'积木',value:1},
                {name:'灯',value:2}
              ],
            }
          }, 
          packageCost:{
            name:'包装成本',
            type:'text',
            unit:'CNY'
          }, 
          packageWeight:{
            name:'包装重量',
            type:'text',
            unit:'KG'
          }, 
          packagingSize:{
            name:'包装尺寸',
            type:'size',
          },
          features:{
            name:'商品特点',
            type:'textarea',
          },
          remark:{
            name:'备注',
            type:'textarea',  
          },
        },
        purchase:{
          supplierId:{
            name:'供应商名称',
            type:'select',
            dataSource:{
              type:'dynamic',
              url:'/api/GetSupplierList',
              data:[],
            },
            bind:{
              target: 'supplierName',
              bindValue: 'name'
            }
          }, 
          minQuantity:{
            name:'最小采购量',
            type:'text',
          }, 
          purchasePrices:{
            name:'采购单价',
            type:'text',
          },
          // url:{
          //   name:'参考链接',
          //   type:'selectorMulti',
          //   disabled: false, //是否禁用
          //   hidden: false,    //是否隐藏
          //   dataSource: {
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
            type:'text',
          },
          remark:{
            name:'备注',
            type:'textarea',
          },
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
        },
        productInfoFormValidate:{
          code:'',
          name: '',
          categoryId: '',
          characteristic:'',
          brandId:'',
          brandName:'',
          isPackage: true,
          weight:'',
          productSize:{},
          material:'',
          packageCost:'',
          packageWeight:'',
          packagingSize:{},
          features:'',
          remark:'',
          description:''
        },
        purchaseFormValidate:{
          goodsId:'',
          goodsName:'',
          supplierId:'',
          supplierName:'',
          purchasePrices:'',
          minQuantity:'',
          url:'',
          remark:''
        },
        propertyFormValidate:{
          color:'',
          packaging:'',
          isHavePackage:'',
          isHaveElect:''
        },
        detailInfoFormValidate:{
          detailInfo:''
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
            message: '请选择分类',
            trigger: 'change',
            validator: categoryIdVali,
          }],
          characteristic: [{ 
            required: true, 
            type: 'string',
            message: '请输入特性标签', 
            trigger: 'blur' 
          }],
          brandId: [{
            required: true,
            message: '请选择品牌',
            trigger: 'change',
            validator: brandIdVali
          }],
          // isPackage: [{
          //   required: true,
          //   message: '请选择是否带包装',
          //   trigger: 'change'
          // }],
          weight:[{ 
            required: true,
            type: 'number',
            message: '请输入正确的商品重量', 
            trigger: 'blur',
            transform(value) {
              return Number(value);
            }
          }],
          productSize: [{ 
            required: true, 
            type: 'string',
            message: '请输入商品尺寸', 
            trigger: 'blur',
            validator: productSizeVali
          }],
          material:[{ 
            required: true, 
            message: '请选择包装材料', 
            trigger: 'change',
            validator: materialSizeVali
          }],
          packageCost:[{ 
            required: true, 
            type: 'string',
            message: '请输入包装成本', 
            trigger: 'blur',
            validator: packageCostVali
          }],
          packagingWeight:[{ 
            required: true,
            type: 'number',
            message: '请输入正确的商品重量', 
            trigger: 'blur',
            transform(value) {
              return Number(value);
            }
          }],
          packagingSize: [{ 
            required: true, 
            type: 'string',
            message: '请输入包装尺寸', 
            trigger: 'blur',
            validator: packagingSizeVali
          }],
          supplierId:[{ 
            required: true, 
            message: '请选择供应商名称', 
            trigger: 'change',
            validator: supplierIdSizeVali
          }],
          purchasePrices:[{ 
            required: true, 
            type: 'string',
            message: '请输入采购单价', 
            trigger: 'blur',
          }],
          minQuantity:[{ 
            required: true, 
            type: 'string',
            message: '请输入最小采购量', 
            trigger: 'blur',
          }],
        },
        filtersConfig:{
          name:{
            name:'产品名称',
            value:'name',
            type:'text',
          },
          code:{
            name:'产品编码',
            value:'code',
            type:'text',
          },
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
          // status:{
          //   name:'状态',
          //   value:'status',
          //   type:'radio',
          //   dataSource:{
          //     type:'static',
          //     data:[
          //       {name:'是',value:'true'},
          //       {name:'否',value:'false'}
          //     ],
          //   },
          // },
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