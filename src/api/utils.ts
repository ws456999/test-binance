// import Message from 'iview/src/components/message'
// import Loading from 'iview/src/components/loading-bar'
// import store from 'store'
// import router from 'router'
// import { format } from 'filters'
import {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'

// progress
export const apiConfig = {
  count: 0
}

export function addInterceptor (target: AxiosInstance) {
  target.interceptors.request.use(requestHandle)
  target.interceptors.response.use(responseHandle)
  return target
}
// request 处理
export function requestHandle (req: AxiosRequestConfig) {
  // progress 进度条 start
  apiConfig.count++
  // Loading.start()

  // req.headers['Access-Control-Allow-Origin'] = '*'
  // req.headers['X-MBX-APIKEY'] = '123'
  // console.log(req)
  return req
}

// response 处理
export function responseHandle (res: AxiosResponse) {
  const isError = res instanceof Error
  // if (isError) return errorHandle(res.response, res.config)
  if (isError) {
    console.log('ooops')
    return res
  }
  console.log(res)
  return res.data
}

// 错误处理
// function errorHandle (response, config) {

//   if (response.response.status === 401) return handle401(response)
//   if (response.response.status === 403) return handle403(response)

//   Message.error(_.get(response, 'response.data.message') || '未知错误')
//   return Promise.reject(response)
// }

// function handle401 (response) {
//   router.push({name: 'login'})
//   store._actions.logout[0]()
//   Message.error(_.get(response, 'response.statusText') || '未知错误')
//   return Promise.reject(response)
// }

// function handle403 (response) {
//   Message.error(_.get(response, 'response.statusText') || '未知错误')
//   return Promise.reject(response)
// }
