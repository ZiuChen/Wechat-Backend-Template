/**
 * 自定义菜单
 */

module.exports = {
  button: [
    {
      type: 'click',
      name: '今日歌曲',
      key: 'V1001_TODAY_MUSIC'
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
