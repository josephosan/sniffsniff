import React, { useState, useEffect } from 'react';
import TabComponent from '../../components/primary/TabComponent';
import WrapperCard from '../../components/secondary/WrapperCard';
import { Outlet, useNavigate } from 'react-router-dom';
import { useApp } from '../../store/app.store';

const Settings: React.FC = () => {
    const { theme } = useApp();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<string | null>(null);

    useEffect(() => {
        const tab =
            location.pathname.split('/')[
                location.pathname.split('/').length - 1
            ];

        setActiveTab(() => tab);
    }, []);

    const handleTabItemClick = (e: string) => {
        navigate(`/settings/${e}`);
        setActiveTab(() => e);
    };
    return (
        <>
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
                        key: 'profile',
                        label: 'پروفایل',
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
                        key: 'password',
                        label: 'گذرواژه',
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
        </>
    );
};

export default Settings;
