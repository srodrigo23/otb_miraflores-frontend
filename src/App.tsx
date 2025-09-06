// import './App.css'

import { Outlet } from 'react-router'
import NavBar from './components/navigation/NavBar'

function App() {
  return (
    <>
      <div className='h-dvh bg-blue-200 grid grid-cols-12'>
        <div className='col-span-2'>
          <NavBar/>
        </div>
  
        {/* <div className='flex-1 bg-red-100'>
          2
        </div>
        <div className='flex-1 bg-red-200'>
          3
        </div> */}
      
        <Outlet/>
      </div>
    </>
  )
}

export default App
