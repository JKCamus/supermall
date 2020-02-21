<template>
  <div id="tab-bar">
 <slot></slot>
  </div>
</template>
<script>
  export default {
    name: "TabBar",
    components: {
    }
  }
</script>
<style>
  /* 横向分布 */
  #tab-bar {
    display: flex;
    background-color: #f6f6f6;
    /* 将其放到底部 */
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 -3px 1px rgba(100, 100, 100, 0.08);
  }
</style>
