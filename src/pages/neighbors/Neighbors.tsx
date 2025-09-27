import {CSSProperties} from 'react'

import { 
  Button, 
  Typography, 
} from "@material-tailwind/react";

import { useEffect, useState } from "react";
import NewNeighborModalForm from "../../components/forms/NewNeighborModalForm";
import NeighborTable from "../../components/tables/NeighborTable";

import { ClipLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Neighbors = ()=>{
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const apiLink = "http://127.0.0.1:8000/users"

  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = ()=> setOpenModal(!openModal)

  useEffect(() => {
    setLoading(true);
    fetch(apiLink, {
      method: 'GET',
      // crossorigin: true,
      // mode: 'no-cors',
    })
    .then(response => response.json())
    .then(json => {
      setData(json.data);
      setLoading(false);
    })
    .catch(error => {
      console.error(error);
      setLoading(false);
    });
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

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <ClipLoader
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="p-10">
          <NeighborTable tableData={data}/>
        </div>
      )}

      <NewNeighborModalForm
        openModalState={openModal}
        handleSubmitMethod={handleOpenModal}/>
    </>
  )
}
export default Neighbors;