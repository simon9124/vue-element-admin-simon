<template>
  <div class="container">

    <!-- 页内容 -->
    <div class="content">
      <!-- 表格 -->
      <div class="content-spe">
        <p class="content-spe-title">{{ $t('route.chartMap') }}</p>

        <div class="content-spe-element">
          <ve-map :data="chartData"></ve-map>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      chartData: {
        columns: ['位置', '税收', '人口', '面积'],
        rows: [
          { 位置: '吉林', 税收: 123, 人口: 123, 面积: 92134 },
          { 位置: '北京', 税收: 1223, 人口: 2123, 面积: 29234 },
          { 位置: '上海', 税收: 2123, 人口: 1243, 面积: 94234 },
          { 位置: '浙江', 税收: 4123, 人口: 5123, 面积: 29234 }
        ]
      }
    };
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/smart-ui/smart-ui.scss";
</style>
