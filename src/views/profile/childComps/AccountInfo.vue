<template>
  <div class="account">
    <div class="account-item">
      <div class="number">
        <span class="balance">0.00</span>
        <span>元</span>
      </div>
      <div class="account-info">
        我的余额
      </div>
    </div>
    <div class="account-item">
      <div class="number">
        <span class="balance">0</span>
        <span>个</span>
      </div>
      <div class="account-info">
        我的优惠
      </div>
    </div>
    <div class="account-item">
      <div class="number">
        <span class="balance">0</span>
        <span class="unit">分</span>
      </div>
      <div class="account-info">
        我的积分
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    name: "AccountInfo"
  }

</script>
<style scoped>
.account{
    display: flex;
}
.account-item{
    flex:1;
    width: 100%;
    height: 100%;
    background-color: #fff;
    margin-right: 1px;
    text-align: center;
}
.account-item:last-of-type{
    margin-right: 0;
}
.account-item{
    color: #666;
    font-size: 13px;
    padding: 18px;
}
.account-item .balance{
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
    margin-right: 1px;
}
.account-info{
    margin-top: 6px;
}
</style>
