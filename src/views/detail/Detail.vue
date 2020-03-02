<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-images-info @imgLoad="detailImgLoad" :images-info="detailInfo" />
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" class="detail-set-scroll" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <back-top @click.native="topClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addToCart="addCart" class="bottom-bar"></detail-bottom-bar>
  </div>
</template>
<script>
  import DetailNavBar from 'views/detail/childComps/DetailNavBar'
  import DetailSwiper from 'views/detail/childComps/DetailSwiper'
  import DetailBaseInfo from 'views/detail/childComps/DetailBaseInfo'
  import DetailShopInfo from 'views/detail/childComps/DetailShopInfo'
  import DetailImagesInfo from 'views/detail/childComps/DetailImagesInfo'
  import DetailParamInfo from 'views/detail/childComps/DetailParamInfo'
  import DetailCommentInfo from 'views/detail/childComps/DetailCommentInfo'
  import DetailBottomBar from 'views/detail/childComps/DetailBottomBar'
  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'
  import {
    debounce
  } from 'common/utils'
  import {
    itemListenerMixin,
    backTopMixin
  } from 'common/mixin'

  import {
    getDetail,
    Goods,
    Shop,
    GoodsParam,
    getRecommend
  } from 'network/detail'
  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailImagesInfo,
      DetailParamInfo,
      DetailCommentInfo,
      Scroll,
      GoodsList,
      DetailBottomBar
    },
    mixins: [itemListenerMixin, backTopMixin],

    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        paramInfo: {},
        detailInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
      }
    },
    created() {
      // 将iid保存
      this.iid = this.$route.params.iid
      //   console.log(this.$route.params.iid);
      //   根据iid请求详情页数据
      getDetail(this.iid).then(res => {
        const data = res.result
        // console.log(res);
        //获取详情页顶部轮播图
        this.topImages = data.itemInfo.topImages
        //根据iid请求获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // console.log(this.goods);
        // 获取店铺信息
        this.shop = new Shop(data.shopInfo)
        // console.log(this.shop);
        // 获取详细信息
        this.detailInfo = data.detailInfo
        // console.log(this.detailInfo);
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        // console.log(this.paramInfo);
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0] || {}
        }

      })

      // 请求推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list
      })
      //获取全部加载后对应的offsetTop
      this.getThemeTopY = debounce(() => {
        // console.log("***");

        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // 推入最大值，滚动更新用
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs);
      })
    },
    mounted() {

    },
    // detail里没有做缓存，deactivated无效
    // deactivated() {
    //   this.$bus.$ff('imgItemLoad',this.itemImgListener)
    // },
    destroyed() {
      this.$bus.$off('imgItemLoad', this.itemImgListener)
      // console.log("destroyed");
    },
    methods: {
      detailImgLoad() {
        this.$refs.scroll.refresh()
        // this.newRefresh()
        // this.themeTopYs();
        this.getThemeTopY()
      },
      titleClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)

      },
      contentScroll(position) {
        const positionY = -position.y
        for (let i in this.themeTopYs) {
          // console.log(i);
          let length = this.themeTopYs.length
          for (let i = 0; i < length - 1; i++) {
            if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
              this.currentIndex = i
              this.$refs.nav.currentIndex = this.currentIndex
            }
          }
        }
        // 显示隐藏回到顶部按钮
        this.isShowBackTop = positionY > 1000
      },
      addCart() {
        console.log("biu");
        //获取购物车需要展示的信息，对象的形式
        const product = {
          image: this.topImages[0],
          title: this.goods.title,
          desc: this.goods.desc,
          price: this.goods.realPrice,
          iid: this.iid,
          newPrice: this.newPrice,
        };
        //将商品添加购物车里 vuex
        // this.$store.dispatch('addCart',product).then(res => {
        //   console.log(res)
        // })
        // this.$store.commit("addCart", product)
        this.$store.dispatch('addCart', product)

      }
    }
  }

</script>
<style scoped>
  #detail {
    position: relative;
    /* z-index: 9; */
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    /* height: calc(100% - 44px); */
    /* 定位计算滚动高度 */
    position: absolute;
    top: 44px;
    right: 0;
    bottom: 49px;
    left: 0;
    overflow: hidden;
    width: 100%;
    background-color: #ffffff;
  }

  .bottom-bar {
    z-index: 9;
  }

</style>
