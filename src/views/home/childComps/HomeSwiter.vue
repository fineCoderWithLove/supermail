<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
<!--        监听图片加载完的事件-->
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from '@/components/common/swiper'

export default {
name: "HomeSwiter",
  props:{
      banners:{
        type:Array,
        default() {
          return []
        }
      }
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods:{
    imageLoad(){
      //加载完成后发送事件到父组件
      this.$emit('swiperImageLoad')
    }
  }

}
</script>

<style scoped>

</style>
