import React, {createContext, useContext, useState} from "react";
import {AppStore} from "../@types/app";
import appConfig from "../config/app.config";


const AppContext = createContext<AppStore | undefined>(undefined);

export function useApp() {
    const context = useContext(AppContext);
    if (!context)
        throw new Error("something went wrong, from appStore!");

    return context;
}


export const AppProvider: React.FC = ({ children }) => {
    const [isMobile, setIsMobile] = useState(() => {
        return window.innerWidth <= appConfig.appBreakPoint;
    });
    const setAppMode = (isMobile: boolean) => {
        setIsMobile(isMobile);
    }


    const appStore: AppStore = {
        isMobile,
        setAppMode
    }

    return <AppContext.Provider value={appStore}>{ children }</AppContext.Provider>
}