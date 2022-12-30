const express = require('express')
const router = require('./src/router')
const reply = require('./src/reply')
const app = express()

// 配置模板资源目录
app.set('views', './src/views')
// 配置模板引擎
app.set('view engine', 'ejs')
// 页面路由
app.use(router)
// 处理所有消息
app.use(reply())

app.listen(9000, () => {
  console.log('Server is listening on port 9000')
})
