import React, {createContext, useContext, useState} from "react";
import {AppStore} from "../@types/app";
import {appConfig} from "../config/app.config";
import {darkConfig, lightConfig} from "../config/app.config";


const AppContext = createContext<AppStore | undefined>(undefined);

export function useApp() {
    const context = useContext(AppContext);
    if (!context)
        throw new Error("something went wrong, from appStore!");

    return context;
}


export const AppProvider: React.FC = ({ children }) => {

    // responsive mode
    const [isMobile, setIsMobile] = useState(() => {
        return window.innerWidth <= appConfig.appBreakPoint;
    });
    const setAppMode = (isMobile: boolean) => {
        setIsMobile(isMobile);
    }

    // theme config
    const [theme, setTheme] = useState(lightConfig);
    const setThemeConfig = (themeConfig) => {
        setTheme(themeConfig);
    }


    const appStore: AppStore = {
        isMobile,
        setAppMode,
        theme,
        setThemeConfig
    }

    return <AppContext.Provider value={appStore}>{ children }</AppContext.Provider>
}