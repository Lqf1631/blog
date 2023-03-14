import { EyeOutlined, LikeOutlined, CalendarOutlined } from '@ant-design/icons'
import { useState } from 'react'
import style from './arcticleHeader.module.scss'

interface Iprops {
  likeNum: number
  sawNum: number
  date: string
}

const ArticleHeader: React.FC<Iprops> = (props) => {
  return (
    <div className={style.box}>
      <div className={style.item}>
        <CalendarOutlined />
        <span className={style.ctx}>{props.date}</span>
      </div>
      <div className={style.item}>
        <EyeOutlined />
        <span className={style.ctx}>{props.sawNum}</span>
      </div>
      <div className={style.item}>
        <LikeOutlined />
        <span className={style.ctx}>{props.likeNum}</span>
      </div>
    </div>
  )
}
export default ArticleHeader
