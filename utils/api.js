import { getToken } from '../utils/catch'
/**
 * 此文件管理项目所有接口
 */
import { get, post } from './http.js'
import { apiConstants } from '../config.js'

/**
 * 获取图片
 */
export const homeInfo = () => get(apiConstants.HOME_INFO)
export const brandList = (param) => get(apiConstants.BRAND_LIST, param)
export const recommendList = (param) =>
  get(apiConstants.RECOMMEND_PRODUCT_LIST, param)
export const cateList = () => get(apiConstants.CATEGORY_TREELIST)
export const productSearch = (param) => get(apiConstants.PRODUCT_SEARCH, param)
export const login = (param) => post(apiConstants.LOGIN, param)
export const getMemberInfo = () => get(apiConstants.MEMBER_INFO)
export const addShopCar = (data) =>
  post(apiConstants.ADD_SHOP_CAR, data, header)
export const getCartList = () => get(apiConstants.SHOP_CAR_LIST)
export const shopCarUpdateQuantity = (data) =>
  get(apiConstants.SHOP_CAR_UPDATE_QUANTITY, data)
export const deleteCartItems = (data) =>
  post(apiConstants.SHOP_CAR_DELETE, data)
export const clearCart = () => post(apiConstants.SHOP_CAR_CLEAR)
export const productDetail = (id) => get(apiConstants.PRODUCT_DETAIL + `/${id}`)
export const addressList = () => get(apiConstants.ADDRESS_LIST)
export const addressAdd = (data) => post(apiConstants.ADDRESS_ADD, data, header)
export const addressUpdate = (id, data) =>
  post(apiConstants.ADDRESS_UPDATE + `/${id}`, data, header)
export const addressDetail = (id) =>
  post(apiConstants.ADDRESS_DETAIL + `/${id}`)
export const addressDelete = (id) =>
  post(apiConstants.ADDRESS_DELETE + `/${id}`)

export const generateConfirmOrder = (data) =>
  post(apiConstants.ORDER_CONFIRM, data, header)

const header = {
  'Content-Type': 'application/json; charset=UTF-8',
  Authorization: getToken(),
}

const headerXml = {
  'Content-Type': 'application/x-www-form-urlencoded',
  Authorization: getToken(),
}
