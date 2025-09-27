
import { 
  Button, 
  Typography, 
} from "@material-tailwind/react";

import { useEffect, useState } from "react";
import NewNeighborModalForm from "../../components/forms/NewNeighborModalForm";
import NeighborTable from "../../components/tables/NeighborTable";

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
      <Typography 
        className='text-center py-5' 
        variant="h3" 
        color="black"
      >
        Vecinos
      </Typography>
      <div className="flex gap-5 px-10">
        <Button onClick={handleOpenModal}>NUEVO VECINO</Button>
      </div>

      <NewNeighborModalForm 
        openModalState={openModal} 
        handleSubmitMethod={handleOpenModal}/>

      {
        !data ? 'Cargando...' :
          <div className="p-10">
            <NeighborTable tableData={data}/> 
          </div>
      }
    </>
  )
}
export default Neighbors;