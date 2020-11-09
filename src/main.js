/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-19 15:27:12
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-11-09 14:17:38
 */
//引用插件
import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueRouter from "vue-router";
import { Message, Switch, Circle,Tree,Icon,Button,Span,Badge,Notice,Modal,Tag,Spin,Radio,Checkbox,Input } from "view-design";
import "view-design/dist/styles/iview.css";
import SuperFlow from 'vue-super-flow'
import 'vue-super-flow/lib/index.css'
//引用自定义组件
import Loading from "@plugins/loading/pageLoad/loading";
import '@less/common';

Vue.config.productionTip = false;
Vue.directive("title", {
  inserted: function(el, binding) {
    document.title = el.dataset.title;
  }
});
//按需引用注册组件
Vue.component("Tree", Tree);
Vue.component("Icon", Icon);
Vue.component("Button", Button);
Vue.component("Span", Span);
Vue.component("Badge", Badge);
Vue.component("i-switch", Switch);
Vue.component("i-circle", Circle);
Vue.component("Tag", Tag);
Vue.component("Radio", Radio);
Vue.component("Checkbox", Checkbox);
Vue.component("Input", Input);
Vue.use(SuperFlow);
//组件挂载到vue $this上
Vue.prototype.$Message = Message;
Vue.prototype.$Notice = Notice;
Vue.prototype.$Modal = Modal;
Vue.prototype.$Spin = Spin;
/**plugin */
Vue.use(VueRouter);
Vue.use(Loading);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
