<!--
  *改变主题需要同时设置：
    1、editorOption.theme 的值
    2、.cm-s-[name] (name即theme值)
  *Bug：父组件套用在 elementui 的 collapse（初始非展开），首次展开辑器内容为空
 -->

<template>
  <!-- <div class="container"> -->
  <ComponentTable :tableTitle="tableTitle"
                  :tableContent="tableContent"
                  :filterShow="false">
    <div slot="content"
         style="margin:10px 0;text-align:right">
      <!-- 脚本信息 -->
      <el-form style="width:40%;display:inline-block;float:left;height:32px"
               :model="scriptFormData"
               ref="scriptFormData"
               @submit.native.prevent>
        <el-form-item style="margin:0;"
                      prop="scriptName">
          <el-input style="vertical-align:text-bottom;"
                    v-model="scriptFormData.scriptName"
                    placeholder="脚本名称"></el-input>
        </el-form-item>
      </el-form>
      <!-- 按钮 -->
      <div class="buttons">
        <el-button type="success"
                   @click="scriptUpdate">保存脚本</el-button>
        <el-upload class="uploader"
                   ref="upload"
                   action=''
                   multiple
                   :http-request="uploadHandler"
                   :show-file-list='false'
                   accept=".txt,.sh">
          <el-button type="warning">上传脚本</el-button>
        </el-upload>
      </div>
    </div>
    <!-- 选项卡 -->
    <div slot="radios"
         class="table-content-header-radios">
      <el-radio-group v-model="radio"
                      size="small"
                      @change="handleChange">
        <el-radio-button label="Shell"></el-radio-button>
        <el-radio-button label="Json"></el-radio-button>
        <el-radio-button label="Python"></el-radio-button>
        <el-radio-button label="Perl"></el-radio-button>
        <el-radio-button label="Yaml"></el-radio-button>
      </el-radio-group>
    </div>
    <!-- 编辑器 -->
    <div slot="tableIn"
         class="table-content-spe"
         style="max-height:1000px;overflow:auto">
      <codemirror :value="scriptFormData.scriptContent"
                  :options="editorOption"
                  ref="myEditor"
                  @change="codeChange">
      </codemirror>
    </div>
  </ComponentTable>
  <!-- </div> -->
</template>

<script>
import ComponentTable from '@/components/ComponentTable'
import { request } from '@/utils'
import { codemirror } from 'vue-codemirror-lite'
import { getByScriptCode } from '@/api/script/script'
import { params } from '@/utils/params'
import Bus from '@/utils/bus.js'
import './import.js'

