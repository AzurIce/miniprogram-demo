// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

const users = cloud.database().collection('user')

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const {
    nickName,
    avatarUrl,
    birthDate,
    gender,
  } = event

  try {
    const res = users.add({
      data: {
        nickName,
        avatarUrl,
        birthDate,
        gender,
      }
    })

    console.log(res)
  } catch (e) {
    console.error(e)
  }


  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}