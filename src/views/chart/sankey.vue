<template>
  <div class="container">

    <!-- 页内容 -->
    <div class="content">
      <!-- 表格 -->
      <div class="content-spe">
        <p class="content-spe-title">{{ $t('route.chartSankey') }}</p>

        <div class="content-spe-element">
          <ve-sankey :data="chartData"
                     :settings="chartSettings"></ve-sankey>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    this.chartSettings = {
      links: [
        { source: '首页', target: '列表页a', value: 0.5 },
        { source: '首页', target: '列表页b', value: 0.5 },
        { source: '列表页a', target: '内容页a-1', value: 0.1 },
        { source: '列表页a', target: '内容页a-2', value: 0.4 },
        { source: '列表页b', target: '内容页b-1', value: 0.2 },
        { source: '列表页b', target: '内容页b-2', value: 0.3 }
      ]
    };
    return {
      chartData: {
        columns: ['页面', '访问量'],
        rows: [
          { 页面: '首页', 访问量: 100000 },
          { 页面: '列表页a', 访问量: 20000 },
          { 页面: '列表页b', 访问量: 80000 },
          { 页面: '内容页a-1', 访问量: 10000 },
          { 页面: '内容页a-2', 访问量: 10000 },
          { 页面: '内容页b-1', 访问量: 60000 },
          { 页面: '内容页b-2', 访问量: 20000 }
        ]
      }
    };
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/smart-ui/smart-ui.scss";
</style>
