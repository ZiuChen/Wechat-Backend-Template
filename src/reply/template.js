// 返回给用户的消息

module.exports = (options) => {
  let message = /*xml*/ `
    <xml>
      <ToUserName><![CDATA[${options.ToUserName}]]></ToUserName>
      <FromUserName><![CDATA[${options.FromUserName}]]></FromUserName>
      <CreateTime>${Date.now()}</CreateTime>
      <MsgType><![CDATA[${options.MsgType}]]></MsgType>
  `
  if (options.MsgType === 'text') {
    message += /*xml*/ `<Content><![CDATA[${options.Content}]]></Content>`
  } else if (options.MsgType === 'image') {
    message += /*xml*/ `
      <Image>
        <MediaId><![CDATA[${options.MediaId}]]></MediaId>
      </Image>
    `
  } else if (options.MsgType === 'voice') {
    message += /*xml*/ `
      <Voice>
        <MediaId><![CDATA[${options.MediaId}]]></MediaId>
      </Voice>
    `
  } else if (options.MsgType === 'video') {
    message += /*xml*/ `
      <Video>
        <MediaId><![CDATA[${options.MediaId}]]></MediaId>
        <Title><![CDATA[${options.Tittle}]]></Title>
        <Description><![CDATA[${options.Description}]]></Description>
      </Video>
    `
  } else if (options.MsgType === 'music') {
    message += /*xml*/ `
      <Music>
        <Title><![CDATA[${options.Tittle}]]></Title>
        <Description><![CDATA[${options.Description}]]></Description>
        <MusicUrl><![CDATA[${options.MusicUrl}]]></MusicUrl>
        <HQMusicUrl><![CDATA[${options.HqMusicUrl}]]></HQMusicUrl>
        <ThumbMediaId><![CDATA[${options.MediaId}]]></ThumbMediaId>
      </Music>
    `
  } else if (options.MsgType === 'news') {
    message += /*xml*/ `
      <ArticleCount>1</ArticleCount>
      <Articles>
        <item>
          <Title><![CDATA[${options.Tittle}]]></Title>
          <Description><![CDATA[${options.Description}]]></Description>
          <PicUrl><![CDATA[${options.PicUrl}]]></PicUrl>
          <Url><![CDATA[${options.Url}]]></Url>
        </item>
      </Articles>
    `
  } else {
    console.error('Error: type not supported.')
  }

  return (message += '</xml>')
}
