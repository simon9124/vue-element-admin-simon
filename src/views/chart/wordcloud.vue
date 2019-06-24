<template>
  <div class="container">

    <!-- 页内容 -->
    <div class="content">
      <!-- 表格 -->
      <div class="content-spe">
        <p class="content-spe-title">{{ $t('route.chartWordcloud') }}</p>

        <div class="content-spe-element">
          <ve-wordcloud :data="chartData"></ve-wordcloud>
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
        columns: ['word', 'count'],
        rows: getRows()
      }
    };
  }
};

function getRows() {
  return [
    {
      word: 'visualMap',
      count: 22199
    },
    {
      word: 'continuous',
      count: 10288
    },
    {
      word: 'contoller',
      count: 620
    },
    {
      word: 'series',
      count: 274470
    },
    {
      word: 'gauge',
      count: 12311
    },
    {
      word: 'detail',
      count: 1206
    },
    {
      word: 'piecewise',
      count: 4885
    },
    {
      word: 'textStyle',
      count: 32294
    },
    {
      word: 'markPoint',
      count: 18574
    },
    {
      word: 'pie',
      count: 38929
    },
    {
      word: 'roseType',
      count: 969
    },
    {
      word: 'label',
      count: 37517
    },
    {
      word: 'emphasis',
      count: 12053
    },
    {
      word: 'yAxis',
      count: 57299
    },
    {
      word: 'name',
      count: 15418
    },
    {
      word: 'type',
      count: 22905
    },
    {
      word: 'gridIndex',
      count: 5146
    },
    {
      word: 'normal',
      count: 49487
    },
    {
      word: 'itemStyle',
      count: 33837
    },
    {
      word: 'min',
      count: 4500
    },
    {
      word: 'silent',
      count: 5744
    },
    {
      word: 'animation',
      count: 4840
    },
    {
      word: 'offsetCenter',
      count: 232
    },
    {
      word: 'inverse',
      count: 3706
    },
    {
      word: 'borderColor',
      count: 4812
    },
    {
      word: 'markLine',
      count: 16578
    },
    {
      word: 'line',
      count: 76970
    },
    {
      word: 'radiusAxis',
      count: 6704
    },
    {
      word: 'radar',
      count: 15964
    },
    {
      word: 'data',
      count: 60679
    },
    {
      word: 'dataZoom',
      count: 24347
    },
    {
      word: 'tooltip',
      count: 43420
    },
    {
      word: 'toolbox',
      count: 25222
    },
    {
      word: 'geo',
      count: 16904
    },
    {
      word: 'parallelAxis',
      count: 4029
    }
  ];
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/smart-ui/smart-ui.scss";
</style>
