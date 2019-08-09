<template>
  <codemirror :value="code"
              :options="editorOption"
              ref="myEditor"
              @change="change">
  </codemirror>
</template>

<script>
import { codemirror } from "vue-codemirror-lite";
import "./import.js";

export default {
  components: {
    codemirror
  },
  props: {
    // 编辑区内容
    code: {
      type: String,
      default: ""
    },
    // 切换后的主题
    theme: {
      type: String,
      default: "rubyblue"
    },
    // 切换后的语言
    mode: {
      type: String,
      default: "text/javascript"
    }
  },
  data() {
    return {
      // 配置项
      editorOption: {
        mode: "text/javascript", // 语言
        theme: "rubyblue", // 主题
        extraKeys: { "Ctrl-Space": "autocomplete" }, // 快捷键
        autoCloseBrackets: true, // 自动闭合括号
        autofocus: true, // 初始时自动获取焦点
        styleActiveLine: true, // 光标所在行高亮
        tabSize: 2, // tab的空格宽度
        smartIndent: true, // 自动缩进
        lineNumbers: true, // 显示行号
        line: true,
        lineWrapping: true, //代码折叠
        cursorHeight: 0.85, // 光标高度
        lint: true, // 代码检查
        /* gutters：行号前额外内容 */
        gutters: [
          "CodeMirror-linenumbers", // 行号（不开启会导致行号错乱）
          "CodeMirror-foldgutter", // 展开收缩（暂无效）
          "CodeMirror-lint-markers" // 代码检查（需开启lint）
        ],
        // autoRefresh: true,
        matchBrackets: true, // 括号匹配
        showCursorWhenSelecting: true // 选择时是否显示光标
        // readOnly: 'nocursor' // 只读
      }
    };
  },
  computed: {
    editor() {
      return this.$refs.myEditor.editor;
    }
  },
  mounted() {
    // 挂载时，接受从父组件传来的 node 和 theme
    if (this.theme !== "") {
      this.editor.setOption("theme", this.theme);
    }
    if (this.mode !== "") {
      this.editor.setOption("mode", this.mode);
    }
    // console.log(this.editor);
  },
  methods: {
    // 编辑内容改变 -> 把值传给父组件
    change(code) {
      this.$emit("change", code);
    }
    // 切换主题 - 获取元素并改变其class
    // setThemeClass(theme) {
    //   const CodeMirrorWrap = document.getElementsByClassName("CodeMirror-wrap");
    //   for (var i = 0; i < CodeMirrorWrap.length; i++) {
    //     CodeMirrorWrap[i].attributes[0].nodeValue =
    //       "CodeMirror CodeMirror-wrap ";
    //     CodeMirrorWrap[i].attributes[0].nodeValue += `cm-s-${theme}`;
    //   }
    // },
  },
  watch: {
    /* 切换语言、切换主题，此处不要用this.editorOption.mode = value，必须用内置的构造函数方法才有效 */
    // 从父组件监听主题切换
    theme(val) {
      this.editor.setOption("theme", val);
      // this.setThemeClass(val)
    },
    // 从父组件监听语言切换
    mode(val) {
      this.editor.setOption("mode", val);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.vue-codemirror-wrap /deep/ {
  .CodeMirror {
    min-height: 400px;
    max-height: 600px;
    font-size: 14px;
  }
  // 显示装订线
  .CodeMirror-gutters {
    display: block;
    width: 40px;
  }
  // 编辑区整体左移，去掉因显示装订线产生的留白
  .CodeMirror-line > span {
    padding-left: 0;
  }
  // 代码检查左移，左移到装订线左侧
  .CodeMirror-gutter-elt {
    left: 0 !important;
  }
}
</style>
