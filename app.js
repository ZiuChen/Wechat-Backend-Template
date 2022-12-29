const express = require('express')
const auth = require('./src/wechat/auth')
const app = express()

app.use(auth())

app.listen(9000, () => {
  console.log('Server is listening on port 9000')
})
