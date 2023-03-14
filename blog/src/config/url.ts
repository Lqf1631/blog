interface Path {
  listUrl: string,
  articleUrl: string,
  indexUrl: string
  lifeUrl: string
  ip: string
  sawAddUrl: string
  likeAddUrl: string
}

// const ip: string = 'http://localhost:7001/ahead'
const ip: string = 'http://1.117.99.81:7001/ahead'

const pathUrl: Path = {
  ip,
  indexUrl: `${ip}/index`, // index 首页请求数据的 url 地址
  listUrl: `${ip}/list?id=0`, // list 文章列表页请求数据的 url 地址 
  articleUrl: `${ip}/article/`, // article 文章详情页请求数据的 url 地址，详情页需要进行拼接字符串路径传参
  lifeUrl: `${ip}/life?id=1`, // life 生活列表页请求数据的 url 地址
  sawAddUrl: `${ip}/sawNum`, // saw 浏览量增加接口
  likeAddUrl: `${ip}/likeNum` // like 喜欢量增加接口
}

export default pathUrl