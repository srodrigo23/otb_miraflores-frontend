// import { Typography } from '@material-tailwind/react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
  return(
    <div className=" flex flex-col h-screen">
      {/* <nav className='sticky z-10 top-0 p-5 bg-black '>
        <Typography className='text-center' variant="h2" color="white">Sistema Centralizado</Typography> 
        <Typography className='text-center' variant="h5" color="white">OTB Miraflores</Typography>
      </nav> */}
      
      <Outlet/>

      {/* <nav className='sticky bottom-0 p-5 bg-black'>
        <Typography className='text-center' variant="h5" color="white">2025</Typography>
      </nav> */}
    </div>
  )
};

export default AuthLayout;