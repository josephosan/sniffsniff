import React, {useEffect, useState} from "react";
import {useRoutes, Outlet} from "react-router-dom";

// Import pages
import {Home} from "../pages/Home";
import {DefaultLayout} from "../layouts/DefaultLayout";
import {RouteObject} from "../@types/app";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import {useNotify} from "../store/notify.store";
import ApiService from "../services/ApiService";
import Loading from "../components/secondary/Loading";


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
                element: <Login/>
            }
        ]
    }
];

export const AppRouter: React.FC = () => {
    const element = useRoutes(routes);
    const notifyStore = useNotify();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        ApiService.init(notifyStore);
        setLoading(false);
    }, []);

    return (
        <>
            {
                loading ? (
                    <div className={"h-100 w-100 d-flex justify-content-center align-items-center"}>
                        <Loading/>
                    </div>
                ) : (
                    <>
                        {element}
                        <Outlet/>
                    </>
                )
            }
        </>
    );
};
