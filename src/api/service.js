import request from '@/utils/request'

export function feachServiceList(query) {
  return request({
    url: '/vue-element-admin/service/list',
    method: 'get',
    params: query
  })
}

export function feachServiceDetail(id) {
  return request({
    url: '/vue-element-admin/service/detail',
    method: 'get',
    params: { id }
  })
}

export function submitService(query) {
  return request({
    url: '/vue-element-admin/service/createService',
    method: 'get',
    params: query
  })
}

export function purchaseService(id) {
  return request({
    url: '/vue-element-admin/service/purchaseService',
    method: 'get',
    params: { id }
  })
}

export function getPurchasedService(uid) {
  return request({
    url: '/vue-element-admin/service/getPurchasedService',
    method: 'get',
    params: { uid }
  })
}
