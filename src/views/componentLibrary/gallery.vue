<template>
  <div class="container">

    <!-- 页内容 -->
    <div class="content">
      <!-- 表格 -->
      <div class="content-spe">
        <p class="content-spe-title">{{ $t('route.gallery') }}</p>
        <div class="content-spe-element">

          <el-button type="text"
                     @click="openDialog">点击打开图片库</el-button>
          <vue-dialog :visible="visible"
                      title="图片库"
                      width="80%"
                      type="PhotoGallery"
                      :pic-list="galleryData.list"
                      @closeHandler="visible=false"
                      @picDelHandler="picDelHandler"
                      @picsDelHandler="picsDelHandler"
                      @insertFavor="insertFavor"
                      @deleteFavor="deleteFavor"
                      @picReName="picReName"
                      @picsUpload="picsUpload"
                      @confirmHandler="confirmHandler"></vue-dialog>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
// components
import VueDialog from '@/components/Dialog/VueDialog';
// api
import { getPhotoList, deletePhoto, updatePhoto } from '@/api/gallery.js';
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
    };
  },
  created() {
    this.getPhotoList();
  },
  methods: {
    // 打开dialog弹框
    openDialog() {
      this.visible = true;
    },
    // 获取数据
    async getPhotoList() {
      this.galleryData = (await getPhotoList()).data.galleryData;
    },
    // 删除单张图片
    async picDelHandler(pic) {
      const res = await this.$confirm('确定删除该图片？', '提示', {
        type: 'warning'
      }).catch(() => {});
      if (res === 'confirm') {
        // 前端虚拟删除操作 -> 根据pic的下标删除该pic
        const resultMessage = (await deletePhoto(pic.uploadCode)).data.message;
        const index = this.galleryData.list.indexOf(pic);
        this.galleryData.list.splice(index, 1);
        this.getResultMessage(resultMessage);
      }
    },
    // 批量删除图片
    async picsDelHandler(selectList) {
      const res = await this.$confirm('确认删除？', '提示', {
        type: 'warning'
      }).catch(() => {});
      if (res === 'confirm') {
        // 前端虚拟批量删除操作 -> 给selectList里的每个pic做单独删除
        selectList.forEach(async pic => {
          await deletePhoto(pic.uploadCode);
          const index = this.galleryData.list.indexOf(pic);
          this.galleryData.list.splice(index, 1);
        });
        this.getResultMessage('删除成功！');
      }
    },
    // 重命名图片
    async picReName(pic) {
      const resultMessage = (await updatePhoto(pic.uploadCode)).data.message;
      this.$set(pic, 'uploadName', pic.uploadName);
      this.getResultMessage(resultMessage);
    },
    // 用户收藏
    async insertFavor(pic) {
      const resultMessage = (await updatePhoto(pic.uploadCode)).data.message;
      this.$set(pic, 'uploadIsfavorite', 1);
      this.getResultMessage(resultMessage);
    },
    // 用户取消收藏
    async deleteFavor(pic) {
      const resultMessage = (await updatePhoto(pic.uploadCode)).data.message;
      this.$set(pic, 'uploadIsfavorite', 0);
      this.getResultMessage(resultMessage);
    },
    // 批量上传图片
    picsUpload(files) {
      this.$message({
        message: '在此调用上传接口，f12可查看上传的图片',
        type: 'success'
      });
      console.log(files);
      const form = new FormData();
      form.append('file', files);
      // uploadByType(form)
    },
    // 确认按钮
    confirmHandler(params) {
      this.visible = false;
      this.$message({
        message: '被选中的图片：' + params.galleryList,
        type: 'success'
      });
    },
    // 回显message数据
    getResultMessage(resultMessage) {
      this.$message({
        message: resultMessage,
        type: 'success'
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/smart-ui/smart-ui.scss";
.container /deep/ {
  .el-dialog {
    .el-dialog__body {
      padding: 20px 10px 0 10px;
    }
  }
}
</style>
