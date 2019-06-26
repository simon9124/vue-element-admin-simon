import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* 路由引入 */

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/

/** 1、静态路由**/
export const constantRouterMap = [

  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path*',
      component: () => import('@/views/redirect/index')
    }]
  },

  /** 登录页**/
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },

  /** 错误输入页 - 常规隐藏**/
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },

  /** 模板页**/
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      // 首页
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'dashboard',
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          noCache: true
        }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

/** 2、动态路由**/
export const asyncRouterMap = [

  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    hidden: true,
    children: [{
      path: 'page',
      component: () => import('@/views/permission/page'),
      name: 'PagePermission',
      meta: {
        title: 'pagePermission',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },
    {
      path: 'directive',
      component: () => import('@/views/permission/directive'),
      name: 'DirectivePermission',
      meta: {
        title: 'directivePermission'
        // if do not set roles, means: this page does not require permission
      }
    }
    ]
  },

  // user
  {
    path: '/user',
    component: Layout,
    redirect: '/user/userList',
    meta: {
      title: 'user',
      icon: 'peoples',
      roles: ['admin', 'editor']
    },
    children: [{
      path: 'userList',
      component: () => import('@/views/user/userList'),
      name: 'user-list',
      meta: {
        title: 'userList',
        roles: ['admin', 'editor'],
        keepAlive: true
      }
    }]
  },

  // componentLibrary
  {
    path: '/componentLibrary',
    component: Layout,
    redirect: '/componentLibrary/gallery',
    meta: {
      title: 'componentLibrary',
      icon: 'component',
      roles: ['admin', 'editor']
    },
    children: [{
      path: 'gallery',
      component: () => import('@/views/componentLibrary/gallery'),
      name: 'gallery',
      meta: {
        title: 'gallery',
        keepAlive: true
      }
    }]
  },

  // charts
  {
    path: '/chart',
    component: Layout,
    redirect: '/chart/line',
    meta: {
      title: 'chart',
      icon: 'chart',
      roles: ['admin', 'editor']
    },
    children: [

      {
        path: 'line',
        component: () => import('@/views/chart/line'),
        name: 'chart-line',
        meta: {
          title: 'chartLine',
          keepAlive: true
        }
      },
      {
        path: 'histogram',
        component: () => import('@/views/chart/histogram'),
        name: 'chart-histogram',
        meta: {
          title: 'chartHistogram',
          keepAlive: true
        }
      },
      {
        path: 'bar',
        component: () => import('@/views/chart/bar'),
        name: 'chart-bar',
        meta: {
          title: 'chartBar',
          keepAlive: true
        }
      },
      {
        path: 'pie',
        component: () => import('@/views/chart/pie'),
        name: 'chart-pie',
        meta: {
          title: 'chartPie',
          keepAlive: true
        }
      },
      {
        path: 'ring',
        component: () => import('@/views/chart/ring'),
        name: 'chart-ring',
        meta: {
          title: 'chartRing',
          keepAlive: true
        }
      },
      {
        path: 'waterfall',
        component: () => import('@/views/chart/waterfall'),
        name: 'chart-waterfall',
        meta: {
          title: 'chartWaterfall',
          keepAlive: true
        }
      },
      {
        path: 'funnel',
        component: () => import('@/views/chart/funnel'),
        name: 'chart-funnel',
        meta: {
          title: 'chartFunnel',
          keepAlive: true
        }
      },
      {
        path: 'radar',
        component: () => import('@/views/chart/radar'),
        name: 'chart-radar',
        meta: {
          title: 'chartRadar',
          keepAlive: true
        }
      },
      // {
      //   path: 'map',
      //   component: () => import('@/views/chart/map'),
      //   name: 'chart-map',
      //   meta: {
      //     title: 'chartMap',
      //     keepAlive: true
      //   }
      // },
      {
        path: 'sankey',
        component: () => import('@/views/chart/sankey'),
        name: 'chart-sankey',
        meta: {
          title: 'chartSankey',
          keepAlive: true
        }
      },
      {
        path: 'heatmap',
        component: () => import('@/views/chart/heatmap'),
        name: 'chart-heatmap',
        meta: {
          title: 'chartHeatmap',
          keepAlive: true
        }
      },
      {
        path: 'scatter',
        component: () => import('@/views/chart/scatter'),
        name: 'chart-scatter',
        meta: {
          title: 'chartScatter',
          keepAlive: true
        }
      },
      {
        path: 'candle',
        component: () => import('@/views/chart/candle'),
        name: 'chart-candle',
        meta: {
          title: 'chartCandle',
          keepAlive: true
        }
      },
      {
        path: 'gauge',
        component: () => import('@/views/chart/gauge'),
        name: 'chart-gauge',
        meta: {
          title: 'chartGauge',
          keepAlive: true
        }
      },
      {
        path: 'tree',
        component: () => import('@/views/chart/tree'),
        name: 'chart-tree',
        meta: {
          title: 'chartTree',
          keepAlive: true
        }
      },
      {
        path: 'liquidfill',
        component: () => import('@/views/chart/liquidfill'),
        name: 'chart-liquidfill',
        meta: {
          title: 'chartLiquidfill',
          keepAlive: true
        }
      },
      {
        path: 'wordcloud',
        component: () => import('@/views/chart/wordcloud'),
        name: 'chart-wordcloud',
        meta: {
          title: 'chartWordcloud',
          keepAlive: true
        }
      }
    ]
  },

  // map
  {
    path: '/map',
    component: Layout,
    redirect: '/map/city',
    meta: {
      title: 'map',
      icon: 'map',
      roles: ['admin', 'editor']
    },
    children: [

      {
        path: 'city',
        component: () => import('@/views/map/city'),
        name: 'map-city',
        meta: {
          title: 'mapCity',
          keepAlive: true
        }
      }
    ]
  },

  /** 路由引入**/

  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
