
import { 
  Button, 
  Typography, 
  // Dialog, 
  // DialogHeader, 
  // DialogBody,
  // DialogFooter 
} from "@material-tailwind/react";

import { useEffect, useState } from "react";
import NewNeighborModalForm from "../../components/forms/NewNeighborModalForm";

const Neighbors = ()=>{
  const [data, setData] = useState([]);
  const apiLink = "http://127.0.0.1:8000/users"

  const [openModal, setOpenModal] = useState(false)
  
  const handleOpenModal = ()=> setOpenModal(!openModal)

  useEffect(() => {
    fetch(apiLink, {    
      method: 'GET',
      // crossorigin: true,    
      // mode: 'no-cors', 
    })
    .then(response => response.json())
    .then(json => setData(json.data))
    .catch(error => console.error(error));
  }, []);
  
  return(
    <>
      <Typography className='text-center' variant="h3" color="black">
        Vecinos
      </Typography>

      <Button onClick={handleOpenModal}>NUEVO VECINO</Button>

      <NewNeighborModalForm openModalState={openModal} handleSubmitMethod={handleOpenModal}/>

      {!data ? 'Cargando...' : 
        <ul>
          {/* {
            JSON.stringify(data)
          } */}
          {
            data.map((element, index)=>{
              return <li key={index}>
                {element.first_name}
              </li>
            })
          }
        </ul>}
    </>
  )
}
export default Neighbors;