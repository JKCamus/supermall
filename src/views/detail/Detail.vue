<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-images-info @imgLoad="imgLoad" :images-info="detailInfo" />
      <detail-param-info :param-info="paramInfo"></detail-param-info>
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
  import Scroll from 'components/common/scroll/Scroll'
  import {
    getDetail,
    Goods,
    Shop,
    GoodsParam
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
      Scroll
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        paramInfo: {},
        detailInfo: {}
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

      })
    },
    methods: {
      imgLoad() {
        // this.$refs.scroll.refresh()
        this.$refs.scroll.refresh();

      }
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
