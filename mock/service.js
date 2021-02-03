const Mock = require('mockjs')

const List = []
const count = 100

const baseContent = '<p>Finally you find me, Baka.</p>'

for (let i = 0; i <= count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    onlineDate: +Mock.Random.date('T'),
    serviceName: '@string',
    serviceCompany: '@name',
    serviceDescribe: '',
    'serviceStatus|1': ['online', 'offline', 'inchecking']
  }))
}

module.exports = [
  {
    url: '/vue-element-admin/service/list',
    type: 'get',
    response: config => {
      const { serviceName, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (serviceName && item.serviceName.indexOf(serviceName) < 0) return false
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
