// 取得写在配置内的站长邮箱
let ownerEmail = require("../config").ownerEmail

module.exports = {
  /**
  判断是否所有参数都为非空的字符串
  */
  isValidString(...targets) {
    return targets.every((item) => {
      return typeof item === 'string' && /\S/.test(item)
    })
  },
  /**
  根据请求的session返回浏览者的权限级别和昵称
  - authLevel: 未登录0 普通用户登录1 站长登录2
  - nickname: 未登录空字符串 登录则为用户昵称
  */
  getUserInfo(req) {
    let currentUserEmail = req.session.currentUserEmail || ''
    let currentUserNickname = req.session.currentUserNickname || ''
    let authLevel = 0
    if (currentUserEmail !== '') {
      authLevel = 1
      if (currentUserEmail === ownerEmail) {
        authLevel = 2
      }
    }
    return {
      authLevel,
      currentUserNickname,
    }
  },
  /**
  判断浏览器终端
  */
  getDeviceType(req, res, next) {
    let deviceType = 'pc'
    if (/Android|iPhone|Windows Phone|iPad/i.test(req.headers['user-agent'])) {
      deviceType = 'mobile'
    }
    req.deviceType = deviceType
    next()
  },
  /**
  渲染404
  */
  render404(req, res, next) {
    res.status(404).render('common/404', {
      url: req._parsedOriginalUrl._raw,
    })
  },
}
