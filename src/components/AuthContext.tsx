import { useState, createContext, useContext, useEffect, ReactNode } from "react";
import useFetchData from "../hooks/useFetchData";

import { config } from "../config";

interface User {
    userName: string
}

type AuthContextType = {
    isAuthenticated: boolean
    user: User | null
    login: (user: User) => void
    logout: () => void
    loading: boolean
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    login: () => {},
    logout: () => {},
    loading: true,
});

export const AuthProvider = ({ children }: {children: ReactNode}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const apiUserActive = `${JSON.parse(config.production)?config.frontURL_PROD:config.frontURL_DEV}/me`;
    const { execute } = useFetchData(apiUserActive);
    
    const checkActiveUser = async ()=>{
        const response = await execute();
        console.log(response);
        
    }

    useEffect (() => {
        
        checkActiveUser();
        setLoading(false)
        // const storedUser = localStorage.getItem('user');
        // if (storedUser) {
        //     setUser(JSON.parse(storedUser));
        //     setIsAuthenticated(true);
        // }
        // setLoading(false);
    }, []);

    const login = (userData: User) => {
        // setUser(userData);
        // setIsAuthenticated(true);
        // localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        // setUser(null);
        // setIsAuthenticated(false);
        // localStorage.removeItem('user');
    };

    return(
        <AuthContext.Provider value={{isAuthenticated, user, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);