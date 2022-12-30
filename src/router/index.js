const express = require('express')
const sha1 = require('sha1')

const Router = express.Router
const router = new Router()

const Wechat = require('../wechat/wechat')
const { appID, url } = require('../config')

router.get('/search', async (req, res) => {
  /*
    生成js-sdk使用的签名
      1. 组合四个参数 jsapi_ticket noncestr timestamp url
      2. 字典序排序 '&'拼接
      3. sha1签名 生成signature
   */
  const w = new Wechat()
  const { ticket } = await w.getTicket()
  const noncestr = Math.random().toString().split('.')[1]
  const timestamp = Date.now()

  const str = [
    `jsapi_ticket=${ticket}`,
    `noncestr=${noncestr}`,
    `timestamp=${timestamp}`,
    `url=${url}/search`
  ]
    .sort()
    .join('&')

  const signature = sha1(str)

  res.render('search', {
    appID,
    signature,
    noncestr,
    timestamp
  })
})

module.exports = router
