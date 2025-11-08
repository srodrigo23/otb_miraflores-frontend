
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

import App from "../App";


const ProtectedRoute = () =>{
    const { isAuthenticated, loading } = useAuth();

    // Mostrar un spinner o null mientras carga
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                    <p className="mt-4 text-gray-600">Cargando...</p>
                </div>
            </div>
        );
    }

    return isAuthenticated ? <App/>: <Navigate to="/login" replace/>
}

export default ProtectedRoute;