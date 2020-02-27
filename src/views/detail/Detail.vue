<template>
  <div class="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <!-- <detail-goods-info :goods="goods"></detail-goods-info> -->
  </div>
</template>
<script>
  import DetailNavBar from 'views/detail/childComps/DetailNavBar'
  import DetailSwiper from 'views/detail/childComps/DetailSwiper'
  import DetailBaseInfo from 'views/detail/childComps/DetailBaseInfo'
  
  import {
    getDetail,
    Goods
  } from 'network/detail'
  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: null

      }
    },
    created() {
      // 将iid保存
      this.iid = this.$route.params.iid
      //   console.log(this.$route.params.iid);
      //   根据iid请求详情页数据
      getDetail(this.iid).then(res => {
        const data = res.result
        console.log(res);
        //获取详情页顶部轮播图
        this.topImages = data.itemInfo.topImages
        // 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // console.log(this.goods);


      })
    },

  }

</script>
<style scoped></style>
