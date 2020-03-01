<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick" ref="tabControl1"
      v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll" :pull-up-load="true"
      @pulingUp='loadMore'>
      <home-swiper :banners="banners" @swiperImageLoad='swiperImageLoad'></home-swiper>
      <recommend :recommends="recommends"></recommend>
      <feature></feature>
      <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="topClick" v-show="isShowBackTop"></back-top>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import Recommend from './childComps/Recommend.vue'
  import Feature from './childComps/Feature'
  import GoodsList from 'components/content/goods/GoodsList'
  import TabControl from 'components/content/tabControl/TabControl'
  import Scroll from 'components/common/scroll/Scroll.vue'
  import {
    getHomeMultidata,
    getHomeGoods,
  } from 'network/home'
  import {
    debounce
  } from 'common/utils'
  import {itemListenerMixin,backTopMixin} from 'common/mixin'
  export default {
    name: "home",
    components: {
      NavBar,
      HomeSwiper,
      Recommend,
      Feature,
      TabControl,
      GoodsList,
      Scroll,
    },
    mixins:[itemListenerMixin,backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        // 商品数据结构
        goods: {
          'pop': {
            page: 0,
            list: []
          },
          'new': {
            page: 0,
            list: []
          },
          'sell': {
            page: 0,
            list: []
          },
        },
        // 默认首页为pop，
        currentType: 'pop',
        isTabFixed: false,
        tabOffsetTop: 0,
        saveY: 0,
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      },
    },
    // destroyed() {
    //   console.log("destroyed");
    // },
    created() {
      // !请求多个数据
      this.getHomeMultidata()
      // 请求商品数据
      this.getHomeGoods('pop'),
        this.getHomeGoods('new'),
        this.getHomeGoods('sell')
    },

    mounted() {

    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      // 保存滚动Y值
      this.saveY = this.$refs.scroll.getScrollY()
      // 取消全局事件监听
      this.$bus.$off("imgItemLoad", this.itemImgListener)

    },
    methods: {
      // 点击切换推荐栏
      tabClick(index) {
        // console.log(index);
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
        // 使得滚动的tabControl和固定的tabControl状态一致
        this.$refs.tabControl2.currentIndex = index;
        this.$refs.tabControl1.currentIndex = index;
      },

      // 判断点击回到顶部按钮的显示隐藏
      contentScroll(position) {
        this.isShowBackTop = (-position.y) > 1000
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      // 加载更多goodList
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        // console.log(this.tabOffsetTop);
      },
      // 网络请求方法
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list
        })
      },
      // 商品列表加载
      getHomeGoods(type) {
        // 当前页码为0+1
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(
          res => {
            // console.log(res);
            //拿到res里面的data里面的list通过解构push到当前组件的goods中
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page += 1
            this.$refs.scroll.finishPullUp()
          }
        )
      }
    },
  }

</script>
<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    /* position: sticky;
    top: 44px; */
    position: relative;
    z-index: 9;
  }

  .content {
    /* height:300px; */
    /* 定位确定content内容高度bs-scroll才可用 */
    /* 子绝父相 */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

</style>
