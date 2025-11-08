import {CSSProperties} from 'react'

import {
  Button,
  Typography,
} from "@material-tailwind/react";

import { useEffect, useState } from "react";
import NewNeighborModalForm from "../../components/forms/NewNeighborModalForm";
import EditNeighborModalForm from "../../components/forms/EditNeighborModalForm";
import DeleteNeighborModal from "../../components/modals/DeleteNeighborModal";
import NeighborTable from "../../components/tables/NeighborTable";

import { ClipLoader } from "react-spinners";

interface NeighborType {
  id: number;
  first_name: string;
  second_name: string;
  last_name: string;
  ci: string;
  phone_number: string;
  email: string;
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Neighbors = ()=>{
  const [data, setData] = useState<NeighborType[]>([]);
  const [loading, setLoading] = useState(true);

  const apiLink = "http://127.0.0.1:8000/users"

  // Modal para nuevo vecino
  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = ()=> setOpenModal(!openModal)

  // Modal para editar vecino
  const [openEditModal, setOpenEditModal] = useState(false)
  const [selectedNeighbor, setSelectedNeighbor] = useState<NeighborType | null>(null)

  // Modal para eliminar vecino
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [neighborToDelete, setNeighborToDelete] = useState<NeighborType | null>(null)

  // Cargar datos de vecinos
  const fetchNeighbors = () => {
    setLoading(true);
    fetch(apiLink, {
      method: 'GET',
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
  };

  useEffect(() => {
    fetchNeighbors();
  }, []);

  // Handlers para editar
  const handleEditNeighbor = (neighbor: NeighborType) => {
    setSelectedNeighbor(neighbor);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedNeighbor(null);
  };

  const handleSubmitEdit = (formData: any) => {
    if (!selectedNeighbor) return;

    // Llamada a la API para actualizar
    fetch(`${apiLink}/${selectedNeighbor.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: formData.firstName,
        second_name: formData.secondName,
        last_name: formData.lastName,
        ci: formData.ci,
        phone_number: formData.phonenumber,
        email: formData.email,
      }),
    })
    .then(response => response.json())
    .then(() => {
      // Recargar la lista de vecinos
      fetchNeighbors();
      handleCloseEditModal();
    })
    .catch(error => {
      console.error('Error al actualizar vecino:', error);
    });
  };

  // Handlers para eliminar
  const handleDeleteNeighbor = (neighbor: NeighborType) => {
    setNeighborToDelete(neighbor);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setNeighborToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (!neighborToDelete) return;

    // Llamada a la API para eliminar
    fetch(`${apiLink}/${neighborToDelete.id}`, {
      method: 'DELETE',
    })
    .then(() => {
      // Recargar la lista de vecinos
      fetchNeighbors();
      handleCloseDeleteModal();
    })
    .catch(error => {
      console.error('Error al eliminar vecino:', error);
    });
  };
  
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
          <NeighborTable
            tableData={data}
            onEdit={handleEditNeighbor}
            onDelete={handleDeleteNeighbor}
          />
        </div>
      )}

      <NewNeighborModalForm
        openModalState={openModal}
        handleSubmitMethod={handleOpenModal}
      />

      <EditNeighborModalForm
        openModalState={openEditModal}
        handleCloseModal={handleCloseEditModal}
        neighbor={selectedNeighbor}
        onSubmit={handleSubmitEdit}
      />

      <DeleteNeighborModal
        openModalState={openDeleteModal}
        handleCloseModal={handleCloseDeleteModal}
        neighbor={neighborToDelete}
        onConfirmDelete={handleConfirmDelete}
      />
    </>
  )
}
export default Neighbors;