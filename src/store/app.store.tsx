import React, {createContext, useContext, useMemo, useState} from "react";
import {AppStore, Errors, FormBuilderField, Theme} from "../@types/app";
import {lightConfig} from "../config/app.config";
import {saveToken} from "../helpers/jwt.helper";


const AppContext = createContext<AppStore | undefined>(undefined);

export function useApp() {
    const context = useContext(AppContext);
    if (!context)
        throw new Error("something went wrong, from appStore!");

    return context;
}


export const AppProvider: React.FC = ({children}) => {
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
        if (!mode) handleSetFilters(null);
        setFilterMode(() => mode);
    }

    const [filters, setFilters] = useState(null);
    const handleSetFilters = (value) => {
        setFilters(() => value);
    }

    const [filterFields, setFilterFields] = useState<FormBuilderField[] | null>(null);
    const handleSetFilterFields = (fields: FormBuilderField[]) => {
        setFilterFields(fields);
    }

    const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
    const handleSetSidebarCollapsed = (collapsed: boolean) => {
        setSidebarCollapsed(() => collapsed);
    }

    const appStore: AppStore = useMemo(
        () => ({
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
            handleSetSidebarCollapsed,

            // filter fields
            filterFields,
            handleSetFilterFields
        }),
        [sidebarCollapsed, filters, filterMode, errors, theme, filterFields]
    )

    return <AppContext.Provider value={appStore}>{children}</AppContext.Provider>
}