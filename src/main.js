/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-19 15:27:12
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-10-21 09:54:50
 */
//引用插件
import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueRouter from "vue-router"
import { Message } from 'view-design';;
import 'view-design/dist/styles/iview.css';
//引用自定义组件
import Loading from '@plugins/loading/pageLoad/loading'

Vue.config.productionTip = false;
Vue.directive('title', {
  inserted: function (el, binding) {
  document.title = el.dataset.title
  }
  })
//组件挂载到vue $this上
Vue.prototype.$Message = Message;
/**plugin */
Vue.use(VueRouter);
Vue.use(Loading);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
