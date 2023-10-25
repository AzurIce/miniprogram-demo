// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const {
    postId,
    content
  } = event

  try {
    const res = await db.collection('comment').add({
      data: {
        _openid: wxContext.OPENID,
        commenter: wxContext.OPENID,
        postId,
        content
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