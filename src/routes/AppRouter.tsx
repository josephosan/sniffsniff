import React, { useEffect, useState } from 'react';
import { useRoutes, Outlet, useNavigate, Navigate } from 'react-router-dom';

// Import pages
import { Home } from '../pages/Home';
import Login from '../pages/Login';
import _404 from '../pages/_404';
import ForgotPassword from '../pages/ForgotPassword';
import CreateEvent from '../pages/timeline/event/Create';
import EditEvent from '../pages/timeline/event/Edit';
import Events from '../pages/timeline/event/Events';
import OrganizationView from '../pages/organization/View';
import OrganizationSettings from '../pages/organization/Settings';
import OrganizationProjects from '../pages/organization/Projects';
import CreateOrganization from '../pages/organization/Create';
import Organizations from '../pages/organization/List';
import CreateProject from '../pages/organization/project/Create';
import ViewProject from '../pages/organization/project/View';
import ProjectTerms from '../pages/organization/project/Terms';
import ProjectUsers from '../pages/organization/project/Users';
import ProjectSettings from '../pages/organization/project/Settings';
import ProjectInvite from '../pages/organization/project/Invite';
import CreateTerm from '../pages/organization/project/term/Create';
import NotificationsList from '../pages/notification/List';
import PublicNotifications from '../pages/notification/Public';
import ProjectNotifications from '../pages/notification/Project';
import ViewProjectNotification from '../pages/notification/view/Project';
import ViewPublicNotification from '../pages/notification/view/Public';

// Import layouts
import AuthLayout from '../layouts/AuthLayout';
import { DefaultLayout } from '../layouts/DefaultLayout';

// Import types
import { RouteObject } from '../@types/app';
import { User } from '../@types/auth';

// Import stores
import { useNotify } from '../store/notify.store';
import { useApp } from '../store/app.store';
import { useAuth } from '../store/auth.store';

// Import services
import ApiService from '../services/ApiService';
import AuthService from '../services/AuthService';

// others
import { getToken } from '../helpers/jwt.helper';
import { useMediaQuery } from 'react-responsive';
import { appConfig } from '../config/app.config';
import FormSkeletonLoading from '../components/secondary/FormSkeletonLoading';
import BigBoxSkeletonLoading from '../components/secondary/BigBoxSkeletonLoading';
import Loading from '../components/secondary/Loading';

