<template>
<div class="cart-list">
  <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item,index) in cartList"
        :key="index"
        :item-info="item"></cart-list-item>
  </scroll>
</div>
</template>

<script>

import {mapGetters} from 'vuex'
import Scroll from "@/components/common/scroll/Scroll";
import CartListItem from "@/views/cart/childComps/CartListItem";
export default {
  name: "CartList",
  components:{
    CartListItem,
    Scroll
  },
  computed:{
    ...mapGetters(['cartList'])
  },
  activated() {
    console.log("---")
    this.$refs.scroll.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list{
  height: calc(100% - -93px - 44px - 40px);
}
.content {
  /* position: absolute;
   top: 44px;
   left: 0;
   right: 0;
   bottom: 49px;
   overflow: hidden;*/
  height:100%;
  overflow: hidden;
}
</style>
