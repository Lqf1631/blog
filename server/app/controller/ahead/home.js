const { Controller } = require('egg')

class HomeController extends Controller {
  async getArticleById(ctx) {
    const id = ctx.params.id
    const sql = `SELECT article.Id as id,
    article.title as title,
    article.ctx as ctx,
    article.likeNum as likeNum,
    article.saw as sawNum,
    FROM_UNIXTIME(UNIX_TIMESTAMP(CONVERT_TZ(article.date,'+8:00', @@session.time_zone)),'%Y-%m-%d %H:%i:%s') as date,
    type.name as type
    FROM article LEFT JOIN type ON article.typeId = type.Id
    WHERE article.Id = ${id}`
    const result = await this.app.mysql.query(sql)
    this.ctx.body = { data: result[0] }
  }
  async getBlog(ctx) {
    let id = 0
    if (ctx.params.type === 'life') {
      id = 1
    }
    const sql = `SELECT article.Id as id,
    article.title as title,
    article.des as des,
    article.likeNum as likeNum,
    article.saw as sawNum,
    FROM_UNIXTIME(UNIX_TIMESTAMP(CONVERT_TZ(article.date,'+8:00', @@session.time_zone)),'%Y-%m-%d') as date,
    type.name as type
    FROM article LEFT JOIN type ON article.typeId = type.Id
    WHERE type.Id = ${id} AND article.state = 1`
    const result = await this.app.mysql.query(sql)
    this.ctx.body = { data: result }
  }
  async likeChange() {
    const { ctx, app } = this
    const sql = `UPDATE article SET likeNum = ${ctx.request.body.likeNum} WHERE article.Id = ${ctx.request.body.id}`
    const res = await app.mysql.query(sql)
    console.log(res)
    if (res.changedRows === 1) {
      ctx.body = {
        data: true,
      }
    } else {
      ctx.body = {
        data: false,
      }
    }
  }
  async sawAdd() {
    const { ctx, app } = this
    const sql = `UPDATE article SET saw = ${
      ctx.request.body.sawNum + 1
    } WHERE article.Id = ${ctx.request.body.id}`
    const res = await app.mysql.query(sql)
    ctx.body = {
      data: res,
    }
  }
}

module.exports = HomeController
