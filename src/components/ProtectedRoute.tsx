
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

import App from "../App";


const ProtectedRoute = () =>{
    const { isAuthenticated } = useAuth();
    // const  isAuthenticated = false;
    return isAuthenticated ? <App/>: <Navigate to="/login" replace/>
}

export default ProtectedRoute;