import React from "react";
import { useRoutes, Outlet } from "react-router-dom";

// Import pages
import { Home } from "../pages/Home";
import {DefaultLayout} from "../layouts/DefaultLayout";
import {RouteObject} from "../@types/app";


const routes: RouteObject = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "",
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