export const AppRouter: React.FC = React.memo(() => {
    const notifyStore = useNotify();
    const appStore = useApp();
    const authStore = useAuth();
    const navigate = useNavigate();
    const routes: RouteObject = [
        {
            name: 'default',
            path: '/',
            element: authStore.isAuthenticated ? (
                <DefaultLayout />
            ) : (
                <Navigate to={'/login'} />
            ),
            children: [
                {
                    path: 'dashboard',
                    name: 'Dashboard',
                    element: <Home />,
                },

                // events
                {
                    path: 'timeline/:timelineId/event',
                    name: 'Events',
                    element: <Events />,
                },
                {
                    path: 'timeline/:timelineId/event/create',
                    name: 'CreateEvent',
                    element: <CreateEvent />,
                },
                {
                    path: 'timeline/:eventId/event/edit',
                    name: 'EditEvent',
                    element: <EditEvent />,
                },

                // organizations
                {
                    path: 'organization/:organizationId',
                    name: 'SingleOrganization',
                    element: <OrganizationView />,
                    children: [
                        {
                            path: 'setting',
                            name: 'OrganizationSetting',
                            element: <OrganizationSettings />,
                        },
                        {
                            path: 'project',
                            name: 'OrganizationProject',
                            element: <OrganizationProjects />,
                        },
                    ],
                },
                {
                    path: 'organization/create',
                    name: 'CreateOrganization',
                    element: <CreateOrganization />,
                },
                {
                    path: 'organization',
                    name: 'Organization',
                    element: <Organizations />,
                },

                // projects
                {
                    path: 'organization/:organizationId/project/create',
                    name: 'CreateProject',
                    element: <CreateProject />,
                },
                {
                    path: 'organization/:organizationId/project/:projectId',
                    name: 'SingleProject',
                    element: <ViewProject />,
                    children: [
                        {
                            path: 'term',
                            name: 'ProjectTerm',
                            element: <ProjectTerms />,
                        },
                        {
                            path: 'users',
                            name: 'ProjectUsers',
                            element: <ProjectUsers />,
                        },
                        {
                            path: 'setting',
                            name: 'ProjectSetting',
                            element: <ProjectSettings />,
                        },
                    ],
                },
                {
                    path: 'organization/:organizationId/project/:projectId/invite',
                    name: 'ProjectInvite',
                    element: <ProjectInvite />,
                },

                // terms
                {
                    path: 'organization/:organizationId/project/:projectId/term/create',
                    name: 'CreateTerm',
                    element: <CreateTerm />,
                },

                // notifications
                {
                    path: 'notifications/',
                    name: 'Notifications',
                    element: <NotificationsList />,
                    children: [
                        {
                            path: 'project',
                            name: 'ProjectNotifications',
                            element: <ProjectNotifications />,
                        },
                        {
                            path: 'public',
                            name: 'PublicNotifications',
                            element: <PublicNotifications />,
                        },
                    ],
                },
                {
                    path: 'notifications/project/:id',
                    name: 'ProjectSingleNotifications',
                    element: <ViewProjectNotification />,
                },
                {
                    path: 'notifications/public/:id',
                    name: 'PublicSingleNotifications',
                    element: <ViewPublicNotification />,
                },
            ],
        },
        {
            name: 'auth',
            path: '/',
            element: <AuthLayout />,
            children: [
                {
                    path: 'login',
                    name: 'Login',
                    element: !authStore.isAuthenticated ? (
                        <Login />
                    ) : (
                        <Navigate to={'/dashboard'} />
                    ),
                },
                {
                    path: 'forgot-password',
                    name: 'ForgotPassword',
                    element: !authStore.isAuthenticated ? (
                        <ForgotPassword />
                    ) : (
                        <Navigate to={'/dashboard'} />
                    ),
                },
            ],
        },
        {
            name: 'error',
            path: '*',
            element: <_404 />,
        },
    ];
    const element = useRoutes(routes);
    const [loading, setLoading] = useState<boolean>(true);
    const isMobile = useMediaQuery({
        query: `(max-width: ${appConfig.appBreakPoint}px)`,
    });

    useEffect(() => {
        ApiService.init(notifyStore, appStore, navigate);
        if (getToken())
            ApiService.setHeader(
                'Authorization',
                `Bearer ${JSON.parse(getToken())['accessToken']}`,
            );

        if (authStore.user && authStore.isAuthenticated && getToken()) {
            setLoading(false);
        } else {
            AuthService.who()
                .then(({ data }) => {
                    authStore.handleSetUser(data.data as User);
                    authStore.handleSetIsAuthenticated(true);
                })
                .catch((err) => {
                    authStore.logout();
                })
                .finally(() => {
                    setLoading(() => false);
                });
        }
    }, []);

    return (
        <>
            {loading ? (
                <div
                    className={
                        'd-flex justify-content-center align-items-center'
                    }
                    style={{
                        backgroundColor: appStore.theme.mainBackgroundColor,
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    {/* {isMobile ? (
                        <Loading />
                    ) : (
                        <div className="d-flex w-100 h-100">
                            <div
                                className="col-3"
                                style={{ maxWidth: '300px' }}
                            >
                                <BigBoxSkeletonLoading height="90%" />
                            </div>
                            <div className="w-100">
                                <div>
                                    <FormSkeletonLoading count={1} />
                                </div>
                                <div className="w-100 d-flex justify-content-center">
                                    <div
                                        className="col-9"
                                        style={{ maxWidth: '1200px' }}
                                    >
                                        <BigBoxSkeletonLoading height="80vh" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )} */}
                    <Loading />
                </div>
            ) : (
                <>
                    {element}
                    <Outlet />
                </>
            )}
        </>
    );
});
