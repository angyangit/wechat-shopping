const arraysCom = require('../../utils/cityArray')
const arrays = arraysCom.getAreaInfo()
import {
  addressAdd,
  addressUpdate,
  addressList,
  addressDetail,
  addressDelete,
} from '../../utils/api'
import { cache } from '../../config'
Page({
  data: {
    memberId: wx.getStorageSync(cache.MEMBER_INFO).id,
    name: '',
    phoneNumber: '',
    defaultStatus: 0,
    postCode: '',
    province: '',
    city: '',
    region: '',
    detailAddress: '',
    citysIndex: [0, 0, 0],
    cityArray: null,
    ssq: '',
    title: '添加地址',
    editItem: null,
    isDef: false,
  },
  onLoad: function (options) {
    if (options && options.item) {
      this.setData({
        editItem: JSON.parse(options.item),
      })
    }

    var that = this
    if (wx.getStorageSync('global_cityData')) {
      var cityArray = wx.getStorageSync('global_cityData')
    } else {
      //定义三列空数组
      var cityArray = [[], [], []]
      for (let i = 0, len = arrays.length; i < len; i++) {
        switch (arrays[i]['level']) {
          case 1:
            //第一列
            cityArray[0].push(arrays[i]['name'])
            break
          case 2:
            //第二列(默认由第一列第一个关联)
            if (arrays[i]['sheng'] == arrays[0]['sheng']) {
              cityArray[1].push(arrays[i]['name'])
            }
            break
          case 3:
            //第三列(默认第一列第一个、第二列第一个关联)
            if (
              arrays[i]['sheng'] == arrays[0]['sheng'] &&
              arrays[i]['di'] == arrays[1]['di']
            ) {
              cityArray[2].push(arrays[i]['name'])
            }
            break
        }
      }
      wx.setStorageSync('global_cityData', cityArray)
    }

    that.setData({
      cityArray: cityArray,
    })
  },
  onReady() {
    if (!this.data.editItem) {
      this.setData({
        title: '添加地址',
      })
      return
    }
    this.handlerUI(this.data.editItem)
  },
  handlerUI(address) {
    if (address) {
      this.setData({
        title: '修改地址',
        name: address.name,
        phoneNumber: address.phoneNumber,
        defaultStatus: address.defaultStatus,
        postCode: address.postCode,
        province: address.province,
        city: address.city,
        isDef: address.defaultStatus === 1 ? true : false,
        region: address.region,
        memberId: address.memberId,
        detailAddress: address.detailAddress,
        ssq: address.province + address.city + address.region,
      })
    }
  },
  switch(e) {
    this.setData({
      defaultStatus: e.detail.value ? 1 : 0,
    })
  },
  editAddress() {
    let param = {
      memberId: this.data.memberId,
      name: this.data.name,
      phoneNumber: this.data.phoneNumber,
      defaultStatus: this.data.defaultStatus,
      postCode: this.data.postCode,
      province: this.data.province,
      city: this.data.city,
      region: this.data.region,
      detailAddress: this.data.detailAddress,
    }
    if (!this.data.memberId || !this.data.name || !this.data.phoneNumber) {
      console.log(this.data.memberId, this.data.name, this.data.phoneNumber)
      wx.showToast({
        title: '请信息填写完整',
        icon: 'none',
      })
      return
    }
    if (this.data.editItem) {
      addressUpdate(this.data.editItem.id, param).then((res) => {
        wx.navigateBack({
          delta: 1,
        })
      })
    } else {
      addressAdd(param).then((res) => {
        wx.navigateBack({
          delta: 1,
        })
      })
    }
    console.log('param', this.data.editItem)
  },
  delAddress() {
    addressDelete(this.data.editItem.id).then((res) => {
      wx.navigateBack({
        delta: 1,
      })
    })
  },
  toMap() {
    wx.navigateTo({
      url: '/pages/address-map/index',
    })
  },
  bindNameInput: function (e) {
    this.setData({
      name: e.detail.value,
    })
  },
  bindConcatInput: function (e) {
    this.setData({
      phoneNumber: e.detail.value,
    })
  },
  bindpostCodeInput: function (e) {
    this.setData({
      postCode: e.detail.value,
    })
  },
  bindDetailAddressInput: function (e) {
    this.setData({
      detailAddress: e.detail.value,
    })
  },

  func_changeCitysChange: function (e) {
    var that = this
    var cityArray = that.data.cityArray

    var address = ''
    if (that.data.ssq == undefined) {
      //下面方法中没有设置ssq，应该给它默认值 ，此时citysIndex相当于[0,0,0]
      var citysIndex = that.data.citysIndex
      for (let i in citysIndex) {
        address += cityArray[i][citysIndex[i]]
      }
    } else {
      address = that.data.ssq
    }
    let cIndex = that.data.citysIndex
    this.setData({
      province: cityArray[0][cIndex[0]],
      city: cityArray[1][cIndex[1]],
      region: cityArray[2][cIndex[2]],
      ssq:
        cityArray[0][cIndex[0]] +
        cityArray[1][cIndex[1]] +
        cityArray[2][cIndex[2]],
    })
  },
  func_changeCitysChangeColumn: function (e) {
    var that = this
    var cityArray = that.data.cityArray

    var list1 = [] //存放第二列数据，即市的列
    var list2 = [] //存放第三列数据，即区的列

    var citysIndex = []
    //主要是注意地址文件中的字段关系，省、市、区关联的字段有 sheng、di、level
    switch (e.detail.column) {
      case 0:
        //滑动左列
        for (let i = 0, len = arrays.length; i < len; i++) {
          if (arrays[i]['name'] == cityArray[0][e.detail.value]) {
            var sheng = arrays[i]['sheng']
          }
          if (arrays[i]['sheng'] == sheng && arrays[i]['level'] == 2) {
            list1.push(arrays[i]['name'])
          }
          if (
            arrays[i]['sheng'] == sheng &&
            arrays[i]['level'] == 3 &&
            arrays[i]['di'] == arrays[1]['di']
          ) {
            list2.push(arrays[i]['name'])
          }
        }

        citysIndex = [e.detail.value, 0, 0]
        var ssq = cityArray[0][e.detail.value] + list1[0] + list2[0] + ''

        that.setData({
          global_sheng: sheng,
        })
        break
      case 1:
        //滑动中列
        var di
        var sheng = that.data.global_sheng
        list1 = cityArray[1]
        for (let i = 0, len = arrays.length; i < len; i++) {
          if (arrays[i]['name'] == cityArray[1][e.detail.value]) {
            di = arrays[i]['di']
          }
        }
        for (let i = 0, len = arrays.length; i < len; i++) {
          if (
            arrays[i]['sheng'] == sheng &&
            arrays[i]['level'] == 3 &&
            arrays[i]['di'] == di
          ) {
            list2.push(arrays[i]['name'])
          }
        }
        citysIndex = [that.data.citysIndex[0], e.detail.value, 0]

        var ssq =
          cityArray[0][that.data.citysIndex[0]] +
          list1[e.detail.value] +
          list2[0] +
          ''
        break
      case 2:
        //滑动右列
        list1 = cityArray[1]
        list2 = cityArray[2]
        citysIndex = [
          that.data.citysIndex[0],
          that.data.citysIndex[1],
          e.detail.value,
        ]
        var ssq =
          cityArray[0][that.data.citysIndex[0]] +
          list1[that.data.citysIndex[1]] +
          list2[e.detail.value] +
          ''
        break
    }
    that.setData({
      'cityArray[1]': list1, //重新赋值中列数组，即联动了市
      'cityArray[2]': list2, //重新赋值右列数组，即联动了区
      citysIndex: citysIndex, //更新索引
      ssq: ssq, //获取选中的省市区
    })
  },
})
