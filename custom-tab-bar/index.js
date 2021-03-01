Component({
	data: {
		selected: 0,
		color: "#7A7E83",
		selectedColor: "#3cc51f",
		list: [{
			pagePath: "/pages/index/index",
			iconPath: "/resources/images/home-def.png",
			selectedIconPath: "/resources/images/home-sel.png"
		}, {
			pagePath: "/pages/cate/cate",
			iconPath: "/resources/images/cate-def.png",
			selectedIconPath: "/resources/images/cate-sel.png",
		}, {
			pagePath: "/pages/shopcar/shopcar",
			iconPath: "/resources/images/cart-def.png",
			selectedIconPath: "/resources/images/cart-sel.png"
		}, {
			pagePath: "/pages/mine/mine",
			iconPath: "/resources/images/me-def.png",
			selectedIconPath: "/resources/images/me-sel.png"
		}]
	},
	attached() {},
	methods: {
		switchTab(e) {
			const data = e.currentTarget.dataset
			// this.setData({
			// 	selected: data.index
			// })
			const url = data.path
			wx.switchTab({
				url
			})
			// console.log('data.index', data.index, this.selected)

		}
	}
})
