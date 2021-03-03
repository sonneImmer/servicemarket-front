const Mock = require('mockjs')

const List = []
const count = 100
let i = 0
const myPurchasedService = []

const baseContent = '<p>Finally you find me, Baka.</p>'

for (i = 1; i <= count; i++) {
  List.push(Mock.mock({
    id: i,
    online_time: +Mock.Random.date('T'),
    service_name: '@string',
    service_company: '@name',
    service_details: 'This Service id is ' + i,
    content_short: '',
    source_uri: '',
    image_uri: '',
    'service_status|1': ['online', 'offline', 'checking']
  }))
}

module.exports = [
  {
    url: '/vue-element-admin/service/list',
    type: 'get',
    response: config => {
      const { service_name, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (service_name && item.service_name.indexOf(service_name) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },
  {
    url: '/vue-element-admin/service/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const service of List) {
        if (service.id === +id) {
          return {
            code: 20000,
            data: service
          }
        }
      }
    }
  },
  {
    url: '/vue-element-admin/service/createService',
    type: 'get',
    response: config => {
      const { service_status,
        service_name,
        service_company,
        service_details,
        content_short,
        source_uri,
        image_uri,
        online_time } = config.query

      List.push(Mock.mock({
        id: i,
        online_time: online_time,
        service_name: service_name,
        service_company: service_company,
        service_details: service_details,
        content_short: content_short,
        source_uri: source_uri,
        image_uri: image_uri,
        service_status: service_status
      }))
      i++

      return {
        code: 20000,
        data: true
      }
    }
  },
  {
    url: '/vue-element-admin/service/purchaseService',
    type: 'get',
    response: config => {
      const { id } = config.query
      myPurchasedService.push(id)
      return {
        code: 20000,
        data: true
      }
    }
  },
  {
    url: '/vue-element-admin/service/getPurchasedService',
    type: 'get',
    response: config => {
      const { uid } = config.query
      const list = []
      for (const serviceId of myPurchasedService) {
        for (const service of List) {
          // eslint-disable-next-line eqeqeq
          if (service.id == serviceId) {
            list.push(service)
            break
          }
        }
      }
      return {
        code: 20000,
        data: list
      }
    }
  }
]
