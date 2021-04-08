import request from '@/utils/request_spring'

export function feachUploadJar(data) {
  return request({
    url: '/uploadContract',
    method: 'post',
    data: data
  })
}

export function feachAction(action, contractAddr, partyName) {
  return request({
    url: '/' + action,
    method: 'get',
    params: {
      'contractAddr': contractAddr,
      'partyName': partyName
    }
  })
}

export function feachExecuteAction(query, json) {
  return request({
    url: '/executeContract',
    method: 'post',
    params: query,
    data: json
  })
}
