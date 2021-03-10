import request from '@/utils/request'

export function feachServiceList_temp() {
  return request({
    url: '/apps',
    // url: 'http://localhost:8080/v2/apps/',
    method: 'get'
  })
}
