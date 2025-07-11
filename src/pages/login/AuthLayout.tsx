import { Typography } from '@material-tailwind/react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
  return(
    <>
      <nav className='p-5 bg-black'>
        <Typography className='text-center' variant="h4" color="white"> OTB - Miraflores</Typography>
      </nav>
      <Outlet/>
    </>
  )
};

export default AuthLayout;