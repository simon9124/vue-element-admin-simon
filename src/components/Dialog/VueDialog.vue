<!--公用组件：Dialog弹出窗口组件
/**
  * 弹窗参数：
  * @title    弹出窗口表头  require:false   default:'上传组件'
  * @visible  是否显示弹窗  require:false   default:false 不显示
  * @width    弹窗宽度     require:false   default:'50%'
  * @type     弹窗类别     require:false    default:'UploadExcel'  UploadExcel/PhotoGallery:Excel上传/图片库
  * 上传组件参数:
  * @uploadResult Excel上传结果 require:false default:''
  *
  * Event-Dialog:
  * @openHandler    弹窗弹出回调
  * @closeHandler   关闭按钮回调
  * @confirmHandler 确认按钮回调  return {visable: this.isVisable, galleryList:this.galleryList}
  * Event-Upload:
  * @httpRequestHandler 上传请求 param:{param:{file}, upload组织对象}
**/
-->
<template>
  <el-dialog :title="title"
             :visible.sync="visible"
             :before-close="closeHandler"
             :width="width"
             @open="openHandler"
             custom-class="dialog"
             element-loading-text="数据加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)"
             v-loading="loading"
             top="20vh">

    <div type='PhotoGallery'>
      <Gallery :visible="visible"
               :type="type"
               :picList="picList"
               :galleryList="galleryList"
               @picClickHander="picClickHander"></Gallery>
    </div>
    <!-- <div v-if="type == 'UploadExcel'">
      <uploadExcel :uploadResult="uploadResult"
                   @httpRequestHandler="httpRequestHandler"></uploadExcel>
    </div>
    <div v-else-if="type == 'PhotoGallery'">
      <Gallery :visible="visible"
               :type="type"
               :galleryList="galleryList"
               @picClickHander="picClickHander"></Gallery>
    </div>
    <div v-else-if="type == 'Script'">
      <ScriptList :visible="visible"
                  :type="type"
                  :galleryList="galleryList"
                  @picClickHander="picClickHander"></ScriptList>
    </div>
    <div v-else-if="type == 'ScriptCreate'">
      <ScriptCreate :visible="visible"
                    :type="type"
                    :galleryList="galleryList"
                    @picClickHander="picClickHander"></ScriptCreate>
    </div>
    <div v-else-if="type == 'ScriptFilter'">
      <ScriptFilter :visible="visible"
                    :type="type"
                    :galleryList="galleryList"
                    @picClickHander="picClickHander"></ScriptFilter>
    </div>
    <div v-else-if="type == 'HtmlTest'">
      <HtmlTest :visible="visible"
                :type="type"
                :galleryList="galleryList"
                @picClickHander="picClickHander"></HtmlTest>
    </div> -->

    <!-- footer -->
    <span slot="footer"
          class="dialog-footer"
          v-if="type !== 'ScriptCreate'">
      <el-button @click="this.closeHandler">取 消</el-button>
      <el-button type="primary"
                 @click="this.confirmHandler">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
// import UploadExcel from './UploadExcel'
import Gallery from '../Gallery/Gallery'
// import ScriptList from './Script'
// import ScriptCreate from './ScriptCreate'
// import ScriptFilter from './ScriptFilter'
// import HtmlTest from './HtmlTest'

export default {
  name: 'vue-dialog',
  components: {
    // UploadExcel,
    Gallery
    // ScriptList,
    // ScriptCreate,
    // ScriptFilter,
    // HtmlTest
  },
  props: {
    // 标题
    title: {
      String,
      default: '提示'
    },
    // 控件是否可见
    visible: {
      Boolean,
      default: false
    },
    // 组件类型
    type: {
      String,
      // required: true,
      default: 'UploadExcel'
    },
    // loading
    loading: {
      Boolean,
      default: false
    },
    // 数据列表 - 图片库
    picList: {
      type: Array,
      default: () => []
    },
    // Excel 上传结果
    uploadResult: {
      String,
      default: ''
    },
    // 弹窗宽度
    width: {
      String,
      default: '60%'
    }
  },
  watch: {
    visible(value) {
      // console.debug('watch %s', value)
    }
  },
  data() {
    return {
      // gallery选中的内容
      galleryList: []
    }
  },
  methods: {
    openHandler() {
      // 弹窗dialog回调
      this.$emit('openHandler', this.isVisable)
    },
    closeHandler() {
      // 确认按钮回调
      this.$emit('closeHandler', this.isVisable)
    },
    confirmHandler() {
      // 确认按钮回调
      // console.debug(this.galleryList)
      this.$emit('confirmHandler', {
        visable: this.isVisable,
        galleryList: this.galleryList
      })
    },
    httpRequestHandler(param) {
      // 上传请求回调
      this.$emit('httpRequestHandler', param)
    },
    picClickHander(selectList) {
      this.galleryList = selectList
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
