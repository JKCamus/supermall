<template>
  <div class="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
  </div>
</template>
<script>
  import DetailNavBar from 'views/detail/childComps/DetailNavBar'
  import DetailSwiper from 'views/detail/childComps/DetailSwiper'

  import {
    getDetail
  } from 'network/detail'
  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper
    },
    data() {
      return {
        iid: null,
        topImages:[]
      }
    },
    created() {
      this.iid = this.$route.params.iid
      //   console.log(this.$route.params.iid);
      getDetail(this.iid).then(res => {
        const data=res.result
        console.log(res);
        this.topImages=data.itemInfo.topImages

      })
    },

  }

</script>
<style scoped></style>
