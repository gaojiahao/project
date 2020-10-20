/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-19 15:27:12
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-20 15:49:58
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@views/Home.vue";
import Login from "@views/Login.vue";
import tokenService from '@service/tokenService'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta:{auth:true}
  },
  
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录'
    }
  }
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
  mode: 'history',
  base: 'Rose'
});

/**
 * @name: gaojiahao
 * @test: 路由全局前置守卫
 * @msg: 
 * @param {*}
 * @return {*}
 */
router.beforeEach((to, from, next) => {
  if(to.matched.some( m => m.meta.auth)){     
    // 对路由进行验证     
    if(tokenService.getToken() != '' && to.name !== 'Login'){ // 已经登陆       
      next();   // 正常跳转到你设置好的页面     
    }
    else{       
      next({path:'/login'});
    } 
  } else{ 
    next();
  }
})
export default router;
