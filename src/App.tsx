import NavBar from './components/navigation/NavBar'
import { useLocation } from 'react-router-dom'

import { Outlet } from 'react-router-dom'

function App() {
  
  const {pathname} = useLocation()

  return (
    <>
      <div className='h-dvh grid grid-cols-12 gap-2'>
         <div className="col-span-2 h-dvh border-r overflow-y-auto">
          <NavBar pathNameee={pathname}/>
        </div>
        <div className="col-start-3 col-end-13 border overflow-y-auto h-dvh">
          <Outlet/>
        </div>
        {/* <div className='flex-1 bg-red-100'>
          2
        </div>
        <div className='flex-1 bg-red-200'>
          3
        </div> */}
      </div>      
    </>
  )
}

export default App
