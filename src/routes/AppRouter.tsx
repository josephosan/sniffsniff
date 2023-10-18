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
import {useApp} from "../store/app.store";
import Events from "../pages/Events";
import CreateTimeLine from "../pages/timeline/Create";
import EditTimeLine from "../pages/timeline/Edit";
import _404 from "../pages/_404";


const routes: RouteObject = [
    {
        name: 'default',
        path: "/",
        element: <DefaultLayout/>,
        children: [
            {
                path: "home",
                element: <Home/>
            },
            {
                path: 'events',
                element: <Events />
            },
            {
                path: 'timeline/create',
                element: <CreateTimeLine />
            },
            {
                path: 'timeline/edit/:id',
                element: <EditTimeLine />
            }
        ]
    },
    {
        name: 'auth',
        path: "/",
        element: <AuthLayout/>,
        children: [
            {
                path: 'login',
                element: <Login/>
            }
        ]
    },
    {
        name: 'error',
        path: '*',
        element: <_404 />
    }
];

export const AppRouter: React.FC = () => {
    const element = useRoutes(routes);
    const notifyStore = useNotify();
    const appStore = useApp();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        ApiService.init(notifyStore, appStore);
        setLoading(false);
    }, []);

    useEffect(() => {
        ApiService.init(notifyStore, appStore);
    }, [notifyStore, appStore])

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
