import Toast from './Toast.vue'
const toastPlugin = {}

toastPlugin.install = function (Vue) {
  // 1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)

  // 2.new的方式，根据组件构造器，可以创建出一个组件对象
  const toast = new toastConstructor()

  // 3.将组件对象，手动挂载到某个元素上,与main上处理App组件的挂载一样
  toast.$mount(document.createElement('div'))

  // 4.toast.$el对应的入口源生就是上面的div
  document.body.appendChild(toast.$el)
  //5.将组件挂载到vue原型上
  Vue.prototype.$toast = toast
}

export default toastPlugin