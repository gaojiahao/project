/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-19 15:27:12
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-04 11:00:19
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Index from "@views/home/index";
import Login from "@views/Login.vue";
import Home from "@views/Home.vue";
import tokenService from "@service/tokenService";
import errorHandler from '@components/public/errorHandler';
//系统设置
import Settings from "@views/settings/index";
import TypeManager from "@views/settings/typeManager/index";
import PropertyManager from "@views/settings/propertyManager/index";
import BrandManager from "@views/settings/brandManager/index";
import PlatformManager from "@views/settings/platformManager/platformManager";
import StoreManager from "@views/settings/storeManager";
import StoreList from "@views/settings/storeManager/storeList";
import AddStore from "@views/settings/storeManager/addStore";
import MenuManager from "@views/settings/menuManager/menuManager";
import RoleManager from "@views/settings/roleManager/roleManager";
import UserManager from "@views/settings/userManager/userManager";
import MakePicManager from "@views/settings/makePicManager/index";
import Bpm from "@views/settings/bpmManager/index";
import SaveBpm from "@views/settings/bpmManager/saveBpm";
import SaveBpm2 from "@views/settings/bpmManager/saveBpm2";
import UpdataBpm from "@views/settings/bpmManager/updataBpm";
import BpmManager from "@views/settings/bpmManager/bpmManager";
import AddBpm from "@views/settings/bpmManager/addBpm";
//基础设置
import Basicinfo from "@views/basicinfo/index";
import DevelopNewProducts from "@views/basicinfo/developNewProducts/index";
import DevelopNewProductsList from "@views/basicinfo/developNewProducts/developNewProductsList";
import ResearchDevelopNewProducts from "@views/basicinfo/developNewProducts/researchDevelopNewProducts";
import AddNewProduct from "@views/basicinfo/developNewProducts/addNewProduct";
import ViewNewProduct from "@views/basicinfo/developNewProducts/viewNewProduct";
import CustomerManager from "@views/basicinfo/customerManager";
import ProductManager from "@views/basicinfo/productManager/index";
import ProductList from "@views/basicinfo/productManager/productList";
import ViewResearch from "@views/basicinfo/productManager/viewResearch";
import CustomerList from "@views/basicinfo/customerManager/customerList";
import AddCustomer from "@views/basicinfo/customerManager/addCustomer";
import ViewCustomer from "@views/basicinfo/customerManager/viewCustomer";
import SupplierManager from "@views/basicinfo/supplierManager";
import SupplierList from "@views/basicinfo/supplierManager/supplierList";
import AddSupplier from "@views/basicinfo/supplierManager/addSupplier";
import ViewSupplier from "@views/basicinfo/supplierManager/viewSupplier";
//销售管理
import Sell from "@views/sell/index";
import SellManager from "@views/sell/sellManager/index";
import SellList from "@views/sell/sellManager/sellList";
import AddFinishProduct from "@views/sell/sellManager/addFinishProduct";
import MainResearch from "@views/sell/mainResearch";
import MainResearchList from "@views/sell/mainResearch/mainResearchList";
import ResearchResult from "@views/sell/mainResearch/researchResult/index";
import ResearchResultList from "@views/sell/mainResearch/researchResult/researchResult";
import Research from "@views/sell/mainResearch/research";
import ReferenceComparison from "@views/sell/mainResearch/researchResult/referenceComparison";
import SelectionManager from "@views/sell/selectionManager/index";
import SelectionManagerList from "@views/sell/selectionManager/selectionManagerList";
import SelectionResultList from "@views/sell/selectionManager/selectionResultList";
//审核管理
import Examine from "@views/examine/index";
import AppointStoreExamine from "@views/examine/appointStoreExamine/index";
import AppointStoreExamineList from "@views/examine/appointStoreExamine/appointStoreExamineList";
import ProductAppointStore from "@views/examine/appointStoreExamine/productAppointStore";
import TortExamine from "@views/examine/tortExamine/index";
import TortExamineList from "@views/examine/tortExamine/tortExamineList";
import AddTortExamine from "@views/examine/tortExamine/addTortExamine";
import ViewTortExamine from "@views/examine/tortExamine/viewTortExamine";
import SelectionExamine from "@views/examine/selectionExamine/index";
import SelectionExamineList from "@views/examine/selectionExamine/selectionExamineList";
import AddSelectionExamine from "@views/examine/selectionExamine/addSelectionExamine";
import ViewSelectionExamine from "@views/examine/selectionExamine/viewSelectionExamine";
import MainResearchExamine from "@views/examine/mainResearchExamine/index";
import MainResearchExamineList from "@views/examine/mainResearchExamine/mainResearchExamineList";
import ChartingExamine from "@views/examine/chartingExamine/index";
import ChartingExamineList from "@views/examine/chartingExamine/chartingExamineList";
//制图管理
import Charting from "@views/charting/index";
import ChartingDelegation from "@views/charting/chartingDelegation";
import ChartingManager from "@views/charting/chartingManager";
import ChartingTimeExchange from "@views/charting/chartingTimeExchange";
import ChartingRework from "@views/charting/chartingRework";

