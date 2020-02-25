<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <!-- 需要滚动的内容会被替换到slot里面 -->
      <slot></slot>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        //   不为true，组件里的div等无法被点击
        click: true
      })
    },
  }

</script>
<style scoped>


</style>
