import React from "react";
import {useRoutes, Outlet} from "react-router-dom";

// Import pages
import {Home} from "../pages/Home";
import {DefaultLayout} from "../layouts/DefaultLayout";
import {RouteObject} from "../@types/app";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";


const routes: RouteObject = [
    {
        path: "/",
        element: <DefaultLayout/>,
        children: [
            {
                path: "/home",
                element: <Home/>
            },
        ]
    },
    {
        path: "",
        element: <AuthLayout/>,
        children: [
            {
                path: '/login',
                element: <Login />
            }
        ]
    }
];

export const AppRouter: React.FC = () => {
    const element = useRoutes(routes);

    return (
        <>
            {element}
            <Outlet/>
        </>
    );
};
