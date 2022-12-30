const express = require('express')
const auth = require('./src/wechat/auth')
const app = express()

// 配置模板资源目录
app.set('views', './src/views')
// 配置模板引擎
app.set('view engine', 'ejs')
// 页面路由
app.get('/search', (req, res) => {
  res.render('search')
})

app.use(auth())

app.listen(9000, () => {
  console.log('Server is listening on port 9000')
})
