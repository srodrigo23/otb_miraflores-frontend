
import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";


const Neighbors = ()=>{
  const [data, setData] = useState(null);
  const apiLink = "http://127.0.0.1:8000/users"

  useEffect(() => {
    fetch(apiLink, {    
        method: 'GET',
        // crossorigin: true,    
        mode: 'no-cors',       
      })
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
        
  }, []);
  
  return(
    <>
      {/* {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'} */}
      <Typography className='text-center' variant="h3" color="black">Vecinos</Typography>
    </>
  )
}
export default Neighbors;