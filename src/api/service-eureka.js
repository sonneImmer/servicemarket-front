import request from '@/utils/request_eureka'

export function feachServiceList() {
  return request({
    url: '/apps',
    method: 'get'
  })
}

export function feachServiceDetail(appName) {
  return request({
    url: '/apps/' + appName,
    method: 'get'
  })
}
