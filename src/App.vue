<template>
  <div id="app">
    <keep-alive>
      <router-view :include="include"
                   v-if="$route.meta.keepAlive">
      </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive">
    </router-view>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      include: []
    }
  }
}
</script>

<style>
#app {
  background: #f0f2f5;
}
/* 解决element-ui表头错位问题 */
body .el-table th.gutter {
  display: table-cell !important;
}
body .el-table colgroup.gutter {
  display: table-cell !important;
}
</style>

