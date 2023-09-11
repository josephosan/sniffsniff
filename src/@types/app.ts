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