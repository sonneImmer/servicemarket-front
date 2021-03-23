import request from '@/utils/request'

export function feachServiceList() {
  return request({
    url: '/apps',
    // url: 'http://localhost:8080/v2/apps/',
    method: 'get'
  })
}

export function feachServiceDetail(appName) {
  return request({
    url: '/apps/' + appName,
    method: 'get'
  })
}
