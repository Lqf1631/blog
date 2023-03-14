import { Button, message, Modal } from 'antd'
import pathUrl from '../../config/url'
import style from './stateButton.module.scss'

const { confirm } = Modal

interface Ipros {
  state: number
  setList: Function
  list: Array<any>
  id: number
}

const StateButton: React.FC<Ipros> = ({ state, setList, list, id }) => {
  const token = sessionStorage.getItem('token')
    ? sessionStorage.getItem('token')
    : ''
  const changeState = async (id: number, state: number) => {
    confirm({
      title: state ? '确定要取消发布吗' : '确定要发布吗',
      async onOk() {
        const res = await fetch(pathUrl.changeState, {
          method: 'POST',
          body: JSON.stringify({ id, state: state === 1 ? 0 : 1 }),
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        const { data } = await res.json()
        if (res.ok && data.isSuccess) {
          message.success('状态修改成功')
        } else {
          message.error('状态修改失败')
        }
        setList(
          list.map((item) => {
            if (item.id === id) {
              if (item.state === 0) {
                item.state = 1
              } else {
                item.state = 0
              }
            }
            return item
          })
        )
      },
    })

    // const {data} = await res.json()
  }

  return (
    <span
      onClick={() => {
        changeState(id, state)
      }}
    >
      {state === 1 ? (
        <Button type="primary" className={style.btn}>
          已发布
        </Button>
      ) : (
        <Button className={style.btn}>未发布</Button>
      )}
    </span>
  )
}
export default StateButton
