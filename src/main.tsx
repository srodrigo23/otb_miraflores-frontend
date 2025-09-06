import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Routes, Route} from "react-router";
import { ThemeProvider } from '@material-tailwind/react'
import { Login } from './pages/login/Login.tsx';
import AuthLayout from './pages/login/AuthLayout.tsx';
import Neighbors from './pages/neighbors/Neighbors.tsx';
import Attendance from './pages/attendance/Attendance.tsx';
import Debts from './pages/debts/Debts.tsx';
import Receipts from './pages/receipts/Receipts.tsx';
import Measures from './pages/measures/Measures.tsx';

// import CheckNeighborDebts from './pages/checkDebts/CheckNeighborsDebts.tsx';

import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>  
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            
            <Route path="/asistencia" element={<Attendance />} /> 
            <Route path="/deudas" element={<Debts />} />
            <Route path="/recibos" element={<Receipts />} />
            <Route path="/vecinos" element={<Neighbors />} /> 
            <Route path="/mediciones" element={<Measures />} /> 
            {/* <Route path="/deudas" element={<CheckNeighborDebts />} /> */}

            {/* <Route path='/' element={<Navigate to='/deudas' /> } /> */}
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* <Route element={<CheckLayout/>}>
            <Route index element={<CheckNeighborDebts />} />
          </Route> */}

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
