import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import TabComponent from '../../components/primary/TabComponent';
import WrapperCard from '../../components/secondary/WrapperCard';
import { useApp } from '../../store/app.store';
import CollapsableWrapper from '../../components/primary/CollapsableWrapper';
import FormSkeletonLoading from '../../components/secondary/FormSkeletonLoading';
import BigBoxSkeletonLoading from '../../components/secondary/BigBoxSkeletonLoading';

const OrganizationView: React.FC = () => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const { theme } = useApp();
    const [activeTab, setActiveTab] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState(true);
    // const [isData, setIsData] = useState(null);

    useEffect(() => {
        const tab =
            location.pathname.split('/')[
                location.pathname.split('/').length - 1
            ];
        setActiveTab(() => tab);
    }, [location.pathname]);

    useEffect(() => {
        async function fetchData() {
            await handleFetchMore();
        }

        fetchData();
    }, []);

    const handleFetchMore = async () => {
        if (isData) setIsLoading(false);
        try {
        } catch (e) {
            console.log(e);
        } finally {
        }
    };

    //To test the shape of the skeleton loading until the api is accessed
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    const handleTabItemClick = (e) => {
        navigate(`/organization/${params.id}/${e}`);
    };

    return (
        <div>
            {isLoading ? (
                <div className="d-flex flex-column gap-3">
                    <FormSkeletonLoading count={1} />
                    <FormSkeletonLoading count={2} size="small" />
                    <BigBoxSkeletonLoading count={1} />
                </div>
            ) : (
                <>
                    <CollapsableWrapper
                        items={[
                            {
                                key: 'title',
                                label: <div>hello</div>,
                                children: <div>children</div>,
                            },
                        ]}
                        expandIconPosition={'end'}
                    />

                    <TabComponent
                        animation={{ inkBar: true, tabPane: true }}
                        activeKey={activeTab}
                        onChange={handleTabItemClick}
                        items={[
                            {
                                key: 'projects',
                                label: 'پروژه ها',
                                children: (
                                    <WrapperCard
                                        shadowed={false}
                                        backgroundColor={theme.cardBgLighter}
                                        width="100%"
                                        height="70vh"
                                    >
                                        <Outlet />
                                    </WrapperCard>
                                ),
                            },
                            {
                                key: 'settings',
                                label: 'تنظیمات',
                                children: (
                                    <WrapperCard
                                        shadowed={false}
                                        backgroundColor={theme.cardBgLighter}
                                        width={'100%'}
                                        height={'auto'}
                                    >
                                        <Outlet />
                                    </WrapperCard>
                                ),
                            },
                        ]}
                    />
                </>
            )}
        </div>
    );
};

export default OrganizationView;
