<template>
  <div class="container">

    <!-- 页内容 -->
    <div class="content">
      <!-- 表格 -->
      <div class="content-spe">
        <p class="content-spe-title">{{ $t('route.codeMirror') }}</p>
        <div class="content-spe-element">

          <!-- codemirror -->
          <!-- bidirectional data binding（双向数据绑定） -->
          <codemirror v-model="code"
                      :options="cmOptions"></codemirror>

          <!-- or to manually control the datasynchronization（或者手动控制数据流，需要像这样手动监听changed事件） -->
          <codemirror ref="myCm"
                      :value="code"
                      :options="cmOptions"
                      @ready="onCmReady"
                      @focus="onCmFocus"
                      @input="onCmCodeChange">
          </codemirror>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror';
import './import.js';

export default {
  components: {
    codemirror
  },
  data() {
    return {
      code: 'const a = 10',
      cmOptions: {
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
      }
    };
  },
  computed: {
    codemirror() {
      return this.$refs.myCm.codemirror;
    }
  },
  mounted() {
    console.log('this is current codemirror object', this.codemirror);
    // you can use this.codemirror to do something...
  },
  methods: {
    onCmReady(cm) {
      console.log('the editor is readied!', cm);
    },
    onCmFocus(cm) {
      console.log('the editor is focus!', cm);
    },
    onCmCodeChange(newCode) {
      console.log('this is new code', newCode);
      this.code = newCode;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/smart-ui/smart-ui.scss";
</style>
