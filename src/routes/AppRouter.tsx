import React, {useEffect, useState} from "react";
import {useRoutes, Outlet, useNavigate, Navigate} from "react-router-dom";

// Import pages
import {Home} from "../pages/Home";
import Login from "../pages/Login";
import Events from "../pages/Events";
import CreateTimeLine from "../pages/timeline/Create";
import EditTimeLine from "../pages/timeline/Edit";
import _404 from "../pages/_404";
import ForgotPassword from "../pages/ForgotPassword";
import ViewTimeline from "../pages/timeline/ViewTimeline";

// Import layouts
import AuthLayout from "../layouts/AuthLayout";
import {DefaultLayout} from "../layouts/DefaultLayout";

// Import types
import {RouteObject} from "../@types/app";
import {User} from "../@types/auth";

// Import stores
import {useNotify} from "../store/notify.store";
import {useApp} from "../store/app.store";
import {useAuth} from "../store/auth.store";

// Import services
import ApiService from "../services/ApiService";
import AuthService from "../services/AuthService";

// Import components
import Loading from "../components/secondary/Loading";

// others
import {getToken} from "../helpers/jwt.helper";
import Timelines from "../pages/timeline/Timelines";


export const AppRouter: React.FC = () => {
    const notifyStore = useNotify();
    const appStore = useApp();
    const authStore = useAuth();
    const navigate = useNavigate();
    const routes: RouteObject = [
        {
            name: 'default',
            path: "/",
            element: authStore.isAuthenticated ? <DefaultLayout/> : <Navigate to={"/login"}/>,
            children: [
                {
                    path: "home",
                    element: <Home/>
                },
                {
                    path: 'events',
                    element: <Events/>
                },
                {
                    path: 'timeline/create',
                    element: <CreateTimeLine/>
                },
                {
                    path: 'timeline/edit/:id',
                    element: <EditTimeLine/>
                },
                {
                    path: 'timeline/:id',
                    element: <ViewTimeline/>
                },
                {
                    path: 'timeline',
                    element: <Timelines/>
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
                    element: !authStore.isAuthenticated ? <Login/> : <Navigate to={"/home"}/>
                },
                {
                    path: 'forgot-password',
                    element: !authStore.isAuthenticated ? <ForgotPassword/> : <Navigate to={"/home"}/>
                }
            ]
        },
        {
            name: 'error',
            path: '*',
            element: <_404/>
        }
    ];
    const element = useRoutes(routes);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        ApiService.init(notifyStore, appStore, navigate);
        if (getToken())
            ApiService.setHeader('Authorization', `Bearer ${JSON.parse(getToken())['accessToken']}`);

        if (authStore.user && authStore.isAuthenticated && getToken()) {
            setLoading(false);
        } else {
            AuthService.who()
                .then(({data}) => {
                    authStore.handleSetUser(data.data as User);
                    authStore.handleSetIsAuthenticated(true);
                })
                .catch(err => {
                    authStore.logout();
                })
                .finally(() => {
                    setLoading(() => false);
                });
        }
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
