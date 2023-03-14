import style from './advert.module.scss'
import Image from 'next/image'

interface Iprops {
  src: string
}

const Advert: React.FC<Iprops> = ({ src }) => {
  return (
    <div className={style.box}>
      <Image
        className={style.img}
        src={src}
        alt="advert"
        fill
        priority
        sizes="100rem"
      ></Image>
      <div className={style.adBox}>
        <div className={style.ad}>投放</div>
        <div>广告</div>
      </div>
    </div>
  )
}
export default Advert
