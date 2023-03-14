import React, { useState } from 'react'
import 'animate.css'
import cN from 'classnames'
import { Avatar } from 'antd'
import {
  SnippetsOutlined,
  EditOutlined,
  GithubOutlined,
} from '@ant-design/icons'
import style from './index.module.scss'
import Link from 'next/link'

interface IProps {
  name: string
  icon: any
  url: string
}

const Home: React.FC = () => {
  const data: Array<IProps> = [
    {
      name: '个人简历',
      icon: <SnippetsOutlined style={{ fontSize: '2rem' }} />,
      url: '/reseme',
    },
    {
      name: '个人博客',
      icon: <EditOutlined style={{ fontSize: '1.9rem' }} />,
      url: '/blog/list',
    },
    {
      name: 'demo练习',
      icon: <GithubOutlined style={{ fontSize: '1.9rem' }} />,
      url: 'https://github.com/Lqf1631',
    },
  ]
  return (
    <div className={style.box}>
      <div className={style.show}>
        <div
          className={cN([style.welcom, 'animate__animated', 'animate__bounce'])}
        >
          {'\u00A0'}欢迎来到我的主页
        </div>
        <Avatar
          size={108}
          src="/20230216165858.jpg"
          className="animate__animated animate__bounce"
        />
        <div
          className={cN([style.name, 'animate__animated', 'animate__bounce'])}
        >
          {'\u00A0'}前端小林
        </div>
        <div className={cN([style.ps, 'animate__animated', 'animate__bounce'])}>
          (从土木转行到前端)
        </div>
        <ul className={style.list}>
          {data.map((item) => (
            <Link
              className={cN([
                style.link,
                'animate__animated',
                'animate__heartBeat',
                'animate__delay-1s',
              ])}
              href={item.url}
              key={item.url}
            >
              {item.icon}
              <span className={style.name}>{item.name}</span>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Home
