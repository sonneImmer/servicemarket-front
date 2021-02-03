import request from '@/utils/request'

export function feachServiceList(query) {
  return request({
    url: '/vue-element-admin/service/list',
    method: 'get',
    params: query
  })
}

export function feachServiceDetail() {
  return request({
    url: '/vue-element-admin/service/detail',
    method: 'get',
    params: ''
  })
}
