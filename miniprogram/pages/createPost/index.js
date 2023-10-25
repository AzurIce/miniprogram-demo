// pages/createPost/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    content: '',
    submitting: false
  },

  onSubmit() {
    if (!this.data.title.length || !this.data.content.length) {
      return
    }
    // console.log("submit")
    wx.cloud.callFunction({
      name: 'createPost',
      data: {
        title: this.data.title,
        content: this.data.content
      }
    }).then((res) => {
      console.log(res)
      wx.navigateBack()
    }).catch((err) => {
      console.error(err)
      wx.showToast({
        title: err,
      })
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