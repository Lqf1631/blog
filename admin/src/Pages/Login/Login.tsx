import React from 'react'
import { Spin, Input, Button, message } from 'antd'
import style from './login.module.scss'
import { useState } from 'react'
import { UserOutlined, KeyOutlined } from '@ant-design/icons'
import pathUrl from '../../config/url'
import { useNavigate } from 'react-router-dom'

interface ResData {
  state: boolean
  // openId?: string
  token?: string
}

const Login: React.FC = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async () => {
    if (!userName) {
      message.error('用户名不能为空')
      return
    } else if (!password) {
      message.error('密码不能为空')
      return
    }
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
      message.error('登录失败')
    }, 10000)
    const res = await fetch(pathUrl.login, {
      method: 'POST',
      body: JSON.stringify({ userName, password }),
      headers: { 'Content-Type': 'application/json' },
      // // 跨域请求中包含凭证,共享 session
      // credentials: 'include',
    })
    const resData: ResData = await res.json()
    setIsLoading(false)
    if (resData.state) {
      navigate('/admin/', { replace: true })
      // const openId = resData.openId as string
      // sessionStorage.setItem('openId', openId)
      const token = resData.token as string
      sessionStorage.setItem('token', token)
      clearTimeout(timer)
    } else {
      message.error('用户名或密码错误')
      setIsLoading(false)
      clearTimeout(timer)
    }
  }
  return (
    <div className={style.box}>
      <Spin spinning={isLoading}>
        <div className={style.ctx}>
          <div className={style.title}>登录页面</div>
          <div className={style.input}>
            <Input
              size="large"
              id="userName"
              onBlur={(e: any) => setUserName(e.target.value)}
              placeholder="please enter username"
              prefix={<UserOutlined />}
            ></Input>
            <Input.Password
              size="large"
              id="password"
              onBlur={(e: any) => setPassword(e.target.value)}
              placeholder="please enter password"
              prefix={<KeyOutlined />}
            ></Input.Password>
          </div>
          <Button onClick={submit} className={style.btn}>
            登录
          </Button>
        </div>
      </Spin>
    </div>
  )
}
export default Login
