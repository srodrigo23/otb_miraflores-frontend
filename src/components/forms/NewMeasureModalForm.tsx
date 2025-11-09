import {
  Input,
  DialogBody,
  DialogFooter,
  Button,
  Dialog,
  Typography,
  Textarea,
} from '@material-tailwind/react';

import { useForm, SubmitHandler } from 'react-hook-form';

type InputsNewMeasureForm = {
  measureDate: string;
  period: string;
  readerName: string;
  notes: string;
};

type NewMeasureModalFormType = {
  openModalState: boolean;
  handleCloseModal: () => void;
  onSubmit: (data: InputsNewMeasureForm) => void;
};

const NewMeasureModalForm: React.FC<NewMeasureModalFormType> = ({
  openModalState,
  handleCloseModal,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputsNewMeasureForm>();

  const onSubmitMethod: SubmitHandler<InputsNewMeasureForm> = (data) => {
    onSubmit(data);
    reset();
    handleCloseModal();
  };

  const handleClose = () => {
    reset();
    handleCloseModal();
  };

  // Obtener la fecha actual en formato YYYY-MM-DD para el campo de fecha
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Obtener el periodo actual (formato YYYY-MM)
  const getCurrentPeriod = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  };

  return (
    <Dialog open={openModalState} handler={handleClose}>
      <DialogBody>
        <form
          className='flex flex-col gap-5 mx-4'
          onSubmit={handleSubmit(onSubmitMethod)}
        >
          <Typography variant='h2' color='black'>
            Nueva Medición
          </Typography>

          <div className='flex gap-5'>
            <div className='flex-1'>
              <Input
                type='date'
                label='Fecha de Medición'
                defaultValue={getTodayDate()}
                crossOrigin={undefined}
                {...register('measureDate', { required: true })}
              />
              {errors.measureDate && (
                <span className='text-red-400 text-xs'>Campo requerido</span>
              )}
            </div>

            <div className='flex-1'>
              <Input
                label='Periodo (ej: 2025-01)'
                defaultValue={getCurrentPeriod()}
                placeholder='YYYY-MM'
                crossOrigin={undefined}
                {...register('period')}
              />
            </div>
          </div>

          <div>
            <Input
              label='Nombre del Responsable'
              crossOrigin={undefined}
              {...register('readerName')}
            />
          </div>

          <div>
            <Textarea
              label='Notas u Observaciones'
              {...register('notes')}
            />
          </div>

          <DialogFooter className='px-0'>
            <Button
              variant='text'
              color='red'
              onClick={handleClose}
              className='mr-1'
            >
              <span>Cancelar</span>
            </Button>
            <Button variant='gradient' color='green' type='submit'>
              <span>Crear Medición</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogBody>
    </Dialog>
  );
};

export default NewMeasureModalForm;
