import style from './toTop.module.scss'
import { VerticalAlignTopOutlined } from '@ant-design/icons'

const ToToop: React.FC = () => {
  const toTop = () => {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth',
    })
  }
  return (
    <div className={style.box} onClick={toTop}>
      <VerticalAlignTopOutlined />
    </div>
  )
}
export default ToToop
