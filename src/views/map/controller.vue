<template>
  <div class="container">

    <!-- 页内容 -->
    <div class="content">
      <!-- 表格 -->
      <div class="content-spe">
        <p class="content-spe-title">{{ $t('route.mapController') }}</p>

        <div class="content-spe-element">

          <el-form ref="filterFormData"
                   :inline="true"
                   label-width="120px"
                   class="demo-form-inline"
                   @submit.native.prevent>
            <el-form-item>
              <el-switch v-model="overview"
                         active-text="缩略图展开"
                         inactive-text="缩略图收起">
              </el-switch>
            </el-form-item>
            <el-form-item>
              <el-switch v-model="maptype"
                         active-text="地图类型 "
                         inactive-text="城市列表"
                         active-color="#E6A23C"
                         inactive-color="#67C23A">
              </el-switch>
            </el-form-item>
            <el-form-item>
              <el-switch v-model="geolocation"
                         active-text="定位 "
                         inactive-text="全景"
                         active-color="#E6A23C"
                         inactive-color="#67C23A">
              </el-switch>
            </el-form-item>
            <el-form-item>
              <bm-control>
                <el-button @click="openDistanceTool"
                           type="primary">开启测距</el-button>
              </bm-control>
            </el-form-item>
          </el-form>

          <baidu-map class="bm-view"
                     :center="center"
                     :scroll-wheel-zoom="true"
                     :zoom="16"
                     @click="mapClick"
                     @ready="setDistanceToolInstance">

            <!-- 比例尺 -->
            <bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>

            <!-- 缩放 -->
            <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-navigation>
            <!-- type="BMAP_NAVIGATION_CONTROL_ZOOM" -->

            <!-- 缩略图 -->
            <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_LEFT"
                             :is-open="overview"
                             @viewchanged="viewchanged"></bm-overview-map>

            <!-- 地图类型 -->
            <bm-map-type v-if="maptype"
                         :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
                         anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>

            <!-- 城市列表 -->
            <bm-city-list v-else
                          anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>

            <!-- 定位 -->
            <bm-geolocation v-if="geolocation"
                            anchor="BMAP_ANCHOR_TOP_RIGHT"
                            :auto-location="true"
                            @locationSuccess="locationSuccess"></bm-geolocation>

            <!-- 全景 -->
            <bm-panorama v-else></bm-panorama>

          </baidu-map>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import DistanceTool from 'bmaplib.distancetool';

export default {
  data() {
    return {
      // 默认地图中心
      center: '北京',
      // 缩略图默认展开与否
      overview: false,
      // 地图类型 or 城市列表 -> true or false
      maptype: false,
      // 地图类型 or 城市列表 -> true or false
      geolocation: false
    };
  },
  unmount() {
    const { distanceTool } = this;
    distanceTool && distanceTool.close();
  },
  methods: {
    // 左键单击地图
    mapClick(type) {
      console.log(type);
    },
    // 缩略地图状态发生变化后
    viewchanged(type) {
      console.log(type);
    },
    // 定位成功后
    locationSuccess(point) {
      console.log(point);
      this.getResultMessage(
        true,
        `当前定位：${point.addressComponent.province}，${
          point.addressComponent.city
        }`
      );
    },
    // 开启测距功能
    openDistanceTool(e) {
      const { distanceTool } = this;
      distanceTool && distanceTool.open();
    },
    // 显示测距结果
    setDistanceToolInstance({ map }) {
      this.distanceTool = new DistanceTool(map, { lineStroke: 2 });
    },
    // 回显message数据
    getResultMessage(type, text) {
      this.$message({
        message: text,
        type: type === true ? 'success' : 'warning'
      });
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
