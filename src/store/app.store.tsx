import React, {createContext, useContext, useState} from "react";
import {AppStore, Theme} from "../@types/app";
import {lightConfig} from "../config/app.config";



const AppContext = createContext<AppStore | undefined>(undefined);

export function useApp() {
    const context = useContext(AppContext);
    if (!context)
        throw new Error("something went wrong, from appStore!");

    return context;
}


export const AppProvider: React.FC = ({ children }) => {
    // theme config
    const [theme, setTheme] = useState<Theme>(lightConfig);
    const setThemeConfig = (themeConfig: Theme) => {
        setTheme(themeConfig);
    }


    const appStore: AppStore = {
        theme,
        setThemeConfig
    }

    return <AppContext.Provider value={appStore}>{ children }</AppContext.Provider>
}