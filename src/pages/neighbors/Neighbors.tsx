import {
  Typography,
  Button,
} from '@material-tailwind/react';

// import DebtsTable from '../../components/tables/DebtsTable'; 
// import EditNeighborModalForm from '../../components/forms/EditNeighborModalForm';
// import DeleteNeighborModal from '../../components/modals/DeleteNeighborModal';
// import NeighborDetailModal from '../../components/modals/NeighborDetailModal';

// import { toast } from 'react-toastify';

// import { NeighborType } from '../../interfaces/neighborsInterfaces';
import { useNeighborsData } from '../../hooks/useNeighborsData';
// import { useUpdateNeighbor } from '../../hooks/useUpdateNeighbor';
// import { apiLink } from '../../config';
import { EditNeighborInfoForm } from '../../components/forms/EditNeighborInfoForm';
import { NeighborList } from '../../components/lists/NeighborsList';
import { NeighborDebtsPayments } from '../../components/NeighborDebtsPayments';
import { LoaderAnimation } from '../../components/LoaderAnimation';


const Neighbors = () => {

  const { data: neighborsData = [], isLoading:loading, refetch } = useNeighborsData();
  // const { update: updateNeighbor } = useUpdateNeighbor();

  // Modal para editar vecino
  // const [openEditModal, setOpenEditModal] = useState(false);
  // const [selectedNeighbor, setSelectedNeighbor] = useState<NeighborType | null>(
  //   null
  // );

  // Modal para eliminar vecino
  // const [openDeleteModal, setOpenDeleteModal] = useState(false);
  // const [neighborToDelete, setNeighborToDelete] = useState<NeighborType | null>(
  //   null
  // );

  // Modal para ver detalles del vecino
  // const [openDetailModal, setOpenDetailModal] = useState(false);
  // const [neighborToView, setNeighborToView] = useState<NeighborType | null>(
  //   null
  // );

  // Handlers para editar
  // const handleEditNeighbor = (neighbor: NeighborType) => {
  //   setSelectedNeighbor(neighbor);
  //   setOpenEditModal(true);
  // };

  // const handleCloseEditModal = () => {
  //   setOpenEditModal(false);
  //   setSelectedNeighbor(null);
  // };

  // const handleSubmitEdit = async (formData: any) => {
  //   if (!selectedNeighbor) return;
  //   const dataToEdit = {
  //     first_name: formData.firstName,
  //     second_name: formData.secondName,
  //     last_name: formData.lastName,
  //     ci: formData.ci,
  //     phone_number: formData.phonenumber,
  //     email: formData.email,
  //   };
  //   console.log(dataToEdit);
  //   const result = await updateNeighbor(selectedNeighbor.id, dataToEdit);

  //   if (result?.ok) {
  //     handleCloseEditModal();
  //     toast.success('Vecino actualizado exitosamente');
  //     refetch();
  //   } else {
  //     toast.error('Error al actualizar el vecino');
  //   }
  // };

  // Handlers para eliminar
  // const handleDeleteNeighbor = (neighbor: NeighborType) => {
  //   setNeighborToDelete(neighbor);
  //   setOpenDeleteModal(true);
  // };

  // const handleCloseDeleteModal = () => {
  //   setOpenDeleteModal(false);
  //   setNeighborToDelete(null);
  // };

  // const handleConfirmDelete = () => {
  //   if (!neighborToDelete) return;

  //   // Llamada a la API para eliminar
  //   fetch(`${apiLink}/${neighborToDelete.id}`, {
  //     method: 'DELETE',
  //   })
  //     .then(() => {
  //       // Recargar la lista de vecinos
  //       // fetchNeighbors();
  //       handleCloseDeleteModal();
  //       toast.success('Vecino eliminado exitosamente');
  //     })
  //     .catch((error) => {
  //       console.error('Error al eliminar vecino:', error);
  //       toast.error('Error al eliminar el vecino');
  //     });
  // };

  // Handler para crear nuevo vecino
  // const handleCreateNeighbor = (formData: any) => {
  //   // Llamada a la API para crear
  //   fetch(apiLink, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       first_name: formData.firstName,
  //       second_name: formData.secondName,
  //       last_name: formData.lastName,
  //       ci: formData.ci,
  //       phone_number: formData.phonenumber,
  //       email: formData.email,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then(() => {
  //       // Recargar la lista de vecinos
  //       // fetchNeighbors();
  //       toast.success('Vecino creado exitosamente');
  //     })
  //     .catch((error) => {
  //       console.error('Error al crear vecino:', error);
  //       toast.error('Error al crear el vecino');
  //     });
  // };

  // Handler para ver detalles del vecino
  // const handleViewNeighbor = (neighbor: NeighborType) => {
  //   setNeighborToView(neighbor);
  //   setOpenDetailModal(true);
  // };

  // const handleCloseDetailModal = () => {
  //   setOpenDetailModal(false);
  //   setNeighborToView(null);
  // };

  
  return (
    <>
      {loading ? (
        <LoaderAnimation isLoading={loading} />
      ) : (
        <>
          <div className='flex justify-between items-center px-4'>
            <Typography variant='h2' className='py-4'>
              Detalle General de Vecinos
            </Typography>
            <Button
              className='h-fit'
              // onClick={handleOpenModal}
            >
              NUEVO VECINO
            </Button>
          </div>

          <div className='flex flex-row gap-3 px-3'>
            <NeighborList neighborsData={neighborsData} />

            <div className='flex flex-col gap-2 w-2/3 border rounded-md py-3'>
              {/* Form  to show user data */}
              <div className='flex justify-center items-center h-1/3'>
                <EditNeighborInfoForm />
              </div>

              <div className='h-1/3 mx-2 border rounded-xl'>
                {/* Here neigbor info */}
                <NeighborDebtsPayments />
              </div>
            </div>
          </div>
        </>
      )}

      {/* <EditNeighborModalForm
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
      /> */}
    </>
  );
};
export default Neighbors;
