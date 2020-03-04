<template>
  <div id="cart">
    <cart-nav-bar></cart-nav-bar>
    <scroll class="content" ref="wrapper" :probeType="3" :pullUpLoad="true">
      <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>

</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'

  import CartNavBar from 'views/cart/childComps/CartNavBar'
  import CartList from 'views/cart/childComps/CartList'
  import CartBottomBar from 'views/cart/childComps/CartBottomBar'
  export default {
    name: "Cart",
    components: {
      CartNavBar,
      CartList,
      Scroll,
      CartBottomBar
    },
    activated() {
      this.$refs.wrapper.scroll.refresh();
    }
  }

</script>

<style scoped>
  .content {
    margin-top: 44px;
    height: calc(100vh - 49px - 84px - 44px);
    overflow: hidden;
  }

</style>
