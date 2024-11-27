import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider } from '@material-tailwind/react'
import { Login } from './pages/login/Login.tsx';
import AuthLayout from './pages/login/AuthLayout.tsx';
import Neighbors from './pages/neighbors/Neighbors.tsx';
import Attendance from './pages/attendance/Attendance.tsx';
import Debts from './pages/debts/Debts.tsx';
import Receipts from './pages/receipts/Receipts.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>  
      <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Neighbors />} />
          <Route path="/asistencia" element={<Attendance />} />
          <Route path="/deudas" element={<Debts />} />
          <Route path="/recibos" element={<Receipts />} />
          <Route path="/vecinos" element={<Neighbors />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
