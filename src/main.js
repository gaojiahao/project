/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: gaojiahao
 * @Date: 2020-10-19 15:27:12
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-31 11:36:34
 */
//引用插件
import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import store from "./store";
import VueRouter from "vue-router";
import '@plugins/iview.js'
import VideoPlayer from 'vue-video-player';
import 'video.js/dist/video-js.css';
import AudioPlayer from '@liripeng/vue-audio-player';
import '@liripeng/vue-audio-player/lib/vue-audio-player.css';
import VueQuillEditor from 'vue-quill-editor';
import jsPlumb from 'jsplumb';
//引用自定义组件
import Loading from "@plugins/loading/pageLoad/loading";
import FromLoading from "@components/public/loading/loading.js";
import '@less/common';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import '@css/iconfont/iconfont.css'
import router from "./router";
import vueAudioPlayerUmdMin from "@liripeng/vue-audio-player";

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
//本地图片路径
Vue.prototype.$upload_url  = process.env.VUE_UPLOAD_URL||'localhost:8080';
Vue.prototype.$base_url  = process.env.VUE_BASE_URL||'http://cbapi.com/';
//线上正式图片路径
// Vue.prototype.$upload_url  = process.env.VUE_UPLOAD_URL||'192.168.1.23:8073';
// Vue.prototype.$base_url  = process.env.VUE_BASE_URL||'http://192.168.1.23:8073/';
//开发环境
// localhost:8080
// http://cbapi.com/
//测试环境
// 192.168.1.23:8071
// http://192.168.1.23:8071/
//正式环境
// 192.168.1.23:8073
// http://192.168.1.23:8073/
const originalPush = VueRouter.prototype.push;
//流程插件挂载
Vue.prototype.$jsPlumb = jsPlumb.jsPlumb;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

let vueMain = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
export default vueMain;
