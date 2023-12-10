import React, {useEffect, useState} from "react";
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import TabComponent from "../../components/primary/TabComponent";
import WrapperCard from "../../components/secondary/WrapperCard";
import {useApp} from "../../store/app.store";

const OrganizationView: React.FC = () => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const {theme} = useApp();
    const [activeTab, setActiveTab] = useState<string | null>(null);

    useEffect(() => {
        const tab = location.pathname.split('/')[location.pathname.split('/').length - 1];
        console.log(tab);
        setActiveTab(() => tab);
    }, [location.pathname]);

    const handleTabItemClick = (e) => {
        navigate(`/organization/${params.id}/${e}`);
    }

    return (
        <>
            Organization View

            <TabComponent
                animation={{inkBar: true, tabPane: true}}
                activeKey={activeTab}
                onChange={handleTabItemClick}
                items={
                    [
                        {
                            key: 'projects',
                            label: 'پروژه ها',
                            children: <WrapperCard shadowed={false} backgroundColor={theme.cardBgLighter}><Outlet /></WrapperCard>
                        },
                        {
                            key: 'settings',
                            label: 'تنظیمات',
                            children: <WrapperCard shadowed={false} backgroundColor={theme.cardBgLighter}><Outlet/></WrapperCard>
                        }
                    ]
                }
            />
        </>
    )
}

export default OrganizationView;