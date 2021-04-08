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

export function saveOrder(query) {
  return request({
    url: '/eureka-vue/service/saveOrder',
    method: 'post',
    data: query
  })
}

export function getSavedService() {
  return request({
    url: '/eureka-vue/service/getSavedService',
    method: 'get'
  })
}
