const config = {
  api_base_url: 'http://bl.7yue.pro/v1/',
  appkey: 'RdshydjBvcYZhMZC',
}

const constants = {
  STATUSBAR_HEIGHT: 'statusbar_height',
  WINDOW_WIDTH: 'window_width',
  TOOLBAR_HEIGHT: 'toolbar_height',
  MENUBUTTON_LEFT: 'menubutton_left',
}

const cache = {
  MEMBER_INFO: 'MEMBER_INFO',
}

const apiConstants = {
  BASE_API: 'https://www.angyangit.xyz',
  // BASE_API: 'http://localhost:8085',

  //首页内容页信息展示
  HOME_INFO: '/home/content',
  //分页获取推荐商品
  RECOMMEND_PRODUCT_LIST: '/home/recommendProductList',
  //获取首页商品分类
  PRODUCT_CATE_LIST: '/home/productCateList',
  //根据分类获取专题
  SUBJECT_LIST: '/home/subjectList',
  //分页获取人气推荐商品
  HOT_PRODUCT_LIST: '/home/hotProductList',
  //分页获取新品推荐商品
  NEW_PRODUCT_LIST: '/home/newProductList',
  //以树形结构获取所有商品分类
  CATEGORY_TREELIST: '/product/categoryTreeList',
  //综合搜索、筛选、排序
  PRODUCT_SEARCH: '/product/search',
  //获取前台商品详情
  PRODUCT_DETAIL: '/product/detail',
  //添加商品到购物车
  ADD_SHOP_CAR: '/cart/add',
  //获取某个会员的购物车列表
  SHOP_CAR_LIST: '/cart/list',
  SHOP_CAR_UPDATE_QUANTITY: '/cart/update/quantity',
  SHOP_CAR_DELETE: '/cart/delete',
  SHOP_CAR_CLEAR: '/cart/clear',
  //会员登录
  LOGIN: '/sso/login',
  //获取会员信息
  MEMBER_INFO: '/sso/info',
  //根据购物车信息生成确认单信息
  ORDER_CONFIRM: '/order/generateConfirmOrder',

  //品牌
  //分页获取推荐品牌
  BRAND_LIST: '/brand/recommendList',
  //分页获取品牌相关商品
  BRAND_PRODUCTLIST: '/brand/productList',
  //获取品牌详情
  BRAND_DETAIL: '/brand/detail',

  //收货地址
  ADDRESS_LIST: '/member/address/list',
  ADDRESS_UPDATE: '/member/address/update',
  ADDRESS_ADD: '/member/address/add',
  ADDRESS_DELETE: '/member/address/delete',
  ADDRESS_DETAIL: '/member/address',


  STATUSBAR_HEIGHT: 'STATUSBAR_HEIGHT',
  WINDOW_WIDTH: 'WINDOW_WIDTH',
  NAVBAR_HEIGHT: 'NAVBAR_HEIGHT',
  MENUBUTTON_LEFT: 'MENUBUTTON_LEFT',
}

const cateList = [
  { name: '京东超市', icon: '/resources/images/cate2.png' },
  { name: '京东服饰', icon: '/resources/images/cate0.png' },
  { name: '数码电器', icon: '/resources/images/cate1.png' },
  { name: '京东到家', icon: '/resources/images/cate4.jpg' },
  { name: '京东生鲜', icon: '/resources/images/cate5.png' },
  { name: '充值缴费', icon: '/resources/images/cate6.png' },
  { name: '9.9拼', icon: '/resources/images/cate7.png' },
  { name: '领券', icon: '/resources/images/cate8.jpg' },
  { name: 'PLUS会员', icon: '/resources/images/cate9.png' },
  { name: '京东国际', icon: '/resources/images/cate10.png' },
  { name: '京东拍卖', icon: '/resources/images/download-11.png' },
  { name: '玩3C', icon: '/resources/images/download-12.png' },
  { name: '沃尔玛', icon: '/resources/images/download-13.png' },
  { name: '美妆馆', icon: '/resources/images/download-14.png' },
  { name: '京东旅行', icon: '/resources/images/download-15.png' },
  { name: '拍拍二手', icon: '/resources/images/download-16.png' },
  { name: '京东到家', icon: '/resources/images/download-17.png' },
]

export { config, constants, apiConstants, cateList, cache }
