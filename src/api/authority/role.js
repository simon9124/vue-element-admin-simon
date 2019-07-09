import {
  request
} from '@/utils'

// 获取用户数据（全部）
export function getUserList(_this) {
  _this.tableDataLoading = true
  return request({
    url: '/role/list',
    method: 'get'
  })
}

// 更新用户数据
export function updateUser(data) {
  return request({
    url: '/role/update',
    method: 'put',
    data
  })
}

// 删除1行数据
export function deleteUser() {
  return request({
    url: '/role/delete',
    method: 'delete'
  })
}
