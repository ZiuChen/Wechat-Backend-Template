require('dotenv').config()

module.exports = {
  token: process.env.token,
  appID: process.env.TENCENTCLOUD_RUNENV ? process.env.appID : process.env.DEV_appID,
  appsecret: process.env.TENCENTCLOUD_RUNENV ? process.env.appsecret : process.env.DEV_appsecret
}
