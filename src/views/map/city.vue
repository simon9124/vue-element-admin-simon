<template>
  <div class="container">

    <!-- 页内容 -->
    <div class="content">
      <!-- 表格 -->
      <div class="content-spe">
        <p class="content-spe-title">{{ $t('route.mapCity') }}</p>

        <div class="content-spe-element">

          <el-form ref="filterFormData"
                   :inline="true"
                   label-width="120px"
                   class="demo-form-inline"
                   @submit.native.prevent>
            <el-form-item label="省份/城市/区县：">
              <el-input v-model="city"
                        placeholder="请输入省份/城市/区县"></el-input>
            </el-form-item>
          </el-form>
          <baidu-map class="bm-view"
                     :center="city">

          </baidu-map>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      city: '北京'
    };
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/smart-ui/smart-ui.scss";
.bm-view {
  width: 100%;
  height: 400px;
  min-height: calc(100vh - 320px);
}
</style>
