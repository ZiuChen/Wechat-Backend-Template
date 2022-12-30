/**
 * 自定义菜单
 */

const { url } = require('../config')

module.exports = {
  button: [
    {
      type: 'view',
      name: '电影合集',
      url: url + '/movie'
    },
    {
      type: 'view',
      name: '语音识别',
      url: url + '/search'
    },
    {
      name: '菜单一',
      sub_button: [
        {
          type: 'view',
          name: '搜索',
          url: 'http://www.soso.com/'
        },
        {
          type: 'click',
          name: '赞一下我们',
          key: 'V1001_GOOD'
        }
      ]
    },
    {
      name: '菜单二',
      sub_button: [
        {
          type: 'scancode_waitmsg',
          name: '扫码带提示',
          key: 'rselfmenu_0_0',
          sub_button: []
        },
        {
          type: 'scancode_push',
          name: '扫码推事件',
          key: 'rselfmenu_0_1',
          sub_button: []
        }
      ]
    }
  ]
}
