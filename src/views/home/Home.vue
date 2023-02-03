<template xmlns:tab-control="http://www.w3.org/1999/xlink">
<div id="home">
<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
  <tab-control :titles="['流行','新款','精选']"
               @tabClick="tabClick"
               ref="tabControl1"
               class="tab-control"
               v-show="isTabFixed"
  ><!--  ref收到子组件传来的事件-->
  </tab-control>
  <Scroll
    class="content"
    ref="scroll"
    :probe-type="3"
    @scroll="contentScroll"
    :pull-up-load="true"
    @pullingUp="loadMore">
<home-switer :banners="banners" @swiperImageLoad="swiperImageLoad"></home-switer>
  <recommend-view :recommends="recommends"/>
  <feature-view></feature-view>
  <tab-control :titles="['流行','新款','精选']"
               @tabClick="tabClick"
  ref="tabControl2"
  ><!--  ref收到子组件传来的事件-->
  </tab-control>
  <good-list :goods="goods[currentType].list"></good-list>
  </Scroll>
<back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
</div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import HomeSwiter from "@/views/home/childComps/HomeSwiter";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodList from "@/components/content/goods/GoodsList";
import GoodsListItem from "@/components/content/goods/GoodsListItem";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backtop/BackTop";

import {getHomeMultidata,getHomeGoods} from "@/network/home";


export default {
  name: "Home",
  components:{
    NavBar,
    HomeSwiter,
    RecommendView,
    FeatureView,
    TabControl,
    GoodList,
    GoodsListItem,
    Scroll,
    BackTop
  },
  data(){
    return{
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType:'pop',
      isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0
    }
  },
  activated() {
    this.$refs.scroll.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.scroll.refresh()
    console.log("访问组件的时候")
  },
  deactivated() {
    console.log("离开组件的时候")
    this.saveY = this.$refs.scroll.scroll.getScrollY
  },
  created() {
    //请求多个数据
    getHomeMultidata().then(res=>{
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
    //请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
    //赋值

  },
  // mounted() {
  //   console.log(this.$refs.tabControl.$el.offsetTop);
  // },
  methods:{
    //事件监听的方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex=index;
      this.$refs.tabControl2.currentIndex=index;
    },
    backClick(){
      console.log('点击到了');
      this.$refs.scroll.scroll.scrollTo(0,0,500)
    },
    contentScroll(position){
      //判断backtop是否显示
     this.isShowBackTop = -position.y>1000
      //决定tabcontrol是否吸顶
      this.isTabFixed=(-position.y)>this.tabOffsetTop

    },
    debounce(func,delay){
        let timer  = null
        return function (...args) {
          if(timer)clearTimeout(timer)
          timer = setTimeout(()=>{
              func.apply(this,args)
          },delay)
        }
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.scroll.refresh()
    },
    //网路请求方法
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        this.$refs.scroll.scroll.finishPullUp()
      })
    },
    swiperImageLoad(){
      this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
    },
  }
}
</script>

<style scoped>

#home{
  height: 100vh;
  position: relative;

}
.home-nav{
  background-color: var(--color-tint);
  color: whitesmoke;
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}
.tab-control{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
/*确定高度*/
.content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 44px;
  left: 0;
  right: 0;
}
/*.content{*/
/*  height: calc(100% - 98px);*/
/*  overflow: hidden;*/
/*  margin-top: 44px;*/
/*}*/

</style>
