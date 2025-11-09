import { useState, useMemo } from 'react';
import {
  Typography,
  IconButton,
  Button,
  Chip,
} from '@material-tailwind/react';
import {
  ChevronUpDownIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';
import NewMeasureModalForm from '../forms/NewMeasureModalForm';

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

type MeasureTableProps = {
  tableData: MeasureType[];
  onEdit?: (measure: MeasureType) => void;
  onDelete?: (measure: MeasureType) => void;
  onCreate?: (data: any) => void;
  onView?: (measure: MeasureType) => void;
};

type SortField = 'id' | 'measure_date' | 'period' | 'reader_name' | 'status' | 'created_at';
type SortOrder = 'asc' | 'desc';

const TABLE_HEAD = [
  { label: 'ID', field: 'id' as SortField, sortable: true },
  { label: 'Fecha de Medición', field: 'measure_date' as SortField, sortable: true },
  { label: 'Periodo', field: 'period' as SortField, sortable: true },
  { label: 'Responsable', field: 'reader_name' as SortField, sortable: true },
  { label: 'Estado', field: 'status' as SortField, sortable: true },
  { label: 'Medidores', field: null, sortable: false },
  { label: 'Fecha Creación', field: 'created_at' as SortField, sortable: true },
  { label: 'Acciones', field: null, sortable: false },
];

const STATUS_COLORS: { [key: string]: string } = {
  in_progress: 'blue',
  completed: 'green',
  cancelled: 'red',
};

const STATUS_LABELS: { [key: string]: string } = {
  in_progress: 'En Progreso',
  completed: 'Completada',
  cancelled: 'Cancelada',
};

const MeasureTable: React.FC<MeasureTableProps> = ({
  tableData,
  onEdit,
  onDelete,
  onCreate,
  onView,
}) => {
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal para nueva medición
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(!openModal);

  // Ordenar datos
  const sortedData = useMemo(() => {
    const sorted = [...tableData].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
    return sorted;
  }, [tableData, sortField, sortOrder]);

  // Paginación
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-BO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div className='flex flex-col h-full'>
      {/* Botón para crear nueva medición */}
      <div className='flex mb-4 justify-end'>
        <Button onClick={handleOpenModal}>NUEVA MEDICIÓN</Button>
      </div>

      {/* Tabla con scroll interno */}
      <div className='flex-1 overflow-auto border border-blue-gray-100 rounded-lg'>
        <table className='w-full min-w-max table-auto text-left'>
          <thead className='sticky top-0 bg-blue-gray-50 z-10'>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head.label}
                  className={`border-b border-blue-gray-100 bg-blue-gray-50 p-3 ${
                    head.sortable
                      ? 'cursor-pointer hover:bg-blue-gray-100 transition-colors'
                      : ''
                  }`}
                  onClick={() =>
                    head.sortable && head.field && handleSort(head.field)
                  }
                >
                  <div className='flex items-center gap-2'>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-normal leading-none opacity-70'
                    >
                      {head.label}
                    </Typography>
                    {head.sortable && (
                      <ChevronUpDownIcon
                        className={`h-4 w-4 ${
                          sortField === head.field ? 'text-blue-500' : ''
                        }`}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((measure, index) => {
              const isLast = index === paginatedData.length - 1;
              const classes = isLast
                ? 'p-3'
                : 'p-3 border-b border-blue-gray-50';

              return (
                <tr key={measure.id} className='hover:bg-blue-gray-50/50'>
                  <td className={classes}>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-normal'
                    >
                      {measure.id}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-medium'
                    >
                      {formatDate(measure.measure_date)}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-normal'
                    >
                      {measure.period || '-'}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-normal'
                    >
                      {measure.reader_name || '-'}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Chip
                      size='sm'
                      value={STATUS_LABELS[measure.status] || measure.status}
                      color={STATUS_COLORS[measure.status] || 'gray'}
                    />
                  </td>
                  <td className={classes}>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-normal'
                    >
                      {measure.meters_read}/{measure.total_meters}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-normal'
                    >
                      {formatDate(measure.created_at)}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className='flex gap-2'>
                      {onView && (
                        <IconButton
                          size='sm'
                          variant='text'
                          color='blue'
                          onClick={() => onView(measure)}
                          title='Ver detalles'
                        >
                          <EyeIcon className='h-4 w-4' />
                        </IconButton>
                      )}
                      {onEdit && (
                        <IconButton
                          size='sm'
                          variant='text'
                          color='blue'
                          onClick={() => onEdit(measure)}
                          title='Editar'
                        >
                          <PencilIcon className='h-4 w-4 text-black' />
                        </IconButton>
                      )}
                      {onDelete && (
                        <IconButton
                          size='sm'
                          variant='text'
                          color='red'
                          onClick={() => onDelete(measure)}
                          title='Eliminar'
                        >
                          <TrashIcon className='h-4 w-4' />
                        </IconButton>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <NewMeasureModalForm
        openModalState={openModal}
        handleCloseModal={handleOpenModal}
        onSubmit={(data) => {
          if (onCreate) {
            onCreate(data);
          }
        }}
      />

      {/* Controles de paginación */}
      <div className='flex items-center justify-between border-t border-blue-gray-100 p-4'>
        <Typography variant='small' color='blue-gray' className='font-normal'>
          Página {currentPage} de {totalPages} - Total: {sortedData.length}{' '}
          mediciones
        </Typography>
        <div className='flex gap-2'>
          <IconButton
            size='sm'
            variant='outlined'
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <span>←</span>
          </IconButton>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => {
              return (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              );
            })
            .map((page, index, array) => {
              const showEllipsisBefore =
                index > 0 && page - array[index - 1] > 1;
              return (
                <div key={page} className='flex gap-2'>
                  {showEllipsisBefore && <span className='px-2'>...</span>}
                  <IconButton
                    size='sm'
                    variant={currentPage === page ? 'filled' : 'outlined'}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </IconButton>
                </div>
              );
            })}
          <IconButton
            size='sm'
            variant='outlined'
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <span>→</span>
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default MeasureTable;
