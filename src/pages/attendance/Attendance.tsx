import { Typography } from "@material-tailwind/react";
import { useLocation } from 'react-router'
const Attendance = () =>{

  let location = useLocation()
  console.log(location.pathname)
  return(
    <>
      <Typography className='text-center' variant="h3" color="black">Asistencia</Typography>
    </>
  )
}
export default Attendance;