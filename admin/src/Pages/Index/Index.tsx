import React, { useState } from 'react'
import { FileOutlined, FormOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Breadcrumb, Layout, Menu, theme, Button } from 'antd'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import AddArticle from './AddArticle/AddArticle'
import ArticleList from './ArticleList/ArticleList'
import style from './index.module.scss'

const { Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

// 菜单数据
const items: MenuItem[] = [
  getItem('工作台', '1', <FormOutlined />),
  getItem('文章管理', '2', <FileOutlined />),
]

const AdminIndex: React.FC = () => {
  // 是否收拢
  const [collapsed, setCollapsed] = useState(false)

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const navigate = useNavigate()
  const location = useLocation()

  const clearToken = () => {
    sessionStorage.removeItem('token')
    navigate('/')
  }

  const jumpTo = (tag: string) => {
    if (tag === '1') {
      navigate('/admin/')
    } else {
      navigate('/admin/articlelist')
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 菜单栏是否收拢 */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value: boolean) => setCollapsed(value)}
      >
        {/* 标题 */}
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        />
        {/* 菜单 */}
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
          onClick={(val) => {
            jumpTo(val.key)
          }}
        />
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
          {/* 内容栏面包屑导航 */}
          <Breadcrumb style={{ margin: '1rem 0' }}>
            <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
            <Breadcrumb.Item>
              {location.pathname === '/admin/' ? '工作台' : '文章管理'}
            </Breadcrumb.Item>
          </Breadcrumb>
          <Button className={style.btn} type="primary" onClick={clearToken}>
            登出
          </Button>
          {/* 内容栏 */}
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {/* 内容栏的嵌套路由配置,嵌套路由设置对父路由的相对路径 */}
            <Routes>
              <Route path="/" element={<AddArticle></AddArticle>}></Route>
              <Route
                path="/articlelist"
                element={<ArticleList></ArticleList>}
              ></Route>
              <Route
                path="/article/:id"
                element={<AddArticle></AddArticle>}
              ></Route>
            </Routes>
          </div>
        </Content>
        {/* 底部栏 */}
        <Footer style={{ textAlign: 'center' }}>
          基于 React 和 Egg.js 的后台管理系统
        </Footer>
      </Layout>
    </Layout>
  )
}

export default AdminIndex
