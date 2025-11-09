import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
  Checkbox,
  IconButton,
  Input,
} from '@material-tailwind/react';
import { PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

interface AssistanceType {
  id: number;
  meet_id: number;
  neighbor_id: number;
  neighbor_name: string | null;
  is_present: boolean;
  is_on_time: boolean;
  arrival_time: string | null;
  departure_time: string | null;
  excuse_reason: string | null;
  has_excuse: boolean;
  represented_by: string | null;
  has_representative: boolean;
  notes: string | null;
}

interface MeetType {
  id: number;
  title: string;
  meet_date: string;
}

type AssistanceModalProps = {
  open: boolean;
  onClose: () => void;
  meet: MeetType | null;
};

const AssistanceModal: React.FC<AssistanceModalProps> = ({
  open,
  onClose,
  meet,
}) => {
  const [assistances, setAssistances] = useState<AssistanceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<AssistanceType>>({});

  const apiLink = 'http://127.0.0.1:8000';

  // Cargar asistencias cuando se abre el modal
  useEffect(() => {
    if (open && meet) {
      fetchAssistances();
    }
  }, [open, meet]);

  const fetchAssistances = () => {
    if (!meet) return;

    setLoading(true);
    fetch(`${apiLink}/meets/${meet.id}/assistances`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => {
        setAssistances(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        toast.error('Error al cargar las asistencias');
      });
  };

  const handleEdit = (assistance: AssistanceType) => {
    setEditingId(assistance.id);
    setEditForm({
      is_present: assistance.is_present,
      is_on_time: assistance.is_on_time,
      excuse_reason: assistance.excuse_reason,
      has_excuse: assistance.has_excuse,
      represented_by: assistance.represented_by,
      has_representative: assistance.has_representative,
      notes: assistance.notes,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSaveEdit = (assistanceId: number) => {
    fetch(`${apiLink}/assistances/${assistanceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editForm),
    })
      .then((response) => response.json())
      .then(() => {
        toast.success('Asistencia actualizada');
        setEditingId(null);
        setEditForm({});
        fetchAssistances();
      })
      .catch((error) => {
        console.error('Error al actualizar asistencia:', error);
        toast.error('Error al actualizar la asistencia');
      });
  };

  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return '-';
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
        <div>
          <Typography variant="h4">Asistencias - {meet?.title}</Typography>
          <Typography variant="small" color="gray" className="font-normal">
            Fecha: {meet?.meet_date ? formatDateTime(meet.meet_date) : ''}
          </Typography>
        </div>
      </DialogHeader>
      <DialogBody className="overflow-auto max-h-[60vh]">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <ClipLoader size={50} />
          </div>
        ) : assistances.length === 0 ? (
          <Typography className="text-center py-10" color="gray">
            No hay registros de asistencia para esta reunión
          </Typography>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                      Vecino
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                      Presente
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                      Puntual
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                      Justificación
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                      Representante
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                      Notas
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                      Acciones
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {assistances.map((assistance, index) => {
                  const isLast = index === assistances.length - 1;
                  const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';
                  const isEditing = editingId === assistance.id;

                  return (
                    <tr key={assistance.id} className="hover:bg-blue-gray-50/50">
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {assistance.neighbor_name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        {isEditing ? (
                          <Checkbox
                            checked={editForm.is_present || false}
                            onChange={(e) =>
                              setEditForm({ ...editForm, is_present: e.target.checked })
                            }
                            crossOrigin={undefined}
                          />
                        ) : (
                          <Checkbox
                            checked={assistance.is_present}
                            disabled
                            crossOrigin={undefined}
                          />
                        )}
                      </td>
                      <td className={classes}>
                        {isEditing ? (
                          <Checkbox
                            checked={editForm.is_on_time || false}
                            onChange={(e) =>
                              setEditForm({ ...editForm, is_on_time: e.target.checked })
                            }
                            crossOrigin={undefined}
                          />
                        ) : (
                          <Checkbox
                            checked={assistance.is_on_time}
                            disabled
                            crossOrigin={undefined}
                          />
                        )}
                      </td>
                      <td className={classes}>
                        {isEditing ? (
                          <Input
                            size="sm"
                            value={editForm.excuse_reason || ''}
                            onChange={(e) =>
                              setEditForm({ ...editForm, excuse_reason: e.target.value })
                            }
                            crossOrigin={undefined}
                          />
                        ) : (
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {assistance.excuse_reason || '-'}
                          </Typography>
                        )}
                      </td>
                      <td className={classes}>
                        {isEditing ? (
                          <Input
                            size="sm"
                            value={editForm.represented_by || ''}
                            onChange={(e) =>
                              setEditForm({ ...editForm, represented_by: e.target.value })
                            }
                            crossOrigin={undefined}
                          />
                        ) : (
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {assistance.represented_by || '-'}
                          </Typography>
                        )}
                      </td>
                      <td className={classes}>
                        {isEditing ? (
                          <Input
                            size="sm"
                            value={editForm.notes || ''}
                            onChange={(e) =>
                              setEditForm({ ...editForm, notes: e.target.value })
                            }
                            crossOrigin={undefined}
                          />
                        ) : (
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {assistance.notes || '-'}
                          </Typography>
                        )}
                      </td>
                      <td className={classes}>
                        {isEditing ? (
                          <div className="flex gap-2">
                            <IconButton
                              size="sm"
                              color="green"
                              onClick={() => handleSaveEdit(assistance.id)}
                            >
                              <CheckIcon className="h-4 w-4" />
                            </IconButton>
                            <IconButton
                              size="sm"
                              color="red"
                              onClick={handleCancelEdit}
                            >
                              <XMarkIcon className="h-4 w-4" />
                            </IconButton>
                          </div>
                        ) : (
                          <IconButton
                            size="sm"
                            variant="text"
                            onClick={() => handleEdit(assistance)}
                          >
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </DialogBody>
      <DialogFooter>
        <Button variant="gradient" color="blue" onClick={onClose}>
          <span>Cerrar</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AssistanceModal;
