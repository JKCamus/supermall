<template>
  <div class="cart-list">
    <cart-list-item v-for="(item,index) in cartGoodsList" :key="index" :product="item"></cart-list-item>
  </div>
</template>
<script>
  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem from 'views/cart/childComps/CartListItem'


  import {
    mapGetters
  } from 'vuex'
  export default {
    name: "CartList",
    components: {
      CartListItem
    },
    computed: {
      ...mapGetters(["cartGoodsList"])
    },

    mounted() {

    }

  }

</script>
<style scoped>
  /* .content{
    margin-top: 44px;
    height: calc(100vh  - 49px - 84px - 44px);
    overflow: hidden;
  } */
  .cart-list {
    height: calc(100%-44px-49px);
  }

  .content {
    height: 100%;
    overflow: hidden;
  }

</style>
