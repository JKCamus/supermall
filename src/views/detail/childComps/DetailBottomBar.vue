<template>
  <div class="bottom-bar">
    <div class="bar-item left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item right" >
        <div class="cart" @click="addToCart">加入购物车</div>
        <div class="buy">购买</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "DetailBottomBar",
    methods: {
      addToCart(){
        // console.log("buy");
        this.$emit("addToCart")
        
      }
    },
  }

</script>
<style scoped>
  .bottom-bar {
    /* height: 49px; */
    /* background-color: red; */
    /* position: fixed;
    left: 0;
    right: 0;
    display: flex;
    text-align: center; */
    background-color: #fff;
    height: 49px;
    position: fixed;
    bottom: 2px;
    left: 0;
    right: 0;
    /* display: flex; */
    text-align: center;
  }
  /* .left {
    width: 50%;
  } */
  .left,.right {
    display: flex;
  }

  .left .icon {
    display: block;
    width: 24px;
    height: 24px;
    margin: 5px 21px 3px;
    background:url('~assets/img/detail/detail_bottom.png') 0 0/100%;
  }

  .text {
    font-size: 14px;
  }
  .right .cart {
    height: 49px;
    width: 100%;
    background-color: #fff737;
    text-align: center;
    color:#666;
    font-size: 16px;
    line-height: 49px;
  }

  .right .buy {
    height: 49px;
    width: 100%;
    background-color: var(--color-tint);
    text-align: center;
    color:#fff;
    font-size:16px;
    line-height: 49px;
  }
</style> */
