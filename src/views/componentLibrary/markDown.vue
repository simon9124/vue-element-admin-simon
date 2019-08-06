<template>
  <div class="container">

    <!-- 页内容 -->
    <div class="content">
      <!-- 表格 -->
      <div class="content-spe">
        <p class="content-spe-title">{{ $t('route.markDown') }}
          <el-button style="border-radius:50%;width:20px;height:20px;padding:0"
                     type="primary"
                     circle
                     @click="goToMaxiang">?
          </el-button>
        </p>
        <div class="content-spe-element">

          <!-- markDown -->
          <el-row :gutter="20">
            <el-col :sm="12"
                    :xs="24">
              <el-input class="markdown-editor"
                        type="textarea"
                        v-model="markDownContent"
                        :autosize="{ minRows: 22, maxRows: 22}"
                        placeholder="MarkDownTxt..."></el-input>
            </el-col>
            <el-col :sm="12"
                    :xs="24">
              <mark-down :mark-down-content="markDownContent">
              </mark-down>
            </el-col>
          </el-row>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
// component
import MarkDown from '@/components/Editors/ShowDown/ShowDown';

export default {
  components: { MarkDown },
  data() {
    return {
      // 编辑框内容
      markDownContent: ''
    };
  },
  methods: {
    goToMaxiang() {
      window.open('https://maxiang.io', '_blank');
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/smart-ui/smart-ui.scss";
.container /deep/ {
  .show-content {
    height: 474px;
    padding: 5px 15px;
    overflow-y: auto;
    background: #36312c;
    color: #ebd1b7 !important;
  }
  /* 滚动条 */
  .markdown-editor .el-textarea__inner::-webkit-scrollbar,
  .show-content::-webkit-scrollbar {
    width: 0;
  }
}
</style>
