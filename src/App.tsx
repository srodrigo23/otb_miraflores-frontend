// import NavBarComponent from './components/navigation/NavBarComponent'
import { useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
// import { useState } from 'react'
// import { ListBullets, XCircle } from '@phosphor-icons/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TopNavBar from './components/navigation/TopNavBar'
import { Typography } from '@material-tailwind/react'

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
        <div className='bg-black h-10 text-white flex justify-center items-center'>
          <Typography variant='h5'>Kratos Software</Typography>
        </div>
      </div>
    </>
  );
}

export default App
