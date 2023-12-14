import React, {useEffect, useState} from 'react';
import {Outlet, useLocation, useNavigate, useParams} from 'react-router-dom';
import TabComponent from '../../components/primary/TabComponent';
import WrapperCard from '../../components/secondary/WrapperCard';
import {useApp} from '../../store/app.store';
import CollapsableWrapper from "../../components/primary/CollapsableWrapper";

const OrganizationView: React.FC = React.memo(() => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const {theme} = useApp();
    const [activeTab, setActiveTab] = useState<string | null>(null);

    useEffect(() => {
        const tab =
            location.pathname.split('/')[
            location.pathname.split('/').length - 1
                ];
        setActiveTab(() => tab);
    }, [location.pathname]);

    const handleTabItemClick = (e) => {
        navigate(`/organization/${params.id}/${e}`);
    };

    return (
        <div>
            <CollapsableWrapper
                items={
                    [
                        {
                            key: 'title',
                            label: <div>hello</div>,
                            children: <div>children</div>
                        }
                    ]
                }
                expandIconPosition={"end"}
            />


            <TabComponent
                animation={{inkBar: true, tabPane: true}}
                activeKey={activeTab}
                onChange={handleTabItemClick}
                items={[
                    {
                        key: 'project',
                        label: 'پروژه ها',
                        children: (
                            <WrapperCard
                                shadowed={false}
                                backgroundColor={theme.cardBgLighter}
                                width="100%"
                                height="70vh"
                            >
                                <Outlet/>
                            </WrapperCard>
                        ),
                    },
                    {
                        key: 'setting',
                        label: 'تنظیمات',
                        children: (
                            <WrapperCard
                                shadowed={false}
                                backgroundColor={theme.cardBgLighter}
                                width={"100%"}
                                height={"auto"}
                            >
                                <Outlet/>
                            </WrapperCard>
                        ),
                    },
                ]}
            />
        </div>
    );
});

export default OrganizationView;
