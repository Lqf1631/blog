import style from './footer.module.scss'

const Footer: React.FC = () => {
  return (
    <div className={style.box}>
      <div className={style.item}>React + Node + Ant Design</div>
      <div className={style.item}>基于 Next.js 框架的 SSR 服务器端渲染</div>
    </div>
  )
}
export default Footer
