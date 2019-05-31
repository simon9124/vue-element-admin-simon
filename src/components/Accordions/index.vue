<template>
  <div v-loading='loading'
       element-loading-spinner="el-icon-loading">
    <div class="view-container-box"
         v-for="(box,i) in boxList">
      <el-button type="primary"
                 :icon="box.expand?'el-icon-minus':'el-icon-plus'"
                 @click="toggleSpread(i)">{{box.title}}</el-button>
      <div ref="viewContainerBoxIn"
           class="view-container-box-in"
           :style="{'height': box.expand?box.height:'0px',
                    'border': box.expand?'1px solid rgba(20, 132, 210, 0.71)':'none',
                    'padding':box.expand?'30px 20px 20px 20px':'0 0 0 20px'
                    }">
        <slot :name="box.slot"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Accordions',
  props: {
    // 盒子列表
    boxList: {
      type: Array,
      default: () => {}
    },
    // 动态表格高度
    organTableHeight: {
      type: Number,
      default: 0
    }
  },
  watch: {
    // 动态设置表格高度
    organTableHeight(val) {
      this.boxList[1].height = val + 50 + 'px'
    }
  },
  data() {
    return {
      // 添加页面loading -> 确保页面加载完毕时获取每个box的对应高度
      loading: false
    }
  },
  created() {
    // 页面加载时，获取每个box的对应高度，将其height值更新到boxList中 -> 确保展开伸的缩滑动效果
    // this.$nextTick(() => {
    //   this.loading = true
    //   setTimeout(() => {
    //     this.boxList.forEach((box, i) => {
    //       box.height = this.$refs.viewContainerBoxIn[i].clientHeight + 'px'
    //     })
    //     this.loading = false
    //   }, 1000)
    // })
  },
  methods: {
    // 收起 & 展开
    toggleSpread(i) {
      this.boxList[i].expand = !this.boxList[i].expand
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/styles/smart-plan.scss';
</style>
