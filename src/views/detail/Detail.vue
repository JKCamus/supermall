<template>
  <div class="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :goods="goods"></detail-goods-info>
    <detail-param-info :param-info="paramInfo"></detail-param-info>
  </div>
</template>
<script>
  import DetailNavBar from 'views/detail/childComps/DetailNavBar'
  import DetailSwiper from 'views/detail/childComps/DetailSwiper'
  import DetailBaseInfo from 'views/detail/childComps/DetailBaseInfo'
  import DetailShopInfo from 'views/detail/childComps/DetailShopInfo'
  import DetailGoodsInfo from 'views/detail/childComps/DetailGoodsInfo'
  import DetailParamInfo from 'views/detail/childComps/DetailParamInfo'
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
      DetailGoodsInfo,
      DetailParamInfo
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
  }

</script>
<style scoped></style>
