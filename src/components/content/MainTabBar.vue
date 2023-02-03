<template>
  <tab-bar>
    <tab-baritem path="/home">
      <img slot="item-icon" src="~assets/img/tabbar/home.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg">
      <div slot="item-text">首页</div>
    </tab-baritem>
    <tab-baritem path="/category">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg">
      <div slot="item-text">分类</div>
    </tab-baritem>
    <tab-baritem path="/cart">
      <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg">
      <div slot="item-text">购物车</div>
    </tab-baritem>
    <tab-baritem path="/profile">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg">
      <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg">
      <div slot="item-text">我的</div>
    </tab-baritem>
  </tab-bar>
</template>

<script>

import TabBaritem from "@/components/common/tabbar/TabBaritem";
import TabBar from "@/components/common/tabbar/TabBar";

export default {
  name: "MainTabBar",
  components:{
    TabBar,
    TabBaritem
  }

}
</script>

<style scoped>

</style>
