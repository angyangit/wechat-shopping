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
export const addShopCar = (data) => post(apiConstants.ADD_SHOP_CAR, data)
export const getCartList = () => get(apiConstants.SHOP_CAR_LIST)
export const shopCarUpdateQuantity = (data) =>
  get(apiConstants.SHOP_CAR_UPDATE_QUANTITY, data)
export const deleteCartItems = (data) =>
  post(apiConstants.SHOP_CAR_DELETE, data)
export const clearCart = () => post(apiConstants.SHOP_CAR_CLEAR)
export const productDetail = (id) => get(apiConstants.PRODUCT_DETAIL + `/${id}`)
