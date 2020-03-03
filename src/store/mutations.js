export default {
  addCount(state,payload) {
    payload.count += 1;
  },
  pushCartGoods(state,payload) {
    payload.isChecked = false;
    payload.count = 1;
    state.cartGoods.push(payload)
  }
}
