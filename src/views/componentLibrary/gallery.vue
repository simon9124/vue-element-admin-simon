<template>
  <div class="container">

    <!-- 页内容 -->
    <div class="content">
      <!-- 表格 -->
      <div class="content-spe">
        <p class="content-spe-title">{{$t('route.gallery')}}</p>
        <div class="content-spe-element">

          <el-button type="text"
                     @click='openDialog'>点击打开图片库</el-button>
          <vue-dialog :visible="visible"
                      :title='"图片库"'
                      :picList="galleryData.list"
                      :type='"PhotoGallery"'
                      :width='"80%"'
                      @closeHandler="visible=false"
                      @confirmHandler="confirmHandler"></vue-dialog>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
// components
import VueDialog from '@/components/Dialog/VueDialog'
// api
import { getPhotoList } from '@/api/gallery.js'
// import {
//   selectPhotoByPage,
//   // selectFavoritePhotoByPage,
//   insertFavoritePhoto,
//   deleteFavoritePhoto,
//   deletePhotoByCode,
//   deletePhotoByCodeArray,
//   updatePhoto,
//   uploadByType
// } from '../api/PhotoGallery'

export default {
  name: 'Gallery',
  components: { VueDialog },
  data() {
    return {
      // dialog显示与否
      visible: false,
      // 原始数据
      galleryData: {}
    }
  },
  methods: {
    // 获取数据 -> 打开dialog弹框
    async openDialog() {
      this.galleryData = (await getPhotoList()).data.galleryData
      this.visible = true
    },
    confirmHandler(params) {
      // 确认按钮回调
      this.visible = false
      console.debug('confirmHandler: %s', params.galleryList.length)
      console.debug('confirmHandler: %s', params.galleryList.join(','))
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/styles/smart-ui/smart-ui.scss';
</style>
