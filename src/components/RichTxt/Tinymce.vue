<template>
  <div class="tinymce-gallery"
       :class="{fullscreen:isFullscreen}"
       style="position:relative">
    <textarea :id="id"
              :value="value"></textarea>

    <!-- 右侧按钮 -->
    <div class="tinymce-gallery-buttons">
      <el-button class="tinymce-gallery-button markdown-button"
                 type="primary"
                 circle
                 @click="visibleMarkGrammar=true">?
                 <!-- icon="el-icon-question" -->
      </el-button>
      <el-button class="tinymce-gallery-buttons-button"
                 type="info"
                 plain
                 @click="dialogVisible2=true;toHtml()">MarkDown预览
      </el-button>
      <el-button v-if="gallery"
                 class="tinymce-gallery-buttons-button"
                 type="info"
                 plain
                 @click="visibleGallery=true">图片库
      </el-button>
      <el-button class="tinymce-gallery-buttons-button"
                 type="info"
                 plain
                 @click="clearContent">清空
      </el-button>
    </div>

    <!-- 图片库 -->
    <vue-dialog :visible="visibleGallery"
                width="80%"
                top="5vh"
                title="图片库"
                type="PhotoGallery"
                :pic-list="galleryData.list"
                :page-size="8"
                @closeHandler="visibleGallery=false"
                @confirmHandler="confirmHandler"></vue-dialog>

    <!-- MarkDown -->
    <el-dialog title="MarkDown 语法"
               :visible.sync="visibleMarkGrammar"
               width="80%">
      <img class="markdown"
           src="~@/assets/markdown.jpg">
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="visibleMarkGrammar = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Html Test"
               :visible.sync="dialogVisible2"
               width="80%">
      <span id="html-test"></span>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="dialogVisible2 = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
// Import TinyMCE
import tinymce from 'tinymce/tinymce';
import VueDialog from '@/components/Dialog/VueDialog';

// A theme is also required
import 'tinymce/themes/modern/theme';

// Any plugins you want to use has to be imported
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/autosave';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/codesample';
import 'tinymce/plugins/contextmenu';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/imagetools';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/link';
import 'tinymce/plugins/media';
import 'tinymce/plugins/noneditable';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/print';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/tabfocus';
import 'tinymce/plugins/template';
import 'tinymce/plugins/textpattern';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/bbcode';
import 'tinymce/plugins/code';
import 'tinymce/plugins/colorpicker';
import 'tinymce/plugins/directionality';
import 'tinymce/plugins/fullpage';
import 'tinymce/plugins/help';
import 'tinymce/plugins/image';
import 'tinymce/plugins/importcss';
import 'tinymce/plugins/legacyoutput';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/pagebreak';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/save';
import 'tinymce/plugins/spellchecker';
import 'tinymce/plugins/table';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/toc';
import 'tinymce/plugins/visualchars';

import 'tinymce/skins/lightgray/skin.min.css';

// Import showdown
import showdown from 'showdown';

