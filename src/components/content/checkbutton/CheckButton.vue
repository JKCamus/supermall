<template>
  <div class="check-button">
    <img src="~assets/img/cart/tick.svg" alt="" :class="{active:isCheck}">
  </div>
</template>
<script>
  export default {
    name: "CheckButton",
    props: {
      isCheck: {
        style: Boolean,
        default:false
      },
    },
    methods: {
      // buttonClick() {
      //   this.product.isChecked = !this.product.isChecked
      //   // console.log(this.product.isChecked);
      //   // console.log(this.$store.state.cartGoods[0].isChecked);
      // }
    },
    data() {
      return {}
    }
  }

</script>
<style scoped>
  .check-button img {
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border: 2px solid #c0c0c0;
    vertical-align: middle;
    margin-bottom: 7px;
  }

  .active {
    border: 2px solid var(--color-tint) !important;
    background-color: var(--color-tint);
  }

</style>
