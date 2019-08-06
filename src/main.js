import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog' // error log
import './permission' // permission control
import './mock' // simulation data
import * as filters from './filters' // global filters
import './styles/index.scss' // global css

// A modern alternative to CSS resets
import 'normalize.css/normalize.css'

// js - cookie
import Cookies from 'js-cookie'

// element-ui
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// VueClipboard
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

// v-chart
import VCharts from 'v-charts'
Vue.use(VCharts)

// baidu-map
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  // https://github.com/ElemeFE/v-charts/blob/master/examples/pages/bmap.vue
  ak: 'oBvDtR6nzWtVchkY4cLHtnah1VVZQKRK'
})

// codemirror
import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
Vue.use(VueCodemirror,
  /* {
  options: { theme: 'base16-dark', ... },
  events: ['scroll', ...]
} */
)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
