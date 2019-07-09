import Mock from 'mockjs'
import loginAPI from './login'
import articleAPI from './article'
import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'
import {
  userAPI,
  roleAPI
} from './authority'
import {
  galleryAPI
} from './componentLibrary'

// 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function() {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}

// 延时
Mock.setup({
  timeout: '350-600'
})

// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)

// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 账单相关
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

/* 权限 */
// 用户管理
Mock.mock(/\/user\/list/, 'get', userAPI.getUserList)
Mock.mock(/\/user\/update/, 'put', userAPI.updateUser)
Mock.mock(/\/user\/delete/, 'delete', userAPI.deleteUser)
// 角色管理
Mock.mock(/\/role\/list/, 'get', roleAPI.getRoleList)
Mock.mock(/\/role\/update/, 'put', roleAPI.updateRole)
Mock.mock(/\/role\/delete/, 'delete', roleAPI.deleteRole)

/* 组件库 */
// 图片库
Mock.mock(/\/photo\/list/, 'get', galleryAPI.getPhotoList)
Mock.mock(/\/photo\/update/, 'put', galleryAPI.updatePhoto)
Mock.mock(/\/photo\/delete/, 'delete', galleryAPI.deletePhoto)

export default Mock
