/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-19 15:27:12
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-20 16:53:30
 */
import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueRouter from "vue-router"
import { Message } from 'view-design';;
import 'view-design/dist/styles/iview.css';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.prototype.$Message = Message

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
