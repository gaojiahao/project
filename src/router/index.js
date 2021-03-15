/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-19 15:27:12
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-15 15:14:17
 */
import Vue from "vue";
import VueRouter from "vue-router";
import tokenService from "@service/tokenService";
Vue.use(VueRouter);

const routes = [
  { 
    path: '/', 
    name: "Home",
    component: resolve=>(require(["@views/Home"],resolve)),
    redirect:'index',   //默认子路由
    meta: {
      title: "小竹熊",
      auth: true      //检查权限true
    },
    children:[
      {
        path: "index",
        name: "index",
        component: resolve=>(require(["@views/home/index"],resolve)),
        meta: {
          title: "首页",
          group: "index",
        },
        redirect:'index/home',   //默认子路由
        children:[
          {
            path: 'home',
            name: 'home',
            meta:{ 
              title:'首页',
              group: "index",
            },
            component: resolve=>(require(["@views/home/index/home"],resolve)),
          },
          {
            path: 'userInfo',
            name: 'userInfo',
            meta:{ 
              title:'个人档案',
              group: "index",
            },
            component: resolve=>(require(["@views/home/index/userInfo/userInfo"],resolve)),
          }
        ]
      },
      {
        path: "index2",
        name: "index2",
        component: resolve=>(require(["@views/home/index/index2"],resolve)),
        meta: {
          title: "首页",
          group: "index2",
        },
      },
      {
        path: "settings",
        name: "settings",
        component: resolve=>(require(["@views/settings/index"],resolve)),
        redirect:'settings/platformManager',   //默认子路由
        meta: {
          title: "系统设置",
          group: "platformManager",
        },
        children:[
          {
            path: "platformManager",
            name: "platformManager",
            component: resolve=>(require(["@views/settings/platformManager/platformManager"],resolve)),
            meta: {
              title: "平台管理",
              group: "platformManager",
            },
          },
          {
            path: "storeManager",
            name: "storeManager",
            component: resolve=>(require(["@views/settings/storeManager"],resolve)),
            redirect:'storeManager/storeList',   //默认子路由
            meta: {
              title: "店铺管理",
              group: "storeManager",
            },
            children:[
              {
                path: "storeList",
                name: "StoreList",
                component: resolve=>(require(["@views/settings/storeManager/storeList"],resolve)),
                meta: {
                  title: "店铺管理",
                  group: "storeManager",
                  level: 1,
                },
              },
              {
                path: "addStore",
                name: "AddStore",
                component: resolve=>(require(["@views/settings/storeManager/addStore"],resolve)),
                meta: {
                  title: "添加店铺",
                  group: "storeManager",
                  level: 2,
                },
              },
              {
                path: "editStore",
                name: "editStore",
                component: resolve=>(require(["@views/settings/storeManager/editStore"],resolve)),
                meta: {
                  title: "编辑店铺",
                  group: "storeManager",
                  level: 2,
                },
              },
              {
                path: "viewStore",
                name: "viewStore",
                component: resolve=>(require(["@views/settings/storeManager/viewStore"],resolve)),
                meta: {
                  title: "查看店铺",
                  group: "storeManager",
                  level: 2,
                },
              },
            ]
          },
          {
            path: "typeManager",
            name: "typeManager",
            component: resolve=>(require(["@views/settings/typeManager/index"],resolve)),
            meta: {
              title: "类目管理",
              group: "typeManager",
            },
            redirect:'typeManager/platformCategoryManager',
            children:[
              {
                path: 'platformCategoryManager',
                name: 'platformCategoryManager',
                meta:{ 
                  title:'平台类目',
                  group: "platformCategoryManager",
                  level: 1,
                },
                component: resolve=>(require(["@views/settings/typeManager/platformCategoryManager/index"],resolve)),
              },
              {
                path: 'systemCategoryManager',
                name: 'systemCategoryManager',
                meta:{ 
                  title:'系统类目',
                  group: "systemCategoryManager",
                  level: 1,
                },
                component: resolve=>(require(["@views/settings/typeManager/systemCategoryManager/index"],resolve)),
              }
            ]
          },
          {
            path: "propertyManager",
            name: "propertyManager",
            component: resolve=>(require(["@views/settings/propertyManager/index"],resolve)),
            meta: {
              title: "属性管理",
              group: "propertyManager",
            },
          },
          {
            path: "brandManager",
            name: "brandManager",
            component: resolve=>(require(["@views/settings/brandManager/index"],resolve)),
            meta: {
              title: "品牌管理",
              group: "brandManager",
            },
          },
          {
            path: "makePicManager",
            name: "makePicManager",
            component: resolve=>(require(["@views/settings/makePicManager/index"],resolve)),
            redirect:'makePicManager/makePicList',
            meta: {
              title: "制图选项管理",
              group: "makePicManager",
            },
            children:[
              {
                path: "makePicList",
                name: "makePicList",
                component: resolve=>(require(["@views/settings/makePicManager/makePicList"],resolve)),
                meta: {
                  title: "制图选项管理",
                  group: "makePicManager",
                  level: 1,
                },
              },
              {
                path: "addMakePic",
                name: "addMakePic",
                component: resolve=>(require(["@views/settings/makePicManager/addMakePic"],resolve)),
                meta: {
                  title: "新建制图选项",
                  group: "makePicManager",
                  level: 2,
                },
              },
              {
                path: "editMakePic",
                name: "editMakePic",
                component: resolve=>(require(["@views/settings/makePicManager/editMakePic"],resolve)),
                meta: {
                  title: "编辑制图选项",
                  group: "makePicManager",
                  level: 2,
                },
              },
            ]
          },
          {
            path: "menuManager",
            name: "menuManager",
            component: resolve=>(require(["@views/settings/menuManager/menuManager"],resolve)),
            meta: {
              title: "菜单管理",
              group: "menuManager",
            },
          },
          {
            path: "userManager",
            name: "userManager",
            component: resolve=>(require(["@views/settings/userManager"],resolve)),
            redirect:'userManager/userManager',
            meta: {
              title: "用户管理",
              group: "userManager",
            },
            children:[
              {
                path: "userManager",
                name: "userManager",
                component: resolve=>(require(["@views/settings/userManager/userManager"],resolve)),
                meta: {
                  title: "用户管理",
                  group: "userManager",
                  level: 1,
                },
              },
              {
                path: "addUser",
                name: "addUser",
                component: resolve=>(require(["@views/settings/userManager/addUser"],resolve)),
                meta: {
                  title: "添加用户",
                  group: "userManager",
                  level: 2,
                },
              },
              {
                path: "editUser",
                name: "editUser",
                component: resolve=>(require(["@views/settings/userManager/editUser"],resolve)),
                meta: {
                  title: "编辑用户",
                  group: "userManager",
                  level: 2,
                },
              },
              {
                path: "viewUser",
                name: "viewUser",
                component: resolve=>(require(["@views/settings/userManager/viewUser"],resolve)),
                meta: {
                  title: "查看用户",
                  group: "userManager",
                  level: 2,
                },
              },
            ]
          },
          {
            path: "roleManager",
            name: "roleManager",
            component: resolve=>(require(["@views/settings/roleManager"],resolve)),
            redirect:'roleManager/roleManager',
            meta: {
              title: "角色管理",
              group: "roleManager",
            },
            children:[
              {
                path: "roleManager",
                name: "roleManager",
                component: resolve=>(require(["@views/settings/roleManager/roleManager"],resolve)),
                meta: {
                  title: "角色管理",
                  group: "roleManager",
                  level: 1,
                },
              },
              {
                path: "addRole",
                name: "addRole",
                component: resolve=>(require(["@views/settings/roleManager/addRole"],resolve)),
                meta: {
                  title: "添加角色",
                  group: "roleManager",
                  level: 2,
                },
              },
              {
                path: "editRole",
                name: "editRole",
                component: resolve=>(require(["@views/settings/roleManager/editRole"],resolve)),
                meta: {
                  title: "编辑角色",
                  group: "roleManager",
                  level: 2,
                },
              },
              {
                path: "addRole",
                name: "addRole",
                component: resolve=>(require(["@views/settings/roleManager/addRole"],resolve)),
                meta: {
                  title: "编辑角色",
                  group: "roleManager",
                  level: 2,
                },
              },
            ]
          },
          {
            path: "bpmManager",
            name: "bpmManager",
            component: resolve=>(require(["@views/settings/bpmManager/index"],resolve)),
            meta: {
              title: "工作流",
              group: "bpm",
            },
            redirect:'bpmManager/moduleManager',
            children:[
              {
                path: 'flowManager',
                name: 'flowManager',
                meta:{ 
                  title:'流程管理',
                  group: "flowManager",
                  level: 1,
                },
                component: resolve=>(require(["@views/settings/bpmManager/flowManager"],resolve)),
                redirect:'flowManager/flowManagerList',
                children:[
                  {
                    path: 'flowManagerList',
                    name: 'flowManagerList',
                    meta:{ 
                      title:'流程列表',
                      group: "flowManager",
                      level: 2,
                    },
                    component: resolve=>(require(["@views/settings/bpmManager/flowManager/flowManagerList"],resolve)),
                  },
                  {
                    path: 'addFlow',
                    name: 'addFlow',
                    meta:{ 
                      title:'新建',
                      group: "flowManager",
                      level: 3,
                    },
                    component: resolve=>(require(["@views/settings/bpmManager/flowManager/addFlow"],resolve)),
                  },
                  {
                    path: 'editFlow',
                    name: 'editFlow',
                    meta:{ 
                      title:'修改',
                      group: "flowManager",
                      level: 3,
                    },
                    component: resolve=>(require(["@views/settings/bpmManager/flowManager/editFlow"],resolve)),
                  },
                  {
                    path: 'viewFlow',
                    name: 'viewFlow',
                    meta:{ 
                      title:'查看',
                      group: "flowManager",
                      level: 3,
                    },
                    component: resolve=>(require(["@views/settings/bpmManager/flowManager/viewFlow"],resolve)),
                  },
                  {
                    path: 'saveBpm',
                    name: 'saveBpm',
                    meta:{ 
                      title:'工作流编辑',
                      group: "flowManager",
                      level: 3,
                    },
                    component: resolve=>(require(["@views/settings/bpmManager/flowManager/saveBpm"],resolve)),
                  },
                  {
                    path: 'saveBpm3',
                    name: 'SaveBpm3',
                    meta:{ 
                      title:'新建流程',
                      group: "flowManager",
                    },
                    component: resolve=>(require(["@views/settings/bpmManager/flowManager/saveBpm3"],resolve)),
                  },
                ]
              },
              {
                path: 'moduleManager',
                name: 'moduleManager',
                meta:{ 
                  title:'模型管理',
                  group: "moduleManager",
                  level: 1,
                },
                component: resolve=>(require(["@views/settings/bpmManager/moduleManager"],resolve)),
                redirect:'moduleManager/moduleManagerList',
                children:[
                  {
                    path:"moduleManagerList",
                    name:"moduleManagerList",
                    component: resolve=>(require(["@views/settings/bpmManager/moduleManager/moduleManagerList"],resolve)),
                    meta:{
                      title: "模型管理",
                      group: "moduleManager",
                      level: 1,
                    },  
                  },
                  {
                    path:"addModule",
                    name:"addModule",
                    component: resolve=>(require(["@views/settings/bpmManager/moduleManager/addModule"],resolve)),
                    meta:{
                      title: "新增",
                      group: "moduleManager",
                      level: 2,
                    },  
                  },
                  {
                    path:"editModule",
                    name:"editModule",
                    component: resolve=>(require(["@views/settings/bpmManager/moduleManager/editModule"],resolve)),
                    meta:{
                      title: "修改",
                      group: "moduleManager",
                      level: 2,
                    },  
                  },
                  {
                    path:"viewModule",
                    name:"viewModule",
                    component: resolve=>(require(["@views/settings/bpmManager/moduleManager/viewModule"],resolve)),
                    meta:{
                      title: "查看",
                      group: "moduleManager",
                      level: 2,
                    },  
                  },
                  {
                    path:"addFomConfig",
                    name:"addFomConfig",
                    component: resolve=>(require(["@views/settings/bpmManager/moduleManager/addFomConfig"],resolve)),
                    meta:{
                      title: "表单视图",
                      group: "moduleManager",
                      level: 2,
                    },  
                  },
                  {
                    path:"setFomConfig",
                    name:"setFomConfig",
                    component: resolve=>(require(["@views/settings/bpmManager/moduleManager/setFomConfig"],resolve)),
                    meta:{
                      title: "表单配置",
                      group: "moduleManager",
                      level: 3,
                    },  
                  }
                ]
              }
            ]
          },
          {
            path: "systemConfigManager",
            name: "systemConfigManager",
            component: resolve=>(require(["@views/settings/systemConfigManager/index"],resolve)),
            meta: {
              title: "系统配置",
              group: "systemConfigManager",
            },
            redirect:'systemConfigManager/systemConfigManager',
            children:[
              {
                path: 'systemConfigManager',
                name: 'systemConfigManager',
                meta:{ 
                  title:'系统配置列表',
                  group: "systemConfigManager",
                  level: 1,
                },
                component: resolve=>(require(["@views/settings/systemConfigManager/systemConfigManager"],resolve)),
              },
              {
                path: "addSystem",
                name: "addSystem",
                component: resolve=>(require(["@views/settings/systemConfigManager/addSystem"],resolve)),
                meta: {
                  title: "新建系统配置",
                  group: "systemConfigManager",
                  level: 2,
                },
              },
              {
                path: "editSystem",
                name: "editSystem",
                component: resolve=>(require(["@views/settings/systemConfigManager/editSystem"],resolve)),
                meta: {
                  title: "编辑系统配置",
                  group: "systemConfigManager",
                  level: 2,
                },
              },
            ]
          },
          {
            path: "logisticsManager",
            name: "logisticsManager",
            component: resolve=>(require(["@views/settings/logisticsManager"],resolve)),
            redirect:'logisticsManager/logisticsMoney',   //默认子路由
            meta: {
              title: "物流管理",
              group: "logisticsManager",
            },
            children:[
              {
                path: 'logisticsMoney',
                name: 'logisticsMoney',
                meta:{ 
                  title:'物流管理',
                  group: "logisticsManager",
                  level: 1,
                },
                component: resolve=>(require(["@views/settings/logisticsManager/logisticsManager"],resolve)),
                redirect:'logisticsMoney/logisticsList',
                children:[
                  {
                    path: "logisticsList",
                    name: "logisticsList",
                    component: resolve=>(require(["@views/settings/logisticsManager/logisticsManager/logisticsList"],resolve)),
                    meta: {
                      title: "物流管理",
                      group: "logisticsManager",
                      level: 1,
                    },
                  },
                  {
                    path: "addLogistics",
                    name: "addLogistics",
                    component: resolve=>(require(["@views/settings/logisticsManager/logisticsManager/addLogistics"],resolve)),
                    meta: {
                      title: "添加物流",
                      group: "logisticsManager",
                      level: 2,
                    },
                  },
                  {
                    path: "editLogistics",
                    name: "editLogistics",
                    component: resolve=>(require(["@views/settings/logisticsManager/logisticsManager/editLogistics"],resolve)),
                    meta: {
                      title: "编辑物流",
                      group: "logisticsManager",
                      level: 2,
                    },
                  },
                  {
                    path: "viewLogistics",
                    name: "viewLogistics",
                    component: resolve=>(require(["@views/settings/logisticsManager/logisticsManager/viewLogistics"],resolve)),
                    meta: {
                      title: "查看物流",
                      group: "logisticsManager",
                      level: 2,
                    },
                  },
                ]
              },
              {
                path: 'countryManager',
                name: 'countryManager',
                meta:{ 
                  title:'国家管理',
                  group: "countryManager",
                  level: 1,
                },
                component: resolve=>(require(["@views/settings/logisticsManager/countryManager"],resolve)),
                redirect:'countryManager/countryList',
                children:[
                  {
                    path: "countryList",
                    name: "countryList",
                    component: resolve=>(require(["@views/settings/logisticsManager/countryManager/countryList"],resolve)),
                    meta: {
                      title: "国家管理",
                      group: "countryManager",
                      level: 1,
                    },
                  },
                  {
                    path: "addCountry",
                    name: "addCountry",
                    component: resolve=>(require(["@views/settings/logisticsManager/countryManager/addCountry"],resolve)),
                    meta: {
                      title: "添加国家",
                      group: "countryManager",
                      level: 2,
                    },
                  },
                  {
                    path: "editCountry",
                    name: "editCountry",
                    component: resolve=>(require(["@views/settings/logisticsManager/countryManager/editCountry"],resolve)),
                    meta: {
                      title: "编辑国家",
                      group: "countryManager",
                      level: 2,
                    },
                  },
                  {
                    path: "viewCountry",
                    name: "viewCountry",
                    component: resolve=>(require(["@views/settings/logisticsManager/countryManager/viewCountry"],resolve)),
                    meta: {
                      title: "查看国家",
                      group: "countryManager",
                      level: 2,
                    },
                  },
                ]
              }
            ]
          },
          {
            path: "merchantManager",
            name: "merchantManager",
            component: resolve=>(require(["@views/settings/merchantManager"],resolve)),
            redirect:'merchantManager/merchantList',
            meta: {
              title: "角色管理",
              group: "merchantManager",
            },
            children:[
              {
                path: "merchantList",
                name: "merchantList",
                component: resolve=>(require(["@views/settings/merchantManager/merchantList"],resolve)),
                meta: {
                  title: "商户管理",
                  group: "merchantManager",
                  level: 1,
                },
              },
              {
                path: "addMerchant",
                name: "addMerchant",
                component: resolve=>(require(["@views/settings/merchantManager/addMerchant"],resolve)),
                meta: {
                  title: "添加商户",
                  group: "merchantManager",
                  level: 2,
                },
              },
              {
                path: "editMerchant",
                name: "editMerchant",
                component: resolve=>(require(["@views/settings/merchantManager/editMerchant"],resolve)),
                meta: {
                  title: "编辑商户 ",
                  group: "merchantManager",
                  level: 2,
                },
              },
              {
                path: "viewMerchant",
                name: "viewMerchant",
                component: resolve=>(require(["@views/settings/merchantManager/viewMerchant"],resolve)),
                meta: {
                  title: "查看商户",
                  group: "merchantManager",
                  level: 2,
                },
              },
            ]
          },
        ]
      },
      {
        path: "basicinfo",
        name: "basicinfo",
        component: resolve=>(require(["@views/basicinfo/index"],resolve)),
        redirect:'basicinfo/developNewProducts',   //默认子路由
        meta: {
          title: "基础设置",
          group: "basicinfo",
        },
        children:[
          {
            path: 'developNewProducts',
            name: 'DevelopNewProducts',
            meta:{ 
              title:'新品开发管理',
              group: "developNewProducts",
            },
            component: resolve=>(require(["@views/basicinfo/developNewProducts/index"],resolve)),
            redirect:'developNewProducts/developNewProductsList',
            children:[
              {
                path: 'developNewProductsList',
                name: 'DevelopNewProductsList',
                meta:{ 
                  title:'新品开发管理',
                  group: "developNewProducts",
                  level: 1,
                },
                component: resolve=>(require(["@views/basicinfo/developNewProducts/developNewProductsList"],resolve)),
              },
              {
                path: 'addNewProduct',
                name: 'AddNewProduct',
                meta:{ 
                  title:'新建新品',
                  group: "developNewProducts",
                  level: 2,
                },
                component: resolve=>(require(["@views/basicinfo/developNewProducts/addNewProduct"],resolve)),
              },
              {
                path: 'editNewProduct',
                name: 'editNewProduct',
                meta:{ 
                  title:'编辑新品',
                  group: "developNewProducts",
                  level: 2,
                },
                component: resolve=>(require(["@views/basicinfo/developNewProducts/editNewProduct"],resolve)),
              },
              {
                path: 'copyNewProduct',
                name: 'copyNewProduct',
                meta:{ 
                  title:'复制新品',
                  group: "developNewProducts",
                  level: 2,
                },
                component: resolve=>(require(["@views/basicinfo/developNewProducts/copyNewProduct"],resolve)),
              },
              {
                path: 'viewNewProduct',
                name: 'ViewNewProduct',
                meta:{ 
                  title:'查看新品',
                  group: "developNewProducts",
                  level: 2,
                },
                component: resolve=>(require(["@views/basicinfo/developNewProducts/viewNewProduct"],resolve)),
              },
              {
                path: 'examineNewProduct',
                name: 'examineNewProduct',
                meta:{ 
                  title:'审核新品',
                  group: "examineNewProduct",
                  level: 2,
                },
                component: resolve=>(require(["@views/basicinfo/developNewProducts/examineNewProduct"],resolve)),
              },
              {
                path:"viewResearch",
                name:"viewResearch",
                component: resolve=>(require(["@views/basicinfo/developNewProducts/viewResearch"],resolve)),
                meta: {
                  title: "查看调研",
                  group: "developNewProducts",
                  level: 3,
                },
              },
              {
                path: 'researchDevelopNewProducts',
                name: 'ResearchDevelopNewProducts',
                meta:{ 
                  title:'调研',
                  group: "developNewProducts",
                  level: 2,
                },
                component: resolve=>(require(["@views/basicinfo/developNewProducts/researchDevelopNewProducts"],resolve)),
              },
            ]
          },
          {
            path:"productManager",
            name:"productManager",
            component: resolve=>(require(["@views/basicinfo/productManager/index"],resolve)),
            meta: {
              title: "产品管理",
              group: "productManager",
            },
            redirect:'productManager/productList',
            children:[
              {
                path:"productList",
                name:"productList",
                component: resolve=>(require(["@views/basicinfo/productManager/productList"],resolve)),
                meta: {
                  title: "产品管理",
                  group: "productManager",
                  level: 1,
                },
              },
              {
                path:"viewProductList",
                name:"viewProductList",
                component: resolve=>(require(["@views/basicinfo/developNewProducts/viewNewProduct"],resolve)),
                meta: {
                  title: "查看产品",
                  group: "productManager",
                  level: 2,
                },
              },
              {
                path:"viewProductListResearch",
                name:"viewProductListResearch",
                component: resolve=>(require(["@views/basicinfo/productManager/viewResearch"],resolve)),
                meta: {
                  title: "查看调研",
                  group: "productManager",
                  level: 3,
                },
              }  
            ]
          },
          {
            path: 'supplierManager',
            name: 'SupplierManager',
            meta:{ 
              title:'供应商管理',
              group: "supplierManager",
            },
            component: resolve=>(require(["@views/basicinfo/supplierManager/index"],resolve)),
            redirect:'supplierManager/supplierList',
            children:[
              {
                path: 'supplierList',
                name: 'SupplierList',
                meta:{ 
                  title:'供应商管理',
                  group: "supplierManager",
                  level: 1,
                },
                component: resolve=>(require(["@views/basicinfo/supplierManager/supplierList"],resolve)),
              },
              {
                path: 'addSupplier',
                name: 'AddSupplier',
                meta:{ 
                  title:'新增供应商',
                  group: "supplierManager",
                  level: 2,
                },
                component: resolve=>(require(["@views/basicinfo/supplierManager/addSupplier"],resolve)),
              }, 
              {
                path: 'viewSupplier',
                name: 'ViewSupplier',
                meta:{ 
                  title:'查看供应商',
                  group: "supplierManager",
                  level: 2,
                },
                component: resolve=>(require(["@views/basicinfo/supplierManager/viewSupplier"],resolve)),
              },
              {
                path: 'editSupplier',
                name: 'editSupplier',
                meta:{ 
                  title:'编辑供应商',
                  group: "supplierManager",
                  level: 2,
                },
                component: resolve=>(require(["@views/basicinfo/supplierManager/editSupplier"],resolve)),
              },
            ]
          },
          {
            path: 'customerManager',
            name: 'CustomerManager',
            meta:{ 
              title:'客户管理',
              group: "customerManager",
            },
            component: resolve=>(require(["@views/basicinfo/customerManager/index"],resolve)),
            redirect:'customerManager/customerList',
            children:[
              {
                path: 'customerList',
                name: 'CustomerList',
                meta:{ 
                  title:'客户管理',
                  group: "customerList",
                  level: 1,
                },
                component: resolve=>(require(["@views/basicinfo/customerManager/customerList"],resolve)),
              },
              {
                path: 'addCustomer',
                name: 'AddCustomer',
                meta:{ 
                  title:'新增客户',
                  group: "addCustomer",
                  level: 2,
                },
                component: resolve=>(require(["@views/basicinfo/customerManager/addCustomer"],resolve)),
              }, 
              {
                path: 'viewCustomer',
                name: 'ViewCustomer',
                meta:{ 
                  title:'查看客户',
                  group: "viewCustomer",
                  level: 2,
                },
                component: resolve=>(require(["@views/basicinfo/customerManager/viewCustomer"],resolve)),
              },
            ]
          },
        ]
      },
      {
        path: 'sell',
        name: 'sell',
        meta:{ 
          title:'销售管理',
          group: "sell",
        },
        component: resolve=>(require(["@views/sell/index"],resolve)),
        redirect:'sell/selectionManager',
        children:[
          {
            path: 'selectionManager',
            name: 'SelectionManager',
            redirect:'selectionManager/selectionManagerList',
            meta:{ 
              title:'选品管理',
              group: "selectionManager",
            },
            component: resolve=>(require(["@views/sell/selectionManager/index"],resolve)),
            children:[{
              path: 'selectionManagerList',
              name: 'SelectionManagerList',
              meta:{ 
                title:'选品管理',
                group: "selectionManager",
              },
              component: resolve=>(require(["@views/sell/selectionManager/selectionManagerList"],resolve)),
             },
             {
              path: 'selectionResultList',
              name: 'SelectionResultList',
              meta:{ 
                title:'选品管理',
                group: "selectionResultList",
              },
              component: resolve=>(require(["@views/sell/selectionManager/selectionResultList"],resolve)),
             },
             {
              path: 'viewSelection',
              name: 'viewSelection',
              meta:{ 
                title:'查看选品',
                group: "viewSelection",
              },
              component: resolve=>(require(["@views/sell/selectionManager/viewSelection"],resolve)),
             },
            ]
          },
          {
            path: 'sellManager',
            name: 'SellManager',
            redirect:'sellManager/sellList',
            meta:{ 
              title:'销售推品',
              group: "sellManager",
            },
            component: resolve=>(require(["@views/sell/sellManager/index"],resolve)),
            children:[
              {
                path: 'sellList',
                name: 'sellList',
                meta:{ 
                  title:'销售推品',
                  group: "sellManager",
                  level: 1,
                },
                component: resolve=>(require(["@views/sell/sellManager/sellList"],resolve)),
              },
              {
                path: 'addFinishProduct',
                name: 'addFinishProduct',
                meta:{ 
                  title:'新建推品',
                  group: "sellManager",
                  level: 2,
                },
                component: resolve=>(require(["@views/sell/sellManager/addFinishProduct"],resolve)),
              },
              {
                path: 'editFinishProduct',
                name: 'editFinishProduct',
                meta:{ 
                  title:'编辑推品',
                  group: "sellManager",
                  level: 2,
                },
                component: resolve=>(require(["@views/sell/sellManager/editFinishProduct"],resolve)),
              },
              {
                path: 'viewFinishProduct',
                name: 'viewFinishProduct',
                meta:{ 
                  title:'查看推品',
                  group: "sellManager",
                  level: 2,
                },
                component: resolve=>(require(["@views/sell/sellManager/viewFinishProduct"],resolve)),
              },
              {
                path: 'approvalFinishProduct',
                name: 'approvalFinishProduct',
                meta:{ 
                  title:'推品审核',
                  group: "sellManager",
                  level: 2,
                },
                component: resolve=>(require(["@views/sell/sellManager/approvalFinishProduct"],resolve)),
              },
              {
                path: 'sellNewProduct',
                name: 'sellNewProduct',
                meta:{ 
                  title:'新建新品',
                  group: "sellManager",
                  level: 2,
                },
                component: resolve=>(require(["@views/sell/sellManager/sellNewProduct"],resolve)),
              },
            ]
          },
          {
            path: 'pieShowManager',
            name: 'pieShowManager',
            redirect:'pieShowManager/pieShowList',
            meta:{ 
              title:'产品派店',
              group: "pieShowManager",
            },
            component: resolve=>(require(["@views/sell/pieShowManager/index"],resolve)),
            children:[
              {
                path: 'pieShowList',
                name: 'pieShowList',
                meta:{ 
                  title:'产品派店',
                  group: "产品派店",
                  level: 1,
                },
                component: resolve=>(require(["@views/sell/pieShowManager/pieShowList"],resolve)),
              },
              {
                path: 'viewPieShow',
                name: 'viewPieShow',
                meta:{ 
                  title:'查看派店',
                  group: "查看派店",
                  level: 1,
                },
                component: resolve=>(require(["@views/sell/pieShowManager/viewPieShow"],resolve)),
              },
              {
                path: 'addPieShow',
                name: 'AddPieShow',
                meta:{ 
                  title:'产品派店',
                  group: "产品派店",
                  level: 1,
                },
                component: resolve=>(require(["@views/sell/pieShowManager/addPieShow"],resolve)),
              },
            ]
          },
          {
            path: 'mainResearch',
            name: 'MainResearch',
            meta:{ 
              title:'主推调研',
              group: "mainResearch",
            },
            component: resolve=>(require(["@views/sell/mainResearch"],resolve)),
            redirect:'mainResearch/mainResearchList',
            children:[
              {
                path: 'mainResearchList',
                name: 'MainResearchList',
                meta:{ 
                  title:'主推调研',
                  group: "mainResearch",
                  level: 1,
                },
                component: resolve=>(require(["@views/sell/mainResearch/mainResearchList"],resolve)),
              },
              {
                path: 'research',
                name: 'Research',
                meta:{ 
                  title:'调研',
                  group: "mainResearch",
                  level: 2,
                },
                component: resolve=>(require(["@views/sell/mainResearch/research"],resolve)),
                children:[
                  {
                    path: 'referenceComparison',
                    name: 'referenceComparison',
                    meta:{ 
                      title:'参考比价',
                      group: "mainResearch",
                      level: 3,
                    },
                    component: resolve=>(require(["@views/sell/mainResearch/researchResult/referenceComparison"],resolve)),
                  },   
                ]
              },
              {
                path: 'researchResult',
                name: 'researchResult',
                meta:{ 
                  title:'调研结果',
                  group: "mainResearch",
                  level: 2,
                },
                component: resolve=>(require(["@views/sell/mainResearch/researchResult/index"],resolve)),
                redirect:'researchResult/researchResult',
                children:[
                  {
                    path: 'researchResult',
                    name: 'researchResult',
                    meta:{ 
                      title:'调研结果',
                      group: "mainResearch",
                      level: 3,
                    },
                    component: resolve=>(require(["@views/sell/mainResearch/researchResult/researchResult"],resolve)),
                  },  
                ]
              } 
            ]
          }
        ]
      },
      {
        path: 'examine',
        name: 'examine',
        meta:{ 
          title:'审核管理',
          group: 'examine',
        },
        component: resolve=>(require(["@views/examine/index"],resolve)),
        redirect:'examine/appointStoreExamine',
        children:[
          {
            path: 'appointStoreExamine',
            name: 'appointStoreExamine',
            meta:{ 
              title:'派店审核',
              group: 'appointStoreExamine',
            },
            component: resolve=>(require(["@views/examine/appointStoreExamine/index"],resolve)),
            redirect:'appointStoreExamine/appointStoreExamineList',
            children:[
              {
                path: 'appointStoreExamineList',
                name: 'appointStoreExamineList',
                meta:{ 
                  title:'派店审核',
                  group: 'appointStoreExamine',
                  level: 1,
                },
                component: resolve=>(require(["@views/examine/appointStoreExamine/appointStoreExamineList"],resolve)),
              },
              {
                path: 'productAppointStore',
                name: 'productAppointStore',
                meta:{ 
                  title:'审核',
                  group: 'appointStoreExamine',
                  level: 2,
                },
                component: resolve=>(require(["@views/examine/appointStoreExamine/productAppointStore"],resolve)),
              },
              {
                path: 'viewProductAppointStore',
                name: 'viewProductAppointStore',
                meta:{ 
                  title:'查看审核',
                  group: 'appointStoreExamine',
                  level: 2,
                },
                component: resolve=>(require(["@views/examine/appointStoreExamine/viewProductAppointStore"],resolve)),
              }
            ]
          },
          {
            path: 'recommendExamine',
            name: 'recommendExamine',
            meta:{ 
              title:'推品审核',
              group: 'recommendExamine',
            },
            component: resolve=>(require(["@views/examine/recommendExamine/index"],resolve)),
            redirect:'recommendExamine/recommendExamineList',
            children:[
              {
                path: 'recommendExamineList',
                name: 'recommendExamineList',
                meta:{ 
                  title:'推品审核',
                  group: 'recommendExamine',
                  level: 1,
                },
                component: resolve=>(require(["@views/examine/recommendExamine/recommendExamineList"],resolve)),
              },
              {
                path: 'addRecommendExamine',
                name: 'addRecommendExamine',
                meta:{ 
                  title:'审核',
                  group: 'recommendExamine',
                  level: 2,
                },
                component: resolve=>(require(["@views/examine/recommendExamine/addRecommendExamine"],resolve)),
              },
              {
                path: 'viewRecommendExamine',
                name: 'viewRecommendExamine',
                meta:{ 
                  title:'查看审核',
                  group: 'recommendExamine',
                  level: 2,
                },
                component: resolve=>(require(["@views/examine/recommendExamine/viewRecommendExamine"],resolve)),
              },
            ]
          },
          {
            path: 'tortExamine',
            name: 'tortExamine',
            meta:{ 
              title:'侵权审核',
              group: 'tortExamine',
            },
            component: resolve=>(require(["@views/examine/tortExamine/index"],resolve)),
            redirect:'tortExamine/tortExamineList',
            children:[
              {
                path: 'tortExamineList',
                name: 'tortExamineList',
                meta:{ 
                  title:'侵权审核',
                  group: 'tortExamine',
                  level: 1,
                },
                component: resolve=>(require(["@views/examine/tortExamine/tortExamineList"],resolve)),
              },
              {
                path: 'addTortExamine',
                name: 'addTortExamine',
                meta:{ 
                  title:'审核',
                  group: 'tortExamine',
                  level: 2,
                },
                component: resolve=>(require(["@views/examine/tortExamine/addTortExamine"],resolve)),
              },
              {
                path: 'viewTortExamine',
                name: 'viewTortExamine',
                meta:{ 
                  title:'查看审核',
                  group: 'tortExamine',
                  level: 2,
                },
                component: resolve=>(require(["@views/examine/tortExamine/viewTortExamine"],resolve)),
              },
            ]
          },
          {
            path: 'selectionExamine',
            name: 'selectionExamine',
            meta:{ 
              title:'选品审核',
              group: 'selectionExamine',
            },
            component: resolve=>(require(["@views/examine/selectionExamine/index"],resolve)),
            redirect:'selectionExamine/selectionExamineList',
            children:[
              {
                path: 'selectionExamineList',
                name: 'selectionExamineList',
                meta:{ 
                  title:'选品审核',
                  group: 'selectionExamine',
                  level: 1,
                },
                component: resolve=>(require(["@views/examine/selectionExamine/selectionExamineList"],resolve)),
              },
              {
                path: 'addSelectionExamine',
                name: 'addSelectionExamine',
                meta:{ 
                  title:'审核',
                  group: 'selectionExamine',
                  level: 2,
                },
                component: resolve=>(require(["@views/examine/selectionExamine/addSelectionExamine"],resolve)),
              },
              {
                path: 'viewSelectionExamine',
                name: 'viewSelectionExamine',
                meta:{ 
                  title:'查看审核',
                  group: 'selectionExamine',
                  level: 2,
                },
                component: resolve=>(require(["@views/examine/selectionExamine/viewSelectionExamine"],resolve)),
              },
            ]
          },
          {
            path: 'mainResearchExamine',
            name: 'mainResearchExamine',
            meta:{ 
              title:'主推审核',
              group: 'mainResearchExamine',
            },
            component: resolve=>(require(["@views/examine/mainResearchExamine/index"],resolve)),
            redirect:'mainResearchExamine/mainResearchExamineList',
            children:[
              {
                path: 'mainResearchExamineList',
                name: 'mainResearchExamineList',
                meta:{ 
                  title:'主推审核',
                  group: 'mainResearchExamine',
                },
                component: resolve=>(require(["@views/examine/mainResearchExamine/mainResearchExamineList"],resolve)),
              },
              {
                path: 'addMainResearchExamine',
                name: 'addMainResearchExamine',
                meta:{ 
                  title:'审核',
                  group: 'mainResearchExamine',
                  level: 2,
                },
                component: resolve=>(require(["@views/examine/mainResearchExamine/addMainResearchExamine"],resolve)),
              },
              {
                path: 'viewMainResearchExamine',
                name: 'viewMainResearchExamine',
                meta:{ 
                  title:'查看审核',
                  group: 'mainResearchExamine',
                  level: 2,
                },
                component: resolve=>(require(["@views/examine/mainResearchExamine/viewMainResearchExamine"],resolve)),
              },
            ]
          },
          {
            path: 'chartingExamine',
            name: 'chartingExamine',
            meta:{ 
              title:'制图审核',
              group: 'chartingExamine',
            },
            component: resolve=>(require(["@views/examine/chartingExamine/index"],resolve)),
            redirect:'chartingExamine/chartingExamineList',
            children:[
              {
                path: 'chartingExamineList',
                name: 'chartingExamineList',
                meta:{ 
                  title:'制图审核列表',
                  group: 'chartingExamine',
                },
                component: resolve=>(require(["@views/examine/chartingExamine/chartingExamineList"],resolve)),
              },
            ]
          },
          {
            path: 'developExamine',
            name: 'developExamine',
            meta:{ 
              title:'开发审核',
              group: 'developExamine',
            },
            component: resolve=>(require(["@views/examine/developExamine/index"],resolve)),
            redirect:'developExamine/developExamineList',
            children:[
              {
                path: 'developExamineList',
                name: 'developExamineList',
                meta:{ 
                  title:'开发审核',
                  group: 'developExamineList',
                },
                component: resolve=>(require(["@views/examine/developExamine/developExamineList"],resolve)),
              },
            ]
          },
        ]
      },
      {
        path: 'charting',
        name: 'charting',
        meta:{ 
          title:'制图管理',
          group: 'charting',
        },
        component: resolve=>(require(["@views/charting/index"],resolve)),
        redirect:'charting/chartingDelegation',
        children:[
          {
            path: 'chartingDelegation',
            name: 'chartingDelegation',
            meta:{ 
              title:'制图委派',
              group: 'chartingDelegation',
            },
            component: resolve=>(require(["@views/charting/chartingDelegation/index"],resolve)),
            redirect:'chartingDelegation/chartingDelegationList',
            children:[
              {
                path: 'chartingDelegationList',
                name: 'chartingDelegationList',
                meta:{ 
                  title:'制图委派',
                  group: 'chartingDelegation',
                  level: 1,
                },
                component: resolve=>(require(["@views/charting/chartingDelegation/chartingDelegationList"],resolve)),
              },
              {
                path: 'viewChartingDelegation',
                name: 'viewChartingDelegation',
                meta:{ 
                  title:'查看产品',
                  group: 'chartingDelegation',
                  level: 2,
                },
                component: resolve=>(require(["@views/basicinfo/developNewProducts/viewNewProduct"],resolve)),
              },
              {
                path: 'appoint',
                name: 'appoint',
                meta:{ 
                  title:'委派',
                  group: 'chartingDelegation',
                  level: 2,
                },
                component: resolve=>(require(["@views/charting/chartingDelegation/appoint"],resolve)),
              },
              {
                path: 'appointHistory',
                name: 'appointHistory',
                meta:{ 
                  title:'委派',
                  group: 'chartingDelegation',
                  level: 2,
                },
                component: resolve=>(require(["@views/charting/chartingDelegation/appointHistory"],resolve)),
              }
            ]
          },
          {
            path: 'chartingTimeExchange',
            name: 'chartingTimeExchange',
            meta:{ 
              title:'制图时间调换',
              group: 'chartingTimeExchange',
            },
            component: resolve=>(require(["@views/charting/chartingTimeExchange/index"],resolve)),
            redirect:'chartingTimeExchange/chartingTimeExchangeList',
            children:[
              {
                path: 'chartingTimeExchangeList',
                name: 'chartingTimeExchangeList',
                meta:{ 
                  title:'制图时间调换',
                  group: 'chartingTimeExchange',
                  level: 1,
                },
                component: resolve=>(require(["@views/charting/chartingTimeExchange/chartingTimeExchangeList"],resolve)),
              },
              {
                path: 'changeTime',
                name: 'changeTime',
                meta:{ 
                  title:'调换',
                  group: 'chartingTimeExchange',
                  level: 1,
                },
                component: resolve=>(require(["@views/charting/chartingTimeExchange/changeTime"],resolve)),
              },
              {
                path: 'viewChangeTime',
                name: 'viewChangeTime',
                meta:{ 
                  title:'查看产品',
                  group: 'chartingTimeExchange',
                  level: 1,
                },
                component: resolve=>(require(["@views/charting/chartingTimeExchange/viewChangeTime"],resolve)),
              },
            ]
          },
          {
            path: 'chartingRework',
            name: 'chartingRework',
            meta:{ 
              title:'制图返工',
              group: 'chartingRework',
            },
            component: resolve=>(require(["@views/charting/chartingRework"],resolve)),
          },
          {
            path: 'chartingManager',
            name: 'chartingManager',
            meta:{ 
              title:'制图管理',
              group: 'chartingManager',
            },
            component: resolve=>(require(["@views/charting/chartingManager/index"],resolve)),
            redirect:'chartingManager/chartingManagerList',
            children:[
              {
                path: 'chartingManagerList',
                name: 'chartingManagerList',
                meta:{ 
                  title:'美工制图',
                  group: 'chartingManager',
                  level: 1,
                },
                component: resolve=>(require(["@views/charting/chartingManager/chartingManagerList"],resolve)),
              },
              {
                path: 'uploadProgress',
                name: 'uploadProgress',
                meta:{ 
                  title:'进度上传',
                  group: 'chartingManager',
                  level: 2,
                },
                component: resolve=>(require(["@views/charting/chartingManager/uploadProgress"],resolve)),
              },
              {
                path: 'viewUploadProgress',
                name: 'viewUploadProgress',
                meta:{ 
                  title:'制图查看',
                  group: 'chartingManager',
                  level: 2,
                },
                component: resolve=>(require(["@views/charting/chartingManager/viewUploadProgress"],resolve)),
              },
            ],
          } 
        ]
      },
      {
        path: 'total',
        name: 'total',
        meta:{ 
          title:'统计管理',
          group: 'total',
        },
        component: resolve=>(require(["@views/total/index"],resolve)),
        redirect:'total/newProductsTotal',
        children:[
          {
            path: 'newProductsTotal',
            name: 'newProductsTotal',
            meta:{ 
              title:'新品开发统计',
              group: 'newProductsTotal',
            },
            component: resolve=>(require(["@views/total/newProductsTotal/index"],resolve)),
            children:[]
          },
          {
            path: 'chartingTotal',
            name: 'chartingTotal',
            meta:{ 
              title:'制图分析统计',
              group: 'chartingTotal',
            },
            component: resolve=>(require(["@views/total/chartingTotal/index"],resolve)),
            children:[]
          },
          {
            path: 'examineTotal',
            name: 'examineTotal',
            meta:{ 
              title:'审核统计',
              group: 'examineTotal',
            },
            component: resolve=>(require(["@views/total/examineTotal/index"],resolve)),
            children:[]
          },
          {
            path: 'storeTotal',
            name: 'storeTotal',
            meta:{ 
              title:'店铺分配统计',
              group: 'storeTotal',
            },
            component: resolve=>(require(["@views/total/storeTotal/index"],resolve)),
            children:[]
          },
          {
            path: 'upProductTotal',
            name: 'upProductTotal',
            meta:{ 
              title:'上架统计',
              group: 'upProductTotal',
            },
            component: resolve=>(require(["@views/total/upProductTotal/index"],resolve)),
            children:[]
          },
          {
            path: 'overdueTotal',
            name: 'overdueTotal',
            meta:{ 
              title:'逾期分析统计',
              group: 'overdueTotal',
            },
            component: resolve=>(require(["@views/total/overdueTotal/index"],resolve)),
            children:[]
          },
        ]    
      }
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: resolve=>(require(["@views/Login"],resolve)),
    meta: {
      title: "登录"
    }
  },
  {
    path: "*",
    name: "/errorHandler",
    component: resolve=>(require(['@components/public/errorHandler'],resolve)),
    meta: {
      title: "页面出错"
    }
  },
  // 动态路径参数 以冒号开头
  // { path: '/user/:id', component: User },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  routes,
  mode: "history",
  base: "Rose"
});

/**
 * @name: gaojiahao
 * @test: 路由全局前置守卫
 * @msg:
 * @param {*}
 * @return {*}
 */
router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.auth)) {
    // 对路由进行验证
    if (tokenService.getToken() != "" && to.name !== "Login") {
      // 已经登陆
      next(); // 正常跳转到你设置好的页面
    } else {
      next({ path: "/login" });
    }
  } else {
    next();
  }
});

const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
export default router;
