/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-19 15:27:12
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-12-11 15:46:35
 */
//引用插件
import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import VueRouter from "vue-router";
import '@plugins/iview.js'
import VideoPlayer from 'vue-video-player';
import 'video.js/dist/video-js.css';
import AudioPlayer from '@liripeng/vue-audio-player';
import '@liripeng/vue-audio-player/lib/vue-audio-player.css';
import VueQuillEditor from 'vue-quill-editor';
//引用自定义组件
import Loading from "@plugins/loading/pageLoad/loading";
import FromLoading from "@components/public/loading/loading.js";
import '@less/common';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.config.productionTip = false;
Vue.directive("title", {
  inserted: function(el, binding) {
    document.title = el.dataset.title;
  }
});
/**plugin */
Vue.use(VueRouter);
Vue.use(Loading);
Vue.use(VideoPlayer);
Vue.use(AudioPlayer);
Vue.use(FromLoading);
Vue.use(VueQuillEditor);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
