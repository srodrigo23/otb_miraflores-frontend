import { CSSProperties } from 'react';

import { useEffect, useState } from 'react';

import EditNeighborModalForm from '../../components/forms/EditNeighborModalForm';
import DeleteNeighborModal from '../../components/modals/DeleteNeighborModal';
import NeighborDetailModal from '../../components/modals/NeighborDetailModal';
import NeighborTable from '../../components/tables/NeighborTable';

import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

import { NeighborType } from '../../interfaces/neighborsInterfaces';

import { config } from '../../config';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

const Neighbors = () => {
  const [data, setData] = useState<NeighborType[]>([]);
  const [loading, setLoading] = useState(true);

  const apiLink = `${JSON.parse(config.production)?config.frontURL_PROD:config.frontURL_DEV}/neighbors`;

  // Modal para editar vecino
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedNeighbor, setSelectedNeighbor] = useState<NeighborType | null>(
    null
  );

  // Modal para eliminar vecino
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [neighborToDelete, setNeighborToDelete] = useState<NeighborType | null>(
    null
  );

  // Modal para ver detalles del vecino
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [neighborToView, setNeighborToView] = useState<NeighborType | null>(
    null
  );

  // Cargar datos de vecinos
  const fetchNeighbors = () => {
    setLoading(true);
    fetch(apiLink, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => {
        setData(json.data);
        setLoading(false);
      })
      .catch((error) => {
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
      .then((response) => response.json())
      .then(() => {
        // Recargar la lista de vecinos
        fetchNeighbors();
        handleCloseEditModal();
        toast.success('Vecino actualizado exitosamente');
      })
      .catch((error) => {
        console.error('Error al actualizar vecino:', error);
        toast.error('Error al actualizar el vecino');
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
        toast.success('Vecino eliminado exitosamente');
      })
      .catch((error) => {
        console.error('Error al eliminar vecino:', error);
        toast.error('Error al eliminar el vecino');
      });
  };

  // Handler para crear nuevo vecino
  const handleCreateNeighbor = (formData: any) => {
    // Llamada a la API para crear
    fetch(apiLink, {
      method: 'POST',
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
      .then((response) => response.json())
      .then(() => {
        // Recargar la lista de vecinos
        fetchNeighbors();
        toast.success('Vecino creado exitosamente');
      })
      .catch((error) => {
        console.error('Error al crear vecino:', error);
        toast.error('Error al crear el vecino');
      });
  };

  // Handler para ver detalles del vecino
  const handleViewNeighbor = (neighbor: NeighborType) => {
    setNeighborToView(neighbor);
    setOpenDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setOpenDetailModal(false);
    setNeighborToView(null);
  };

  return (
    <>
      {loading ? (
        <div className='flex justify-center items-center py-20'>
          <ClipLoader
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label='Loading Spinner'
            data-testid='loader'
          />
        </div>
      ) : (
        <>
          <NeighborTable
            tableData={data}
            onEdit={handleEditNeighbor}
            onDelete={handleDeleteNeighbor}
            onCreate={handleCreateNeighbor}
            onView={handleViewNeighbor}
          />
        </>
      )}

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

      <NeighborDetailModal
        open={openDetailModal}
        onClose={handleCloseDetailModal}
        neighbor={neighborToView}
      />
    </>
  );
};
export default Neighbors;
