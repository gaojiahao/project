/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-19 15:27:12
 * @LastEditors: gaojiahao
 * @LastEditTime: 2020-11-26 09:58:30
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuRouter:{}
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
    clearMenuRouter(state){
      state.menuRouter = {};
    }
  },
  actions: {},
  modules: {}
});
