// import { Typography } from '@material-tailwind/react';
import { Outlet } from 'react-router';

export default function CheckLayout (){
  return(
    <div className='h-screen'>
      
      <Outlet/>
    </div>
  )
};