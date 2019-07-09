<template>
  <div class="container">

    <!-- 页内容 -->
    <div class="content">
      <!-- 表格 -->
      <div class="content-spe">
        <p class="content-spe-title">{{ $t('route.menuManage') }}</p>
        <div class="content-spe-element">

          <menuComponent></menuComponent>

        </div>
      </div>
    </div>

  </div>

</template>

<script>
// components
import menuComponent from '@/components/LeftTreeRightTable/menu.vue';

export default {
  name: 'MenuManage',
  components: {
    menuComponent
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/smart-ui/smart-ui.scss";
@import "~@/styles/smart-plan.scss";
</style>
