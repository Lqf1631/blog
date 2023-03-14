interface Path {
  ip: string,
  login: string,
  getType: string,
  changeArticle: string
  getArticleList: string
  deleteArticle: string
  getArticleById: string
  changeState: string
}


const ip: string = 'http://1.117.99.81:7001/admin'
// const ip: string = 'http://localhost:7001/admin'

const pathUrl: Path = {
  ip,
  login: `${ip}/login`, // /login 页面的 put 请求发送的接口
  getType: `${ip}/type`, // /admin 页面的 get 请求端口，获得文章类别
  changeArticle: `${ip}/article`, // /admin 页面 post 发送文章数据
  getArticleList: `${ip}/articlelist`, // /articlelist 页面 get 获取文章列表
  deleteArticle: `${ip}/article`, // /articlelist 页面 delete 删除文章操作
  changeState: `${ip}/article/state`, // /articlelist 页面更新文章状态
  getArticleById: `${ip}/articleid`, // /article 页面根据 id get 获取文章
}

export default pathUrl