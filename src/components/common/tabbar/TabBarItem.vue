<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- 替换tabbar的slot -->
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <!-- 这样做其class是无效的，因为会被替换掉。需要动态绑定属性绑定在div进行包起来 -->
    <!-- <slot :class="{active：isAcitive}"  name="item-text"></slot> -->
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      activeColor: {
        default: 'rgb(255, 87, 119)',
        type: String
      }
    },
    data() {
      return {
        // isActive: true,
      }
    },
    // 激活状态判定，
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        //   判断是不是激活，激活时，未传入参数，则为红色，
        // 传入参数时，显示传入的参数,未激活时传入空
        return this.isActive ? {
          color: this.activeColor
        } : {}
      }
    },
    methods: {
      itemClick() {
        // console.log("111");
        this.$router.replace(this.path)
      }
    },
  }

</script>
<style>
  .tab-bar-item {
    /* 添加tab-bar-item方便控制，均衡分布 */
    flex: 1;
    text-align: center;
    /* 开发中，很多手机的tabbar为49px */
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    height: 24px;
    width: 24px;
    margin-top: 3px;
    /* 去除img的预留空白 */
    vertical-align: middle;
    margin-bottom: 2px;
  }

  /* 将颜色进行动态化 */
  /* .active {
    color: deeppink;
  } */

</style>
