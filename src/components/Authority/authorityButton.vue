<!--
  ** element组件二次封装 - Button按钮 - 页面级别 **
  1.vuex 获取 roles & canOperatePages -> 共同决定是否可操作
  2.参数：基本同element
-->
<template>
  <span style="display:inline-block">
    <el-button v-if="!tooltip"
               :plain="plain"
               :icon="icon"
               :size="size"
               :type="type"
               @click="buttonClick()">{{ content }}</el-button>
    <el-tooltip v-else
                :content="content"
                :placement="placement">
      <el-button :plain="plain"
                 :icon="icon"
                 :size="size"
                 :type="type"
                 @click="buttonClick()"></el-button>
    </el-tooltip>
  </span>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },
  props: {
    // 接收父组件传来的值 - button相关
    plain: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    // 接收父组件传来的值 - tooltip相关
    tooltip: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters(['roles', 'canOperatePages'])
  },
  methods: {
    buttonClick() {
      if (
        this.roles.includes('admin') ||
        this.canOperatePages.includes(this.$route.meta.title)
      ) {
        this.$emit('click', '')
      } else {
        this.$message({
          type: 'error',
          message: '您的用户级别没有权限进行此操作'
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../styles/smart-ui/smart-ui.scss';
</style>
