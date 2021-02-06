const Mock = require('mockjs')

const List = []
const count = 100

const baseContent = '<p>Finally you find me, Baka.</p>'

for (let i = 0; i <= count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    online_time: +Mock.Random.date('T'),
    service_name: '@string',
    service_company: '@name',
    service_details: '',
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
    response: () => {
      return {
        code: 20000,
        data: baseContent
      }
    }
  }
]
