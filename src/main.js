import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import {FastClick} from "../../plugins/fastclick/fastclick";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

//移动端300ms的延迟
Vue.use(FastClick)
FastClick.attach(document.body)
//图片懒加载



