import React from "react";
import {useRoutes, Outlet} from "react-router-dom";

// Import pages
import {Home} from "../pages/Home";
import {DefaultLayout} from "../layouts/DefaultLayout";
import {RouteObject} from "../@types/app";
import {Help} from "../pages/Help";
import {Users} from "../pages/Users";
import {Messages} from "../pages/Messages";
import {Requests} from "../pages/Requests";


const routes: RouteObject = [
    {
        path: "/",
        element: <DefaultLayout/>,
        children: [
            {
                path: "/home",
                element: <Home/>
            },
            {
                path: "/users",
                element: <Users/>
            },
            {
                path: "/help",
                element: <Help/>
            },
            {
                path: "/messages",
                element: <Messages/>
            },
            {
                path: "/Requests",
                element: <Requests/>
            }
        ]
    },
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
