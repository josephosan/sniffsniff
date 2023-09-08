import React, {ReactNode} from "react";
import { useRoutes, Outlet } from "react-router-dom";

// Import pages
import { Home } from "../pages/Home";
import {DefaultLayout} from "../layouts/DefaultLayout";

interface RouteObject {
  path: string;
  element: ReactNode;
  children?: RouteObject[];
  // ...other properties...
}

const routes: RouteObject = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "home",
        element: <Home />
      }
    ]
  },
];

export const AppRouter: React.FC = () => {
  const element = useRoutes(routes);

  return (
    <>
      {element}
      <Outlet />
    </>
  );
};
