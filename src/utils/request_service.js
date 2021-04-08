import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_SERVICE, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  headers: { 'Content-Type': 'application/form-data', 'Accept': 'application/json' },
  timeout: 50000 // request timeout

})

export default service
