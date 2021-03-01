const APP_TOKEN = 'app_token'

const getToken = () => {
  return wx.getStorageSync(APP_TOKEN)
}
const setToken = (token) => {
  wx.setStorageSync(APP_TOKEN, token)
}

export { getToken, setToken }
