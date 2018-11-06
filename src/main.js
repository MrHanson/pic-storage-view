import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "normalize.css";

Vue.config.productionTip = false;

// 引入基于Promise封装的xhr实例
import $ajax from "@/common/fetch.js";
Vue.prototype.$ajax = $ajax;

// 引入SessionStorage
import $storage from "@/common/LocalStorage.js";
Vue.prototype.storage = $storage;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
