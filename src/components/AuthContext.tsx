import {useState, createContext, useContext } from "react";

type AuthContextType = {
    isAuthenticated:boolean
    login:()=>void
    logout:()=>void
}
const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
});

import { ReactNode } from "react";

export const AuthProvider = ({ children }: {children: ReactNode})=>{
    const [isAuthenticated, setIsAuthenticated] = useState(true);//check local storage

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

    return(
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=> useContext(AuthContext);