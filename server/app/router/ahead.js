module.exports = (app) => {
  const { router, controller } = app
  router.get('/ahead/article/:id', controller.ahead.home.getArticleById)
  router.get('/ahead/:type', controller.ahead.home.getBlog)
  router.post('/ahead/likeNum', controller.ahead.home.likeChange)
  router.post('/ahead/sawNum', controller.ahead.home.sawAdd)
}
