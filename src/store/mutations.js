import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-type'
export default {
  [ADD_COUNTER](state, payload) {
    // 实现devtools跟踪
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    state.cartGoods.push(payload)
  }
}
