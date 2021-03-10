import request from '@/utils/request-mock'

export function feachServiceList(query) {
  return request({
    url: '/eureka-vue/service/list',
    method: 'get',
    params: query
  })
}

export function feachServiceDetail(id) {
  return request({
    url: '/eureka-vue/service/detail',
    method: 'get',
    params: { id }
  })
}

export function submitService(query) {
  return request({
    url: '/eureka-vue/service/createService',
    method: 'get',
    params: query
  })
}

export function purchaseService(id) {
  return request({
    url: '/eureka-vue/service/purchaseService',
    method: 'get',
    params: { id }
  })
}

export function getPurchasedService(uid) {
  return request({
    url: '/eureka-vue/service/getPurchasedService',
    method: 'get',
    params: { uid }
  })
}
