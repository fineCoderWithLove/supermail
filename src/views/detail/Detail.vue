<template>
<div id="detail">
<detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
  <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
    <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
    <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
    <goods-list ref="recommend" :goods="recommends"></goods-list>
  </scroll>
  <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
  <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  <toast :message="message" :show="show"></toast>
</div>
</template>

<script>

import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import {getDetail,Shop,Goods,GoodsParam,getRecommend} from "@/network/detail";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import Scroll from "@/components/common/scroll/Scroll";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import GoodsList from "@/components/content/goods/GoodsList";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";
import BackTop from "@/components/content/backtop/BackTop";
import Toast from "@/components/toast/Toast";

export default {
  name: "Detail",
  components: {
    DetailSwiper,
    DetailNavBar,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    GoodsParam,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
    Toast
  },
  data(){
    return{
      iid:null,
    topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopY:[],
      currentIndex:0,
      isShowBackTop:false,
      message:'',
      show:false
    }
  },
  mounted() {

  },
  updated() {
    this.themeTopY=[]
    this.themeTopY.push(0)
    this.themeTopY.push(this.$refs.params.$el.offsetTop)
    this.themeTopY.push(this.$refs.comment.$el.offsetTop)
    this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
    console.log(this.themeTopY)
  },
  created() {
    //????????????????????????iid
    this.iid=this.$route.params.iid

    //??????id??????????????????
    getDetail(this.iid).then(res =>{
      //?????????????????????
      const data = res.result;
      this.topImages = data.itemInfo.topImages
      //????????????????????????
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      //???????????????????????????
      this.shop = new Shop(data.shopInfo)
      //???????????????????????????
      this.detailInfo = data.detailInfo
      //?????????????????????
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      //??????????????????
      if(data.rate.cRate !== 0){
           this.commentInfo = data.rate.list[0]
      }

    }),
      getRecommend().then(res =>{
        console.log(res);
        this.recommends = res.data.list
      })
  },
  methods:{
    imageLoad(){
        this.$refs.scroll.scroll.refresh()
      this.themeTopY=[]
      this.themeTopY.push(0)
      this.themeTopY.push(this.$refs.params.$el.offsetTop)
      this.themeTopY.push(this.$refs.comment.$el.offsetTop)
      this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopY.push(Number.MAX_VALUE)
      console.log(this.themeTopY)
    },
    titleClick(index){
      console.log(index)
      this.$refs.scroll.scroll.scrollTo(0,-this.themeTopY[index],300)
    },
    contentScroll(position){
      const positionY = -position.y
      const length = this.themeTopY.length;
      for (let i = 0; i < length - 1; i++) {
        // ??????????????? hack
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopY[i] &&
          positionY < this.themeTopY[i + 1]
        ) {
          this.currentIndex = i; // ????????????????????????i?????????
          console.log(this.currentIndex)
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      // 2.??????BackTop????????????
      this.isBackShow = (-position.y) > 1000
      //??????backtop????????????
      this.isShowBackTop = -position.y>1000
      //??????tabcontrol????????????
      this.isTabFixed=(-position.y)>this.tabOffsetTop
    },
    backClick(){
      console.log('????????????');
      this.$refs.scroll.scroll.scrollTo(0,0,500)
    },
    addCart(){
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      //??????????????????????????????
      this.$store.dispatch('addCart',product).then(res=>{
        this.show = true;
        this.message = res
        setTimeout(()=>{
          this.show = false
          this.message = ''
        },1500)
      })

    }
  },
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  height: 100%;
  background-color: #fff;
  height: 100vh;
}
.content{
  height: calc(100% - 44px);
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>
