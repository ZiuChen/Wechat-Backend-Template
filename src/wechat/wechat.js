const rp = require('request-promise-native')

const config = require('../config')

const { readFileAsync, writeFileAsync } = require('../utils')
const api = require('../utils/api')

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
    const url = `${api.accessToken}&appid=${config.appID}&secret=${config.appsecret}`

    const data = await this.request({ url: url })
    const now = new Date().getTime()
    const expiresIn = now + (data.expires_in - 20) * 1000 // 20 seconds before expiration

    data.expires_in = expiresIn

    return data
  }

  async saveAccessToken(data) {
    data = JSON.stringify(data)
    return writeFileAsync('./accessToken.txt', data).catch((err) => console.error(err))
  }

  async readAccessToken() {
    return readFileAsync('./accessToken.txt')
      .then((data) => JSON.parse(data))
      .catch((err) => console.error(err))
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

  async fetchTicket() {
    const { access_token } = await this.getAccessToken()
    const url = `${api.ticket}&access_token=${access_token}`

    const data = await this.request({ url: url })
    const now = new Date().getTime()
    const expiresIn = now + (data.expires_in - 20) * 1000 // 20 seconds before expiration

    data.expires_in = expiresIn

    return data
  }

  async saveTicket(data) {
    data = JSON.stringify(data)
    return writeFileAsync('./ticket.txt', data).catch((err) => console.error(err))
  }

  async readTicket() {
    return readFileAsync('./ticket.txt')
      .then((data) => JSON.parse(data))
      .catch((err) => console.error(err))
  }

  isValidTicket(data) {
    if (!data && !data.ticket && !data.expires_in) {
      return false
    }

    const expiresIn = data.expires_in
    const now = new Date().getTime()

    return now < expiresIn
  }

  async getTicket() {
    try {
      const data = await this.readTicket()
      if (this.isValidTicket(data)) {
        return data
      } else {
        const data = await this.fetchTicket()
        await this.saveTicket(data)
        return data
      }
    } catch (error) {
      // read file failed or file does not exist
      // fetch ticket
      const data = await this.fetchTicket()
      await this.saveTicket(data)
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
          url: api.menu.create + 'access_token=' + data.access_token,
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
        resolve(data)
      } catch (error) {
        reject(error)
      }
    }).then((data) =>
      rp({
        method: 'GET',
        url: api.menu.delete + 'access_token=' + data.access_token,
        json: true
      })
    )
  }
}

module.exports = Wechat
