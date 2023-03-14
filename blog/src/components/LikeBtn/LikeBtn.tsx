import style from './likeBtn.module.scss'
import { LikeFilled } from '@ant-design/icons'
import pathUrl from '@/config/url'
import { useRef, useState } from 'react'
import { message } from 'antd'

interface Iprops {
  id: number
  likeNum: number
  setList: Function
  list: any
}

const LikeBtn: React.FC<Iprops> = ({ id, likeNum, setList, list }) => {
  const [flag, setFLag] = useState(true)
  const btn = useRef<HTMLDivElement>(null)

  const likeAdd = async (state: boolean) => {
    const btnEl = btn.current as HTMLDivElement
    const sucessMsg = state ? '点赞成功' : '取消点赞成功'
    const failMsg = state ? '点赞失败' : '取消点赞失败'
    const reqLikeNum = state ? likeNum + 1 : likeNum - 1
    const color = state ? 'rgb(250, 112, 135)' : '#8a919f'
    btnEl.style.color = color
    setFLag(!flag)
    setList({ ...list, likeNum: reqLikeNum })
    const res = await fetch(pathUrl.likeAddUrl, {
      method: 'POST',
      body: JSON.stringify({
        id,
        likeNum: reqLikeNum,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const { data } = await res.json()
    if (res.ok && data) {
      message.success(sucessMsg)
    } else {
      message.error(failMsg)
    }
  }
  return (
    <div
      className={style.box}
      onClick={() => {
        likeAdd(flag)
      }}
    >
      <LikeFilled ref={btn} className={style.btn} />
    </div>
  )
}
export default LikeBtn
