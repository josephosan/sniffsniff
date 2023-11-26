import {ReactNode} from "react";

export interface AppStore {
    theme: never,
    setThemeMode: (theme: never) => void,

    errors: Errors,
    handleSetErrors: (errors: Errors) => void,

    // filter mode
    filterMode: boolean,
    handleSetFilterMode: (mode: boolean) => void,

    filters: never,
    handleSetFilters: (value: never) => void,

    sidebarCollapsed: boolean,
    handleSetSidebarCollapsed: (collapsed: boolean) => void
}


export interface RouteObject {
    path: string;
    element: ReactNode;
    children?: RouteObject[];
    // ...other properties...
}

export interface SidebarLinkItem {
    path: string,
    label: string,
    icon_classname: string,
    icon_classname_selected: string,
    selected: boolean,
    desktop?: boolean
}


// form builder
type FormBuilderFieldType = "text" | "password" | "number" | "date" | "date_time" | "select" | 'multi_select' | "textarea" | "checkbox";

export interface FormBuilderField {
    placeholder?: string,
    name: string,
    type: FormBuilderFieldType,
    label?: string,
    rules?: never,
    options?: SelectOption[],
    select_url?: string,
    required?: boolean,
    errors?: string[],
    initialValue?: string,
    color?: string,
    rows?: number,
    maxLength?: number,
    no_resize?: boolean,
    minDate?: Date,
    maxDate?: Date,
    colorPresets?: colorPreset[],
    defaultChecked?: boolean,
    checked?: boolean
}

export interface colorPreset {
    label: string,
    colors: string[]
}

export interface SelectOption {
    label: string,
    value: string,
    disabled?: boolean,
    icon?: string,
    children?: string[]
}


export interface Theme {
    mode: string,
    cardBg: string,
    mainBackgroundColor: string,
    defaultTextColor: string,
    fadeTextColor: string,
    primaryColor: string,
    itemHoverColor: string
}


export interface Errors {
    formErrors?: never
}

export type SizeTypes = 'large' | 'middle' | 'small';

export type FlexTypes = "center" | "end" | "start";

export type ShapeSizeTypes = 'default' | 'small' | 'large';

export type StepsStatusType = 'finish' | 'process' | 'wait' | 'error';
