import React, { useEffect, useState } from 'react';
import { useRoutes, Outlet, useNavigate, Navigate } from 'react-router-dom';

// Import pages
import { Home } from '../pages/Home';
import Login from '../pages/Login';
import CreateTimeLine from '../pages/timeline/Create';
import EditTimeLine from '../pages/timeline/Edit';
import _404 from '../pages/_404';
import ForgotPassword from '../pages/ForgotPassword';
import ViewTimeline from '../pages/timeline/ViewTimeline';
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
import Notifications from '../pages/notification/Notifications';
import NotificationsList from '../pages/notification/List';
import PublicNotifications from '../pages/notification/Public';
import ProjectNotifications from '../pages/notification/Project';

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

// Import components
import Loading from '../components/secondary/Loading';

// others
import { getToken } from '../helpers/jwt.helper';
import Timelines from '../pages/timeline/Timelines';

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
                    element: <Home />,
                },

                // timelines
                {
                    path: 'timeline',
                    element: <Timelines />,
                },
                {
                    path: 'timeline/:id',
                    element: <ViewTimeline />,
                },
                {
                    path: 'timeline/create',
                    element: <CreateTimeLine />,
                },
                {
                    path: 'timeline/edit/:id',
                    element: <EditTimeLine />,
                },

                // events
                {
                    path: 'timeline/:timelineId/event',
                    element: <Events />,
                },
                {
                    path: 'timeline/:timelineId/event/create',
                    element: <CreateEvent />,
                },
                {
                    path: 'timeline/:eventId/event/edit',
                    element: <EditEvent />,
                },

                // organizations
                {
                    path: 'organization/:organizationId',
                    element: <OrganizationView />,
                    children: [
                        {
                            path: 'setting',
                            element: <OrganizationSettings />,
                        },
                        {
                            path: 'project',
                            element: <OrganizationProjects />,
                        },
                    ],
                },
                {
                    path: 'organization/create',
                    element: <CreateOrganization />,
                },
                {
                    path: 'organization',
                    element: <Organizations />,
                },

                // projects
                {
                    path: 'organization/:organizationId/project/create',
                    element: <CreateProject />,
                },
                {
                    path: 'organization/:organizationId/project/:projectId',
                    element: <ViewProject />,
                    children: [
                        {
                            path: 'term',
                            element: <ProjectTerms />,
                        },
                        {
                            path: 'users',
                            element: <ProjectUsers />,
                        },
                        {
                            path: 'setting',
                            element: <ProjectSettings />,
                        },
                    ],
                },
                {
                    path: 'organization/:organizationId/project/:projectId/invite',
                    element: <ProjectInvite />,
                },

                // terms
                {
                    path: 'organization/:organizationId/project/:projectId/term/create',
                    element: <CreateTerm />,
                },

                // notifications
                {
                    path: 'notifications',
                    element: <Notifications />,
                },

                {
                    path: 'notifications/list/',
                    element: <NotificationsList />,
                    children: [
                        {
                            path: 'project',
                            element: <ProjectNotifications />,
                        },
                        {
                            path: 'public',
                            element: <PublicNotifications />,
                        },
                    ],
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
                    element: !authStore.isAuthenticated ? (
                        <Login />
                    ) : (
                        <Navigate to={'/dashboard'} />
                    ),
                },
                {
                    path: 'forgot-password',
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
                        'h-100 w-100 d-flex justify-content-center align-items-center'
                    }
                    style={{
                        backgroundColor: appStore.theme.mainBackgroundColor,
                    }}
                >
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
