
import { Button, Typography } from '@material-tailwind/react'
import {User, Users, Ruler, Invoice, ListChecks, MoneyWavy, SignOut} from '@phosphor-icons/react'
import { NavLink } from 'react-router-dom'

interface NavBarType{
  pathName:string
}

const NavBarComponent : React.FC<NavBarType>= ({pathName}) => {
    const localPathName = pathName

    const iconsSize = 24
    const navigationItems = [
        {
            label:'Vecinos',
            path:'/vecinos',
            icon:<Users size={iconsSize} weight="duotone" />
        },
        {
            label:'Mediciones',
            path:'/mediciones',
            icon:<Ruler size={iconsSize} weight="duotone" />
        },
        {
            label:'Recibos',
            path:'/recibos',
            icon:<Invoice size={iconsSize} weight="duotone" />
        },
        {
            label:'Asistencia',
            path:'/asistencia',
            icon:<ListChecks size={iconsSize} weight="duotone" />
        },
        {
            label:'Deudas',
            path:'/deudas',
            icon:<MoneyWavy size={iconsSize} weight="duotone" />
        },
    ]

    return(
        <div className="flex flex-col justify-between h-full w-full bg-gradient-to-b from-blue-50 to-white p-6 shadow-2xl">
            {/* Header con gradiente */}
            <div className="mb-8">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 shadow-lg">
                <Typography className='text-center text-white font-bold tracking-wide' variant='h4'>
                  OTB
                </Typography>
                <Typography className='text-center text-blue-100 text-sm mt-1' variant='small'>
                  MIRAFLORES
                </Typography>
              </div>
            </div>

            {/* Navegación */}
            <nav className='flex-1 mb-6'>
              <ul className='flex flex-col gap-2'>
              {
                navigationItems.map((element, index)=>{
                  const isActive = localPathName === element.path
                  return (
                    <li key={index}>
                      <NavLink
                        to={element.path}
                        className={`
                          flex items-center gap-4 px-4 py-3.5 rounded-xl
                          transition-all duration-300 ease-in-out
                          ${isActive
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/50 scale-105'
                            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-1'
                          }
                        `}
                      >
                        <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>
                          {element.icon}
                        </span>
                        <Typography
                          variant='paragraph'
                          className={`font-medium ${isActive ? 'font-semibold' : ''}`}
                        >
                          {element.label}
                        </Typography>
                      </NavLink>
                    </li>
                  )
                })
              }
              </ul>
            </nav>

            {/* User Profile Section */}
            <div className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden'>
              <div className='flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-white'>
                <div className='bg-gradient-to-br from-blue-500 to-blue-700 rounded-full p-3 shadow-md'>
                  <User size={28} weight="duotone" className="text-white"/>
                </div>
                <div className='flex-1'>
                  <Typography variant='paragraph' className='font-semibold text-gray-800'>
                    Miriam Lucana
                  </Typography>
                  <Typography variant='small' className='text-gray-500 text-xs'>
                    Administrador
                  </Typography>
                </div>
              </div>
              <Button
                className='w-full rounded-none rounded-b-2xl flex items-center justify-center gap-2 py-3 normal-case text-sm font-medium
                          bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700
                          transition-all duration-300 shadow-none hover:shadow-lg'
                color='red'
              >
                <SignOut size={20} weight="bold" />
                Cerrar Sesión
              </Button>
            </div>
        </div>
    )
}

export default NavBarComponent