<template>
  <div class="container">

    <!-- 页内容 -->
    <div class="content">
      <!-- 表格 -->
      <div class="content-spe">
        <p class="content-spe-title">{{ $t('route.tinymce') }}</p>
        <div class="content-spe-element">

          <!-- 富文本内容：{{ richTxtContent }} -->

          <!-- 参数 -->
          <el-row style="margin-bottom:20px">
            <el-checkbox v-model="gallery">图片库</el-checkbox>
            <el-checkbox v-model="markdown">Markdown</el-checkbox>
            <el-checkbox v-model="readonly">只读</el-checkbox>
          </el-row>

          <!-- 富文本 -->
          <Tinymce :gallery="gallery"
                   :markdown="markdown"
                   :readonly="readonly"
                   :tiny-opt="tinyOpt"
                   width-gallery="70%"
                   width-mark-down="50%"
                   :gallery-data="galleryData"
                   :value="richTxtContent"
                   @keyup="tinymceHandler"></Tinymce>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
// component
import Tinymce from "@/components/Editors/Tinymce/Tinymce";
// api
import { getPhotoList } from "@/api/componentLibrary/gallery.js";

export default {
  name: "RichTxtTinymce",
  components: { Tinymce },
  data() {
    return {
      // 是否显示图片库
      gallery: true,
      // 是否显示Markdown
      markdown: true,
      // 是否只读
      readonly: false,
      // 富文本规格
      tinyOpt: {
        height: 300
      },
      // 富文本内容 - 带标签
      richTxtContent: "",
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
