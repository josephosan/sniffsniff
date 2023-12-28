import React, {useContext, createContext, useState, useMemo} from "react";
import {AuthStore, User} from "../@types/auth";
import {destroyToken, saveToken} from "../helpers/jwt.helper";
import ApiService from "../services/ApiService";


// to define AuthContext. with the provided type.
const AuthContext = createContext<AuthStore | undefined>(undefined);

// defining useAuth. it shall be used within the auth Provider.
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("Looks like you are using the useAuth, outside the AuthProvider. check it out.");

    return context;
}


export const AuthProvider: React.FC = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const handleSetIsAuthenticated = (value: boolean) => {
        setIsAuthenticated(() => value);
    }


    const [user, setUser] = useState<User | null>(null);
    const handleSetUser = (data: User) => {
        setUser(() => data);
    }


    const handleSetTokens = (data) => {
        ApiService.setHeader('Authorization', `Bearer ${data['accessToken']}`);
        setIsAuthenticated(() => true);
        saveToken('ID_TOKEN', JSON.stringify(data));
    }

    const logout = () => {
        setUser(() => null);
        setIsAuthenticated(() => false);

        destroyToken();
    }

    const authStore: AuthStore = useMemo(
        () => ({
            handleSetIsAuthenticated,
            isAuthenticated,
            user,
            handleSetUser,
            logout,
            handleSetTokens
        }),
        [isAuthenticated, user]);

    return <AuthContext.Provider value={authStore}>{children}</AuthContext.Provider>;
}