import {
    Input,
    DialogBody,
    DialogFooter,
    Button,
    Dialog
} from "@material-tailwind/react"

import { useForm, SubmitHandler } from "react-hook-form"

type InputsNewNeighborForm = {
  firstName: string
  secondName: string
  lastName:string
  password: string
  ci:string
  phonenumber:string
  email:string
}

type NewNeighborModalFormType = {
    openModalState:boolean,
    handleSubmitMethod:()=>void
}

const NewNeighborModalForm: React.FC<NewNeighborModalFormType> = ({openModalState, handleSubmitMethod}) => {

    const { 
        register, handleSubmit, 
        // watch, 
        formState: { errors }, } = useForm<InputsNewNeighborForm>()
    
    const onSubmitMethod: SubmitHandler<InputsNewNeighborForm> = (data) => {
        console.log(data)
    }

    return(
        <Dialog open={openModalState} handler={handleSubmitMethod}>
            <DialogBody >
                <form className="flex flex-col gap-5 mx-4" onSubmit={handleSubmit(onSubmitMethod)}>
                    <div className="flex gap-5">
                        <Input
                            label="Primer nombre"
                            // placeholder="nombre.apellido"
                            // labelProps={{
                            //     className: "hidden",
                            // }}
                            defaultValue={''}
                            {...register("firstName", {required:true})}
                        />
                        {errors.firstName && <span className="text-red-400 text-xs">Debes ingresar el </span>}

                        <Input
                            label="Segundo nombre"
                            // placeholder="nombre.apellido"
                            // labelProps={{
                            //     className: "hidden",
                            // }}
                            defaultValue={''}
                            {...register("secondName")}
                        />
                        {/* {errors.secondName && <span className="text-red-400 text-xs">Debes ingresar el nombre de usuario</span>} */}

                    </div>
                    

                    <Input
                        label="Apellidos"
                        // placeholder="nombre.apellido"
                        // labelProps={{
                        //     className: "hidden",
                        // }}
                        defaultValue={''}
                        {...register("lastName", {required:true})}
                    />
                    {errors.lastName && <span className="text-red-400 text-xs">Debes ingresar los apellidos</span>}
                    
                    <div className="flex gap-5">
                        <Input
                            type="number"
                            inputMode="numeric"
                            label="Cédula de identidad"
                            className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            {...register("ci", {required:true})}
                        />

                        <Input
                            type="number"
                            inputMode="numeric"
                            label="Celular"
                            className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            {...register("phonenumber", {required:true})}
                        />
                    </div>

                    <Input
                        label="Correo Electronico"
                        // placeholder="nombre.apellido"
                        // labelProps={{
                        //     className: "hidden",
                        // }}
                        defaultValue={''}
                        {...register("email")}
                    />
                    {/* {errors.firstName && <span className="text-red-400 text-xs">Debes ingresar el nombre de usuario</span>} */}
                </form>
            </DialogBody>
                
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    // onClick={handleOpenModal}
                    className="mr-1"
                >
                    <span>Cancelar</span>
                </Button>
                <Button 
                    variant="gradient" 
                    color="green" 
                    // onClick={handleOpenModal}
                >
                    <span>Confirmar</span>
                </Button>
            </DialogFooter>
        </Dialog>
    )
}

export default NewNeighborModalForm
