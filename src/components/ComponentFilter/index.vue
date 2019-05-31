 <!--
 * 封装头部筛选组件
 -->
<template>
  <div class="table-filter">
    <div class="table-filter-header">
      <svg-icon icon-class="filter" />
      <span>{{filterName}}</span>
      <div class="table-filter-header-search">
        <el-button size="mini"
                   icon="double_arrow_up"
                   v-model="isShowFilter"
                   v-show="isShowFilter"
                   @click="toggleFilter">
          <!-- <i class="icon iconfont el-icon-z045"></i> -->
          <svg-icon icon-class="double_arrow_up"
                    style="font-size:12px" /> {{filterClose}}</el-button>
        <el-button size="mini"
                   v-model="isShowFilter"
                   v-show="!isShowFilter"
                   @click="toggleFilter">
          <svg-icon icon-class="double_arrow_down"
                    style="font-size:12px" /> {{filterOpen}}</el-button>
        <!-- <el-button size="mini"
                   class="table-filter-header-search-advanced"
                   @click="openFilterAdvanced($event)">高级检索</el-button> -->
      </div>
    </div>
    <el-collapse-transition>
      <div class="table-filter-content"
           v-show="isShowFilter">
        <div class="table-filter-content-inner">
          <slot name="filterForm"></slot>
          <slot name="refreshTable"></slot>
          <slot name="insert"></slot>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
import Bus from '@/utils/bus.js'
export default {
  name: 'ComponentFilter',
  data() {
    return {
      // 是否显示“筛选查询” 默认显示：true
      isShowFilter: true
    }
  },
  created() {},
  props: {
    // 筛选名称
    filterName: {
      type: String,
      default: '筛选查询'
    },
    // 展开筛选
    filterOpen: {
      type: String,
      default: '展开筛选'
    },
    // 收起筛选
    filterClose: {
      type: String,
      default: '收起筛选'
    }
  },
  methods: {
    toggleFilter() {
      // 切换筛选展开/收起
      this.isShowFilter = !this.isShowFilter
    },
    openFilterAdvanced() {
      this.addCart(event)
    },
    addCart(event) {
      // 事件巴士，传递给ComponentFilterAdvanced和ComponentMask组件
      Bus.$emit('openFilterAdvanced', event.target)
      Bus.$emit('maskShow', event.target)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/styles/smart-ui/smart-ui.scss';
</style>
