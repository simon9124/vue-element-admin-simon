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
             :width="width"
             :top="top"
             :visible.sync="visible"
             :before-close="closeHandler"
             @open="openHandler"
             custom-class="dialog"
             element-loading-text="数据加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)"
             v-loading="loading">

    <!-- 图片库 -->
    <div v-if="type='PhotoGallery'">
      <Gallery :visible="visible"
               :page-size="pageSize"
               :type="type"
               :pic-list-org="picList"
               :gallery-list="galleryList"
               @picDelHandler="picDelHandler"
               @picsDelHandler="picsDelHandler"
               @insertFavor="insertFavor"
               @deleteFavor="deleteFavor"
               @picReName="picReName"
               @picsUpload="picsUpload"
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
      <el-button @click="closeHandler">取 消</el-button>
      <el-button type="primary"
                 @click="confirmHandler">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
// import UploadExcel from './UploadExcel'
import Gallery from '../Gallery/Gallery';
// import ScriptList from './Script'
// import ScriptCreate from './ScriptCreate'
// import ScriptFilter from './ScriptFilter'
// import HtmlTest from './HtmlTest'

export default {
  name: 'VueDialog',
  components: {
    // UploadExcel,
    Gallery
    // ScriptList,
    // ScriptCreate,
    // ScriptFilter,
    // HtmlTest
  },
  props: {
    /*
      公共
    */
    //  Dialog CSS 中的 margin-top 值
    top: {
      type: String,
      default: '15vh'
    },
    // 标题
    title: {
      type: String,
      default: '提示'
    },
    // 弹窗宽度
    width: {
      type: String,
      default: '60%'
    },
    // 弹窗是否可见
    visible: {
      type: Boolean,
      default: false
    },
    // 类型
    type: {
      type: String,
      // required: true,
      default: 'UploadExcel'
    },
    // loading
    loading: {
      type: Boolean,
      default: false
    },

    /*
      图片库
    */
    // 数据列表
    picList: {
      type: Array,
      default: () => []
    },
    // 初始化每页显示数量
    pageSize: {
      type: Number,
      default: 8
    },
    // Excel 上传结果
    uploadResult: {
      type: String,
      default: ''
    }
  },
  watch: {
    visible(value) {
      // console.debug('watch %s', value)
    }
  },
  data() {
    return {
      // 图片list数据 - 被选中的
      galleryList: []
    };
  },
  methods: {
    /*
      公共
    */
    // 弹窗dialog回调
    openHandler() {
      this.$emit('openHandler', this.isVisable);
    },
    // 关闭按钮回调
    closeHandler() {
      this.$emit('closeHandler', this.isVisable);
    },
    // 确认按钮回调
    confirmHandler() {
      this.$emit('confirmHandler', {
        visable: this.isVisable,
        galleryList: this.galleryList
      });
    },
    // 上传请求回调
    httpRequestHandler(param) {
      this.$emit('httpRequestHandler', param);
    },

    /*
      图片库
    */
    // 改变图片选中状态
    picClickHander(selectList) {
      this.galleryList = selectList;
    },
    // 批量删除图片
    picsDelHandler(selectList) {
      this.$emit('picsDelHandler', selectList);
    },
    // 删除单张图片
    picDelHandler(pic) {
      this.$emit('picDelHandler', pic);
    },
    // 重命名图片
    picReName(pic) {
      this.$emit('picReName', pic);
    },
    // 用户收藏
    insertFavor(pic) {
      this.$emit('insertFavor', pic);
    },
    // 用户取消收藏
    deleteFavor(pic) {
      this.$emit('deleteFavor', pic);
    },
    // 批量上传图片
    picsUpload(files) {
      this.$emit('picsUpload', files);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
