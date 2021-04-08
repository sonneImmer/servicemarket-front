import request from '@/utils/request_service'

export function feachHello(query) {
  return request({
    url: '/hello',
    method: 'get',
    params: query
  })
}

export function feachExecuteService(action, json) {
  return request({
    url: '/' + action,
    method: 'post',
    data: json
  })
}
