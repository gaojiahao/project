/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-19 15:27:12
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-26 11:50:14
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuRouter:{
      oneLevel:'',
      twoLevel:'',
      thirdLevel:'',
    }
  },
  mutations: {
    //点击修改路由信息
    setMenuRouter(state,data){
      state.menuRouter = {
        oneLevel: data.oneLevel,
        twoLevel: data.twoLevel,
        thirdLevel: data.thirdLevel,
      };
    }
  },
  actions: {},
  modules: {}
});
