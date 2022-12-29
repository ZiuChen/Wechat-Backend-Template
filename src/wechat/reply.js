/**
 * 根据用户消息被动回复内容
 */

module.exports = (message) => {
  const openid = message.FromUserName

  const options = {
    ToUserName: message.FromUserName,
    FromUserName: message.ToUserName,
    CreateTime: Date.now()
  }

  if (message.MsgType === 'text') {
    if (message.Content === 'ping') {
      options.MsgType = 'text'
      options.Content = 'pong'
    } else {
      options.MsgType = 'text'
      options.Content = message.Content
    }
  } else if (message.MsgType === 'image') {
    console.log('image')
    // 将原图片返回给用户
    options.MsgType = 'image'
    options.MediaId = message.MediaId
  } else if (message.MsgType === 'voice') {
    // 将原语音返回给用户
    options.MsgType = 'voice'
    options.MediaId = message.MediaId
    // 如果开启了语音识别功能 则会多出一个字段表示语音内容
    console.log(message?.Recognition)
  } else if (message.MsgType === 'location') {
    // 地理位置信息
    const msg = `维度: ${message.Location_X} 经度: ${message.Location_Y} 缩放大小: ${message.Scale} 位置信息: ${message.Label}`
    options.MsgType = 'text'
    options.Content = msg
  } else if (message.MsgType === 'event') {
    // 事件消息
    if (message.Event === 'subscribe') {
      // 关注事件
      options.MsgType = 'text'
      options.Content = '欢迎关注'

      // 通过扫描带参数的二维码关注
      if (message.EventKey === 'xxxxxxxxxx') {
        options.MsgType = 'text'
        options.Content = '欢迎扫描带参数的二维码关注'
      }
    } else if (message.Event === 'unsubscribe') {
      // 取消关注事件
      console.log('someone unsubscribed.')
    } else if (message.Event === 'SCAN') {
      // 用户已经关注过 扫描带参数的二维码
      options.MsgType = 'text'
      options.Content = '用户已经关注过 扫描带参数的二维码'
    } else if (message.Event === 'LOCATION') {
      // 上报地理位置事件 可以在后台设置上报间隔
      const msg = `维度: ${message.Latitude} 经度: ${message.Longitude} 精度: ${message.Precision}`
      options.MsgType = 'text'
      options.Content = msg
    } else if (message.Event === 'CLICK') {
      // 用户点击自定义菜单触发
      options.MsgType = 'text'
      options.Content = `您点击了按钮: ${message.EventKey}`
    }
  } else {
    options.MsgType = 'text'
    options.Content = '不支持的消息类型'
  }
  return options
}
