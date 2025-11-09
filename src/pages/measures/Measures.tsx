import { CSSProperties, useEffect, useState } from 'react';
import { Typography } from '@material-tailwind/react';
import MeasureTable from '../../components/tables/MeasureTable';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

interface MeasureType {
  id: number;
  measure_date: string;
  period: string | null;
  reader_name: string | null;
  status: string;
  total_meters: number;
  meters_read: number;
  meters_pending: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

const Measures = () => {
  const [data, setData] = useState<MeasureType[]>([]);
  const [loading, setLoading] = useState(true);

  const apiLink = 'http://127.0.0.1:8000/measures';

  // Cargar datos de mediciones
  const fetchMeasures = () => {
    setLoading(true);
    fetch(apiLink, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        toast.error('Error al cargar las mediciones');
      });
  };

  useEffect(() => {
    fetchMeasures();
  }, []);

  // Handler para crear nueva medición
  const handleCreateMeasure = (formData: any) => {
    fetch(apiLink, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        measure_date: formData.measureDate,
        period: formData.period,
        reader_name: formData.readerName,
        notes: formData.notes,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        fetchMeasures();
        toast.success('Medición creada exitosamente');
      })
      .catch((error) => {
        console.error('Error al crear medición:', error);
        toast.error('Error al crear la medición');
      });
  };

  // Handler para ver detalles
  const handleViewMeasure = (measure: MeasureType) => {
    // TODO: Implementar vista de detalles
    console.log('Ver medición:', measure);
    toast.info('Función de vista de detalles en desarrollo');
  };

  // Handler para editar
  const handleEditMeasure = (measure: MeasureType) => {
    // TODO: Implementar edición
    console.log('Editar medición:', measure);
    toast.info('Función de edición en desarrollo');
  };

  // Handler para eliminar
  const handleDeleteMeasure = (measure: MeasureType) => {
    if (window.confirm(`¿Está seguro de eliminar la medición del ${measure.measure_date}?`)) {
      fetch(`${apiLink}/${measure.id}`, {
        method: 'DELETE',
      })
        .then(() => {
          fetchMeasures();
          toast.success('Medición eliminada exitosamente');
        })
        .catch((error) => {
          console.error('Error al eliminar medición:', error);
          toast.error('Error al eliminar la medición');
        });
    }
  };

  return (
    <>
      <Typography className='text-center mb-2' variant='h3' color='black'>
        Mediciones
      </Typography>

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
        <div className='p-10'>
          <MeasureTable
            tableData={data}
            onCreate={handleCreateMeasure}
            onView={handleViewMeasure}
            onEdit={handleEditMeasure}
            onDelete={handleDeleteMeasure}
          />
        </div>
      )}
    </>
  );
};

export default Measures;