 <!--
 * 封装行内编辑组件
 -->
<template>
  <div>
    <span class="inline-edit"
          v-show="!edit"
          @click="focusclick">{{inlineData}}</span>
    <el-button v-show="edit"
               class="buttonSort"
               size="mini"
               type="success"
               @click="submiEdit">确定</el-button>
    <el-input v-show="edit"
              v-model="inputData"
              id="keywords"
              @blur="edit=!edit"></el-input>
    <!-- v-focus="focusState" -->
  </div>
</template>
<script>
export default {
  name: 'ComponentInlineEdit',
  data() {
    return {
      // 是否显示编辑框，默认false
      edit: false,
      inputData: this.inlineData
    }
  },
  created() {},
  props: {
    // 数据初始值
    inlineData: {
      type: Number,
      default: 'inlineData'
    }
  },
  methods: {
    focusclick() {
      // this.$nextTick(function() {
      //   this.focusState = true
      //   document.getElementById('keywords').focus()
      // })
      this.edit = !this.edit
    },
    submiEdit() {
      // 将input值提交给父组件
      this.$emit('editCallBack', this.inputData)
      this.$emit('editSubmit', this.inputData)
      this.edit = !this.edit
    }
  },
  watch: {
    // 监听inlineData的变更，并同步到inputData上
    // inlineData(val) {
    //   this.inputData = val
    // }
    // inputData变更后，组件内对外发送通知
    // inputData(val) {
    //   this.$emit('editCallBack', val)
    // }
  }
  // directives: {
  //   focus: {
  //     inserted: function(el, { value }) {
  //       if (value) {
  //         el.focus()
  //       }
  //     }
  //   }
  // }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/styles/smart-ui/smart-ui.scss';
</style>
