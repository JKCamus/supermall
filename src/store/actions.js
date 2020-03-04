export default {

  addCart(context, payload) {
   return new Promise(resolve => {
     const product = context.state.cartGoods.find(item => {
       return item.iid === payload.iid
     })
     if (product) {
       context.commit('addCount', product)
       resolve('当前商品数量+1')
     } else {
       context.commit('pushCartGoods', payload)
       resolve('成功添加新商品')
     }
   })
  }
}
