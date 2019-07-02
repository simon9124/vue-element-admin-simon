<template>
  <div style="display:inline-block;margin:0 10px">
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      canOperatePage: ['articleList']
    }
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
    ...mapGetters(['roles'])
  },
  methods: {
    buttonClick() {
      if (
        this.roles.includes('admin') ||
        this.canOperatePage.includes(this.$route.meta.title)
      ) {
        this.$emit('click', '')
      } else {
        this.$message({
          type: 'error',
          message: '您没有权限'
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../styles/smart-ui/smart-ui.scss';
</style>
