<template>
  <div class="scroll-container"
       ref="scrollContainer">
    <!-- @wheel.prevent="handleScroll" -->
    <div class="scroll-wrapper"
         ref="scrollWrapper">
      <!-- :style="{top: top + 'px'}" -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
const delta = 15

export default {
  name: 'scrollBar',
  data() {
    return {
      top: 0
    }
  },
  methods: {
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 3
      const $container = this.$refs.scrollContainer
      const $containerHeight = $container.offsetHeight
      const $wrapper = this.$refs.scrollWrapper
      const $wrapperHeight = $wrapper.offsetHeight
      if (eventDelta > 0) {
        this.top = Math.min(0, this.top + eventDelta)
      } else {
        if ($containerHeight - delta < $wrapperHeight) {
          if (this.top < -($wrapperHeight - $containerHeight + delta)) {
            this.top = this.top
          } else {
            this.top = Math.max(
              this.top + eventDelta,
              $containerHeight - $wrapperHeight - delta
            )
          }
        } else {
          this.top = 0
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../styles/variables.scss';

.scroll-container {
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: $menuBg;
  .scroll-wrapper {
    // position: absolute;
    width: 100% !important;
  }
}

// 滚动条样式
.scroll-container::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}
.scroll-container::-webkit-scrollbar-thumb {
  background-color: rgba(64, 158, 255, 0.8);
  outline: 1px solid slategrey;
  border-radius: 5px;
}
.scroll-container::-webkit-scrollbar {
  width: 10px;
}
</style>
