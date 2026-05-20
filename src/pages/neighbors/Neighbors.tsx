import { useState } from 'react';
import {
  Typography,
  Button,
} from '@material-tailwind/react';

import { useNeighborsData } from '../../hooks/useNeighborsData';
import { EditNeighborInfoForm } from '../../components/forms/EditNeighborInfoForm';
import { NeighborList } from '../../components/lists/NeighborsList';
import { NeighborDebtsPayments } from '../../components/NeighborDebtsPayments';
import { LoaderAnimation } from '../../components/LoaderAnimation';
import { NeighborType } from '../../interfaces/neighborsInterfaces';


const Neighbors = () => {

  const { data: neighborsData = [], isLoading: loading, refetch } = useNeighborsData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNeighbor, setSelectedNeighbor] = useState<NeighborType | null>(null);

  return (
    <>
      {loading ? (
        <LoaderAnimation isLoading={loading} />
      ) : (
        <div className='flex flex-col gap-6 px-4 py-4 lg:h-full lg:overflow-hidden'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 flex-shrink-0'>
            <Typography variant='h2'>Detalle General de Vecinos</Typography>
            <Button className='w-full sm:w-auto'>NUEVO VECINO</Button>
          </div>

          <div className='flex justify-center'>
            <NeighborList
              neighborsData={neighborsData}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              neighborSelected={selectedNeighbor}
              onSelectNeighbor={setSelectedNeighbor}
            />
          </div>

          <div className='flex flex-col gap-4 lg:flex-1 lg:overflow-y-auto lg:min-h-0'>
            <div className='flex justify-center flex-shrink-0'>
              <EditNeighborInfoForm />
            </div>

            <div className='border rounded-xl lg:flex-1 lg:min-h-0'>
              <NeighborDebtsPayments />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Neighbors;
