const sha1 = require('sha1')

const config = require('../config')
const { getUserDataAsync, parseXMLAsync, formatMessage } = require('../utils')

const template = require('./template')
const reply = require('./reply')

module.exports = () => {
  return async (req, res, next) => {
    const { signature, echostr, timestamp, nonce } = req.query
    const { token } = config
    const str = [token, timestamp, nonce].sort().join('')
    const sha = sha1(str) // sha1加密

    // only GET / POST method is allowed
    // verify the signature of wechat server
    if (req.method === 'GET') {
      if (sha === signature) {
        res.send(echostr)
      } else {
        res.end('Error')
      }
    } else if (req.method === 'POST') {
      if (sha !== signature) {
        res.end('Error')
        return false
      }

      // get user data
      const xmlData = await getUserDataAsync(req)

      // parse xml data to js object
      const jsData = await parseXMLAsync(xmlData)

      // format js object
      const message = formatMessage(jsData)

      console.log(JSON.stringify(message))

      // handle message
      const options = reply(message)
      console.log(options)

      res.send(template(options))
    } else {
      res.end('Error')
    }

    // if no response, the wechat server will send the request again and again
    // res.end('') // this is not working
    res.end('')
  }
}
