// 对 admin 后台的路由进行封装导出
module.exports = (app) => {
  // 从 app 中解构出 router 路由对象用于配置路由和 controller 对象用于访问控件
  const { router, controller, jwt } = app
  router.post('/admin/login', controller.admin.home.login)
  // 使用 jwt 中间件进行路由守卫
  router.get('/admin/type', jwt, controller.admin.home.getType)
  router.post('/admin/article', jwt, controller.admin.home.addArticle)
  router.put('/admin/article', jwt, controller.admin.home.updateArticle)
  router.get('/admin/articlelist', jwt, controller.admin.home.getArticleList)
  router.get('/admin/article/:id', jwt, controller.admin.home.deleteArticle)
  router.get('/admin/articleid/:id', jwt, controller.admin.home.getArticleById)
  router.post('/admin/article/state', jwt, controller.admin.home.changeState)
}
