import { useState } from 'react'
import { Row, Col, Menu, Affix } from 'antd'
import {
  SnippetsOutlined,
  HomeOutlined,
  SmileOutlined,
} from '@ant-design/icons'
import style from './header.module.scss'
import { useRouter } from 'next/router'
import { MenuInfo } from 'rc-menu/lib/interface'

interface IProps {
  left: {
    logo: string
    des: string
  }
  right: Array<{ label: string; key: string; icon: any }>
}

const Header: React.FC = () => {
  const data: IProps = {
    left: {
      logo: '前端小林',
      des: '土木转行到前端',
    },
    right: [
      {
        label: '首页',
        key: '/',
        icon: <HomeOutlined style={{ fontSize: '1rem' }} />,
      },
      {
        label: '文章',
        key: '/blog/list',
        icon: <SnippetsOutlined style={{ fontSize: '1rem' }} />,
      },
      {
        label: '日常',
        key: '/blog/life',
        icon: <SmileOutlined style={{ fontSize: '1rem' }} />,
      },
    ],
  }
  const [list, setList] = useState<IProps>(data)
  const router = useRouter()
  const jumpTo = (e: MenuInfo) => {
    router.push(e.key)
  }
  return (
    <Affix>
      <div className={style.header}>
        <Row justify={'center'}>
          <Col
            className={style.left}
            xs={24}
            sm={24}
            md={14}
            lg={14}
            xl={13}
            xxl={10}
          >
            <div className={style.logo}>{list.left.logo}</div>
            <div className={style.des}>{list.left.des}</div>
          </Col>
          <Col xs={0} sm={0} md={9} lg={8} xl={6} xxl={6}>
            <Menu
              onClick={(e) => jumpTo(e)}
              selectedKeys={[router.asPath]}
              mode="horizontal"
              className={style.menu}
              items={list.right}
            ></Menu>
          </Col>
        </Row>
      </div>
    </Affix>
  )
}
export default Header
