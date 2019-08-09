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
                       v-model="mode"
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
                       v-model="theme"
                       @change="changeTheme">
              <el-option v-for="mode in themes"
                         :key="mode.value"
                         :label="mode.label"
                         :value="mode.value">
              </el-option>
            </el-select>

          </el-row>

          <!-- codemirror -->
          <CodeMirror :code="code"
                      :theme="theme"
                      :mode="mode"
                      @change="codeChange"></CodeMirror>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import CodeMirror from "@/components/Editors/CodeMirror/CodeMirror";

export default {
  components: {
    CodeMirror
  },
  data() {
    return {
      // 编辑区内容
      code: "",
      // 模式选择select框
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
      // 主题选择select框
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
      ],
      // 选择的模式
      mode: "text/javascript",
      // 选择的主题
      theme: "rubyblue"
    };
  },
  methods: {
    // 内容发生改变
    codeChange(code) {
      this.code = code;
      // console.log(this.code);
    },
    // 切换语言
    changeMode(val) {
      this.mode = val;
    },
    // 切换主题
    changeTheme(val) {
      this.theme = val;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/smart-ui/smart-ui.scss";
.container /deep/ {
  .vue-codemirror-wrap {
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
}
</style>
