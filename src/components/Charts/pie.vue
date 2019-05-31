<template>
  <ve-pie :data="chartData"
          :settings="chartSettings"></ve-pie>
  </div>
</template>

<script>

export default {
  name: 'pie',
  props: {
    chartSettings: {
      type: Object
    },
    chartData: {
      type: Object
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  created() {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/styles/smart-ui/smart-ui.scss';
</style>
