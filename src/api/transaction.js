import {
  request
} from '@/utils'

export function fetchList(query) {
  return request({
    url: '/transaction/list',
    method: 'get',
    params: query
  })
}
