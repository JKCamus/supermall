import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-type'

export default {
  //   context可以解构为{state,commit}
  addCart(context, payload) {
    let oldProduct = context.state.cartGoods.find(item => item.iid === payload.iid)
    if (oldProduct) {
      //   oldProduct.count += 1
      // 调用context的commit方法
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1
      // state.cartGoods.push(payload)
      context.commit(ADD_TO_CART, payload)
    }
  }
}
