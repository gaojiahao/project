/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-19 15:27:12
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-19 16:13:01
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
//基础设置
import Basicinfo from "@views/basicinfo/index";
import DevelopNewProducts from "@views/basicinfo/developNewProducts/index";
import DevelopNewProductsList from "@views/basicinfo/developNewProducts/developNewProductsList";
import AddNewProduct from "@views/basicinfo/developNewProducts/addNewProduct";
import ViewNewProduct from "@views/basicinfo/developNewProducts/viewNewProduct";
import CustomerManager from "@views/basicinfo/customerManager";
import ProductManager from "@views/basicinfo/productManager/productList";
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
          title: "首页"
        },
      },
      {
        path: "settings",
        name: "settings",
        component: Settings,
        redirect:'settings/platformManager',   //默认子路由
        meta: {
          title: "系统设置"
        },
        children:[
          {
            path: "platformManager",
            name: "PlatformManager",
            component: PlatformManager,
            meta: {
              title: "平台管理"
            },
          },
          {
            path: "storeManager",
            name: "StoreManager",
            component: StoreManager,
            redirect:'storeManager/storeList',   //默认子路由
            meta: {
              title: "店铺管理"
            },
            children:[
              {
                path: "storeList",
                name: "StoreList",
                component: StoreList,
                meta: {
                  title: "店铺管理"
                },
              },
              {
                path: "addStore",
                name: "AddStore",
                component: AddStore,
                meta: {
                  title: "添加店铺"
                },
              }
            ]
          },
          {
            path: "typeManager",
            name: "TypeManager",
            component: TypeManager,
            meta: {
              title: "分类管理"
            },
          },
          {
            path: "propertyManager",
            name: "propertyManager",
            component: PropertyManager,
            meta: {
              title: "属性管理"
            },
          },
          {
            path: "brandManager",
            name: "brandManager",
            component: BrandManager,
            meta: {
              title: "品牌管理"
            },
          },
          {
            path: "makePicManager",
            name: "makePicManager",
            component: MakePicManager,
            meta: {
              title: "制图管理"
            },
          },
          {
            path: "menuManager",
            name: "MenuManager",
            component: MenuManager,
            meta: {
              title: "菜单管理"
            },
          },
          {
            path: "userManager",
            name: "UserManager",
            component: UserManager,
            meta: {
              title: "用户管理"
            },
          },
          {
            path: "roleManager",
            name: "RoleManager",
            component: RoleManager,
            meta: {
              title: "角色管理"
            },
          },
          {
            path: "bpm",
            name: "Bpm",
            component: Bpm,
            meta: {
              title: "流程管理"
            },
            redirect:'bpm/bpmManager',
            children:[
              {
                path: 'bpmManager',
                name: 'BpmManager',
                meta:{ 
                  title:'流程管理',
                },
                component: BpmManager
              },
              {
                path: 'saveBpm',
                name: 'SaveBpm',
                meta:{ 
                  title:'新建流程',
                },
                component: SaveBpm
              },
              {
                path: 'saveBpm2',
                name: 'SaveBpm2',
                meta:{ 
                  title:'新建流程',
                },
                component: SaveBpm2
              },
              {
                path: 'updataBpm',
                name: 'UpdataBpm',
                meta:{ 
                  title:'更新流程',
                },
                component: UpdataBpm
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
          title: "基础设置"
        },
        children:[
          {
            path: 'developNewProducts',
            name: 'DevelopNewProducts',
            meta:{ 
              title:'开发新品',
            },
            component: DevelopNewProducts,
            redirect:'developNewProducts/developNewProductsList',
            children:[
              {
                path: 'developNewProductsList',
                name: 'DevelopNewProductsList',
                meta:{ 
                  title:'开发新品',
                },
                component: DevelopNewProductsList
              },
              {
                path: 'addNewProduct',
                name: 'AddNewProduct',
                meta:{ 
                  title:'新建新品',
                },
                component: AddNewProduct
              },
              {
                path: 'viewNewProduct',
                name: 'ViewNewProduct',
                meta:{ 
                  title:'查看新品',
                },
                component: ViewNewProduct
              },
            ]
          },
          {
            path:"productManager",
            name:"ProductManager",
            component: ProductManager,
            meta: {
              title: "产品管理"
            },
          },
          {
            path: 'supplierManager',
            name: 'SupplierManager',
            meta:{ 
              title:'供应商管理',
            },
            component: SupplierManager,
            redirect:'supplierManager/supplierList',
            children:[
              {
                path: 'supplierList',
                name: 'SupplierList',
                meta:{ 
                  title:'供应商管理',
                },
                component: SupplierList,
              },
              {
                path: 'addSupplier',
                name: 'AddSupplier',
                meta:{ 
                  title:'新增供应商',
                },
                component: AddSupplier,
              }, 
              {
                path: 'viewSupplier',
                name: 'ViewSupplier',
                meta:{ 
                  title:'查看供应商',
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
            },
            component: CustomerManager,
            redirect:'customerManager/customerList',
            children:[
              {
                path: 'customerList',
                name: 'CustomerList',
                meta:{ 
                  title:'客户管理',
                },
                component: CustomerList,
              },
              {
                path: 'addCustomer',
                name: 'AddCustomer',
                meta:{ 
                  title:'新增客户',
                },
                component: AddCustomer,
              }, 
              {
                path: 'viewCustomer',
                name: 'ViewCustomer',
                meta:{ 
                  title:'查看客户',
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
            },
            component: SelectionManager,
            children:[{
              path: 'selectionManagerList',
              name: 'SelectionManagerList',
              meta:{ 
                title:'选品管理',
              },
              component:SelectionManagerList
             },
             {
              path: 'selectionResultList',
              name: 'SelectionResultList',
              meta:{ 
                title:'选品结果',
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
            },
            component: SellManager,
            children:[
              {
                path: 'sellList',
                name: 'sellList',
                meta:{ 
                  title:'销售推品列表',
                },
                component: SellList
              },
              {
                path: 'addFinishProduct',
                name: 'AddFinishProduct',
                meta:{ 
                  title:'新建新品',
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
            },
            component: MainResearch,
            redirect:'mainResearch/mainResearchList',
            children:[
              {
                path: 'mainResearchList',
                name: 'MainResearchList',
                meta:{ 
                  title:'主推调研',
                },
                component: MainResearchList,
                children:[
                  
                ]
              },
              {
                path: 'research',
                name: 'Research',
                meta:{ 
                  title:'调研',
                },
                component: Research,
              },
              {
                path: 'researchResult',
                name: 'ResearchResult',
                meta:{ 
                  title:'调研结果',
                },
                component: ResearchResult,
                redirect:'researchResult/researchResultList',
                children:[
                  {
                    path: 'researchResultList',
                    name: 'ResearchResultList',
                    meta:{ 
                      title:'调研结果',
                    },
                    component: ResearchResultList,
                  },
                  {
                    path: 'referenceComparison',
                    name: 'ReferenceComparison',
                    meta:{ 
                      title:'参考比价',
                    },
                    component: ReferenceComparison,
                  },   
                ]
              } 
            ]
          }
        ]
      },
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
      console.log(to.name);
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
