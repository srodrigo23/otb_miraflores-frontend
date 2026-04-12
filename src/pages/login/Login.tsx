import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate, Navigate } from "react-router-dom"
import { useAuth } from "../../components/AuthContext"
import { useState } from "react"

import { Droplets, User, Lock, LogIn} from "lucide-react";
import useFetchData from "../../hooks/useFetchData";
import { config } from '../../config';

type Inputs = {
  username: string
  password: string
}

export function Login() {

  const {
    register, handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const navigate = useNavigate()

  const { login, isAuthenticated, loading } = useAuth()
  
  const [loginError, setLoginError] = useState<string>("")

  const apiLinkLogin = `${JSON.parse(config.production)?config.frontURL_PROD:config.frontURL_DEV}/login`;
  const { execute } = useFetchData(apiLinkLogin);

  const onSubmit: SubmitHandler<Inputs> = async ({ username, password }) => {
    const result = await execute({
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (result?.ok) {
      login(result.data);
      navigate('/vecinos');
    } else {
      setLoginError('Usuario o contraseña incorrectos');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E3F3FA]">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#0B81B7] border-r-transparent"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/vecinos" replace />;
  }

  return (
    <div className='min-h-screen flex items-center justify-center  p-4 relative overflow-hidden bg-[#E3F3FA]'>
      {/* Decorative circles */}
      {/* <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-10 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div> */}

      <Card className='relative z-10 w-full max-w-sm px-8 py-12 bg-white/95 backdrop-blur-sm shadow-2xl border-0'>
        {/* Logo minimalista */}
        <div className='mb-10'>
          <div className='w-16 h-16 mx-auto mb-6  rounded-2xl flex items-center justify-center shadow-lg bg-[#0B81B7] text-white'>
            <Droplets className='h-7 w-7 text-primary-foreground' />
          </div>
          <Typography
            variant='h5'
            className='text-center text-gray-800 font-bold'
          >
            OTB Miraflores
          </Typography>
        </div>

        <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
          {/* Error minimalista */}
          {loginError && (
            <div className='bg-red-50 border-l-4 border-red-500 p-3 animate-shake'>
              <Typography variant='small' className='text-red-700 text-center'>
                {loginError}
              </Typography>
            </div>
          )}

          {/* Input Usuario */}
          <div>
            <Input
              label='Usuario'
              icon={<User size={20} className='text-gray-400' />}
              value='sergio.cardenas'
              containerProps={{
                className: 'min-w-0',
              }}
              {...register('username', {
                required: true,
                onChange: () => setLoginError(''),
              })}
            />
            {errors.username && (
              <Typography variant='small' className='text-red-500 mt-1 text-xs'>
                Campo requerido
              </Typography>
            )}
          </div>

          {/* Input Contraseña */}
          <div>
            <Input
              type='password'
              label='Contraseña'
              value={'123456'}
              icon={<Lock size={20} className='text-gray-400' />}
              {...register('password', {
                required: true,
                onChange: () => setLoginError(''),
              })}
            />
            {errors.password && (
              <Typography variant='small' className='text-red-500 mt-1 text-xs'>
                Campo requerido
              </Typography>
            )}
          </div>

          <Button
            className='bg-[#0B81B7] flex justify-center items-center gap-3'
            fullWidth
            type='submit'
          >
            {
              <>
                <LogIn size={20} className='' />
                Iniciar Session
              </>
            }
          </Button>
        </form>
      </Card>
    </div>
  );
}