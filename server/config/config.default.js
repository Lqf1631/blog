/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1676621028470_9126'

  // add your middleware config here
  config.middleware = []

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }
  // 关闭 csrf 安全验证
  config.security = {
    csrf: false,
    domainWhiteList: [
      'http://localhost:3000',
      'http://www.lqf.ink',
      'http://admin.lqf.ink',
      'http://localhost:3001',
    ],
  }
  // 配置 jwt 的加密字符串
  config.jwt = {
    secret: 'Root@12138',
  }
  // cors 跨域设置
  config.cors = {
    // 已经在 security 设置了白名单,不用额外设置 origin
    // credentials: true,
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  }
  // 数据库连接配置
  config.mysql = {
    // database configuration
    client: {
      // host
      // host: '1.117.99.81',
      host: 'localhost',
      // port
      port: '3306',
      // username
      // user: 'Root',
      user: 'root',
      // password
      // password: 'HF88myLb46kkJ44X',
      password: 'root',
      // database
      database: 'react_blog',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  }

  return {
    ...config,
    ...userConfig,
  }
}
