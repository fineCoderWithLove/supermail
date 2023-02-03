<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg">
    </div>
    <div slot="center" class="title">
      <div v-for="(item,index) in titles"
           class="title-item"
           :class="{active: index === currentIndex}"
      @click="titleClick(index)">{{item}}</div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components:{
    NavBar
  },
  data(){
    return{
      titles: ['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods:{
    //绑定点击事件，如果发生点击currentIndex变成index索引。上面动态绑定class的时候若相等就给一个样式
    titleClick(index){
      this.currentIndex=index
      this.$emit('titleClick',index)
    },
    backClick(){
      //这是一个返回函数
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.title{
  display: flex;

}
.title-item{
  flex: 1;
}
.active{
  color: var(--color-tint);
}
.back img {
  margin-top: 10px;
}
</style>
