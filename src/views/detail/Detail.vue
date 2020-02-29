<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-images-info @imgLoad="detailImgLoad" :images-info="detailInfo" />
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" class="detail-set-scroll"></detail-comment-info>
      <goods-list :goods="recommends"></goods-list>

    </scroll>
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

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'
  import {
    debounce
  } from 'common/utils'
  import {itemListenerMixin} from 'common/mixin'
  
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
      GoodsList
    },
    mixins:[itemListenerMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        paramInfo: {},
        detailInfo: {},
        commentInfo: {},
        recommends:[],
        // themeTopYs: [],
        getThemeTopY: null,
        itemImgListener: null
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
      getRecommend().then(res=>{
        // console.log(res);
        this.recommends=res.data.list
      })
      // this.getThemeTopY = debounce(() => {
      //   this.themeTopYs = []
      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recomend.$el.offsetTop)
      // })
    },
    mounted() {
 
    },
    // detail里没有做缓存，deactivated无效
    // deactivated() {
    //   this.$bus.$ff('imgItemLoad',this.itemImgListener)
    // },
    destroyed() {
      this.$bus.$off('imgItemLoad',this.itemImgListener)
      console.log("destroyed");
    },
    methods: {
      detailImgLoad() {
        this.$refs.scroll.refresh()
        // this.themeTopYs();
      },
      titleClick(index) {
        // console.log(index);
        // console.log(this.commentInfo);
        
        // this.$refs.scroll.scrollTo(0, this.themeTopYs[index], 0)
      },
      contentScroll(position) {


      },

    }
  }

</script>
<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }

</style>
