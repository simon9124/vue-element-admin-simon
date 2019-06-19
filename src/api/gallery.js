import {
  request
} from '@/utils'

// 获取图片数据（全部）
export function getPhotoList() {
  return request({
    url: '/photo/list',
    method: 'get'
  })
}

// 更新图片数据
export function updatePhoto(data) {
  return request({
    url: '/photo/update',
    method: 'put',
    data
  })
}

// 删除1条数据
export function deletePhoto() {
  return request({
    url: '/photo/delete',
    method: 'delete'
  })
}
