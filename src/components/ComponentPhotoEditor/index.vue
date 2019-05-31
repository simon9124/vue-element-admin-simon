<template>
  <div>
    <tinymce id="d1"
             v-model="this.remark"
             :other_options="this.height"></tinymce>
    <el-button @click="galleryShow($event)">图片库</el-button>
    <ComponentPhotoGallery></ComponentPhotoGallery>
  </div>
  <!-- @keyup="this.keyupHandler"
           @change="this.changeHandler" -->
</template>

<script>
import ComponentPhotoGallery from '@/components/ComponentPhotoGallery'
import tinymce from ctsi-vue-tinymce

export default {
  name: 'photo-gallery-editor',
  components: { ComponentPhotoGallery, tinymce },
  data() {
    return {
      remark: '',
      height: 300
    }
  },
  methods: {
    
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
