 <!--
 * 封装背景蒙层组件
 -->
<template>
  <transition name="fade-mask">
    <div class="mask"
         :v-mode="maskShow"
         :v-show="maskShow">
    </div>
  </transition>
</template>
<script>
import Bus from '@/utils/bus.js'
export default {
  name: 'ComponentMask',
  data() {
    return {
      // 是否显示蒙层，默认false
      maskShow: false
    }
  },
  created() {
    // 接收ComponentFilter组件传递的事件
    Bus.$on('maskShow', () => {
      this.maskShow = true
    })
    // 接收ComponentFilterAdvanced组件传递的事件
    Bus.$on('maskUnShow', () => {
      this.maskShow = false
    })
  },
  props: {
    maskShow: {
      // 是否显示不限 默认不显示
      Boolean,
      default: false
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/styles/smart-ui/smart-ui.scss';
</style>
