<template>
  <div id="app">
    <main-tab-bar class="main-tab-bar"></main-tab-bar>
    <router-view></router-view>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/maintabbar/MainTabBar.vue'
  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  }

</script>

<style>
  @import url("./assets/css/base.css");
  .main-tab-bar{
    z-index: 9;
  }

</style>
