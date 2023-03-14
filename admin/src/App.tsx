import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Index from './Pages/Index/Index'

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/admin/*" element={<Index></Index>}></Route>
      </Routes>
    </>
  )
}
export default App
