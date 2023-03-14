'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  // 导入封装的路由配置函数并传入参数 app
  require('./router/ahead')(app)
  require('./router/admin')(app)
}
