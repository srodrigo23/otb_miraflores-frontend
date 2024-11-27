import './App.css'

import { NavbarApp } from './components/NavbarApp'
import { DataTable } from './components/DataTable'
import { Outlet } from 'react-router'

function App() {
  
  return (
    <>
      <NavbarApp></NavbarApp>
        
      <Outlet/>
      
    </>
  )
}

export default App
