<template>
  <div class="container">

    <!-- 页内容 -->
    <div class="content">
      <!-- 表格 -->
      <div class="content-spe">
        <p class="content-spe-title">{{ $t('route.chartLiquidfill') }}</p>

        <div class="content-spe-element">
          <ve-liquidfill :data="chartData"
                         :settings="chartSettings"></ve-liquidfill>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    this.chartSettings = {
      wave: [0.5, 0.3, 0.1],
      seriesMap: {
        上海: {
          color: ['red', 'green', 'yellow']
        }
      }
    };
    return {
      chartData: {
        columns: ['city', 'percent'],
        rows: [
          {
            city: '上海',
            percent: 0.7
          }
        ]
      }
    };
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/smart-ui/smart-ui.scss";
</style>
