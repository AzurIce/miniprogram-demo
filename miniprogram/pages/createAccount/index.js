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
    genderRange: ['男', '女'],
    submitting: false
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
    const {
      avatarUrl
    } = e.detail
    this.setData({
      avatarUrl,
    })
  },
  onSubmit() {
    if (!this.data.nickName.length || !this.data.birthDate.length) {
      console.log("some thing empty")
      return
    }
    this.setData({submitting: true})
    wx.cloud.callFunction({
      name: 'createUser',
      data: {
        nickName: this.data.nickName,
        avatarUrl: this.data.avatarUrl,
        gender: this.data.genderRange[this.data.genderIndex],
        birthDate: this.data.birthDate
      }
    }).then((res) => {
      console.log(res)
      this.setData({submitting: false})
      wx.reLaunch({
        url: '/pages/index/index',
      })
    }).catch((err) => {
      console.error(err)
      this.setData({submitting: false})
    })
  }
})