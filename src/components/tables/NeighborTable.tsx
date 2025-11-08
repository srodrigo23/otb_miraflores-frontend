import { useState, useMemo } from 'react';
import { Typography, Input, IconButton } from '@material-tailwind/react';
import { MagnifyingGlassIcon, ChevronUpDownIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface NeighborType {
  id: number;
  first_name: string;
  second_name: string;
  last_name: string;
  ci: string;
  phone_number: string;
  email: string;
}

type NeighborTableProps = {
  tableData: NeighborType[];
  onEdit?: (neighbor: NeighborType) => void;
  onDelete?: (neighbor: NeighborType) => void;
};

type SortField = 'id' | 'last_name' | 'first_name' | 'ci' | 'phone_number' | 'email';
type SortOrder = 'asc' | 'desc';

const TABLE_HEAD = [
  { label: 'Num.', field: 'id' as SortField, sortable: true },
  { label: 'Apellidos', field: 'last_name' as SortField, sortable: true },
  { label: 'Nombres', field: 'first_name' as SortField, sortable: true },
  { label: 'CI', field: 'ci' as SortField, sortable: true },
  { label: 'Celular', field: 'phone_number' as SortField, sortable: true },
  { label: 'Correo', field: 'email' as SortField, sortable: true },
  { label: 'Acciones', field: null, sortable: false },
];

const NeighborTable: React.FC<NeighborTableProps> = ({ tableData, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filtrar datos por búsqueda
  const filteredData = useMemo(() => {
    return tableData.filter((neighbor) => {
      const fullName = `${neighbor.first_name} ${neighbor.second_name} ${neighbor.last_name}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    });
  }, [tableData, searchTerm]);

  // Ordenar datos
  const sortedData = useMemo(() => {
    const sorted = [...filteredData].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'first_name') {
        aValue = `${a.first_name} ${a.second_name}`;
        bValue = `${b.first_name} ${b.second_name}`;
      }

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
  }, [filteredData, sortField, sortOrder]);

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

  // Resetear página cuando cambia la búsqueda
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <div className='flex flex-col h-full'>
      {/* Campo de búsqueda */}
      <div className='mb-4 px-4'>
        <div className='w-full md:w-96'>
          <Input
            label='Buscar vecino'
            icon={<MagnifyingGlassIcon className='h-5 w-5' />}
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            crossOrigin={undefined}
          />
        </div>
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
                    head.sortable ? 'cursor-pointer hover:bg-blue-gray-100 transition-colors' : ''
                  }`}
                  onClick={() => head.sortable && head.field && handleSort(head.field)}
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
                        className={`h-4 w-4 ${sortField === head.field ? 'text-blue-500' : ''}`}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(
              (
                {
                  id,
                  first_name,
                  second_name,
                  last_name,
                  ci,
                  phone_number,
                  email,
                },
                index
              ) => {
                const isLast = index === paginatedData.length - 1;
                const classes = isLast
                  ? 'p-3'
                  : 'p-3 border-b border-blue-gray-50';

                const neighbor = {
                  id,
                  first_name,
                  second_name,
                  last_name,
                  ci,
                  phone_number,
                  email,
                };

                return (
                  <tr key={id} className='hover:bg-blue-gray-50/50'>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {id}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {last_name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {`${first_name} ${second_name}`}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-medium'
                      >
                        {ci}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {phone_number}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {email}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className='flex gap-2'>
                        {(
                          <IconButton
                            size='sm'
                            variant='text'
                            color='blue'
                            // onClick={() => onEdit(neighbor)}
                            title='Editar'
                          >
                            <PencilIcon className='h-4 w-4 text-black' />
                          </IconButton>
                        )}
                        {(
                          <IconButton
                            size='sm'
                            variant='text'
                            color='red'
                            // onClick={() => onDelete(neighbor)}
                            title='Eliminar'
                          >
                            <TrashIcon className='h-4 w-4' />
                          </IconButton>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>

      {/* Controles de paginación */}
      <div className='flex items-center justify-between border-t border-blue-gray-100 p-4'>
        <Typography variant='small' color='blue-gray' className='font-normal'>
          Página {currentPage} de {totalPages} - Total: {filteredData.length} vecinos
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
            .filter(page => {
              // Mostrar primeras 2, últimas 2, y páginas cercanas a la actual
              return page === 1 ||
                     page === totalPages ||
                     (page >= currentPage - 1 && page <= currentPage + 1);
            })
            .map((page, index, array) => {
              // Añadir puntos suspensivos si hay saltos
              const showEllipsisBefore = index > 0 && page - array[index - 1] > 1;
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

export default NeighborTable;
