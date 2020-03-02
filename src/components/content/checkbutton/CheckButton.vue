<template>
  <div class="check-button" @click="buttonClick">
    <img src="~assets/img/cart/tick.svg" alt="" :class="{check:isCheck}">
  </div>
</template>
<script>
  export default {
    name: "CheckButton",
    data() {
      return {
        isCheck: null
      }
    },
    methods: {
      buttonClick() {
        // console.log(this.isCheck);
        this.isCheck = !this.$store.state.cartGoods[0].isChecked
        // console.log(!this.$store.state.cartGoods[0].isChecked);
        // console.log(this.isCheck);
      },
    },

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

  .check {
    border: 2px solid var(--color-tint) !important;
    background-color: var(--color-tint);
  }

</style>
