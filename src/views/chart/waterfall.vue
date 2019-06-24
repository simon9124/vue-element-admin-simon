<template>
  <div class="container">

    <!-- 页内容 -->
    <div class="content">
      <!-- 表格 -->
      <div class="content-spe">
        <p class="content-spe-title">{{ $t('route.chartWaterfall') }}</p>

        <div class="content-spe-element">
          <ve-waterfall :data="chartData"></ve-waterfall>
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
        columns: ['活动', '时间'],
        rows: [
          { 活动: '吃饭', 时间: 4 },
          { 活动: '睡觉', 时间: 10 },
          { 活动: '打豆豆', 时间: 5 }
        ]
      }
    };
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/smart-ui/smart-ui.scss";
</style>
