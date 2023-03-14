// 使用严格模式
'use strict'
// 导入 Controller 控件 class 类型，用于自定义 Controller 的继承
const { Controller } = require('egg')
// 自定义 Home 控件，继承自 Controller
class HomeController extends Controller {
  // 控件内的相关方法实现功能
  async login() {
    const userName = this.ctx.request.body.userName
    const password = this.ctx.request.body.password
    // const userName = 'root'
    // const password = 'root'
    const sql = `SELECT name FROM user WHERE name = '${userName}' AND password = '${password}'`
    const results = await this.app.mysql.query(sql)
    this.ctx.body = results
    if (results.length !== 0) {
      // // cookie-session 鉴权
      // // 获取当前时间作为 openId
      // const openId = new Date().getTime()
      // // 将 openId 存入 session 中
      // this.ctx.session.openId = { openId }
      // this.ctx.body = {
      //   state: true,
      //   openId,
      // }
      // jwt 生成 token 字段进行加密
      const token = this.app.jwt.sign(
        { token: new Date().getTime() },
        this.app.config.jwt.secret
      )
      this.ctx.body = {
        state: true,
        token,
      }
    } else {
      this.ctx.body = {
        state: false,
      }
    }
  }
  async getType() {
    const { ctx, app } = this
    const reseult = await app.mysql.select('type')
    ctx.body = { data: reseult }
  }
  async addArticle() {
    const { ctx, app } = this
    const result = await app.mysql.insert('article', ctx.request.body)
    if (result.affectedRows === 1) {
      ctx.body = {
        data: {
          articleId: result.insertId,
          isSuccess: true,
        },
      }
    } else {
      ctx.body = {
        data: {
          isSuccess: false,
        },
      }
    }
  }
  async updateArticle() {
    const { app, ctx } = this
    const result = await app.mysql.update('article', ctx.request.body)
    if (result.affectedRows === 1) {
      ctx.body = {
        data: { isSuccess: true },
      }
    } else {
      ctx.body = {
        data: { isSuccess: false },
      }
    }
  }
  async getArticleList() {
    const { app, ctx } = this
    const sql = `SELECT article.Id as id,
    article.title as title,
    article.des as des,
    article.likeNum as likeNum,
    article.saw as sawNum,
    article.state as state,
    FROM_UNIXTIME(UNIX_TIMESTAMP(CONVERT_TZ(article.date,'+8:00', @@session.time_zone)),'%Y-%m-%d') as date,
    type.name as type
    FROM article LEFT JOIN type ON article.typeId = type.Id
    ORDER BY article.id DESC`
    const result = await app.mysql.query(sql)
    ctx.body = {
      data: result,
    }
  }
  async deleteArticle() {
    const { ctx, app } = this
    const result = await app.mysql.delete('article', { Id: ctx.params.id })
    if (result.affectedRows === 1) {
      ctx.body = {
        data: true,
      }
    }
  }
  async getArticleById() {
    const { ctx, app } = this
    const sql = `SELECT article.Id as id,
    article.title as title,
    article.des as des,
    article.likeNum as likeNum,
    article.saw as sawNum,
    article.ctx as ctx,
    FROM_UNIXTIME(UNIX_TIMESTAMP(CONVERT_TZ(article.date,'+8:00', @@session.time_zone)),'%Y-%m-%d') as date,
    type.name as type
    FROM article LEFT JOIN type ON article.typeId = type.Id
    WHERE article.id = ${ctx.params.id}`
    const result = await app.mysql.query(sql)
    ctx.body = { data: result[0] }
  }
  async changeState() {
    const { ctx, app } = this
    const id = ctx.request.body.id
    const state = ctx.request.body.state
    const sql = `UPDATE article SET state = ${state} WHERE article.Id = ${id}`
    const result = await app.mysql.query(sql)
    if (result.affectedRows === 1) {
      ctx.body = {
        data: { isSuccess: true },
      }
    } else {
      ctx.body = {
        data: { isSuccess: false },
      }
    }
  }
}

module.exports = HomeController