export default {
  components: { VueDialog },
  props: {
    // 是否显示图片库
    gallery: {
      type: Boolean,
      default: false
    },
    // 富文本规格
    tinyOpt: {
      type: Object,
      default: function() {
        return { height: 350 };
      }
    },
    // id
    id: {
      type: String,
      required: false,
      default: 'tinymce'
    },
    // 富文本内容 - 完整标签
    value: { type: String, default: '' },
    htmlClass: { default: '', type: String },
    // 插件
    plugins: {
      default: function() {
        return [];
      },
      type: Array
    },
    other_options: {
      type: Object,
      default: function() {
        return {};
      }
    },
    // 是否只读
    readonly: { type: Boolean, default: false },
    // 类型
    type: {
      type: String,
      default: ''
    },
    // 图片库原始数据
    galleryData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // 富文本内容 - 编辑区
      content: '',
      editor: null,
      cTinyMce: null,
      checkerTimeout: null,
      // 是否正在输入
      isTyping: false,
      // 是否全屏 -> 顶部右侧按钮定位（非全屏：position；全屏：fixed）
      isFullscreen: false,
      // 弹窗 - 图片库
      visibleGallery: false,
      // 弹窗 - markDown语法
      visibleMarkGrammar: false,
      dialogVisible2: false,
      markDownValue: ''
    };
  },
  mounted() {
    this.content = this.value;
    this.init();
  },
  beforeDestroy() {
    this.editor.destroy();
    // try {
    //   this.editor.destroy();
    // } catch (e) {
    //   console.error(e);
    // }
  },
  watch: {
    $route(to, from) {
      this.init();
    },
    value: function(newValue) {
      if (!this.isTyping) {
        this.content = newValue;
        // try {
        //   if (this.hasOwnProperty('editor')) {
        //     this.editor.setContent(this.content);
        //   }
        // } catch (e) {
        //   console.error(e);
        // }
      }
    },
    readonly(value) {
      if (value) {
        this.editor.setMode('readonly');
      } else {
        this.editor.setMode('design');
      }
    }
  },
  methods: {
    init() {
      // 编辑器配置项
      const options = {
        selector: '#' + this.id,
        skin: false,
        // toolbar1: this.toolbar1,
        // toolbar2: this.toolbar2,
        // plugins: this.plugins,
        init_instance_callback: this.initEditor,
        // 编辑区尺寸 - 高度
        height: this.tinyOpt.height,
        // 汉化：部署环境和生产环境的路径不同
        language_url:
          process.env.NODE_ENV === 'development'
            ? document.location.protocol +
              '//' +
              window.location.host +
              '/static/langs/zh_CN.js'
            : document.location.protocol +
              '//' +
              window.location.host +
              process.env.TINYMCE_URL +
              '/static/langs/zh_CN.js',
        // menubar: false,  // 去掉顶部菜单
        branding: false, // 是否显示POWERED BY TINYMCE
        theme: 'modern',
        toolbar_items_size: 'small', // 按钮大小
        // 插件
        plugins: [
          'advlist autolink link image lists charmap print hr anchor pagebreak',
          'searchreplace visualblocks visualchars code fullscreen media nonbreaking',
          'table directionality emoticons textcolor paste textcolor colorpicker textpattern'
        ],
        // 样式
        style_formats: [
          { title: 'Bold', icon: 'bold', format: 'bold' },
          { title: 'Italic', icon: 'italic', format: 'italic' },
          { title: 'Underline', icon: 'underline', format: 'underline' },
          {
            title: 'Strikethrough',
            icon: 'strikethrough',
            format: 'strikethrough'
          },
          { title: 'Superscript', icon: 'superscript', format: 'superscript' },
          { title: 'Subscript', icon: 'subscript', format: 'subscript' },
          { title: 'Code', icon: 'code', format: 'code' }
        ],
        // 顶栏1
        block_formats:
          'Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;',
        // 顶栏2
        toolbar1:
          'insertfile undo redo | formatselect | bullist numlist | link unlink | uploadimg image media | fullscreen',
        // 顶栏3
        toolbar2:
          'styleselect fontsizeselect | forecolor backcolor | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | removeformat'
      };
      // 编辑器初始化
      tinymce.init(this.concatAssciativeArrays(options, this.other_options));
    },
    // 事件监听
    initEditor(editor) {
      this.editor = editor;
      editor.setContent(this.content);
      // KeyUp
      editor.on('KeyUp', e => {
        this.submitNewContent('keyup');
      });
      // Change
      editor.on('Change', e => {
        if (this.editor.getContent() !== this.value) {
          this.submitNewContent('keyup');
        }
      });
      // FullscreenStateChanged
      editor.on('FullscreenStateChanged', e => {
        this.isFullscreen = e.state;
      });
      // init
      editor.on('init', e => {
        editor.setContent(this.content);
        this.$emit('input', this.content);
      });
      // 如果只读
      if (this.readonly) {
        this.editor.setMode('readonly');
      } else {
        this.editor.setMode('design');
      }
      this.$emit('editorInit', editor);
    },
    // 对 options 和 other_options 进行数据处理
    concatAssciativeArrays(array1, array2) {
      if (array2.length === 0) return array1;
      if (array1.length === 0) return array2;
      const dest = [];
      for (const key in array1) dest[key] = array1[key];
      for (const key in array2) dest[key] = array2[key];
      return dest;
    },
    submitNewContent(eventType) {
      this.isTyping = true;
      if (this.checkerTimeout !== null) clearTimeout(this.checkerTimeout);
      this.checkerTimeout = setTimeout(() => {
        this.isTyping = false;
        this.$emit(eventType, this.editor.getContent());
        // console.log(eventType);
      }, 300);
    },
    // 清空内容
    clearContent() {
      tinymce.activeEditor.setContent('');
      this.submitNewContent('keyup');
    },
    // 图片库按钮 - 确认
    confirmHandler(params) {
      this.visibleGallery = false;
      let picSelectedList = '';
      params.galleryList.forEach(pic => {
        picSelectedList += '<img src=' + pic.uploadLocalUrl + '>';
      });
      tinymce.execCommand('mceInsertContent', false, picSelectedList);
      this.submitNewContent('keyup');
    },
    // markdown -> html
    toHtml() {
      this.$nextTick(() => {
        var MarkdownContent = tinymce.activeEditor.getContent();
        // console.log(MarkdownContent);
        // 去掉标签
        var transMessageContent = MarkdownContent.replace(/<\/?.+?>/g, '');
        var afterMessageContent = transMessageContent.replace(/ /g, '');
        console.log(afterMessageContent);
        // 转化成html
        const converter = new showdown.Converter();
        // console.log(converter.makeHtml(afterMessageContent));
        document.getElementById('html-test').innerHTML = converter.makeHtml(
          afterMessageContent
        );
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tinymce-gallery /deep/ {
  .tinymce-gallery-buttons {
    position: absolute;
    top: 5px;
    right: 5px;
    &-button {
      position: relative;
      height: 25px;
      margin-left: 0;
      padding: 5px 15px;
      span {
        display: inline-block;
        margin: auto;
      }
    }
  }
  .mce-fullscreen {
    z-index: 2000;
  }
}

.el-dialog__wrapper /deep/ {
  .el-dialog__body {
    padding: 10px 0 0 0;
  }
  .markdown {
    width: 100%;
  }
  #html-test {
    padding: 0 20px;
    display: inline-block;
    min-width: 100%;
    max-width: 100%;
    min-height: 400px;
    max-height: 600px;
    resize: none;
    border: 0;
  }
}

.markdown-button /deep/ {
  padding: 5px 8px;
}

.fullscreen {
  .tinymce-gallery-buttons {
    z-index: 2000;
    position: fixed;
  }
  .el-dialog__wrapper {
    z-index: 10000;
  }
}
</style>
