<!--
  *改变主题需要同时设置：
    1、editorOption.theme 的值
    2、.cm-s-[name] (name即theme值)
  *Bug：父组件套用在 elementui 的 collapse（初始非展开），首次展开辑器内容为空
 -->

<template>
  <div>
    <!-- 中间生成按钮 -->
    <el-button style="width:5%;position:absolute;left:50%;top:50%;transform:translate(-50%, -50%);"
               type="warning"
               icon="el-icon-back"
               @click="handleSubmit">
    </el-button>
    <ComponentTable :tableTitle="tableTitle"
                    :tableContent="tableContent"
                    :filterShow="false">
      <!-- 按钮 -->
      <div slot="content"
           style="margin:10px 0;text-align:right">
        <!-- 脚本模板信息 -->
        <el-form style="width:0%;display:inline-block;float:left;height:32px"
                 :model="templateFormData"
                 ref="templateFormData"
                 @submit.native.prevent>
          <!-- <el-form-item style="margin:0;"
                        prop="templateName">
            <el-input style="vertical-align:text-bottom;"
                      v-model="templateFormData.templateName"
                      placeholder="模板名称"></el-input>
          </el-form-item> -->
        </el-form>
        <!-- 模板select控件 -->
        <el-select style="width:30%;float:left"
                   v-model="templateFormData.templateName"
                   size="medium"
                   filterable
                   placeholder="模板名称"
                   :loading="loading"
                   @change="templateChange">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary"
                   @click="templatePreview();templateShow()">批量预览</el-button>
        <el-button style="margin-left:5px"
                   type="success"
                   @click="templateUpdate">更新模板</el-button>
        <el-button style="margin-left:5px"
                   type="warning"
                   @click="templateInsert">另存新模板</el-button>
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
        <!-- :value="codeMirror" -->
        <codemirror :value="templateFormData.templateValue"
                    :options="editorOption"
                    ref="myEditor"
                    @change="codeChange">
        </codemirror>
      </div>
    </ComponentTable>
  </div>
</template>

<script>
import ComponentTable from '@/components/ComponentTable'
import { codemirror } from 'vue-codemirror-lite'
import { getByTemplateCode } from '@/api/script/script'
import { params } from '@/utils/params'
import Bus from '@/utils/bus.js'
import './import.js'

export default {
  name: 'codeMirror-template',
  components: {
    ComponentTable,
    codemirror
  },
  data() {
    return {
      loading: false,
      scriptTemplateCode: '',
      codeMirror: '',
      // 模板已选分类
      templateValue: '',
      // 模板code
      templateCode: '',
      // 编辑器选项
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
      // 脚本模板信息
      templateFormData: {},
      visible: false
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
    },
    // 模板下拉列表
    options: {
      type: Array
    }
    // 脚本对应模板code
    // scriptTemplateCode: {
    //   type: String,
    //   default: ''
    // }
  },
  computed: {
    editor() {
      // get current editor object
      return this.$refs.myEditor.editor
    }
  },
  created() {
    // 接受传递过来的radio
    Bus.$on('radio', radio => {
      this.radio = radio
      this.radioChange(this.radio)
    })
    this.scriptTemplateCode = params(this, 'scriptTemplateCode')
    this.init()
  },
  methods: {
    // 页面加载
    init() {
      // console.log(this.scriptTemplateCode)
      if (this.scriptTemplateCode !== null) {
        this.getByTemplateCode(this.scriptTemplateCode)
      }
    },
    // 根据templateCode查询对应详情
    getByTemplateCode(value) {
      getByTemplateCode(value)
        .then(result => {
          // console.log(result.data.templateValue)
          this.templateFormData = result.data
          this.$refs.myEditor.editor.setValue(result.data.templateValue)
          Bus.$emit('scriptTemplateCode', value)
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 模板选项改变
    templateChange(value) {
      this.loading = true
      const scriptTemplateCode = value
      for (var i in this.options) {
        if (this.options[i].value.indexOf(value) === 0) {
          this.getByTemplateCode(scriptTemplateCode)
          return
        }
      }
    },
    // 更新模板
    templateUpdate() {
      // console.log(this.$refs.myEditor.editor.getValue())
      this.templateFormData.templateValue = this.$refs.myEditor.editor.getValue()
      this.$emit('templateUpdate', this.templateFormData)
    },
    // 新建模板
    templateInsert() {
      this.$prompt('请输入模板名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(data => {
          if (data.value !== null) {
            this.templateFormData = {
              templateName: data.value,
              templateKey: 'shell',
              templateValue: this.$refs.myEditor.editor.getValue()
            }
            this.$emit('templateInsert', this.templateFormData)
          }
        })
        .catch(() => {})
    },
    // 显示预览框
    templateShow() {
      this.visible = true
      this.$emit('templateShow', this.visible)
    },
    // 预览模板
    templatePreview() {
      const previewParams = {
        previewData: this.$refs.myEditor.editor.getValue(),
        visible: true
      }
      // this.$emit('templatePreview', this.$refs.myEditor.editor.getValue())
      this.$emit('templatePreview', previewParams)
    },
    // 提交模板代码给父组件
    handleSubmit() {
      this.$emit('handleEditor', this.$refs.myEditor.editor.getValue())
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
          // this.codeMirror = ``
          break
        case 'Shell':
          this.editorOption.mode = 'text/shell'
          this.editorOption.theme = 'monokai'
          CodeMirrorWrap[0].attributes[0].nodeValue += 'cm-s-monokai'
          CodeMirrorWrap[1].attributes[0].nodeValue += 'cm-s-monokai'
          // this.codeMirror = ``
          break
        case 'Python':
          this.editorOption.mode = 'text/x-python'
          this.editorOption.theme = 'Ambiance'
          CodeMirrorWrap[0].attributes[0].nodeValue += 'cm-s-ambiance'
          CodeMirrorWrap[1].attributes[0].nodeValue += 'cm-s-ambiance'
          // this.codeMirror = ``
          break
        case 'Perl':
          this.editorOption.mode = 'text/perl'
          this.editorOption.theme = 'Cobalt'
          CodeMirrorWrap[0].attributes[0].nodeValue += 'cm-s-cobalt'
          CodeMirrorWrap[1].attributes[0].nodeValue += 'cm-s-cobalt'
          // this.codeMirror = ``
          break
        case 'Yaml':
          this.editorOption.mode = 'text/yaml'
          this.editorOption.theme = 'Mbo'
          CodeMirrorWrap[0].attributes[0].nodeValue += 'cm-s-mbo'
          CodeMirrorWrap[1].attributes[0].nodeValue += 'cm-s-mbo'
          // this.codeMirror = ``
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
</style>

