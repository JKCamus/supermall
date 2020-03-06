<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <div slot="center">分类</div>
    </nav-bar>
    <div class="content">
      <side-bar :categories="categories" @selectItem="selectItem"></side-bar>
      <scroll class="scroll-hight" :data="[categoryData]" ref="scroll">
        <Subcategory :subcategories="showSubcategory"></Subcategory>
        <tab-control :titles="['综合','新品','销量']" @tabClick='tabClick'></tab-control>
        <goods-list :goods="showCategoryDetail" />
      </scroll>
    </div>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar'
  import SideBar from 'views/category/childComps/SideBar'
  import Scroll from 'components/common/scroll/Scroll'
  import Subcategory from 'views/category/childComps/Subcategory'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'

  import {itemListenerMixin} from 'common/mixin'
  import {
    getCategory,
    getSubcategory,
    getCategoryDetail
  } from 'network/category'
  export default {
    name: "category",
    components: {
      NavBar,
      SideBar,
      Subcategory,
      Scroll,
      TabControl,
      GoodsList
    },
    mixins:[itemListenerMixin],
    data() {
      return {
        categories: [],
        categoryData: {},
        currentIndex: -1,
        currentType: 'pop'
      }
    },
    created() {
      this.getCategory();
      this.$bus.$on('imgLoad', () => {
        // this.$refs.scroll.refresh()
      })
    },
    computed: {
      showSubcategory() {
        if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
        if (this.currentIndex === -1) return []
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    methods: {
      getCategory() {
        getCategory().then(res => {
          // 1.获取分类数据
          //   console.log(res);
          this.categories = res.data.category.list
          // 2.初始化每个类别的子类数据
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 3.请求第一个分类数据
          this.getSubcategories(0)
        })
      },
      getSubcategories(index) {
        this.currentIndex = index;
        const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          //   console.log(res.data);
          this.categoryData[index].subcategories = res.data
          this.categoryData = {
            ...this.categoryData
          }
          this.getCategoryDetail("pop")
          this.getCategoryDetail("new")
          this.getCategoryDetail("sell")
        })
      },
      getCategoryDetail(type) {
        const miniWallKey = this.categories[this.currentIndex].miniWallkey
        getCategoryDetail(miniWallKey, type).then(res => {
          this.categoryData[this.currentIndex].categoryDetail[type] = res
          // console.log(res);
          this.categoryData = {
            ...this.categoryData
          }
          // console.log(this.categoryData);
        })
      },
      selectItem(index) {
        this.getSubcategories(index)
      },
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      }

    }

  }

</script>
<style scoped>
  #category {
    height: 100vh;
  }

  .nav-bar {
    color: white;
    background-color: #ff8198;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }

  .scroll-hight {
    position: fixed;
    top: 44px;
    right: 0;
    bottom: 50px;
    left: 100px;
    overflow: hidden;
  }

</style>
