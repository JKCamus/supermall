<template>
<div id="cart">
    <cart-list></cart-list>
</div>
</template>
<script>
  import CartList from 'views/cart/childComps/CartList'
  export default {
    name: "shopCart",
    components: {
      CartList
    }
  }

</script>
<style>
</style>
