/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-19 15:27:12
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-03 09:27:01
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Index from "@views/home/index";
import Login from "@views/Login.vue";
import Home from "@views/Home.vue";
import Basicinfo from "@views/basicinfo/index";
import TypeManager from "@views/basicinfo/typeManager/index";
import tokenService from "@service/tokenService";
import errorHandler from '@components/public/errorHandler';
import StoreManager from "@views/basicinfo/storeManager";
import AddStore from "@views/basicinfo/storeManager/addStore";
import PlatformManager from "@views/basicinfo/platformManager/index";
//系统权限管理
import Authority from "@views/authority";
import MenuManager from "@views/authority/menuManager";
import RoleManager from "@views/authority/roleManager";
import UserManager from "@views/authority/userManager";

Vue.use(VueRouter);

const routes = [
  { 
    path: '/', 
    name: "Home",
    component: Home,
    redirect:'index',   //默认子路由
    meta: {
      title: "小竹熊",
      // auth: true      //检查权限true
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
            path: "storeManager",
            name: "StoreManager",
            component: StoreManager,
            meta: {
              title: "店铺管理"
            },
            children:[
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
