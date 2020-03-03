<template>
  <div class="cart-bottom-bar">
    <div class="all-check">
      <check-button :isCheck="selectAll" class="check-img" @click.native="selectAllClick"></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">
      <span>合计￥{{totalPrice}}</span>
    </div>
    <div class="payment">
      去结算({{calcCount}})
    </div>
  </div>
</template>
<script>
  import CheckButton from 'components/content/checkbutton/CheckButton'
  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        return this.$store.state.cartGoods.filter(item => {
          return item.isChecked === true
        }).reduce((prev, item) => {
          return prev + item.price * item.count
        }, 0).toFixed(2)
      },
      calcCount() {
        return this.$store.state.cartGoods.filter(item => {
          return item.isChecked === true
        }).length
      },
      selectAll() {
        // return true
        if (this.$store.state.cartGoods.length === 0) {
          return false;
        }
        //判断cartGoods存在未勾选的，全选img为未勾选状态
        // 3.普通遍历
        // for (let item of this.$store.state.cartGoods) {
        //   if (!item.isChecked) {
        //     return false
        //   }
        // }
        // return true
        // 1.采用filter
        // return !(this.$store.state.cartGoods.filter(item => !item.isChecked).length)
        // 2.采用find，比filter效率略高
        return !this.$store.state.cartGoods.find(item => !item.isChecked)
      }
    },
    methods: {
      selectAllClick() {
        if (this.selectAll) {
          this.$store.state.cartGoods.forEach(item => item.isChecked = false)
        }else{
            this.$store.state.cartGoods.forEach(item=>item.isChecked=true)
        }
        
      }
    },
  }

</script>
<style scoped>
  .cart-bottom-bar {
    width: 100%;
    height: 40px;
    position: fixed;
    bottom: 49px;
    background: #eeeeee;
    display: flex;
    line-height: 40px;
    text-align: center;
  }

  .total-price {
    width: 50%;
  }

  .all-check {
    width: 25%;
    display: flex;
    justify-content: center;
    /* margin-top: 3px; */


  }

  .check-img {
    margin: 3px 3px 0 0;
  }

  .payment {
    width: 25%;
    /* background-color: #ff5028; */
    background-color: #fd4c4c;
    color: #fff;
  }

</style>
