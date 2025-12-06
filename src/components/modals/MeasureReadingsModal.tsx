import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
  Chip,
} from '@material-tailwind/react';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

interface MeterReadingType {
  id: number;
  meter_id: number;
  measure_id: number;
  current_reading: number;
  reading_date: string;
  status: string;
  has_anomaly: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
  neighbor_first_name: string | null;
  neighbor_second_name: string | null;
  neighbor_last_name: string | null;
  neighbor_ci: string | null;
  meter_number: string | null;
}

interface MeasureType {
  id: number;
  measure_date: string;
  period: string | null;
  reader_name: string | null;
}

type MeasureReadingsModalProps = {
  open: boolean;
  onClose: () => void;
  measure: MeasureType | null;
};

const STATUS_COLORS: { [key: string]: string } = {
  normal: 'green',
  estimated: 'amber',
  not_read: 'red',
  meter_error: 'red',
};

const STATUS_LABELS: { [key: string]: string } = {
  normal: 'Normal',
  estimated: 'Estimado',
  not_read: 'No Leído',
  meter_error: 'Error Medidor',
};

const MeasureReadingsModal: React.FC<MeasureReadingsModalProps> = ({
  open,
  onClose,
  measure,
}) => {
  const [readings, setReadings] = useState<MeterReadingType[]>([]);
  const [loading, setLoading] = useState(false);

  const apiLink = 'http://127.0.0.1:8000';

  useEffect(() => {
    if (open && measure) {
      fetchReadings();
    }
  }, [open, measure]);

  const fetchReadings = async () => {
    if (!measure) return;

    setLoading(true);
    try {
      const response = await fetch(`${apiLink}/measures/${measure.id}/meter-readings`);
      const data = await response.json();
      setReadings(data);
    } catch (error) {
      console.error('Error al cargar lecturas:', error);
      toast.error('Error al cargar las lecturas de medidores');
    } finally {
      setLoading(false);
    }
  };

  const getFullName = (reading: MeterReadingType) => {
    return `${reading.neighbor_first_name || ''} ${reading.neighbor_second_name || ''} ${reading.neighbor_last_name || ''}`.trim();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-BO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-BO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Dialog open={open} handler={onClose} size="xl">
      <DialogHeader>
        <div className="flex flex-col gap-1">
          <Typography variant="h4">
            Lecturas de Medidores
          </Typography>
          {measure && (
            <Typography variant="small" color="gray" className="font-normal">
              Medición: {formatDate(measure.measure_date)} - {measure.period || 'Sin período'}
              {measure.reader_name && ` - Lector: ${measure.reader_name}`}
            </Typography>
          )}
        </div>
      </DialogHeader>

      <DialogBody className="h-[600px] overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <ClipLoader size={50} />
          </div>
        ) : (
          <>
            <div className="mb-4">
              <Typography variant="small" color="blue-gray">
                Total de lecturas: {readings.length}
              </Typography>
            </div>

            <div className="overflow-auto border border-blue-gray-100 rounded-lg">
              <table className="w-full min-w-max table-auto text-left">
                <thead className="sticky top-0 bg-blue-gray-50 z-10">
                  <tr>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-3">
                      <Typography variant="small" color="blue-gray" className="font-bold">
                        Vecino
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-3">
                      <Typography variant="small" color="blue-gray" className="font-bold">
                        CI
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-3">
                      <Typography variant="small" color="blue-gray" className="font-bold">
                        Medidor
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-3">
                      <Typography variant="small" color="blue-gray" className="font-bold">
                        Lectura
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-3">
                      <Typography variant="small" color="blue-gray" className="font-bold">
                        Estado
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-3">
                      <Typography variant="small" color="blue-gray" className="font-bold">
                        Anomalía
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-3">
                      <Typography variant="small" color="blue-gray" className="font-bold">
                        Fecha Lectura
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-3">
                      <Typography variant="small" color="blue-gray" className="font-bold">
                        Notas
                      </Typography>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {readings.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-4 text-center">
                        <Typography variant="small" color="gray">
                          No hay lecturas registradas para esta medición
                        </Typography>
                      </td>
                    </tr>
                  ) : (
                    readings.map((reading, index) => {
                      const isLast = index === readings.length - 1;
                      const classes = isLast
                        ? 'p-3'
                        : 'p-3 border-b border-blue-gray-50';

                      return (
                        <tr key={reading.id} className="hover:bg-blue-gray-50/50">
                          <td className={classes}>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              {getFullName(reading)}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              {reading.neighbor_ci || '-'}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              {reading.meter_number || '-'}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography variant="small" color="blue-gray" className="font-semibold">
                              {reading.current_reading}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Chip
                              size="sm"
                              value={STATUS_LABELS[reading.status] || reading.status}
                              color={STATUS_COLORS[reading.status] || 'gray'}
                            />
                          </td>
                          <td className={classes}>
                            {reading.has_anomaly ? (
                              <Chip size="sm" value="Sí" color="red" />
                            ) : (
                              <Typography variant="small" color="blue-gray">
                                No
                              </Typography>
                            )}
                          </td>
                          <td className={classes}>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              {formatDateTime(reading.reading_date)}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              {reading.notes || '-'}
                            </Typography>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </DialogBody>

      <DialogFooter>
        <Button variant="text" color="blue-gray" onClick={onClose}>
          Cerrar
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default MeasureReadingsModal;
