
import { Button, Typography } from '@material-tailwind/react'
import {User, Users, Ruler, Invoice, ListChecks, MoneyWavy} from '@phosphor-icons/react'

const NavBar = () => {

    const iconsSize = 32
    const navigationItems = [
        {
            label:'Vecinos',
            path:'/vecionos',
            icon:<Users size={iconsSize} />
        },
        {
            label:'Mediciones',
            path:'/mediciones',
            icon:<Ruler size={iconsSize} />
        },
        {
            label:'Recibos',
            path:'/recibos',
            icon:<Invoice size={iconsSize} />
        },
        {
            label:'Asistencia',
            path:'/asistencia',
            icon:<ListChecks size={iconsSize} />

        },
        {
            label:'Deudas',
            path:'/deudas',
            icon:<MoneyWavy size={iconsSize} />
        },
    ]

    return(
        <div className="flex flex-col justify-between h-full w-full max-w-[20rem]  bg-white bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5">
            <div className="p-4 mb-2">
              <Typography className='text-center text-black' variant='h3'>OTB MIRAFLORES</Typography>
            </div>

            <div className='border p-5 rounded-md'>
              <ul className=' flex flex-col gap-7'>
              {
                navigationItems.map((element, index)=>{
                  return <li key={index} className='hover:bg-red-600 rounded-xl cursor-pointer hover:text-white p-3'>
                    <a href={element.path} className='flex'>
                      <span className='mr-4'>{element.icon}</span>
                      <Typography variant='h4'>
                        {element.label}
                      </Typography>
                    </a>
                  </li>
                })
              }
              </ul>
            </div>
            <div className='flex flex-col border rounded-md'>
              <div className='flex items-center gap-4 px-5 pt-2'>
                <span>
                  <User size={iconsSize}/>
                </span>
                <div>
                  <Typography variant='h5'> Miriam Lucana </Typography>
                  <Typography> Administrador </Typography>
                </div>
              </div>
              <Button className='m-3' color='red'>Cerrar Sesion</Button>  
            </div>       
        </div>
    )
}

export default NavBar