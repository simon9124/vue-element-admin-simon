<template>
  <div class="container">

    <!-- 页内容 -->
    <div class="content">
      <!-- 表格 -->
      <div class="content-spe">
        <p class="content-spe-title">{{ $t('route.chartFunnel') }}</p>

        <div class="content-spe-element">
          <ve-funnel :data="chartData"
                     :settings="chartSettings"></ve-funnel>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    this.chartSettings = {
      sequence: ['订单', '点击', '访问', '展示']
    };
    return {
      chartData: {
        columns: ['状态', '数值'],
        rows: [
          { 状态: '展示', 数值: 900 },
          { 状态: '访问', 数值: 600 },
          { 状态: '点击', 数值: 300 },
          { 状态: '订单', 数值: 100 }
        ]
      }
    };
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/smart-ui/smart-ui.scss";
</style>
