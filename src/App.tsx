import NavBarComponent from './components/navigation/NavBarComponent'
import { useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import { ListBullets, XCircle } from '@phosphor-icons/react'

function App() {

  const {pathname} = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <>
      <div className='h-dvh flex flex-col lg:grid lg:grid-cols-12 bg-gray-50'>
        {/* Mobile Header */}
        <div className="lg:hidden bg-gradient-to-r from-blue-600 to-blue-800 p-4 flex items-center justify-between shadow-lg z-20">
          <h1 className="text-white font-bold text-lg">OTB MIRAFLORES</h1>
          <button
            onClick={toggleSidebar}
            className="text-white p-2 hover:bg-blue-700 rounded-lg transition-colors"
          >
            {isSidebarOpen ? <XCircle size={28} weight="bold" /> : <ListBullets size={28} weight="bold" />}
          </button>
        </div>

        {/* Overlay para móvil */}
        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={toggleSidebar}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
            fixed lg:relative lg:col-span-3 xl:col-span-2 h-dvh
            transform transition-transform duration-300 ease-in-out z-40
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            w-80 lg:w-full
          `}
        >
          <div className="h-full overflow-y-auto">
            <NavBarComponent pathName={pathname}/>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-9 xl:col-span-10 flex-1 overflow-y-auto bg-white lg:border-l lg:shadow-inner">
          <div className="p-4 lg:p-6">
            <Outlet/>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
