<template>
  <div class="container">

    <!-- 页内容 -->
    <div class="content">
      <!-- 表格 -->
      <div class="content-spe">
        <p class="content-spe-title">{{ $t('route.tinymce') }}</p>
        <div class="content-spe-element">

          富文本内容：{{ richTxtContent }}
          <!-- :tiny-opt="tinyOpt" -->
          <Tinymce id="tinymce2"
                   type="PhotoGallery"
                   :gallery-data="galleryData"
                   :value="richTxtContent"
                   @keyup="tinymceHandler"></Tinymce>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// 开发替换引用
import Tinymce from '@/components/RichTxt/Tinymce';
// api
import { getPhotoList } from '@/api/componentLibrary/gallery.js';

export default {
  name: 'RichTxtTinymce',
  components: { Tinymce },
  data() {
    return {
      // 开发替换真实数据
      richTxtContent: '带图片组件封装',
      // 富文本规格
      tinyOpt: {
        height: 300
      },
      // 图片库原始数据
      galleryData: {}
    };
  },
  created() {
    this.getPhotoList();
  },
  methods: {
    // 获取数据
    async getPhotoList() {
      this.galleryData = (await getPhotoList()).data.galleryData;
    },
    // 富文本内容改变
    tinymceHandler(content) {
      this.richTxtContent = content;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/smart-ui/smart-ui.scss";
</style>
