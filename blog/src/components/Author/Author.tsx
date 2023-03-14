import { GithubOutlined, MailOutlined, WechatOutlined } from '@ant-design/icons'
import { Avatar, Divider, Tooltip } from 'antd'
import style from './author.module.scss'
import Link from 'next/link'
import Image from 'next/image'

const Author: React.FC = () => {
  const data = {
    name: '小林',
    des: '土木转行到前端',
    gitLink: 'https://github.com/Lqf1631',
    email: 'a2352301708@163.com',
    phone: 13388361631,
  }

  return (
    <div className={style.box}>
      <Avatar size={100} src="/20230216165858.jpg" />
      <div className={style.name}>{data.name}</div>
      <div className={style.des}>{data.des}</div>
      <Divider>
        <span className={style.border}>联系方式</span>
      </Divider>
      <div className={style.icon}>
        <Link href={data.gitLink}>
          <Avatar
            style={{ backgroundColor: '#999' }}
            icon={<GithubOutlined style={{ fontSize: '1.2rem' }} />}
          />
        </Link>
        <Tooltip title={data.email}>
          <Avatar
            style={{ backgroundColor: '#999' }}
            className={style.item}
            icon={<MailOutlined style={{ fontSize: '1.2rem' }} />}
          />
        </Tooltip>
        <Tooltip
          title={
            <Image
              alt="wechat"
              width={50}
              height={50}
              src="/751c67753a92bbb3baaa6db5ef0724d.png"
            ></Image>
          }
        >
          <Avatar
            style={{ backgroundColor: '#999' }}
            className={style.item}
            icon={<WechatOutlined style={{ fontSize: '1.2rem' }} />}
          />
        </Tooltip>
      </div>
    </div>
  )
}
export default Author
