import React from 'react'
import style from './addArticle.module.scss'
import { Row, Col, Input, Select, Button, message } from 'antd'
import { useState, useEffect } from 'react'
import 'github-markdown-css'
import 'highlight.js/styles/github.css'
import { marked } from 'marked'
import hljs from 'highlight.js'
import cN from 'classnames'
import pathUrl from '../../../config/url'
import { useNavigate, useParams } from 'react-router-dom'

// 导入 antd 的内部组件
const { TextArea } = Input

interface TypeItem {
  id: number
  name: string
  order: number
}

interface ArticleData {
  title: string
  typeId: number
  des: string
  ctx: string
  id?: number
  state: number
}

interface PostResData {
  data: {
    articleId?: number
    isSuccess: boolean
  }
}

interface PutResData {
  data: {
    isSuccess: boolean
  }
}

const AddArticle: React.FC = () => {
  // 响应式数据：
  // 双向数据绑定，set 方法使用事件绑定，从输入框内获取内容，将其设置为响应式
  const [ctx, setCtx] = useState('')
  // 存储 markdown 文本转换为的 html 数据
  const [preCtx, setPreCtx] = useState('')
  const [des, setDes] = useState('')
  const [preDes, setPreDes] = useState('')
  // 该 type 从数据库获得，用于渲染页面
  const [type, setType] = useState<[TypeItem]>([
    {
      name: '',
      id: 0,
      order: 0,
    },
  ])
  // selectType 是页面选中的文章类型
  const [selectType, setSelectType] = useState('')
  const [title, setTitle] = useState('')
  const [articleId, setArticleId] = useState(0)

  // 编程式路由跳转
  const navigate = useNavigate()
  const params = useParams()
  // 获取 token
  const token = (
    sessionStorage.getItem('token') ? sessionStorage.getItem('token') : ''
  ) as string

  // 获取页面渲染的原始数据
  const getType = async () => {
    const res = await fetch(pathUrl.getType, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (res.ok) {
      const { data } = await res.json()
      setType(data)
    } else {
      navigate('/')
    }
  }
  useEffect(() => {
    getType()
    if (params.id) {
      getArticleById(+params.id)
    } else {
      setCtx('')
      setPreCtx('')
      setTitle('')
      setDes('')
      setPreDes('')
      setSelectType('')
      setArticleId(0)
    }
  }, [params.id])

  // 双向数据绑定，获取输入框值
  const ctxChange = (e: any) => {
    // 双向数据绑定
    setCtx(e.target.value)
    let html = marked(e.target.value)
    setPreCtx(html)
  }
  const desChange = (e: any) => {
    setDes(e.target.value)
    let html = marked(e.target.value)
    setPreDes(html)
  }

  // 暂存文章
  const saveArticle = async (state: number) => {
    // 数据检验是否为空
    if (!title) {
      message.error('请输入文章标题')
      return false
    } else if (!selectType) {
      message.error('请选择文章类型')
      return false
    } else if (!des) {
      message.error('请输入文章简介')
      return false
    } else if (!ctx) {
      message.error('请输入文章内容')
      return false
    }
    // 数据包装
    const articleData: ArticleData = {
      title,
      typeId: selectType === '文章' ? 0 : 1,
      des,
      ctx,
      state,
    }
    // 文章添加功能
    if (articleId === 0) {
      const res = await fetch(pathUrl.changeArticle, {
        method: 'POST',
        body: JSON.stringify(articleData),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const { data }: PostResData = await res.json()
      if (res.ok && data.isSuccess) {
        const id = data.articleId as number
        message.success('文章保存成功')
        setArticleId(id)
      } else {
        message.error('文章保存失败')
      }
    }
    // 文章更新功能
    else {
      articleData.id = articleId
      const res = await fetch(pathUrl.changeArticle, {
        method: 'PUT',
        body: JSON.stringify(articleData),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const { data }: PutResData = await res.json()
      if (res.ok && data.isSuccess) {
        message.success('文章更新成功')
      } else {
        message.error('文章更新失败')
      }
    }
  }

  // 请求文章初始数据
  const getArticleById = async (id: number) => {
    const res = await fetch(`${pathUrl.getArticleById}/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const { data } = await res.json()
    setCtx(data.ctx)
    setArticleId(data.id)
    setDes(data.des)
    setTitle(data.title)
    setSelectType(data.type)
    setPreCtx(marked(data.ctx))
    setPreDes(marked(data.des))
  }

  // html 与 markdown 的形式转换
  const renderer = new marked.Renderer()
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: (code: any) => hljs.highlightAuto(code).value,
  })

  return (
    <div>
      <Row gutter={20}>
        {/* 左侧 */}
        <Col span={18}>
          {/* 头部 */}
          <Row gutter={10} className={style.header}>
            <Col span={20}>
              <Input
                size="large"
                onChange={(e: any) => setTitle(e.target.value)}
                placeholder="文章标题"
                value={title}
              />
            </Col>
            <Col span={4} className={style.type}>
              <span className={style.span}>类型:</span>
              <Select
                // 必须设置 key 值进行选择
                key={selectType}
                defaultValue={selectType ? selectType : '选择'}
                size="large"
                options={type.map((item) => {
                  return { value: item.name, label: item.name }
                })}
                onChange={(value) => setSelectType(value)}
              ></Select>
            </Col>
          </Row>
          {/* 内容 */}
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                rows={35}
                placeholder="文章内容"
                onChange={ctxChange}
                value={ctx}
              ></TextArea>
            </Col>
            <Col span={12}>
              <div
                className={cN([style.preview, 'markdown-body'])}
                dangerouslySetInnerHTML={{ __html: preCtx }}
              ></div>
            </Col>
          </Row>
        </Col>
        {/* 右侧 */}
        <Col span={6}>
          <Col span={24} className={style.btnBox}>
            <Button size="large" onClick={() => saveArticle(0)}>
              暂存文章
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={() => saveArticle(1)}
              className={style.btn}
            >
              发布文章
            </Button>
          </Col>
          <Col span={24} className={style.des}>
            <TextArea
              rows={4}
              placeholder="文章简介"
              onChange={desChange}
              value={des}
            ></TextArea>
            <div
              className={cN([style.preview, 'github-markdown-css'])}
              dangerouslySetInnerHTML={{ __html: preDes }}
            ></div>
          </Col>
        </Col>
      </Row>
    </div>
  )
}
export default AddArticle
