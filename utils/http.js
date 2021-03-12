import { apiConstants } from '../config.js'
import { getToken } from '../utils/catch'
/**
 * 发起get请求
 * @param url 请求路径 必填
 * @param data 请求参数 get请求的参数会自动拼到地址后面
 * @param headers 请求头 选填
 * @returns {Promise}
 */
export const get = (url, data, headers) => request('GET', url, data, headers)

/**
 * 发起post请求
 * @param url 请求路径 必填
 * @param data 请求参数
 * @param headers 请求头 选填
 * @returns {Promise}
 */
export const post = (url, data, headers) => request('POST', url, data, headers)
/**
 * 发起put请求
 * @param url 请求路径 必填
 * @param data 请求参数
 * @param headers 请求头 选填
 * @returns {Promise}
 */
export const put = (url, data, headers) => request('PUT', url, data, headers)
/**
 * 发起delete请求
 * @param url 请求路径 必填
 * @param data 请求参数 delete请求的参数会自动拼到地址后面
 * @param headers 请求头 选填
 * @returns {Promise}
 */
export const del = (url, data, headers) => request('DELETE', url, data, headers)

/**
 * 接口请求基类方法
 * @param method 请求方法 必填
 * @param url 请求路径 必填
 * @param data 请求参数
 * @param header 请求头 选填
 * @returns {Promise}
 */
const baseApi = apiConstants.BASE_API

export function request(
  method,
  url,
  data,
  header = header
    ? header
    : {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: getToken(),
      }
) {
  console.log('baseApi----', getApp().globalData.token)
  console.group('==============>新请求<==============')
  console.info(method, url)
  if (data) console.info('参数：', data)
  url = apiConstants.BASE_API + url
  return new Promise((resolve, reject) => {
    const response = {}
    wx.request({
      url,
      method,
      data,
      header,
      success: (res) => (response.success = res.data),
      fail: (error) => (response.fail = error),
      complete() {
        if (response.success) {
          console.info('请求成功：', response.success)
          if (response.success.code === 200) {
            resolve(response.success.data)
          } else if (response.success.code === 401) {
            toLogin()
          } else {
            reject(response.success)
            console.info('请求失败：', response.success)
          }
        } else {
          console.info('请求失败：', response.fail)
          reject(response.fail)
        }
      },
    })
  })
}

function toLogin() {
  wx.navigateTo({
    url: '/pages/login/index',
  })
}
