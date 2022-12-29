const template = require('./template')
const reply = require('./reply')

module.exports = async ({ req, res, message }) => {
  const options = reply(message)
  console.log(options)

  res.send(template(options))
}
