import {
  ADD_COUNTER,
  ADD_TO_CART,
  CHECK_CLICK
} from "./mutation-types";

export default {
  [ADD_COUNTER] (state,oldProduct) {
    oldProduct.count++
  },
  [ADD_TO_CART] (state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  },
  [CHECK_CLICK] (state, payload) {
    let product = state.cartList.find(item => item.iid === payload)
    product.checked = !product.checked
  },
}


