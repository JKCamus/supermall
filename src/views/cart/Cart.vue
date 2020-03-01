<template>
  <div id="cart">
    <cart-list></cart-list>
    <cart-nav-bar></cart-nav-bar>
  </div>
</template>
<script>
  import CartList from 'views/cart/childComps/CartList'
  import CartNavBar from 'views/cart/childComps/CartNavBar'
  export default {
    name: "shopCart",
    components: {
      CartList,
      CartNavBar
    }
  }

</script>
<style>
</style>
