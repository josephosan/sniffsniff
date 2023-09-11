import {ReactNode} from "react";

export interface AppStore {
    isMobile: boolean,
    setAppMode: (isMobile: boolean) => void
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
    selected: boolean
}