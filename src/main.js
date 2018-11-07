import Vue from "vue";
import App from "./App.vue";

// 预设样式normalize.css
import "normalize.css";

Vue.config.productionTip = false;

// 引入基于Promise封装的xhr函数
import $ajax from "@/common/js/fetch.js";
Vue.prototype.$ajax = $ajax;

// 引入媒体查询
import "@/common/stylus/media.stylus";

// 引入iconfont
import "@/assets/fonts/iconfont.css";

new Vue({
  render: h => h(App)
}).$mount("#app");
