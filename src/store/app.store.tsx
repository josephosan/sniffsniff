import React, {createContext, useContext, useState} from "react";
import {AppStore, Errors, Theme} from "../@types/app";
import {lightConfig} from "../config/app.config";
import {saveToken} from "../helpers/jwt.helper";



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
    const setThemeMode = (themeConfig: Theme) => {
        setTheme(themeConfig);
        saveToken('themeConfig', JSON.stringify(themeConfig));
    }

    // errors
    const [errors, setErrors] = useState<Errors | null>(null);
    const handleSetErrors = (errors) => {
        setErrors(errors);
    }

    const [filterMode, setFilterMode] = useState<boolean>(false);
    const handleSetFilterMode = (mode: boolean) => {
        setFilterMode(() => mode);
    }

    const [filters, setFilters] = useState(null);
    const handleSetFilters = (value) => {
        setFilters(() => value);
    }

    const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
    const handleSetSidebarCollapsed = (collapsed: boolean) => {
        setSidebarCollapsed(() => collapsed);
    }

    const appStore: AppStore = {
        // theme
        theme,
        setThemeMode,

        // errors
        errors,
        handleSetErrors,

        // filter mode
        filterMode,
        handleSetFilterMode,

        // filters data
        filters,
        handleSetFilters,

        // sidebar
        sidebarCollapsed,
        handleSetSidebarCollapsed
    }

    return <AppContext.Provider value={appStore}>{ children }</AppContext.Provider>
}