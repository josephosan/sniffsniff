import React, { useContext, createContext, useState } from "react";
import {AuthStore, User} from "../@types/auth";
import AuthService from "../services/AuthService";




// to define AuthContext. with the provided type.
const AuthContext = createContext<AuthStore | undefined>(undefined);

// defining useAuth. it shall be used within the auth Provider.
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("Looks like you are using the useAuth, outside the AuthProvider. check it out.");

    return context;
}


export const AuthProvider: React.FC = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);

    // to login the user.
    const login = async (userData: User) => {
        const {data} = await AuthService.login(userData);
        setUser(data);
        setIsAuthenticated(true);

        // todo: to set token here.
    }

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);

        // todo: remove token here.
    }

    const authStore: AuthStore = {
        isAuthenticated,
        user,
        login,
        logout
    }

    return <AuthContext.Provider value={authStore}>{ children }</AuthContext.Provider>;
}