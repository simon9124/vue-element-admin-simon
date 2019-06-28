<template>
  <div class="container">

    <!-- 页内容 -->
    <div class="content">
      <!-- 表格 -->
      <div class="content-spe">
        <p class="content-spe-title">{{ $t('route.mapTile') }}</p>

        <div class="content-spe-element">

          <el-form ref="filterFormData"
                   :inline="true"
                   label-width="140px"
                   class="demo-form-inline"
                   @submit.native.prevent>
            <el-form-item label="清华校园微观图：">
              <el-switch v-model="showTilePng"
                         active-text="切换"
                         inactive-text="还原"
                         @change="toggleTilePng(showTilePng)">
              </el-switch>
            </el-form-item>
            <el-form-item label="交通路况图：">
              <el-switch v-model="showTrafficPng"
                         active-text="显示"
                         inactive-text="隐藏">
              </el-switch>
            </el-form-item>
            <el-form-item label="热力图：">
              <el-switch v-model="showHeatmap"
                         active-text="显示"
                         inactive-text="隐藏"
                         @change="toggleHeatmap(showHeatmap)">
              </el-switch>
            </el-form-item>
          </el-form>

          <baidu-map class="bm-view"
                     :center="center"
                     :scroll-wheel-zoom="true"
                     :zoom="zoom"
                     @click="mapClick">

            <!-- 缩放 -->
            <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-navigation>

            <!-- 清华校园微观图 -->
            <bm-tile v-if="showTilePng"
                     :is-transparent-png="true"
                     :tile-url-template="tileUrlTemplate">
            </bm-tile>

            <!-- 交通路况 -->
            <bm-traffic v-if="showTrafficPng"
                        :predict-date="{weekday: 7, hour: 12}">
            </bm-traffic>

            <!-- 热力图 -->
            <bml-heatmap v-if="showHeatmap"
                         :data="heatData"
                         :max="100"
                         :radius="20">
            </bml-heatmap>

          </baidu-map>

        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { BmlHeatmap } from 'vue-baidu-map';

export default {
  components: {
    BmlHeatmap
  },
  data() {
    return {
      // 默认地图中心
      center: '北京',
      // 默认地图缩放比
      zoom: 12,
      // 瓦片图层显示与否 - 清华校园微观图
      showTilePng: false,
      // 瓦片图层网址模板 - 清华校园微观图
      tileUrlTemplate:
        '//lbsyun.baidu.com/jsdemo/demo/tiles/{Z}/tile{X}_{Y}.png',
      // 瓦片图层显示与否 - 交通路况
      showTrafficPng: false,
      // 热力图显示与否
      showHeatmap: false,
      // 热力图数据
      heatData: [
        { lng: 116.405231, lat: 39.911368, count: 81 },
        { lng: 116.408261, lat: 39.911984, count: 100 },
        { lng: 116.409787, lat: 39.910658, count: 15 },
        { lng: 116.407392, lat: 39.916532, count: 51 },
        { lng: 116.405479, lat: 39.914703, count: 72 }
      ]
    };
  },
  created() {
    this.centerOrg = this.center;
    this.zoomOrg = this.zoom;
  },
  methods: {
    // 左键单击地图
    mapClick(type) {
      console.log(type);
    },
    // switch切换瓦片图显示
    toggleTilePng(showTilePng) {
      if (showTilePng === true) {
        this.center = { lng: 116.332782, lat: 40.007978 };
        this.zoom = 16;
      } else {
        this.center = this.centerOrg;
        this.zoom = this.zoomOrg;
      }
    },
    // switch切换热力图显示
    toggleHeatmap(showHeatmap) {
      if (showHeatmap === true) {
        this.center = { lng: 116.404, lat: 39.915 };
        this.zoom = 14;
      } else {
        this.center = this.centerOrg;
        this.zoom = this.zoomOrg;
      }
    }
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
