<template>
  <div class="container">

    <!-- 页内容 -->
    <div class="content">
      <!-- 表格 -->
      <div class="content-spe">
        <p class="content-spe-title">{{ $t('route.mapSearch') }}</p>

        <div class="content-spe-element">

          <baidu-map class="bm-view"
                     :scroll-wheel-zoom="true"
                     :center="city">

            <!-- 搜索框 -->
            <bm-control :offset="{width: '10px', height: '10px'}">
              <bm-auto-complete v-model="keyword"
                                :sug-style="{zIndex: 1}">
                <el-input placeholder="请输入地址"
                          v-model="keyword"
                          clearable
                          class="map-search-input">
                  <el-button class="map-search-button"
                             slot="append"
                             type="primary"
                             icon="el-icon-search"></el-button>
                </el-input>
              </bm-auto-complete>
            </bm-control>

            <!-- 搜索结果 -->
            <bm-local-search :keyword="keyword"
                             :auto-viewport="true"
                             class="map-search-result"
                             @searchcomplete="searchcomplete"></bm-local-search>
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
      city: '北京',
      // 检索框
      keyword: ''
    };
  },
  methods: {
    searchcomplete(results) {
      console.log(results);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/smart-ui/smart-ui.scss";
.bm-view /deep/ {
  width: 100%;
  height: 400px;
  min-height: calc(100vh - 260px);
  position: relative;
  .map-search-input {
    width: 350px;
    position: absolute;
    top: 10px;
    left: 10px;
    display: table;
    .el-input-group__append {
      background: #409eff;
      color: #fff;
      border: 0;
      padding: 0 15px;
    }
  }
  .map-search-result {
    position: absolute;
    top: 50px;
    left: 10px;
    width: 304px;
    max-height: calc(100vh - 430px);
    & > div {
      max-height: calc(100vh - 430px);
      & > div {
        max-height: calc(100vh - 455px);
        & > ol {
          max-height: calc(100vh - 455px);
          overflow-x: auto;
        }
      }
    }
  }
}
.bm-view /deep/.map-search-result > div > div > ol::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px #dbdada;
}
.bm-view /deep/.map-search-result > div > div > ol::-webkit-scrollbar-thumb {
  background: #cccccc;
}
.bm-view /deep/.map-search-result > div > div > ol::-webkit-scrollbar {
  width: 5px;
}
</style>
