// import { Typography } from '@material-tailwind/react';
import { Outlet } from 'react-router';

export default function CheckLayout (){
  return(
    <div className='bg-red-200 h-screen'>
      
      <Outlet/>
    </div>
  )
};