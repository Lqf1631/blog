import Header from '../Header/Header'
import { ReactNode } from 'react'
import Footer from '../Footer/Footer'
interface Iprops {
  children?: ReactNode
}

const Layout: React.FC<Iprops> = (props) => {
  return (
    <>
      <Header></Header>
      {props.children}
      <Footer></Footer>
    </>
  )
}
export default Layout
