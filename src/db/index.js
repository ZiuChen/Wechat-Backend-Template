require('dotenv').config()
const mysql = require('mysql')

const USER_FORM_NAME = 'userinfo'

const pool = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  port: process.env.port
})

const getUserInfo = (openid) => {
  console.log('getUserInfo', openid)
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM ${USER_FORM_NAME} WHERE openid = ?`, [openid], (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

module.exports = {
  getUserInfo
}
