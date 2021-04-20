const Mock = require('mockjs')

const List = []
const count = 100
let i = 0
const myPurchasedService = []
const mySavedService = []
let count_ticket = 1

// const baseContent = '<p>Finally you find me, Baka.</p>'

for (i = 1; i <= count; i++) {
  List.push(Mock.mock({
    id: i,
    online_time: '@datetime',
    service_name: '@title(1,2)',
    service_company: '@name',
    instance: {
      service_url: '@url(http)',
      service_details: 'This Service id is ' + i,
      content_short: '',
      'service_status|1': ['online', 'offline', 'checking']
    }
  }))
}

module.exports = [
  {
    url: '/eureka-vue/service/list',
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
    url: '/eureka-vue/service/detail',
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
    url: '/eureka-vue/service/createService',
    type: 'get',
    response: config => {
      const {
        online_time,
        service_name,
        service_company,
        service_url,
        service_details,
        content_short,
        service_status
      } = config.query

      List.push(Mock.mock({
        id: i,
        online_time: online_time,
        service_name: service_name,
        service_company: service_company,
        instance: {
          service_url: service_url,
          service_details: service_details,
          content_short: content_short,
          service_status: service_status
        }
      }))
      i++

      return {
        code: 20000,
        data: true
      }
    }
  },
  {
    url: '/eureka-vue/service/purchaseService',
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
    url: '/eureka-vue/service/saveOrder',
    type: 'post',
    response: config => {
      const { query } = config.body
      const obj = config.body
      mySavedService.push(Mock.mock({
        id: count_ticket,
        action: obj.action,
        departureTime: obj.departureTime,
        departure: obj.departure,
        destination: obj.destination,
        name: obj.name,
        order_time: obj.order_time,
        passenger_time: obj.passengerNum,
        ticketNumber: obj.ticketNumber,
        seatNumber: obj.seatNumber
      }))
      /* mySavedService.push(Mock.mock({
        id: count_ticket,
        action: query.action,
        departureTime: query.departureTime,
        departure: query.departure,
        destination: query.destination,
        name: query.name,
        order_time: query.order_time,
        passenger_time: query.passengerNum,
        ticketNum: query.ticketNum
      }))*/

      count_ticket++
      return {
        code: 20000,
        data: true
      }
    }
  },
  {
    url: '/eureka-vue/service/getSavedService',
    type: 'get',
    response: config => {
      // const { uid } = config.query
      /* const list = []
      for (const serviceId of myPurchasedService) {
        for (const service of List) {
          // eslint-disable-next-line eqeqeq
          if (service.id == serviceId) {
            list.push(service)
            break
          }
        }
      }*/
      return {
        code: 20000,
        data: mySavedService
      }
    }
  }
]
