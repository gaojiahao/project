/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-19 15:27:12
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-02-08 16:32:49
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuRouter:{},
    auth:[],
  },
  mutations: {
    //点击修改路由信息
    setMenuRouter(state,data){
      state.menuRouter = data;
      //防止刷新，传入空的session
      if(data.oneLevel){
        var storage = window.sessionStorage;
        storage.setItem("activeMenu", JSON.stringify(data));
      } //防止刷新路由没了
    },
    setAuth(state,data){
      state.auth = data;
      var storage = window.sessionStorage;
      const res = [];
      for (const side in data) {
        const item = data[side];
        res.push({
          path: item.path,
          meta: {title:item.meta.title},
          name:item.name
        });
      }
      storage.setItem("auth", JSON.stringify(res));
    },
    clearMenuRouter(state){
      state.menuRouter = {};
    },
    clearAuth(state){
      state.auth = [];
    }
  },
  actions: {},
  modules: {}
});
