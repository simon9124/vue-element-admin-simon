<template>
  <div id="app">
    <keep-alive>
      <router-view :include="include"
                   v-if="$route.meta.keepAlive">
      </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive">
    </router-view>
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
