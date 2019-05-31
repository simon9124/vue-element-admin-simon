<template>
  <!-- 页内容 -->
  <div class="empty-div">
    <!-- 顶部 -->
    <div class="header-div">
      <i class="el-icon-d-arrow-right"
         style="font-size:16px"></i>
      <span style="font-size:16px">shell脚本编辑</span>

      <!-- 按钮 -->
      <div class="header-div-radios">
        <div class="buttons">
          <el-upload class="uploader"
                     ref="upload"
                     action=''
                     multiple
                     :http-request="uploadHandler"
                     :show-file-list='false'
                     accept=".txt,.sh"
                     :limit="1"
                     :on-exceed="handleExceed"
                     :file-list="fileList">
            <el-button type="warning"
                       size="medium">导入脚本</el-button>
          </el-upload>
          <el-button type="success"
                     size="medium"
                     @click="saveScript">保存脚本</el-button>
        </div>
      </div>
    </div>

    <!-- 编辑器 -->
    <div class="content-div">
      <codemirror :value="scriptContent"
                  :options="editorOption"
                  ref="myEditor">
      </codemirror>
    </div>
  </div>
</template>

<script>
  import { codemirror } from 'vue-codemirror-lite'
  import { request } from '@/utils'

  require('codemirror/theme/3024-day.css')

  export default {
    name: 'codeMirror-script',
    components: {
      codemirror
    },
    data() {
      return {
        // 编辑器配置
        editorOption: {
          mode: 'application/json',
          theme: '3024-day',
          extraKeys: { 'Ctrl-Space': 'autocomplete' },
          autoCloseBrackets: true,
          autofocus: true,
          styleActiveLine: true,
          lineNumbers: true,
          line: true,
          lineWrapping: 'wrap',
          cursorHeight: 0.85,
          gutters: [
            'CodeMirror-linenumbers',
            'CodeMirror-foldgutter'
          ],
          autoRefresh: true,
          tabSize: 2
        },
        // 文件列表
        fileList: []
      }
    },
    props: {
      scriptContent: {
        type: String,
        default: ''
      }
    },
    created() {
      this.init()
    },
    methods: {
      // 页面初始化
      init() {
      },
      // 保存脚本
      saveScript() {
        const saveScript = {
          scriptContent: this.$refs.myEditor.editor.getValue()
        }
        // 传递参数给父组件
        this.$emit('saveScript', saveScript)
      },
      // 上传脚本
      uploadHandler(param) {
        var form = new FormData()
        form.append('file', param.file, param.file['filename'])
        request({
          baseURL: process.env.BASE_API + process.env.PREFIX,
          url: '/maintenance/script/uploadFile',
          method: 'post',
          data: form,
          config: {
            headers: {
              'Content-Type': 'multipart/form-data;boundary=boundary'
            }
          }
        }).then((result) => {
          this.scriptContent = result.data.scriptContent
        }).finally(() => {
          this.fileList = []
        })
      },
      // 上传检查
      handleExceed(file, fileList) {
        this.$message.warning(`当前限制选择1个文件，本次选择了 ${file.length} 个文件`)
      }
    },
    watch: {

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .empty-div /deep/ {
    .header-div {
      background: #f2f2f2;
      padding: 15px 10px 15px 20px;
      border-top: 1px solid #e6e6e6;
      border-left: 1px solid #e6e6e6;
      border-right: 1px solid #e6e6e6;
      vertical-align: middle;
      position: relative;

      .buttons {
        position: absolute;
        right: 10px;
        top: 7px;

        .uploader {
          float: left;
          margin-right: 10px;
        }
      }
    }

    .content-div {
      font-size: 14px;
    }
  }
</style>
