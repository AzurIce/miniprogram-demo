// pages/post/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post: {
      title: '',
      content: ''
    },
    comments: [],
    comment: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.cloud.callFunction({
      name: 'getPost',
      data: {
        id: options.id
      }
    }).then((res) => {
      this.setData({
        post: res.result
      })
      this.updateComments()
    }).catch((err) => {
      console.error(err)
    })
    
  },

  onComment() {
    wx.cloud.callFunction({
      name: 'createComment',
      data: {
        postId: this.data.post._id,
        content: this.data.comment
      }
    }).then((res) => {
      this.setData({
        comment: ''
      })
      console.log(res)
      this.updateComments()
    }).catch((err) => {
      console.error(err)
    })
  },

  updateComments() {
    wx.cloud.callFunction({
      name: 'getPostComments',
      data: {
        postId: this.data.post._id
      }
    }).then((res) => {
      console.log(res)
      this.setData({
        comments: res.result
      })
    }).catch((err) => {
      console.error(err)
    })
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