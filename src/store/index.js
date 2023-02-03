import Vue from 'vue'
import Vuex from 'vuex'
import getters from "@/store/getters";
import actions from "@/store/actions";
import mutations from "@/store/mutations";
// 安装插件
Vue.use(Vuex)

// 创建Store对象
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  getters,
  actions,
  mutations,

})

// 挂载Vue实例上
export default store

