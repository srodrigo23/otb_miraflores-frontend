import { CSSProperties } from 'react';

import { useState } from 'react';
import {
  Card,
  Chip,
  List,
  ListItem,
  Typography,
  Button,
  Input,
  IconButton,
} from '@material-tailwind/react';
import { MagnifyingGlassIcon, PencilIcon} from '@heroicons/react/24/outline';


import EditNeighborModalForm from '../../components/forms/EditNeighborModalForm';
import DeleteNeighborModal from '../../components/modals/DeleteNeighborModal';
import NeighborDetailModal from '../../components/modals/NeighborDetailModal';
import NeighborTable from '../../components/tables/NeighborTable';

import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

import { NeighborType } from '../../interfaces/neighborsInterfaces';
import { useNeighborsData } from '../../hooks/useNeighborsData';
import { useUpdateNeighbor } from '../../hooks/useUpdateNeighbor';
import { apiLink } from '../../config';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

const Neighbors = () => {
  const { data: neighborsData = [], isLoading, refetch } = useNeighborsData();
  const { update: updateNeighbor } = useUpdateNeighbor();

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

  // Handlers para editar
  const handleEditNeighbor = (neighbor: NeighborType) => {
    setSelectedNeighbor(neighbor);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedNeighbor(null);
  };

  const handleSubmitEdit = async (formData: any) => {
    if (!selectedNeighbor) return;
    const dataToEdit = {
      first_name: formData.firstName,
      second_name: formData.secondName,
      last_name: formData.lastName,
      ci: formData.ci,
      phone_number: formData.phonenumber,
      email: formData.email,
    };
    console.log(dataToEdit);
    const result = await updateNeighbor(selectedNeighbor.id, dataToEdit);

    if (result?.ok) {
      handleCloseEditModal();
      toast.success('Vecino actualizado exitosamente');
      refetch();
    } else {
      toast.error('Error al actualizar el vecino');
    }
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
        // fetchNeighbors();
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
        // fetchNeighbors();
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
      {isLoading ? (
        <div className='flex justify-center items-center py-20'>
          <ClipLoader
            loading={isLoading}
            cssOverride={override}
            size={150}
            aria-label='Loading Spinner'
            data-testid='loader'
          />
        </div>
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
            {/* <NeighborTable
            tableData={neighborsData}
            onEdit={handleEditNeighbor}
            onDelete={handleDeleteNeighbor}
            onCreate={handleCreateNeighbor}
            onView={handleViewNeighbor}
          /> */}
            <div className='w-1/3 border rounded-md'>
              <div className='flex pt-4 px-4 pb-1'>
                <Input
                  label='Buscar vecino'
                  icon={<MagnifyingGlassIcon className='h-5 w-5' />}
                  // value={searchTerm}
                  // onChange={(e) => setSearchTerm(e.target.value)}
                  crossOrigin={undefined}
                />
              </div>

              <Card className='overflow-y-auto h-screen'>
                <List className='gap-0'>
                  {neighborsData.map((neighbor, index) => {
                    return (
                      <ListItem
                        className='flex justify-between items-center border-t py-1'
                        selected={index == 0}
                      >
                        <p className='flex gap-4 items-center'>
                          <span className='text-sm'>{index + 1}</span>
                          <Typography
                            variant='paragraph'
                            className='font-semibold text-sm'
                          >
                            {`${neighbor.last_name} ${neighbor.first_name} ${neighbor.second_name}`}
                          </Typography>
                        </p>
                        <Chip value={123} color='red' />
                      </ListItem>
                    );
                  })}
                </List>
              </Card>
            </div>

            <div className='w-2/3 border rounded-md py-3'>
              <div className='flex justify-center '>
                <div className='border rounded-md p-4 w-3/4'>
                  <div className='flex justify-between pb-3'>
                    <Typography variant='h4'>Datos personales</Typography>
                    <IconButton size='sm' variant='outlined' color='blue-gray'>
                      <PencilIcon className='h-5 w-5' />
                    </IconButton>
                  </div>

                  <div className='grid grid-cols-1 lg:grid-cols-5 gap-2 items-center '>
                    <div className='flex col-span-1 justify-start lg:justify-end'>
                      <Typography variant='h6' color='black'>
                        Nombres:
                      </Typography>
                    </div>
                    <div className='col-span-4'>
                      <Input
                        value={'JUAN'}
                        disabled
                        // crossOrigin={undefined}
                      />
                    </div>
                    <div className='flex col-span-1 justify-start lg:justify-end'>
                      <Typography variant='h6' color='black'>
                        Apellidos:
                      </Typography>
                    </div>
                    <div className='col-span-4'>
                      <Input
                        defaultValue={'ACNO'}
                        disabled
                        crossOrigin={undefined}
                        // {...register('lastName', { required: true })}
                      />
                    </div>
                    <div className='flex col-span-1 justify-start lg:justify-end'>
                      <Typography variant='h6' color='black'>
                        Ci:
                      </Typography>
                    </div>
                    <div className='flex col-span-4 justify-end'>
                      <Input
                        defaultValue={''}
                        disabled
                        crossOrigin={undefined}
                        // {...register('ci', { required: true })}
                      />
                    </div>
                    <div className='flex col-span-1 justify-start lg:justify-end'>
                      <Typography variant='h6' color='black'>
                        Celular:
                      </Typography>
                    </div>
                    <div className='flex col-span-4 justify-end'>
                      <Input
                        type='number'
                        inputMode='numeric'
                        disabled
                        className='appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                        crossOrigin={undefined}
                        // {...register('phonenumber', { required: true })}
                      />
                    </div>
                    <div className='flex col-span-1 justify-start lg:justify-end'>
                      <Typography variant='h6' color='black'>
                        Correo:
                      </Typography>
                    </div>
                    <div className='flex col-span-4 justify-end'>
                      <Input
                        disabled
                        defaultValue={''}
                        crossOrigin={undefined}
                        // {...register('email')}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex gap-5'>
                <div className='flex-1'>
                  {/* {errors.firstName && (
                    <span className='text-red-400 text-xs'>
                      Campo requerido
                    </span>
                  )} */}
                </div>

                <div className='flex-1'></div>
              </div>

              <div>
                {/* {errors.lastName && (
                  <span className='text-red-400 text-xs'>Campo requerido</span>
                )} */}
              </div>

              <div className='flex gap-5'>
                <div className='flex-1'>
                  {/* {errors.ci && (
                    <span className='text-red-400 text-xs'>
                      Campo requerido
                    </span>
                  )} */}
                </div>
              </div>
            </div>
          </div>
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
