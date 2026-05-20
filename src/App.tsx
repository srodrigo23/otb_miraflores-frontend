// import NavBarComponent from './components/navigation/NavBarComponent'
import { useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
// import { useState } from 'react'
// import { ListBullets, XCircle } from '@phosphor-icons/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TopNavBar from './components/navigation/TopNavBar'

function App() {

  const {pathname} = useLocation()
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen)
  // }

  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <div className='lg:h-screen flex flex-col'>
        <TopNavBar pathName={pathname} />
        <div className='mx-auto container w-full pb-5 lg:flex-1 lg:min-h-0'>
          <Outlet />
        </div>
        <div className='bg-gray-900 text-gray-400 text-xs border-t border-gray-800 px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col sm:flex-row items-center justify-between h-10 gap-1'>
            <span>© {new Date().getFullYear()} OTB Miraflores</span>
            <span>Powered by <span className='text-gray-300 font-medium'>Kratos Software</span></span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App
