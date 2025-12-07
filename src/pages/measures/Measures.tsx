import { CSSProperties, useEffect, useState } from 'react';
import { Typography } from '@material-tailwind/react';
import MeasureTable from '../../components/tables/MeasureTable';
import MeasureReadingsModal from '../../components/modals/MeasureReadingsModal';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { MeasureType } from '../../interfaces/measuresIterfaces';


const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

const Measures = () => {
  const [data, setData] = useState<MeasureType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMeasure, setSelectedMeasure] = useState<MeasureType | null>(null);
  const [openReadingsModal, setOpenReadingsModal] = useState(false);

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

  // Handler para ver lecturas
  const handleViewReadings = (measure: MeasureType) => {
    setSelectedMeasure(measure);
    setOpenReadingsModal(true);
  };

  // Handler para cerrar modal de lecturas
  const handleCloseReadingsModal = () => {
    setOpenReadingsModal(false);
    setSelectedMeasure(null);
  };

  // Handler para generar deudas
  const handleGenerateDebts = async (measure: MeasureType) => {
    if (!window.confirm(`¿Está seguro de generar deudas para la medición del ${measure.measure_date}?`)) {
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/measures/${measure.id}/generate-debts`, {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          `Deudas generadas exitosamente: ${data.debts_created} creadas, ${data.debts_skipped} omitidas`
        );
      } else {
        toast.error(data.detail || 'Error al generar deudas');
      }
    } catch (error) {
      console.error('Error al generar deudas:', error);
      toast.error('Error al generar deudas');
    }
  };

  // Handler para eliminar deudas
  const handleDeleteDebts = async (measure: MeasureType) => {
    if (!window.confirm(`¿Está seguro de eliminar las deudas pendientes de la medición del ${measure.measure_date}?\nSolo se eliminarán las deudas que no hayan sido pagadas.`)) {
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/measures/${measure.id}/debts`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          `Deudas eliminadas exitosamente: ${data.debts_deleted} deudas pendientes eliminadas`
        );
      } else {
        toast.error(data.detail || 'Error al eliminar deudas');
      }
    } catch (error) {
      console.error('Error al eliminar deudas:', error);
      toast.error('Error al eliminar deudas');
    }
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
        <div className=''>
          <MeasureTable
            tableData={data}
            onCreate={handleCreateMeasure}
            onView={handleViewMeasure}
            onEdit={handleEditMeasure}
            onDelete={handleDeleteMeasure}
            onViewReadings={handleViewReadings}
            onGenerateDebts={handleGenerateDebts}
            onDeleteDebts={handleDeleteDebts}
          />
        </div>
      )}

      <MeasureReadingsModal
        open={openReadingsModal}
        onClose={handleCloseReadingsModal}
        measure={selectedMeasure}
      />
    </>
  );
};

export default Measures;