import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";


 
export function Login() {
  return (
    <div className="flex-grow flex items-center justify-center bg-gray-100">
      
     <Card className="m-auto px-6 py-3 border" color="transparent" shadow={true}>
      
      <Typography  className='text-center mt-10' variant="h3" color="blue-gray">
        Administrador
      </Typography>

      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
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
          />
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
          />
        </div>
        <Button className="mt-6 bg-blue-400" fullWidth> Iniciar Sesión</Button>
      </form>
    </Card>
    </div>
  
  );
}


