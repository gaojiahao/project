/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-19 15:27:12
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-11 20:17:04
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
              }
            ]
          },
          {
            path: "typeManager",
            name: "typeManager",
            component: resolve=>(require(["@views/settings/typeManager/index"],resolve)),
            meta: {
              title: "分类管理",
              group: "typeManager",
            },
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
            meta: {
              title: "制图管理",
              group: "makePicManager",
            },
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
            component: resolve=>(require(["@views/settings/userManager/userManager"],resolve)),
            meta: {
              title: "用户管理",
              group: "userManager",
            },
          },
          {
            path: "roleManager",
            name: "roleManager",
            component: resolve=>(require(["@views/settings/roleManager/roleManager"],resolve)),
            meta: {
              title: "角色管理",
              group: "roleManager",
            },
          },
          {
            path:"moduleManager",
            name:"moduleManager",
            component: resolve=>(require(["@views/settings/moduleManager/index"],resolve)),
            meta:{
              title: "模块管理",
              group: "moduleManager"
            },
            redirect:'moduleManager/moduleManagerList',
            children:[
              {
                path:"moduleManagerList",
                name:"moduleManagerList",
                component: resolve=>(require(["@views/settings/moduleManager/moduleManagerList"],resolve)),
                meta:{
                  title: "模块管理",
                  group: "moduleManager",
                  level: 1,
                },  
              },
              {
                path:"addModule",
                name:"addModule",
                component: resolve=>(require(["@views/settings/moduleManager/addModule"],resolve)),
                meta:{
                  title: "新增模块",
                  group: "moduleManager",
                  level: 2,
                },  
              },
              {
                path:"addFomConfig",
                name:"addFomConfig",
                component: resolve=>(require(["@views/settings/moduleManager/addFomConfig"],resolve)),
                meta:{
                  title: "表单视图",
                  group: "moduleManager",
                  level: 2,
                },  
              },
              {
                path:"setFomConfig",
                name:"setFomConfig",
                component: resolve=>(require(["@views/settings/moduleManager/setFomConfig"],resolve)),
                meta:{
                  title: "表单配置",
                  group: "moduleManager",
                  level: 3,
                },  
              }
            ]
          },
          {
            path: "bpm",
            name: "bpm",
            component: resolve=>(require(["@views/settings/bpmManager/index"],resolve)),
            meta: {
              title: "流程管理",
              group: "bpm",
            },
            redirect:'bpm/bpmManager',
            children:[
              {
                path: 'bpmManager',
                name: 'BpmManager',
                meta:{ 
                  title:'流程管理',
                  group: "bpmManager",
                  level: 1,
                },
                component: resolve=>(require(["@views/settings/bpmManager/bpmManager"],resolve)),
              },
              {
                path: 'saveBpm',
                name: 'SaveBpm',
                meta:{ 
                  title:'新建流程',
                  group: "saveBpm",
                  level: 2,
                },
                component: resolve=>(require(["@views/settings/bpmManager/saveBpm"],resolve)),
              },
              {
                path: 'saveBpm2',
                name: 'SaveBpm2',
                meta:{ 
                  title:'新建流程',
                  group: "saveBpm2",
                },
                component: resolve=>(require(["@views/settings/bpmManager/saveBpm2"],resolve)),
              },
              {
                path: 'updataBpm',
                name: 'UpdataBpm',
                meta:{ 
                  title:'更新流程',
                  group: "updataBpm",
                  level: 2,
                },
                component: resolve=>(require(["@views/settings/bpmManager/updataBpm"],resolve)),
              },
              // {
              //   path: 'addBpm',
              //   name: 'addBpm',
              //   meta:{ 
              //     title:'新建流程',
              //     group: "AddBpm",
              //     level: 2,
              //   },
              //   component: AddBpm
              // },
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
              title:'开发新品',
              group: "developNewProducts",
            },
            component: resolve=>(require(["@views/basicinfo/developNewProducts/index"],resolve)),
            redirect:'developNewProducts/developNewProductsList',
            children:[
              {
                path: 'developNewProductsList',
                name: 'DevelopNewProductsList',
                meta:{ 
                  title:'开发新品',
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
                title:'选品结果',
                group: "selectionResultList",
              },
              component: resolve=>(require(["@views/sell/selectionManager/selectionResultList"],resolve)),
             }
            ]
          },
          {
            path: 'sellManager',
            name: 'SellManager',
            redirect:'sellManager/sellList',
            meta:{ 
              title:'销售推品列表',
              group: "sellManager",
            },
            component: resolve=>(require(["@views/sell/sellManager/index"],resolve)),
            children:[
              {
                path: 'sellList',
                name: 'sellList',
                meta:{ 
                  title:'销售推品列表',
                  group: "sellList",
                },
                component: resolve=>(require(["@views/sell/sellManager/sellList"],resolve)),
              },
              {
                path: 'addFinishProduct',
                name: 'AddFinishProduct',
                meta:{ 
                  title:'新建新品',
                  group: "addFinishProduct",
                },
                component: resolve=>(require(["@views/sell/sellManager/addFinishProduct"],resolve)),
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
              },
              {
                path: 'researchResult',
                name: 'ResearchResult',
                meta:{ 
                  title:'调研结果',
                  group: "mainResearch",
                },
                component: resolve=>(require(["@views/sell/mainResearch/researchResult/index"],resolve)),
                redirect:'researchResult/researchResultList',
                children:[
                  {
                    path: 'researchResultList',
                    name: 'ResearchResultList',
                    meta:{ 
                      title:'调研结果',
                      group: "researchResult",
                      level: 1,
                    },
                    component: resolve=>(require(["@views/sell/mainResearch/researchResult/researchResult"],resolve)),
                  },
                  {
                    path: 'referenceComparison',
                    name: 'ReferenceComparison',
                    meta:{ 
                      title:'参考比价',
                      group: "researchResult",
                      level: 2,
                    },
                    component: resolve=>(require(["@views/sell/mainResearch/researchResult/referenceComparison"],resolve)),
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
                  title:'产品派店',
                  group: 'appointStoreExamine',
                  level: 2,
                },
                component: resolve=>(require(["@views/examine/appointStoreExamine/productAppointStore"],resolve)),
              }
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
                  title:'侵权审核列表',
                  group: 'tortExamine',
                  level: 1,
                },
                component: resolve=>(require(["@views/examine/tortExamine/tortExamineList"],resolve)),
              },
              {
                path: 'addTortExamine',
                name: 'addTortExamine',
                meta:{ 
                  title:'侵权审核',
                  group: 'tortExamine',
                  level: 2,
                },
                component: resolve=>(require(["@views/examine/tortExamine/addTortExamine"],resolve)),
              },
              {
                path: 'viewTortExamine',
                name: 'viewTortExamine',
                meta:{ 
                  title:'查看侵权审核',
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
                  title:'选品审核列表',
                  group: 'selectionExamine',
                  level: 1,
                },
                component: resolve=>(require(["@views/examine/selectionExamine/selectionExamineList"],resolve)),
              },
              {
                path: 'addSelectionExamine',
                name: 'addSelectionExamine',
                meta:{ 
                  title:'选品审核',
                  group: 'selectionExamine',
                  level: 2,
                },
                component: resolve=>(require(["@views/examine/selectionExamine/addSelectionExamine"],resolve)),
              },
              {
                path: 'viewSelectionExamine',
                name: 'viewSelectionExamine',
                meta:{ 
                  title:'查看选品审核',
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
                  title:'主推审核列表',
                  group: 'mainResearchExamine',
                },
                component: resolve=>(require(["@views/examine/mainResearchExamine/mainResearchExamineList"],resolve)),
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
          }
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
            component: resolve=>(require(["@views/charting/chartingTimeExchange"],resolve)),
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
                  title:'制图管理',
                  group: 'chartingManager',
                  level: 1,
                },
                component: resolve=>(require(["@views/charting/chartingManager/chartingManagerList"],resolve)),
              },
              {
                path: 'uploadProgress',
                name: 'uploadProgress',
                meta:{ 
                  title:'制作进度',
                  group: 'chartingManager',
                  level: 2,
                },
                component: resolve=>(require(["@views/charting/chartingManager/uploadProgress"],resolve)),
              },
              {
                path: 'viewUploadProgress',
                name: 'viewUploadProgress',
                meta:{ 
                  title:'查看',
                  group: 'chartingManager',
                  level: 2,
                },
                component: resolve=>(require(["@views/charting/chartingManager/viewUploadProgress"],resolve)),
              },
            ],
          } 
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
