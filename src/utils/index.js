const xml2js = require('xml2js')
const { readFile, writeFile } = require('fs')

module.exports = {
  // get user data
  getUserDataAsync(req) {
    let xmlData = ''

    return new Promise((resolve, reject) => {
      req
        .on('data', (data) => {
          // transfer buffer to string
          xmlData += data.toString()
        })
        .on('end', () => {
          // receive finished
          resolve(xmlData)
        })
    })
  },

  // parse xml data to js object
  parseXMLAsync(xmlData) {
    return new Promise((resolve, reject) => {
      xml2js.parseString(xmlData, { trim: true }, (err, data) => {
        if (!err) {
          resolve(data)
        } else {
          reject('parseXMLAsync error: ' + err)
        }
      })
    })
  },

  // format js object
  formatMessage(jsData) {
    let message = {}

    jsData = jsData.xml

    if (typeof jsData === 'object') {
      for (let key in jsData) {
        let value = jsData[key]

        if (Array.isArray(value) && value.length > 0) {
          message[key] = value[0]
        }
      }
    }

    return message
  },

  async writeFileAsync(path, data) {
    return new Promise((resolve, reject) => {
      writeFile(path, data, (err) => {
        if (!err) {
          console.log('File saved.')
          resolve()
        } else {
          reject('File save failed.')
        }
      })
    })
  },

  async readFileAsync(path) {
    return new Promise((resolve, reject) => {
      readFile(path, (err, data) => {
        if (!err) {
          resolve(data)
        } else {
          reject('Read file failed.')
        }
      })
    })
  }
}
