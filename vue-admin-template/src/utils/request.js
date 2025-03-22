import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // 在请求头中携带 token
      config.headers['sa-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // 如果状态码不是200,说明请求出现错误
    if (res.code !== 200) {
      // 根据不同的错误码显示不同的错误信息
      switch (res.code) {
        case 40000:
          Message({
            message: '请求参数错误',
            type: 'error',
            duration: 5 * 1000
          })
          break

        case 40100:
          MessageBox.confirm(
            '登录状态已过期，请重新登录',
            '系统提示',
            {
              confirmButtonText: '重新登录',
              cancelButtonText: '取消',
              type: 'warning'
            }
          ).then(() => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          })
          break

        case 40101:
          Message({
            message: '对不起，您没有该操作权限',
            type: 'error',
            duration: 5 * 1000
          })
          break

        case 40400:
          Message({
            message: '请求的数据不存在',
            type: 'error',
            duration: 5 * 1000
          })
          break

        case 40300:
          Message({
            message: '禁止访问',
            type: 'error',
            duration: 5 * 1000
          })
          break

        case 50000:
          Message({
            message: '系统内部错误',
            type: 'error',
            duration: 5 * 1000
          })
          break

        case 50001:
          Message({
            message: '操作失败',
            type: 'error',
            duration: 5 * 1000
          })
          break

        default:
          Message({
            message: res.message || '未知错误',
            type: 'error',
            duration: 5 * 1000
          })
      }
      return Promise.reject(new Error(res.message || '错误'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message || '请求失败',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
