<template>
<div class="cart">
<!--  导航-->
  <nav-bar class="nav-bar">
    <div slot="center">购物车({{$store.state.cartList.length}})</div>
  </nav-bar>
<!--  列表-->
<cart-list></cart-list>
<!--  底部汇总-->
  <caer-bottom-bar></caer-bottom-bar>
</div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import CartList from "@/views/cart/childComps/CartList";
import {mapGetters} from "vuex";
import CartListItem from "@/views/cart/childComps/CartListItem";
import CaerBottomBar from "@/views/cart/childComps/CaerBottomBar";

export default {
  name: "cart",
  components:{
    NavBar,
    CartList,
    CartListItem,
    CaerBottomBar
  },
  computed:{
    ...mapGetters({
      length:'cartLength',
    })
  }
}
</script>

<style scoped>
.nav-bar{
  background-color:var(--color-tint);
  color: whitesmoke;
  font-weight: 700;
}
</style>

