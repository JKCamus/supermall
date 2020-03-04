import Vue from 'vue'
import App from './App.vue'
import vant from "vant";
import store from './store/store'
import Toast from 'components/common/toast'


// 挂载路由
import router from './router'

Vue.config.productionTip = false

Vue.prototype.$bus=new Vue()
Vue.use(vant);
Vue.use(Toast)


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
