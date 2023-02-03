<template>
<div class="bottom-bar">
  <div class="check-content">
    <check-button
      class="check-button"
    />
  </div>
  <span>全选</span>
  <div class="price">
    合计:{{totalPrice}}
  </div>
  <div class="calculate">
    去鸡算:{{checkLength}}
  </div>
</div>
</template>

<script>

import CheckButton from "@/components/content/CheckButton/CheckButton";
export default {
  name: "CaerBottomBar",
    components:{
      CheckButton
    },
  computed:{
    totalPrice(){
      return '￥'+this.$store.state.cartList.filter(item =>{
        return item.checked
      }).reduce((preValue,item)=>{
          return preValue+item.price * item.count
      },0).toFixed(2)
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length
    }
    },
}
</script>

<style scoped>
.bottom-bar{
  background-color: #eee;
  position: relative;
  line-height: 40px;
  height: 40px;
  display: flex;
}
.check-content{
  display: flex;
  align-items: center;
  margin-left: 5px;
  width: 40px;
}
.check-button{
  width: 22px;
  height: 22px;
  line-height: 22px;

}
.price{
  margin-left: 33px;
  flex: 1;
}
.calculate{
  width: 90px;
  background: var(--color-tint);
  color: #fff;
  text-align: center;

}
</style>
