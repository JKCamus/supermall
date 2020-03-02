<template>
  <div class="nav-bar">
    <nav-bar>
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import {
    mapGetters
  } from 'vuex'
  export default {
    name: "CartNavBar",
    components: {
      NavBar
    },
    computed: {
      // 对象写法，可重命名
      ...mapGetters([
        'cartLength'
      ])
      // 数组写法，一一对应
      //   ...mapGetters(
      //  [ "cartLength"]
      //   )
    }
  }

</script>

<style scoped>
.nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
}
</style>
