import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../components/AuthContext"
import { useState } from "react"
import { UserCircle, LockKey } from "@phosphor-icons/react"

type Inputs = {
  userName: string
  password: string
}

export function Login() {

  const {
    register, handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const navigate = useNavigate()
  const { login } = useAuth()
  const [loginError, setLoginError] = useState<string>("")

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // Credenciales hardcodeadas
    if (data.userName === "admin" && data.password === "admin") {
      login({ userName: data.userName })
      navigate("/vecinos")
    } else {
      setLoginError("Usuario o contraseña incorrectos")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 p-4 relative overflow-hidden">

      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-10 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <Card className="relative z-10 w-full max-w-sm px-8 py-12 bg-white/95 backdrop-blur-sm shadow-2xl border-0">

        {/* Logo minimalista */}
        <div className="mb-10">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg">
            <Typography className='text-white font-bold text-2xl'>
              O
            </Typography>
          </div>
          <Typography variant="h5" className='text-center text-gray-800 font-bold'>
            Bienvenido
          </Typography>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Error minimalista */}
          {loginError && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 animate-shake">
              <Typography variant="small" className="text-red-700 text-center">
                {loginError}
              </Typography>
            </div>
          )}

          {/* Input Usuario */}
          <div>
            <Input
              placeholder="Usuario"
              icon={<UserCircle size={20} weight="duotone" className="text-gray-400" />}
              className="!border-0 !border-b-2 !border-gray-200 bg-transparent text-gray-900
                        placeholder:text-gray-400 placeholder:opacity-100 rounded-none px-0
                        focus:!border-blue-600 focus:!border-b-2 focus:ring-0
                        transition-all duration-300"
              labelProps={{
                className: "hidden",
              }}
              containerProps={{
                className: "min-w-0",
              }}
              {...register("userName", {
                required: true,
                onChange: () => setLoginError("")
              })}
            />
            {errors.userName && (
              <Typography variant="small" className="text-red-500 mt-1 text-xs">
                Campo requerido
              </Typography>
            )}
          </div>

          {/* Input Contraseña */}
          <div>
            <Input
              type="password"
              placeholder="Contraseña"
              icon={<LockKey size={20} weight="duotone" className="text-gray-400" />}
              className="!border-0 !border-b-2 !border-gray-200 bg-transparent text-gray-900
                        placeholder:text-gray-400 placeholder:opacity-100 rounded-none px-0
                        focus:!border-blue-600 focus:!border-b-2 focus:ring-0
                        transition-all duration-300"
              labelProps={{
                className: "hidden",
              }}
              containerProps={{
                className: "min-w-0",
              }}
              {...register("password", {
                required: true,
                onChange: () => setLoginError("")
              })}
            />
            {errors.password && (
              <Typography variant="small" className="text-red-500 mt-1 text-xs">
                Campo requerido
              </Typography>
            )}
          </div>

          <Button
            className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
                      shadow-md hover:shadow-lg transition-all duration-300
                      normal-case font-medium py-3 rounded-xl"
            fullWidth
            type="submit"
          >
            Iniciar Sesión
          </Button>

          {/* Info minimalista */}
          {/* <Typography variant="small" className="text-gray-400 text-center mt-6 text-xs">
            Prueba con <span className="text-blue-600 font-medium">admin</span>
          </Typography> */}
        </form>
      </Card>
    </div>
  );
}


