import {
  request
} from '@/utils'

// 获取用户数据（全部）
export function getUserList(_this) {
  _this.tableDataLoading = true
  return request({
    url: '/user/list',
    method: 'get'
  })
}

// 更新用户数据
export function updateUsers(data) {
  return request({
    url: '/user/update',
    method: 'put',
    data
  })
}

// 删除1行数据
export function deleteUser() {
  return request({
    url: '/user/delete',
    method: 'delete'
  })
}
