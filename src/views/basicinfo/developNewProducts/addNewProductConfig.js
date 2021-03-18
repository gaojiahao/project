/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-11-03 16:55:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-18 17:05:39
 */
import $flyio from '@plugins/ajax';

export default {
    data() {
      const categoryIdVali = (rule, value, callback) => {
        if (value == ''||value === undefined) {
            callback(new Error('请选择类目'));
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
          callback(new Error('请输入正确的商品尺寸'));
        } else {
          var rep = new RegExp("/^(([1-9]\d{0,3})|0)(\.\d{0,2})?$/");
          if(!value.long){
            callback(new Error('请输入商品长度'));  
          } 
          if(!value.wide){
            callback(new Error('请输入商品宽度'));
          }
          if(!value.high){
            callback(new Error('请输入商品高度'));
          }
          if(!value.volume){
            callback(new Error('请输入商品体积'));
          }
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
          if(!value.long){
            callback(new Error('请输入包装长度'));
          }
          if(!value.wide){
            callback(new Error('请输入包装宽度'));
          }
          if(!value.high){
            callback(new Error('请输入包装高度'));
          }
          if(!value.volume){
            callback(new Error('请输入包装体积'));
          }
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
      const purchasePricesVali = (rule, value, callback) => {
        if (value == ''||value === undefined) {
            callback(new Error('请输入采购单价'));
        } else {
          callback();
        }
      };
      const minQuantityVali = (rule, value, callback) => {
        if (value == ''||value === undefined) {
            callback(new Error('请输入最小采购量'));
        } else {
          callback();
        }
      };
      const packageCostVali = (rule, value, callback) => {
        if (value == ''||value === undefined) {
            callback(new Error('请输入正确的包装成本'));
        } else {
          callback();
        }
      };
      const weightVali = (rule, value, callback) => {
        if (value == ''||value === undefined) {
            callback(new Error('请输入商品重量'));
        } else {
          callback();
        }
      };
      const packageWeightVali = (rule, value, callback) => {
        if (value == ''||value === undefined) {
            callback(new Error('请输入包装重量'));
        } else {
          callback();
        }
      };
      const logisticsLabelVali = (rule, value, callback) => {
        if (value == ''||value === undefined) {
            callback(new Error('请选择物流属性'));
        } else {
          callback();
        }
      };
      return {
        productInfo:{
          code:{
            name:'产品编码',
            type:'text',
            disabled:true
          },
          name:{
            name:'产品名称',
            type:'text',
            length:200,
            disabled: false
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
          // characteristic:{
          //   name:'特性标签',
          //   type:'texts',
          //   dataSource:{
          //     type:'dynamic',
          //     url:'/api/GetSystemConfigList',
          //     data:[],
          //     parmas:{congfigType:'productLabel'},
          //     col:[
          //       {k:'name',v:'name'},
          //       {k:'value',v:'name'}
          //     ]
          //   },
          // },
          logisticsLabel:{
            name:'物流属性',
            type:'select',
            dataSource:{
              type:'dynamic',
              url:'/api/GetSystemConfigList',
              data:[],
              parmas:{congfigType:'logisticsLabel'},
              col:[
                {k:'name',v:'name'},
                {k:'value',v:'id'}
              ]
            },
          },
          brandId:{
            name:'品牌',
            type:'selectCustom',
            dataSource:{
              type:'dynamic',
              url:'/api/GetBrandList',
              data:[],
            },
            bind:{
              target: 'brandName',
              bindValue: 'name'
            },
            createFun:this.brandIdCreateFun,
          },
          url:{
            name:'参考链接',
            type:'textarea',
            length:2000
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
            disabled: false,
            hiddenFun: this.isPackageHiddenFun,
          },
          weight:{
            name:'商品重量',
            type:'number',
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
              type:'dynamic',
              url:'/api/GetSystemConfigList',
              data:[],
              parmas:{congfigType:'packageMaterial'},
              col:[
                {k:'name',v:'name'},
                {k:'value',v:'id'}
              ]
            },
          }, 
          packageCost:{
            name:'包装成本',
            type:'number',
            unit:'CNY'
          }, 
          packageWeight:{
            name:'包装重量',
            type:'number',
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
            type:'number',
          }, 
          purchasePrices:{
            name:'采购单价',
            type:'number',
            unit:'CNY'
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
            length:2000
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
          categoryName:'',
          imgOne:'',
          imgTwo:'',
          imgThree:'',
          characteristic:'',
          logisticsLabel:'',
          brandId:'',
          brandName:'',
          url:'',
          isPackage: true,
          weight:'',
          productSize:{},
          material:'',
          packageCost:2,
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
            message: '请选择类目',
            trigger: 'change',
            validator: categoryIdVali,
          }],
          // characteristic: [{ 
          //   required: true, 
          //   type: 'string',
          //   message: '请输入特性标签', 
          //   trigger: 'blur' 
          // }],
          // brandId: [{
          //   required: true,
          //   message: '请选择品牌',
          //   trigger: 'change',
          //   validator: brandIdVali
          // }],
          // isPackage: [{
          //   required: true,
          //   message: '请选择是否带包装',
          //   trigger: 'change'
          // }],
          weight:[{ 
            required: true,
            message: '请输入正确的商品重量', 
            validator: weightVali,
            trigger:'change',
          }],
          // productSize: [{ 
          //   required: true, 
          //   type: 'string',
          //   message: '请输入商品尺寸', 
          //   trigger: 'blur',
          //   validator: productSizeVali
          // }],
          material:[{ 
            required: true, 
            message: '请选择包装材料', 
            trigger: 'change',
            validator: materialSizeVali
          }],
          packageCost:[{ 
            message: '请输入正确的包装成本', 
            trigger:'change',
            validator: packageCostVali
          }],
          packageWeight:[{ 
            required: true,
            message: '请输入正确的包装重量', 
            validator: packageWeightVali,
            trigger:'change',
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
            message: '请输入采购单价', 
            trigger:'change',
            validator: purchasePricesVali
          }],
          minQuantity:[{ 
            required: true, 
            message: '请输入最小采购量', 
            trigger:'change',
            validator: minQuantityVali
          }],
          logisticsLabel:[{
            required: true, 
            message: '请选择物流属性', 
            trigger: 'change',
            validator: logisticsLabelVali  
          }]
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
            name:'类目',
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
                {name:'已审核',value:'true'},
                {name:'未审核',value:'false'}
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
    },
    methods: {
      isPackageHiddenFun(value){
        var config = {...this.productInfo}
        if(value){
          config['material']['hidden']=false;
          config['packageCost']['hidden']=false;
          config['packageWeight']['hidden']=false;
          config['packagingSize']['hidden']=false;
        } else {
          config['material']['hidden']=true;
          config['packageCost']['hidden']=true;
          config['packageWeight']['hidden']=true;
          config['packagingSize']['hidden']=true;
        }
        this.productInfo = config;
      },
      async brandIdCreateFun(value){
        await $flyio.post({
          url: '/api/CreateBrand',
          data:{ name:value,platformId:0}
        }).then((res) => {
          if(res.result.code==200){
            this.productInfo['brandId']['dataSource']['data'].push({name:res.result.item.name,value:res.result.item.id,id:res.result.item.id});
            this.productInfoFormValidate['brandId'] = res.result.item.id;
            this.productInfoFormValidate['brandName'] = res.result.item.name;
          }
        })
      }
    },
  }