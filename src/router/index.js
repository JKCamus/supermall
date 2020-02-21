import Vue from 'vue'
import VueRouter from 'vue-router'
const Home=()=>import('views/home/Home.vue')
const Cart=()=>import('views/cart/Cart.vue')
const Category=()=>import('views/category/Category.vue')
const Profile=()=>import('views/profile/Profile.vue')

// 1.安装router
Vue.use(VueRouter)
// 2.1创建routers映射
const routes = [{
    path: "",
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: "首页"
    }
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      title: "购物车"
    }
  },
  {
    path: '/Category',
    component: Category,
    meta: {
      title: "分类"
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      title: "个人"
    }
  }
]
// 2.创建router
const router = new VueRouter({
  routes,
  mode: 'history'
})
// 导出router
export default router
