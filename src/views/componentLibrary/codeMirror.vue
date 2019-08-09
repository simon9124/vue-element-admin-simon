<template>
  <div class="container">

    <!-- 页内容 -->
    <div class="content">
      <!-- 表格 -->
      <div class="content-spe">
        <p class="content-spe-title">{{ $t('route.codeMirror') }}</p>
        <div class="content-spe-element">

          <!-- 参数 -->
          <el-row style="margin-bottom:20px">

            language：
            <el-select class="code-mode-select"
                       style="margin-right:10px"
                       v-model="editorOption.mode"
                       @change="changeMode">
              <el-option v-for="mode in modes"
                         :key="mode.value"
                         :label="mode.label"
                         :value="mode.value">
              </el-option>
            </el-select>

            theme：
            <el-select class="code-mode-select"
                       style="margin-right:10px"
                       v-model="editorOption.theme"
                       @change="changeTheme">
              <el-option v-for="mode in themes"
                         :key="mode.value"
                         :label="mode.label"
                         :value="mode.value">
              </el-option>
            </el-select>

            <el-button type="info"
                       plain
                       @click="saveContent">保存</el-button>

          </el-row>

          <!-- 手动控制数据流，需监听changed事件 -->
          <codemirror :value="code"
                      :options="editorOption"
                      ref="myEditor"
                      @change="onCmCodeChange">
          </codemirror>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { codemirror } from "vue-codemirror-lite";
import "./import.js";

export default {
  components: {
    codemirror
  },
  data() {
    return {
      // 编辑区内容
      code: "",
      // 配置项
      editorOption: {
        mode: "text/javascript",
        theme: "rubyblue",
        extraKeys: { "Ctrl-Space": "autocomplete" }, // 快捷键
        autoCloseBrackets: true,
        autofocus: true, // 初始时自动获取焦点
        styleActiveLine: true, // 光标所在行高亮
        tabSize: 2, // tab的空格宽度
        smartIndent: true, // 自动缩进
        lineNumbers: true, // 显示行号
        line: true,
        lineWrapping: "wrap",
        cursorHeight: 0.85, // 光标高度
        lint: true, // 代码检查
        // 行号前额外内容
        gutters: [
          "CodeMirror-linenumbers", // 行号（不开启会导致行号错乱）
          "CodeMirror-foldgutter", // 展开收缩（暂无效）
          "CodeMirror-lint-markers" // 代码检查（需开启lint）
        ],
        // autoRefresh: true,
        matchBrackets: true,
        showCursorWhenSelecting: true,
        scrollbarStyle: null // 滚动条（会报错）
        // readOnly: 'nocursor'
      },
      // 模式选择
      modes: [
        {
          value: "text/html",
          label: "XML/HTML"
        },
        {
          value: "text/css",
          label: "CSS"
        },
        {
          value: "text/javascript",
          label: "Javascript"
        },
        {
          value: "application/json",
          label: "json"
        },
        {
          value: "text/x-vue",
          label: "Vue"
        },
        {
          value: "text/x-sql",
          label: "SQL"
        },
        {
          value: "text/x-java",
          label: "Java"
        },
        {
          value: "text/x-python",
          label: "Python"
        },
        {
          value: "text/x-sh",
          label: "Shell"
        },
        {
          value: "text/markdown",
          label: "Markdown"
        },
        {
          value: "text/x-rsrc",
          label: "R"
        },
        {
          value: "text/x-swift",
          label: "Swift"
        }
      ],
      // 主题选择
      themes: [
        {
          value: "ambiance",
          label: "ambiance"
        },
        {
          value: "base16-dark",
          label: "base16-dark"
        },
        {
          value: "base16-light",
          label: "base16-light"
        },
        {
          value: "blackboard",
          label: "blackboard"
        },
        {
          value: "cobalt",
          label: "cobalt"
        },
        {
          value: "erlang-dark",
          label: "erlang-dark"
        },
        {
          value: "lesser-dark",
          label: "lesser-dark"
        },
        {
          value: "mbo",
          label: "mbo"
        },
        {
          value: "monokai",
          label: "monokai"
        },
        {
          value: "rubyblue",
          label: "rubyblue"
        }
      ]
    };
  },
  computed: {
    editor() {
      return this.$refs.myEditor.editor;
    }
  },
  mounted() {
    // console.log(this.editor);
  },
  methods: {
    // 编辑区内容发生改变
    onCmCodeChange(newCode) {
      this.code = newCode;
    },

    /* 切换语言、切换主题，此处不要用this.editorOption.mode = value，必须用内置的构造函数方法才有效 */
    // 切换语言
    changeMode(val) {
      this.editor.setOption("mode", val);
    },
    // 切换主题
    changeTheme(val) {
      this.editor.setOption("theme", val);
    },
    // 切换主题 - 获取元素并改变其class
    // setThemeClass(theme) {
    //   const CodeMirrorWrap = document.getElementsByClassName("CodeMirror-wrap");
    //   for (var i = 0; i < CodeMirrorWrap.length; i++) {
    //     CodeMirrorWrap[i].attributes[0].nodeValue =
    //       "CodeMirror CodeMirror-wrap ";
    //     CodeMirrorWrap[i].attributes[0].nodeValue += `cm-s-${theme}`;
    //   }
    // },
    // 保存内容
    saveContent() {
      console.log(this.code);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/smart-ui/smart-ui.scss";
.container /deep/ {
  .vue-codemirror-wrap {
    .CodeMirror {
      font-size: 14px;
    }
  }
}
</style>
