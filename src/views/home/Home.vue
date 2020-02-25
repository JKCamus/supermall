<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content">
      <home-swiper :banners="banners"></home-swiper>
      <recommend :recommends="recommends"></recommend>
      <feature></feature>
      <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
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
  export default {
    name: "home",
    components: {
      NavBar,
      HomeSwiper,
      Recommend,
      Feature,
      TabControl,
      GoodsList,
      Scroll
    },
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
        currentType: 'pop'
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 请求多个数据
      this.getHomeMultidata()
      // 请求商品数据
      this.getHomeGoods('pop'),
        this.getHomeGoods('new'),
        this.getHomeGoods('sell')
    },
    methods: {
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
      },
      // 网络请求方法
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        // 当前页码为0+1
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(
          res => {
            // console.log(res);
            //拿到res里面的data里面的list通过解构push到当前组件的goods中
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page += 1
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
    position: sticky;
    top: 44px;
    z-index: 9;
  }
.content{
  /* height:300px; */
  /* 定位确定content内容高度bs-scroll才可用 */
  /* 子绝父相 */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
}
</style>
