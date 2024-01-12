import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import { appConfig } from '../../config/app.config';
import TabComponent from '../../components/primary/TabComponent';
import WrapperCard from '../../components/secondary/WrapperCard';
import MobileNotifications from './MobileNotifications';
import { useApp } from '../../store/app.store';

const NotificationsList: React.FC = () => {
    const isMobile = useMediaQuery({
        query: `(max-width: ${appConfig.appBreakPoint}px)`,
    });
    const { theme } = useApp();
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<string | null>(null);

    useEffect(() => {
        const tab =
            location.pathname.split('/')[
                location.pathname.split('/').length - 1
            ];

        setActiveTab(() => tab);
    }, []);

    const handleTabItemClick = (e: string) => {
        navigate(`/notifications/${e}`);
        setActiveTab(() => e);
    };

    return (
        <>
            {isMobile ? (
                <MobileNotifications />
            ) : (
                <div>
                    <TabComponent
                        key={location.pathname}
                        type="card"
                        activeKey={activeTab}
                        tabPos="top"
                        destroyInactiveTabPane={false}
                        animation={{ inkBar: true, tabPane: true }}
                        onChange={handleTabItemClick}
                        items={[
                            {
                                key: 'public',
                                label: 'عمومی',
                                children: (
                                    <WrapperCard
                                        shadowed={false}
                                        backgroundColor={theme.cardBgLighter}
                                        width={'100%'}
                                        height={'100%'}
                                    >
                                        <Outlet />
                                    </WrapperCard>
                                ),
                            },
                            {
                                key: 'project',
                                label: 'پروژه ',
                                children: (
                                    <WrapperCard
                                        shadowed={false}
                                        backgroundColor={theme.cardBgLighter}
                                        width={'100%'}
                                        height={'100%'}
                                    >
                                        <Outlet />
                                    </WrapperCard>
                                ),
                            },
                        ]}
                    />
                </div>
            )}
        </>
    );
};

export default NotificationsList;
