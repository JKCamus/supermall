<template>
  <div class="profile">
    <nav-bar class="nav-bar">
      <div slot="center">用户</div>
    </nav-bar>
    <user-info></user-info>
    <account-info></account-info>
    <normal-list :list-data="orderList"></normal-list>
    <normal-list :list-data="serviceList"></normal-list>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar'
  import UserInfo from 'views/profile/childComps/UserInfo'
  import NormalList from 'views/profile/childComps/NormalList'
  import AccountInfo from 'views/profile/childComps/AccountInfo'
  export default {
    name: "profile",
    components: {
      NavBar,
      UserInfo,
      AccountInfo,
      NormalList
    },
    data() {
      return {
        orderList: [{
            icon: 'message.svg',
            info: '我的消息'
          },
          {
            icon: 'pointer.svg',
            info: '积分商城'
          },
          {
            icon: 'vip.svg',
            info: '会员卡'
          },
        ],
        serviceList: [{
            icon: 'cart.svg',
            info: '我的购物车'
          },
          {
            icon: 'shopping.svg',
            info: '下载购物APP'
          },
        ]
      }
    }
  }

</script>
<style scoped>
  .profile {
    width: 100%;
    height: 100%;
  }

  .nav-bar {
    /* font-weight: 600; */
    color: white;
    background-color: #ff8198;
  }

</style>
