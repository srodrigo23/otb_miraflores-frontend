import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext';

interface TopNavBarProps {
  pathName: string;
}

const TopNavBar: React.FC<TopNavBarProps> = ({pathName}) => {
  const localPathName = pathName;
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const navigationItems = [
    {
      label: 'Vecinos',
      path: '/vecinos',
      // icon: <Users size={iconsSize} weight='duotone' />,
    },
    {
      label: 'Mediciones',
      path: '/mediciones',
      // icon: <Ruler size={iconsSize} weight='duotone' />,
    },
    // {
    //     label:'Recibos',
    //     path:'/recibos',
    //     icon:<Invoice size={iconsSize} weight="duotone" />
    // },
    {
      label: 'Reuniones',
      path: '/reuniones',
      // icon: <ListChecks size={iconsSize} weight='duotone' />,
    },
    {
      label: 'Recaudaciones',
      path: '/recaudaciones',
      // icon: <MoneyWavy size={iconsSize} weight='duotone' />,
    },
  ];

  return (
    <nav className='fixed top-0 left-0 w-full z-20 bg-black text-white py-3 flex justify-between px-7'>
      <span className="font-bold">OTB MIRAFLORES</span>

      <div className='flex flex-row gap-10'>
        <ul className="flex gap-3 text-sm justify-center items-center">
          {navigationItems.map((element) => {
            const isActive = localPathName === element.path;
            return (
              <li>
                <NavLink
                  className={`cursor-pointer ${
                    isActive
                      ? 'text-yellow-500 font-semibold'
                      : ''
                  }`}
                  to={element.path}
                >
                  {element.label}
                  {/* <div className="mx-1 h-0.5 rounded-sm bg-yellow-400"> </div> */}
                </NavLink>
              </li>
            );
          })}
        </ul>

        <div 
          className="text-red-500 cursor-pointer font-bold" 
          onClick={handleLogout}>
            Cerrar sesión
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
