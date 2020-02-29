// 混入
import {
  debounce
} from './utils';
export const itemListenerMixin = {
  // 用防抖包装refresh函数,注意传入时不加括号
  data() {
    return {
      itemImgListener: null,
      newRefresh:null
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 50)
    this.itemImgListener = () => {
      this.newRefresh()
    }
    this.$bus.$on('imgItemLoad', this.itemImgListener)
    //   console.log("wos");
  }
};
