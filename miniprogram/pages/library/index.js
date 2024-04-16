// pages/library/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    books: ["身体的秘密", "女科撮要", "女生呵护指南", "健康守护全书", "中医妇科学", "中医四小经典"],
    results: []
  },

  onSearch() {
    if (!this.data.value) {
      return
    }
    console.log(this.data.value)
    wx.cloud.callFunction({
      name: 'search',
      data: {
        content: this.data.value,
      }
    }).then((res) => {
      console.log("search: ", res)
      let res2 = res.result;
      const regExp = new RegExp(this.data.value, 'g')
      res2 = res2.map((r) => {
        r.content = r.content.replace(regExp, `<span style="color: #BD5C01;">${this.data.value}</span>`)
        return r
      })
      console.log(res2[0])

      this.setData({
        results: res2,
      })
    }).catch((err) => {
      console.error("search failed: ", err)
    })
  },

  onChange(e) {
    this.setData({
      value: e.detail,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})