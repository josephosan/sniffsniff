import {ReactNode} from "react";

export interface AppStore {
    theme: never,
    setThemeMode: (theme: never) => void
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


export interface ColorConfig {
    cardBg: string,
    mainBackgroundColor: string,
    defaultTextColor: string
}



// form builder
type FormBuilderFieldType = "text";

export interface FormBuilderField {
    placeholder?: string,
    name: string,
    type: FormBuilderFieldType,
}