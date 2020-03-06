<template>
  <scroll class="side-bar">
    <div class="bar-list">
      <div class="bar-list-item" :class="{active:index===currentIndex}" v-for="(item,index) in categories" :key="index"
        @click="itemClick(index)">
        {{item.title}}
      </div>
    </div>
  </scroll>
</template>
<script>
  import Scroll from 'components/common/scroll/Scroll'
  export default {
    name: "SideBar",
    components: {
      Scroll
    },
    props: {
      categories: {
        type: Array
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        this.$emit("selectItem", index)
      }
    }
  }

</script>
<style scoped>
  .side-bar {
    background-color: #f6f6f6;
    width: 100px;
    position: fixed;
    top: 44px;
    right: 0;
    bottom: 49px;
    left: 0;
    overflow: hidden;
  }

  .bar-list-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }

  .bar-list-item.active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }

</style>
