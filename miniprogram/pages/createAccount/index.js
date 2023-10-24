// pages/createAccount/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '',
    avatarUrl: '',
    birthDate: '',
    genderIndex: 0,
    genderRange: ['男', '女']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      nickName: options.nickName,
      avatarUrl: options.avatarUrl,
    })
    console.log('[pages/createAccount/onLoad]: ', options)
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

  },

  onGetUserInfo() {
    const userProfile = wx.getUserProfile({
      desc: 'desc',
      lang: 'zh_CN',
      success: (result) => {
        console.log(result)
      },
      fail: (err) => {
        console.error(err)
      },
      complete: (res) => {},
    })
  },

  bindGenderChange(e) {
    // console.log(e.detail)
    this.setData({
      genderIndex: e.detail.value
    })
  },
  bindDateChange(e) {
    console.log(e)
    this.setData({
      birthDate: e.detail.value
    })
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
    })
  },
  onSubmit() {
    if (!this.data.nickName.length || !this.data.birthDate.length)
    wx.cloud.callFunction({
      name: 'createUser',
      data: {
        nickName: this.data.nickName,
        avatarUrl: this.data.avatarUrl,
        gender: this.data.genderRange[this.data.genderIndex],
        birthDate: this.data.birthDate
      }
    })
  }
})