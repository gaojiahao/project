/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-19 15:27:12
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-12 16:19:41
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Index from "@views/home/index";
import Login from "@views/Login.vue";
import Home from "@views/Home.vue";
import tokenService from "@service/tokenService";
import errorHandler from '@components/public/errorHandler';
//系统权限管理
import Authority from "@views/authority";
import MenuManager from "@views/authority/menuManager";
import RoleManager from "@views/authority/roleManager";
import UserManager from "@views/authority/userManager";
//基础管理
import Basicinfo from "@views/basicinfo/index";
import TypeManager from "@views/basicinfo/typeManager/index";
import PropertyManager from "@views/basicinfo/propertyManager/index";
import BrandManager from "@views/basicinfo/brandManager/index";
import PlatformManager from "@views/basicinfo/platformManager/platformManager";
import StoreManager from "@views/basicinfo/storeManager";
import StoreList from "@views/basicinfo/storeManager/storeList";
import AddStore from "@views/basicinfo/storeManager/addStore";
//流程管理
import Bpm from "@views/bpm";
import SaveBpm from "@views/bpm/saveBpm";
import SaveBpm2 from "@views/bpm/saveBpm2";
import UpdataBpm from "@views/bpm/updataBpm";
import BpmManager from "@views/bpm/bpmManager";
//产品管理
import Product from "@views/product";
import ProductList from "@views/product/productManager/productList";
import Sell from "@views/product/sell/";
import SellList from "@views/product/sell/sellList";
import AddFinishProduct from "@views/product/sell/addFinishProduct";
import DevelopNewProducts from "@views/product/developNewProducts/index";
import DevelopNewProductsList from "@views/product/developNewProducts/developNewProductsList";
import AddNewProduct from "@views/product/developNewProducts/addNewProduct";
//客户管理
import Customer from "@views/customer";
import CustomerManager from "@views/customer/customerManager";
import CustomerList from "@views/customer/customerManager/customerList";
import AddCustomer from "@views/customer/customerManager/addCustomer";
import SupplierManager from "@views/customer/supplierManager";
import SupplierList from "@views/customer/supplierManager/supplierList";
import AddSupplier from "@views/customer/supplierManager/addSupplier";

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
        path: "basicinfo",
        name: "basicinfo",
        component: Basicinfo,
        redirect:'basicinfo/typeManager',   //默认子路由
        meta: {
          title: "基础信息"
        },
        children:[
          {
            path: "typeManager",
            name: "TypeManager",
            component: TypeManager,
            meta: {
              title: "分类管理"
            },
          },
          {
            path: "platformManager",
            name: "PlatformManager",
            component: PlatformManager,
            meta: {
              title: "平台管理"
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
        ]
      },
      {
        path: "authority",
        name: "authority",
        component: Authority,
        meta: {
          title: "权限管理"
        },
        redirect:'authority/menuManager',
        children:[
          {
            path: "roleManager",
            name: "RoleManager",
            component: RoleManager,
            meta: {
              title: "角色管理"
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
              title: "角色管理"
            },
          }
        ]
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
      {
        path:"product",
        name:"Product",
        component: Product,
        meta: {
          title: "产品管理"
        },
        redirect:'product/productList',
        children:[
          {
            path: 'productList',
            name: 'ProductList',
            meta:{ 
              title:'产品列表',
            },
            component: ProductList
          }, 
          {
            path: 'sell',
            name: 'Sell',
            meta:{ 
              title:'销售推品列表',
            },
            component: Sell,
            redirect:'sell/sellList',
            children:[
              {
                path: 'sellList',
                name: 'SellList',
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
            ]
          },
        ]
      },
      {
        path:"customer",
        name:"Customer",
        component: Customer,
        meta: {
          title: "客户管理"
        },
        redirect:'customer/SupplierManager',
        children:[
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
            ]
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
