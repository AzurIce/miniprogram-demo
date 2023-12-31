// index.js
// const app = getApp()
const {
  envList
} = require('../../envList.js');

Page({
  data: {
    showUploadTip: false,
    powerList: [{
      title: '云函数',
      tip: '安全、免鉴权运行业务代码',
      showItem: false,
      item: [{
          title: '获取OpenId',
          page: 'getOpenId'
        },
        //  {
        //   title: '微信支付'
        // },
        {
          title: '生成小程序码',
          page: 'getMiniProgramCode'
        },
        // {
        //   title: '发送订阅消息',
        // }
      ]
    }, {
      title: '数据库',
      tip: '安全稳定的文档型数据库',
      showItem: false,
      item: [{
        title: '创建集合',
        page: 'createCollection'
      }, {
        title: '更新记录',
        page: 'updateRecord'
      }, {
        title: '查询记录',
        page: 'selectRecord'
      }, {
        title: '聚合操作',
        page: 'sumRecord'
      }]
    }, {
      title: '云存储',
      tip: '自带CDN加速文件存储',
      showItem: false,
      item: [{
        title: '上传文件',
        page: 'uploadFile'
      }]
    }, {
      title: '云托管',
      tip: '不限语言的全托管容器服务',
      showItem: false,
      item: [{
        title: '部署服务',
        page: 'deployService'
      }]
    }],
    envList,
    selectedEnv: envList[0],
    haveCreateCollection: false,
    loading: true,
    loggedIn: false,
    posts: []
  },

  onLoad: async function () {
    wx.cloud.callFunction({
      name: 'getUserInfo'
    }).then(() => {
      this.setData({
        loggedIn: true,
        loading: false
      })
    }).catch(() => {
      this.setData({
        loggedIn: false,
        loading: false
      })
    })
  },

  onShow: async function() {
    // console.log("onShow")
    wx.cloud.callFunction({
      name: 'getPosts'
    }).then((res) => {
      console.log(res)
      this.setData({
        posts: res.result
      })
    })
  },

  onLogin: async function () {
    /*
      检查用户是否存在
      - 存在 -> 直接获取用户信息存储到 app 的 globalData 中
      - 不存在 -> 获取用户名头像，并带参跳转到创建用户页面 -> 提交到云函数创建用户 -> 跳转回 index
    */
    console.log('[pages/index/onLogin]: User not exist, getting user profile...')
    wx.getUserProfile({
      desc: 'desc',
      lang: 'zh_CN',
      success: (result) => {
        console.log('[pages/index/onLogin]: User profile: ', result)
        wx.redirectTo({
          url: `/pages/createAccount/index?nickName=${result.userInfo.nickName}&avatarUrl=${result.userInfo.avatarUrl}`,
        })
      },
      fail: (err) => {
        console.error(err)
      },
      complete: (res) => {},
    })
  },

  onCreatePost() {
    wx.navigateTo({
      url: '/pages/createPost/index',
      success: (res) => {
        console.log(res)
      },
      fail: (err) => {
        console.error(err)
      }
    })
  },

  enterPost(e) {
    const postId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/post/index?id=${postId}`,
    })
  },

  // onGetUserProfile() {
  //   const userProfile = wx.getUserProfile({
  //     desc: 'desc',
  //     lang: 'zh_CN',
  //     success: (result) => {
  //       console.log(result)
  //     },
  //     fail: (err) => {
  //       console.error(err)
  //     },
  //     complete: (res) => {},
  //   })
  //   console.log(userProfile)
  // },

  onClickPowerInfo(e) {
    const index = e.currentTarget.dataset.index;
    const powerList = this.data.powerList;
    powerList[index].showItem = !powerList[index].showItem;
    if (powerList[index].title === '数据库' && !this.data.haveCreateCollection) {
      this.onClickDatabase(powerList);
    } else {
      this.setData({
        powerList
      });
    }
  },

  onChangeShowEnvChoose() {
    wx.showActionSheet({
      itemList: this.data.envList.map(i => i.alias),
      success: (res) => {
        this.onChangeSelectedEnv(res.tapIndex);
      },
      fail(res) {
        console.log(res.errMsg);
      }
    });
  },

  onChangeSelectedEnv(index) {
    if (this.data.selectedEnv.envId === this.data.envList[index].envId) {
      return;
    }
    const powerList = this.data.powerList;
    powerList.forEach(i => {
      i.showItem = false;
    });
    this.setData({
      selectedEnv: this.data.envList[index],
      powerList,
      haveCreateCollection: false
    });
  },

  jumpPage(e) {
    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.page}/index?envId=${this.data.selectedEnv.envId}`,
    });
  },

  onClickDatabase(powerList) {
    wx.showLoading({
      title: '',
    });
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.selectedEnv.envId
      },
      data: {
        type: 'createCollection'
      }
    }).then((resp) => {
      if (resp.result.success) {
        this.setData({
          haveCreateCollection: true
        });
      }
      this.setData({
        powerList
      });
      wx.hideLoading();
    }).catch((e) => {
      console.log(e);
      this.setData({
        showUploadTip: true
      });
      wx.hideLoading();
    });
  }
});