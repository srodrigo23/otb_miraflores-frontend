import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  userName: string
  password: string
}
 
export function Login() {

  const { register, handleSubmit, watch, formState: { errors }, } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }


  return (
    <div className="flex-grow flex items-center justify-center ">
      
     <Card className="m-auto px-6 py-3 border " color="transparent" shadow={true}>
      
      <Typography  className='text-center mt-10' variant="h3" color="blue-gray">
        Administrador
      </Typography>

      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Nombre de Usuario
          </Typography>
          <Input
            label="Ingresa su nombre"
            placeholder="name@mail.com"
            className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
            defaultValue={'admin'}
            {...register("userName", {required:true})}
          />
          {errors.userName && <span className="text-red-400 text-xs">Debes ingresar el nombre de usuario</span>}

          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Contraseña
          </Typography>
          <Input
            type="password"
            size="lg"
            placeholder="********"
            className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
            defaultValue={'admin'}
            {...register("password", {required:true})}
          />
          {errors.password && <span className="text-red-400 text-xs">Debes ingresar la contraseña</span>}

        </div>
        <Button className="mt-6 bg-blue-400" fullWidth type="submit"> Iniciar Sesión</Button>
      </form>
    </Card>
    </div>
  
  );
}


