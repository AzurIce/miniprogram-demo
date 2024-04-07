// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const $ = db.command.aggregate

  const {
    content,
  } = event

  // const MAX_LIMIT = 100
  // const countResult = await db.collection('library').count()
  // const total = countResult.total
  // // 计算需分几次取
  // const batchTimes = Math.ceil(total / 100)
  // // 承载所有读操作的 promise 的数组
  // const tasks = []
  // for (let i = 0; i < batchTimes; i++) {
  //   const promise = db.collection('library').skip(i * MAX_LIMIT).limit(MAX_LIMIT).where({
  //     content: db.RegExp({
  //       regexp: content,
  //       options: 'i',
  //     })
  //   }).get()
  //   tasks.push(promise)
  // }
  // // 等待所有
  // const res = (await Promise.all(tasks)).reduce((acc, cur) => {
  //   return acc.data.concat(cur.data)
  // })

  // console.log(res)

  // return res

  const res = await db.collection('library').where({
    content: db.RegExp({
      regexp: content,
      options: 'i',
    })
  }).get()

  console.log(res)

  const arr = res.data;
  return arr

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}