Vue.use(VueRouter);

const routes = [
  { 
    path: '/', 
    name: "Home",
    component: Home,
    redirect:'index',   //默认子路由
    meta: {
      title: "小竹熊",
      auth: true      //检查权限true
    },
    children:[
      {
        path: "index",
        name: "index",
        component: Index,
        meta: {
          title: "首页",
          group: "index",
        },
      },
      {
        path: "settings",
        name: "settings",
        component: Settings,
        redirect:'settings/platformManager',   //默认子路由
        meta: {
          title: "系统设置",
          group: "platformManager",
        },
        children:[
          {
            path: "platformManager",
            name: "PlatformManager",
            component: PlatformManager,
            meta: {
              title: "平台管理",
              group: "platformManager",
            },
          },
          {
            path: "storeManager",
            name: "storeManager",
            component: StoreManager,
            redirect:'storeManager/storeList',   //默认子路由
            meta: {
              title: "店铺管理",
              group: "storeManager",
            },
            children:[
              {
                path: "storeList",
                name: "StoreList",
                component: StoreList,
                meta: {
                  title: "店铺管理",
                  group: "storeManager",
                  level: 1,
                },
              },
              {
                path: "addStore",
                name: "AddStore",
                component: AddStore,
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
            component: TypeManager,
            meta: {
              title: "分类管理",
              group: "typeManager",
            },
          },
          {
            path: "propertyManager",
            name: "propertyManager",
            component: PropertyManager,
            meta: {
              title: "属性管理",
              group: "propertyManager",
            },
          },
          {
            path: "brandManager",
            name: "brandManager",
            component: BrandManager,
            meta: {
              title: "品牌管理",
              group: "brandManager",
            },
          },
          {
            path: "makePicManager",
            name: "makePicManager",
            component: MakePicManager,
            meta: {
              title: "制图管理",
              group: "makePicManager",
            },
          },
          {
            path: "menuManager",
            name: "menuManager",
            component: MenuManager,
            meta: {
              title: "菜单管理",
              group: "menuManager",
            },
          },
          {
            path: "userManager",
            name: "userManager",
            component: UserManager,
            meta: {
              title: "用户管理",
              group: "userManager",
            },
          },
          {
            path: "roleManager",
            name: "roleManager",
            component: RoleManager,
            meta: {
              title: "角色管理",
              group: "roleManager",
            },
          },
          {
            path: "bpm",
            name: "bpm",
            component: Bpm,
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
                component: BpmManager
              },
              {
                path: 'saveBpm',
                name: 'SaveBpm',
                meta:{ 
                  title:'新建流程',
                  group: "saveBpm",
                  level: 2,
                },
                component: SaveBpm
              },
              {
                path: 'saveBpm2',
                name: 'SaveBpm2',
                meta:{ 
                  title:'新建流程',
                  group: "saveBpm2",
                },
                component: SaveBpm2
              },
              {
                path: 'updataBpm',
                name: 'UpdataBpm',
                meta:{ 
                  title:'更新流程',
                  group: "updataBpm",
                  level: 2,
                },
                component: UpdataBpm
              },
              {
                path: 'addBpm',
                name: 'addBpm',
                meta:{ 
                  title:'新建流程',
                  group: "AddBpm",
                  level: 2,
                },
                component: AddBpm
              },
            ]
          },
        ]
      },
      {
        path: "basicinfo",
        name: "basicinfo",
        component: Basicinfo,
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
            component: DevelopNewProducts,
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
                component: DevelopNewProductsList
              },
              {
                path: 'addNewProduct',
                name: 'AddNewProduct',
                meta:{ 
                  title:'新建新品',
                  group: "developNewProducts",
                  level: 2,
                },
                component: AddNewProduct
              },
              {
                path: 'viewNewProduct',
                name: 'ViewNewProduct',
                meta:{ 
                  title:'查看新品',
                  group: "developNewProducts",
                  level: 2,
                },
                component: ViewNewProduct,
              },
              {
                path:"viewResearch",
                name:"viewResearch",
                component: ViewResearch,
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
                component: ResearchDevelopNewProducts
              },
            ]
          },
          {
            path:"productManager",
            name:"productManager",
            component: ProductManager,
            meta: {
              title: "产品管理",
              group: "productManager",
            },
            redirect:'productManager/productList',
            children:[
              {
                path:"productList",
                name:"productList",
                component: ProductList,
                meta: {
                  title: "产品管理",
                  group: "productManager",
                  level: 1,
                },
              },
              // {
              //   path: 'viewNewProduct',
              //   name: 'ViewNewProduct',
              //   meta:{ 
              //     title:'查看产品',
              //     group: "productManager",
              //     level: 2,
              //   },
              //   component: ViewNewProduct,
              // },
              {
                path:"viewResearch",
                name:"viewResearch",
                component: ViewResearch,
                meta: {
                  title: "查看调研",
                  group: "productManager",
                  level: 2,
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
            component: SupplierManager,
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
                component: SupplierList,
              },
              {
                path: 'addSupplier',
                name: 'AddSupplier',
                meta:{ 
                  title:'新增供应商',
                  group: "supplierManager",
                  level: 2,
                },
                component: AddSupplier,
              }, 
              {
                path: 'viewSupplier',
                name: 'ViewSupplier',
                meta:{ 
                  title:'查看供应商',
                  group: "supplierManager",
                  level: 2,
                },
                component: ViewSupplier,
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
            component: CustomerManager,
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
                component: CustomerList,
              },
              {
                path: 'addCustomer',
                name: 'AddCustomer',
                meta:{ 
                  title:'新增客户',
                  group: "addCustomer",
                  level: 2,
                },
                component: AddCustomer,
              }, 
              {
                path: 'viewCustomer',
                name: 'ViewCustomer',
                meta:{ 
                  title:'查看客户',
                  group: "viewCustomer",
                  level: 2,
                },
                component: ViewCustomer,
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
        component: Sell,
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
            component: SelectionManager,
            children:[{
              path: 'selectionManagerList',
              name: 'SelectionManagerList',
              meta:{ 
                title:'选品管理',
                group: "selectionManager",
              },
              component:SelectionManagerList
             },
             {
              path: 'selectionResultList',
              name: 'SelectionResultList',
              meta:{ 
                title:'选品结果',
                group: "selectionResultList",
              },
              component:SelectionResultList
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
            component: SellManager,
            children:[
              {
                path: 'sellList',
                name: 'sellList',
                meta:{ 
                  title:'销售推品列表',
                  group: "sellList",
                },
                component: SellList
              },
              {
                path: 'addFinishProduct',
                name: 'AddFinishProduct',
                meta:{ 
                  title:'新建新品',
                  group: "addFinishProduct",
                },
                component: AddFinishProduct
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
            component: MainResearch,
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
                component: MainResearchList,
              },
              {
                path: 'research',
                name: 'Research',
                meta:{ 
                  title:'调研',
                  group: "mainResearch",
                  level: 2,
                },
                component: Research,
              },
              {
                path: 'researchResult',
                name: 'ResearchResult',
                meta:{ 
                  title:'调研结果',
                  group: "mainResearch",
                },
                component: ResearchResult,
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
                    component: ResearchResultList,
                  },
                  {
                    path: 'referenceComparison',
                    name: 'ReferenceComparison',
                    meta:{ 
                      title:'参考比价',
                      group: "researchResult",
                      level: 2,
                    },
                    component: ReferenceComparison,
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
        component: Examine,
        redirect:'examine/appointStoreExamine',
        children:[
          {
            path: 'appointStoreExamine',
            name: 'appointStoreExamine',
            meta:{ 
              title:'派店审核',
              group: 'appointStoreExamine',
            },
            component: AppointStoreExamine,
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
                component: AppointStoreExamineList,
              },
              {
                path: 'productAppointStore',
                name: 'productAppointStore',
                meta:{ 
                  title:'产品派店',
                  group: 'appointStoreExamine',
                  level: 2,
                },
                component: ProductAppointStore,
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
            component: TortExamine,
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
                component: TortExamineList,
              },
              {
                path: 'addTortExamine',
                name: 'addTortExamine',
                meta:{ 
                  title:'侵权审核',
                  group: 'tortExamine',
                  level: 2,
                },
                component: AddTortExamine,
              },
              {
                path: 'viewTortExamine',
                name: 'viewTortExamine',
                meta:{ 
                  title:'查看侵权审核',
                  group: 'tortExamine',
                  level: 2,
                },
                component: ViewTortExamine,
              },
              // {
              //   path:"viewResearch",
              //   name:"viewResearch",
              //   component: ViewResearch,
              //   meta: {
              //     title: "查看调研",
              //     group: 'tortExamine',
              //     level: 2,
              //   },
              // }
            ]
          },
          {
            path: 'selectionExamine',
            name: 'selectionExamine',
            meta:{ 
              title:'选品审核',
              group: 'selectionExamine',
            },
            component: SelectionExamine,
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
                component: SelectionExamineList,
              },
              {
                path: 'addSelectionExamine',
                name: 'addSelectionExamine',
                meta:{ 
                  title:'选品审核',
                  group: 'selectionExamine',
                  level: 2,
                },
                component: AddSelectionExamine,
              },
              {
                path: 'viewSelectionExamine',
                name: 'viewSelectionExamine',
                meta:{ 
                  title:'查看选品审核',
                  group: 'selectionExamine',
                  level: 2,
                },
                component: ViewSelectionExamine,
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
            component: MainResearchExamine,
            redirect:'mainResearchExamine/mainResearchExamineList',
            children:[
              {
                path: 'mainResearchExamineList',
                name: 'mainResearchExamineList',
                meta:{ 
                  title:'主推审核列表',
                  group: 'mainResearchExamine',
                },
                component: MainResearchExamineList,
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
            component: ChartingExamine,
            redirect:'chartingExamine/chartingExamineList',
            children:[
              {
                path: 'chartingExamineList',
                name: 'chartingExamineList',
                meta:{ 
                  title:'制图审核列表',
                  group: 'chartingExamine',
                },
                component: ChartingExamineList,
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
        component: Charting,
        redirect:'charting/chartingDelegation',
        children:[
          {
            path: 'chartingDelegation',
            name: 'chartingDelegation',
            meta:{ 
              title:'制图委派',
              group: 'chartingDelegation',
            },
            component: ChartingDelegation,
          },
          {
            path: 'chartingTimeExchange',
            name: 'chartingTimeExchange',
            meta:{ 
              title:'制图时间调换',
              group: 'chartingTimeExchange',
            },
            component: ChartingTimeExchange,
          },
          {
            path: 'chartingRework',
            name: 'chartingRework',
            meta:{ 
              title:'制图返工',
              group: 'chartingRework',
            },
            component: ChartingRework,
          },
          {
            path: 'chartingManager',
            name: 'chartingManager',
            meta:{ 
              title:'制图管理',
              group: 'chartingManager',
            },
            component: ChartingManager,
          } 
        ]
      }
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "登录"
    }
  },
  {
    path: "*",
    name: "/errorHandler",
    component: errorHandler,
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
