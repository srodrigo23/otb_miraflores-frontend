import { useEffect, useState } from 'react';
import {
  Input,
  DialogBody,
  DialogFooter,
  Button,
  Dialog,
  DialogHeader,
  Textarea,
  Select, Option
} from '@material-tailwind/react';

import { useForm, SubmitHandler } from 'react-hook-form';
import { getTodayDate } from '../../utils/dates';

type InputsNewMeasureForm = {
  measureDate: string;
  period: string;
  readerName: string;
  notes: string;
};

type NewMeasureModalFormType = {
  openModalState: boolean;
  handleCloseModal: () => void;
  // onSubmit: (data: InputsNewMeasureForm) => void;
};

const NewMeasureModalForm: React.FC<NewMeasureModalFormType> = ({
  openModalState,
  handleCloseModal,
  // onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputsNewMeasureForm>();

  const periods = ["ENERO-FEBRERO", "MARZO-ABRIL", "MAYO-JUNIO", "JULIO-AGOSTO", "SEPTIEMBRE-OCTUBRE", "NOVIEMBRE-DICIEMBRE"]  
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDate())
  const [selectedPeriod, setSelectedPeriod] = useState<number>(0)

  useEffect(() => {
    const selectedMonth = new Date(`${selectedDate} 00:00:00`).getMonth();
    setSelectedPeriod(Math.floor(selectedMonth / 2));
  }, [selectedPeriod, selectedDate]);

  const onSubmitMethod: SubmitHandler<InputsNewMeasureForm> = (data) => {
    // onSubmit(data);
    reset();
    handleCloseModal();
  };

  const handleClose = () => {
    reset();
    handleCloseModal();
  };

  return (
    <Dialog
      open={openModalState}
      handler={handleClose}
      size='xs'
      dismiss={{ escapeKey: false, outsidePress: false }}
    >
      <DialogBody>
        <form
          className='flex flex-col gap-5'
          onSubmit={handleSubmit(onSubmitMethod)}
        >
          <DialogHeader className='justify-center'>Nueva Medición</DialogHeader>
          <Input
            type='date'
            label='Fecha de Medición'
            defaultValue={selectedDate}
            crossOrigin={undefined}
            {...register('measureDate', { required: true })}
            onChange={(event) => {   
              setSelectedDate(event.target.value);
            }}
          />
          {errors.measureDate && (
            <span className='text-red-400 text-xs'>Campo requerido</span>
          )}

          <Select
            label='Periodo'
            value={periods[selectedPeriod]}
            onChange={(val) => {
              // const measureToChange = getMeasureByPeriod(val);
              // if (measureToChange) {
              //   setSelectedMeasure(measureToChange);
              // }
            }}
          >
            {periods.map((period, index) => (
              <Option key={index} value={period}>
                {`${index + 1}.- ${period}`}
              </Option>
            ))}
          </Select>

          <Input
            label='Nombre del Responsable'
            crossOrigin={undefined}
            {...register('readerName')}
          />
          <Textarea label='Notas u Observaciones' {...register('notes')} />

          <DialogFooter className='px-0 py-0'>
            <Button
              variant='outlined'
              color='red'
              onClick={handleClose}
              className='mr-1'
              size='sm'
            >
              <span>Cancelar</span>
            </Button>
            <Button type='submit' size='sm'>
              <span>Crear Medición</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogBody>
    </Dialog>
  );
};

export default NewMeasureModalForm;
