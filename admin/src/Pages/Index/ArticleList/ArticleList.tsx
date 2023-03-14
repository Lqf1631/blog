import React, { useEffect, useState } from 'react'
import { List, Row, Col, Button, message, Modal } from 'antd'
import { useNavigate } from 'react-router-dom'
import pathUrl from '../../../config/url'
import style from './articleList.module.scss'
import StateButton from '../../../components/StateButton/StateButton'

const { confirm } = Modal

interface Article {
  id: number
  title: string
  des: string
  likeNum: number
  sawNum: number
  date: string
  type: string
  state: number
}

interface ListData {
  data: Array<Article>
}

const ArticleList: React.FC = () => {
  const navigate = useNavigate()
  const token = sessionStorage.getItem('token')
    ? sessionStorage.getItem('token')
    : ''
  const [list, setList] = useState<Array<Article>>([
    {
      id: 0,
      title: '',
      des: '',
      likeNum: 0,
      sawNum: 0,
      date: '',
      type: '',
      state: 0,
    },
  ])

  const getList = async () => {
    const res = await fetch(pathUrl.getArticleList, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const { data }: ListData = await res.json()
    setList(data)
  }

  const fecth = async (id: number) => {
    const res = await fetch(`${pathUrl.deleteArticle}/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const { data }: { data: boolean } = await res.json()
    if (res.ok && data) {
      message.success('文章删除成功')
      setList([...list.filter((item) => item.id !== id)])
    } else {
      message.error('文章删除失败')
    }
  }

  const deleteArticle = (id: number, title: string) => {
    confirm({
      title: `确定要删除该文章吗`,
      content: `文章${title}`,
      onOk() {
        fecth(id)
      },
    })
  }
  useEffect(() => {
    getList()
  }, [])

  return (
    <div>
      <List
        bordered
        dataSource={list}
        header={
          <Row>
            <Col span={6}>
              <b>文章标题</b>
            </Col>
            <Col span={3}>
              <b>创作日期</b>
            </Col>
            <Col span={3}>
              <b>类别</b>
            </Col>
            <Col span={3}>
              <b>浏览量</b>
            </Col>
            <Col span={3}>
              <b>喜欢量</b>
            </Col>
            <Col span={5}>
              <b>操作</b>
            </Col>
          </Row>
        }
        renderItem={(item) => (
          <List.Item>
            <Row style={{ width: '100%' }}>
              <Col span={6}>{item.title}</Col>
              <Col span={3}>{item.date}</Col>
              <Col span={3}>{item.type}</Col>
              <Col span={3}>{item.sawNum}</Col>
              <Col span={3}>{item.likeNum}</Col>
              <Col span={5}>
                <StateButton
                  setList={setList}
                  list={list}
                  state={item.state}
                  id={item.id}
                ></StateButton>
                <Button
                  type="primary"
                  onClick={() => navigate(`/admin/article/${item.id}`)}
                >
                  修改
                </Button>
                <Button
                  onClick={() => {
                    deleteArticle(item.id, item.title)
                  }}
                  type="primary"
                  danger
                  style={{ marginLeft: '3rem' }}
                >
                  删除
                </Button>
              </Col>
            </Row>
          </List.Item>
        )}
      ></List>
    </div>
  )
}

export default ArticleList
