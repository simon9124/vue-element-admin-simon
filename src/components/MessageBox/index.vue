<template>
  <div>
    <el-badge :value="unReadCount"
              :max="99"
              :hidden="unReadCount === 0"
              ref="badge">
      <span @click='click'>
        <svg-icon icon-class="email"></svg-icon>
      </span>
    </el-badge>
  </div>
</template>

<script>
import { getUnReadMessageCount } from '@/api/mail/message'

export default {
  name: 'messageBox',
  data() {
    return {
      unReadCount: 0
    }
  },
  mounted() {
    this.init()
    // 3分钟刷新一次
    window.setInterval(() => {
      this.init()
    }, 1000 * 60 * 3)
  },
  methods: {
    init() {
      getUnReadMessageCount().then(result => {
        this.unReadCount = result.data.messageCount
      })
    },
    click() {
      this.$router.push({
        path: '/mail/inbox'
      })
    }
  },
  watch: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-badge /deep/ {
  cursor: pointer;
  width: 34px;
  height: 26px;
  line-height: 26px;
  vertical-align: 8px;
  // margin-right: 10px;
  span {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  svg {
    width: 100%;
    height: 100%;
    color: #606266;
  }
}
</style>
