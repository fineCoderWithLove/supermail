import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation-types";

export default {
  addCart({
    state,
    commit
  }, payload) {
    return new Promise((resolve) => {
        // 1.查找之前数组中是否有该数组
        let oldProduct = state.cartList.find(item => item.iid === payload.iid)

        // 2.判断oldProduct,如果oldProduct中有那就把数量+1，如果没有那就添加新的商品
        if (oldProduct) {
          commit(ADD_COUNTER, oldProduct)
          resolve("当前的商品数量+1")
        } else {
          payload.count = 1
          payload.checked = false
          commit(ADD_TO_CART, payload)
          resolve("添加了新的商品")
        }
      })
    }
}
