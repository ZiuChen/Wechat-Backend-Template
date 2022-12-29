const { readFile, writeFile } = require('fs')
const rp = require('request-promise-native')

const config = require('../config')

const api = {
  accessToken: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential',
  createMenu: 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=',
  deleteMenu: 'https://api.weixin.qq.com/cgi-bin/menu/delete?access_token='
}

class Wechat {
  constructor() {
    this.fetchAccessToken()
  }

  async request(options) {
    options = Object.assign({}, options, { json: true })
    try {
      const response = await rp(options)
      return response
    } catch (error) {
      console.error(error)
    }
  }

  async fetchAccessToken() {
    const url = api.accessToken + '&appid=' + config.appID + '&secret=' + config.appsecret

    const data = await this.request({ url: url })
    const now = new Date().getTime()
    const expiresIn = now + (data.expires_in - 20) * 1000 // 20 seconds before expiration

    data.expires_in = expiresIn

    return data
  }

  async saveAccessToken(data) {
    data = JSON.stringify(data)
    return new Promise((resolve, reject) => {
      writeFile('./accessToken.txt', data, (err) => {
        if (!err) {
          console.log('File saved.')
          resolve()
        } else {
          reject('saveAccessToken failed.')
        }
      })
    })
  }

  async readAccessToken() {
    return new Promise((resolve, reject) => {
      readFile('./accessToken.txt', (err, data) => {
        if (!err) {
          data = JSON.parse(data)
          resolve(data)
        } else {
          reject('readAccessToken failed.')
        }
      })
    })
  }

  isValidAccessToken(data) {
    if (!data && !data.access_token && !data.expires_in) {
      return false
    }

    const expiresIn = data.expires_in
    const now = new Date().getTime()

    return now < expiresIn
  }

  async getAccessToken() {
    try {
      const data = await this.readAccessToken()
      if (this.isValidAccessToken(data)) {
        return data
      } else {
        const data = await this.fetchAccessToken()
        await this.saveAccessToken(data)
        return data
      }
    } catch (error) {
      // read file failed or file does not exist
      // fetch access token
      const data = await this.fetchAccessToken()
      await this.saveAccessToken(data)
      return data
    }
  }

  async createMenu(menu) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.getAccessToken()
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
      .then((data) =>
        rp({
          method: 'POST',
          url: api.createMenu + data.access_token,
          json: true,
          body: menu
        })
      )
      .catch((err) => console.error(err))
  }

  async deleteMenu() {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.getAccessToken()
        console.log(data)
        resolve(data)
      } catch (error) {
        reject(error)
      }
    }).then((data) =>
      rp({
        method: 'GET',
        url: api.deleteMenu + data.access_token,
        json: true
      })
    )
  }
}

module.exports = Wechat
