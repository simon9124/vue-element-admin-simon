 <!--
 * 封装新增/编辑页组件
 -->
<template>
  <!-- <div class="container"> -->
  <!-- 页内容 -->
  <div class="content">
    <!-- 用户编辑 -->
    <div class="content-spe">
      <p class="content-spe-title">{{name}}编辑</p>
      <div class="content-spe-element">
        <!-- 表单 -->
        <div class="form-filter">

          <!-- 表单-header-->
          <div class="form-filter-header">
            <div v-if="this.isEdit">
              <svg-icon icon-class="edit" />
              <span>编辑{{name}}</span>
            </div>
            <div v-else>
              <svg-icon icon-class="add" />
              <span>新增{{name}}</span>
              <div class="table-filter-header-search">
                <el-button size="mini"
                           icon="double_arrow_up"
                           v-model="isShowFilter"
                           v-show="isShowFilter"
                           v-if="isShowFilterContent"
                           @click="toggleFilter">
                  <!-- <i class="icon iconfont el-icon-z045"></i> -->
                  <svg-icon icon-class="double_arrow_up"
                            style="font-size:12px" /> {{filterClose}}</el-button>
                <el-button size="mini"
                           v-model="isShowFilter"
                           v-show="!isShowFilter"
                           v-if="isShowFilterContent"
                           @click="toggleFilter">
                  <svg-icon icon-class="double_arrow_down"
                            style="font-size:12px" /> {{filterOpen}}</el-button>
                <!-- <el-button size="mini"
                   class="table-filter-header-search-advanced"
                   @click="openFilterAdvanced($event)">高级检索</el-button> -->
              </div>
            </div>

          </div>

          <!-- 表单-form -->
          <el-collapse-transition>
            <div class="form-content"
                 v-show="isShowFilter">
              <slot name="form"></slot>
            </div>
          </el-collapse-transition>

        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>
<script>
export default {
  name: 'ComponentForm',
  data() {
    return {
      // 是否显示“筛选查询” 默认显示：true
      isShowFilter: true
    }
  },
  created() {},
  props: {
    // true:编辑页面 false:新增页面
    isEdit: {
      Boolean,
      default: true
    },
    // 页面名称
    name: {
      type: String,
      default: ''
    },
    // 展开筛选
    filterOpen: {
      type: String,
      default: ''
    },
    // 收起筛选
    filterClose: {
      type: String,
      default: ''
    },
    // 是否显示展开按钮，默认false
    isShowFilterContent: {
      Boolean,
      default: false
    }
  },
  methods: {
    toggleFilter() {
      // 切换筛选展开/收起
      this.isShowFilter = !this.isShowFilter
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/styles/smart-ui/smart-ui.scss';
</style>