export default {
  name: 'codeMirror-script',
  components: {
    ComponentTable,
    codemirror
  },
  data() {
    return {
      loading: false,
      codeMirror: ``,
      editorOption: {
        mode: 'application/json',
        theme: 'rubyblue',
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
          // 'CodeMirror-lint-markers'
        ],
        // lint: true,
        autoRefresh: true
        // scrollbarStyle: null,
        // readOnly: 'nocursor'
      },
      radio: 'Shell',
      // 接收传来的scriptCode，并判断 编辑 or 新增
      scriptCode: '',
      // 脚本信息
      scriptFormData: {},
      scriptNewFormData: {
        // 接收传来的:scriptTemplateCode、scriptResultCheckCode、scriptParamsHeaders、scriptParams
        scriptTemplateCode: '',
        scriptResultCheckCode: '',
        scriptParamsHeaders: '["操作类型", "业务名称"]',
        scriptParams: '[{}]'
      }
    }
  },
  props: {
    tableTitle: {
      type: String,
      default: '代码编辑'
    },
    tableContent: {
      type: String,
      default: '代码编辑'
    }
    // 脚本信息
    // scriptFormData: {
    //   type: Object
    // }
  },
  computed: {
    editor() {
      // get current editor object
      // return this.$refs.myEditor.editor
    }
  },
  created() {
    /*
      接收其他组件传递过来的值：
    */
    // radio
    Bus.$on('radio', radio => {
      this.radio = radio
      this.radioChange(this.radio)
    })
    // data
    Bus.$on('editResult', data => {
      var str = ''
      for (var i in data) {
        str += data[i] + '\n'
      }
      str = str.substring(0, str.length - 1)
      // console.log(str)
      this.scriptFormData.scriptContent = str
    })
    // scriptTemplateCode
    Bus.$on('scriptTemplateCode', scriptTemplateCode => {
      this.scriptNewFormData.scriptTemplateCode = scriptTemplateCode
    })
    // scriptResultCheckCode
    Bus.$on('scriptResultCheckCode', scriptResultCheckCode => {
      this.scriptNewFormData.scriptResultCheckCode = scriptResultCheckCode
    })
    // colHeaders
    Bus.$on('handleHeaders', colHeaders => {
      var array = []
      for (var i in colHeaders) {
        array.push(colHeaders[i])
      }
      array = JSON.stringify(array)
      this.scriptNewFormData.scriptParamsHeaders = array
    })
    this.scriptCode = params(this, 'scriptCode')
    this.init()
  },
  methods: {
    // 根据scriptCode值判断：编辑 or 新增
    isEdit() {
      return this.scriptCode !== null
    },
    // 页面初始化
    init() {
      // console.log(this.scriptCode)
      if (this.isEdit()) {
        this.loading = true
        // this.tableTitle = '脚本编辑'
        // 给子组件传值：scriptFormData
        getByScriptCode(this.scriptCode)
          .then(result => {
            this.scriptFormData = result.data.data
            this.scriptParamsHeaders = result.data.data.scriptParamsHeaders
          })
          .finally(() => {
            this.loading = false
          })
      }
      // else {
      //   this.tableTitle = '新增脚本'
      // }
    },
    // 保存脚本
    scriptUpdate() {
      // 提交编辑器代码 -> 传给父组件
      const scriptUpdate = {
        scriptName: this.scriptFormData.scriptName,
        scriptContent: this.$refs.myEditor.editor.getValue(),
        scriptTemplateCode: this.scriptNewFormData.scriptTemplateCode,
        scriptResultCheckCode: this.scriptNewFormData.scriptResultCheckCode,
        scriptParamsHeaders: this.scriptNewFormData.scriptParamsHeaders,
        scriptParams: this.scriptNewFormData.scriptParams
      }
      this.$emit('scriptUpdate', scriptUpdate)
    },
    // 上传脚本
    uploadHandler(param) {
      // console.debug('uploadHandler: %s', param)
      this.loading = true
      var form = new FormData()
      form.append('file', param.file, param.file['filename'])
      request({
        // zuul/api 前置zuul对应上传中文问题
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
        // console.log(result.data.scriptContent)
        this.scriptFormData.scriptContent = result.data.scriptContent
      }).catch(error => {
        console.error(error)
      }).finally(() => {
        this.fileList = []
        this.loading = false
      })
    },
    // 新增脚本
    scriptInsert() {
      this.$prompt('请输入脚本名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(data => {
          if (data.value !== null) {
            const scriptInsert = {
              scriptName: data.value,
              scriptContent: this.$refs.myEditor.editor.getValue(),
              scriptTemplateCode: this.scriptNewFormData.scriptTemplateCode,
              scriptResultCheckCode: this.scriptNewFormData
                .scriptResultCheckCode,
              scriptParamsHeaders: this.scriptNewFormData.scriptParamsHeaders,
              scriptParams: this.scriptNewFormData.scriptParams
            }
            this.$emit('scriptInsert', scriptInsert)
          }
        })
        .catch(() => {})
    },
    // 切换radio
    radioChange(radio) {
      // 获取元素并改变其class
      const CodeMirrorWrap = document.getElementsByClassName('CodeMirror-wrap')
      // console.log(CodeMirrorWrap)
      // console.log(CodeMirrorWrap[0].attributes[0].nodeValue)
      CodeMirrorWrap[0].attributes[0].nodeValue = 'CodeMirror CodeMirror-wrap '
      CodeMirrorWrap[1].attributes[0].nodeValue = 'CodeMirror CodeMirror-wrap '
      // 切换radio -> 切换主题
      switch (radio) {
        case 'Json':
          this.editorOption.mode = 'application/json'
          this.editorOption.theme = 'rubyblue'
          CodeMirrorWrap[0].attributes[0].nodeValue += 'cm-s-rubyblue'
          CodeMirrorWrap[1].attributes[0].nodeValue += 'cm-s-rubyblue'
          // this.scriptFormData.scriptContent = ``
          break
        case 'Shell':
          this.editorOption.mode = 'text/shell'
          this.editorOption.theme = 'monokai'
          CodeMirrorWrap[0].attributes[0].nodeValue += 'cm-s-monokai'
          CodeMirrorWrap[1].attributes[0].nodeValue += 'cm-s-monokai'
          // this.editorOption.theme = 'base16-dark'
          // CodeMirrorWrap[0].attributes[0].nodeValue += 'cm-s-base16-dark'
          // CodeMirrorWrap[1].attributes[0].nodeValue += 'cm-s-base16-dark'
          // this.scriptFormData.scriptContent = ``
          break
        case 'Python':
          this.editorOption.mode = 'text/x-python'
          this.editorOption.theme = 'Ambiance'
          CodeMirrorWrap[0].attributes[0].nodeValue += 'cm-s-ambiance'
          CodeMirrorWrap[1].attributes[0].nodeValue += 'cm-s-ambiance'
          // this.scriptFormData.scriptContent = ``
          break
        case 'Perl':
          this.editorOption.mode = 'text/perl'
          this.editorOption.theme = 'Cobalt'
          CodeMirrorWrap[0].attributes[0].nodeValue += 'cm-s-cobalt'
          CodeMirrorWrap[1].attributes[0].nodeValue += 'cm-s-cobalt'
          // this.scriptFormData.scriptContent = ``
          break
        case 'Yaml':
          this.editorOption.mode = 'text/yaml'
          this.editorOption.theme = 'Mbo'
          CodeMirrorWrap[0].attributes[0].nodeValue += 'cm-s-mbo'
          CodeMirrorWrap[1].attributes[0].nodeValue += 'cm-s-mbo'
          // this.scriptFormData.scriptContent = ``
          break
      }
      // console.log(radio)
    },
    // 触发切换radio事件
    handleChange(radio) {
      this.radioChange(radio)
      this.$emit('handleRadio', radio)
    },
    codeChange() {}
  },
  watch: {
    $route(to, from) {
      this.init()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/styles/smart-ui/smart-ui.scss';
.buttons {
  margin-left:10px;
  .uploader {
    margin-left:10px;
    float: right;
  }
}
</style>

