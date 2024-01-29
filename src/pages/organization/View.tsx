import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import TabComponent from '../../components/primary/TabComponent';
import WrapperCard from '../../components/secondary/WrapperCard';
import { useApp } from '../../store/app.store';
import CollapsableWrapper from '../../components/primary/CollapsableWrapper';
import FormSkeletonLoading from '../../components/secondary/FormSkeletonLoading';
import BigBoxSkeletonLoading from '../../components/secondary/BigBoxSkeletonLoading';
import { appConfig } from '../../config/app.config';
import CustomImage from '../../components/secondary/CustomImage';
import OrganizationApiService from '../../services/OrganizationApiService';
import Emitter from '../../helpers/emitter.helper';
import { dateToPersian } from '../../helpers/app.helper';

const OrganizationView: React.FC = () => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const { theme } = useApp();
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [data, setData] = useState<never>(null);

    useEffect(() => {
        Emitter.once('organization:update', () => {
            fetchData();
        });

        fetchData();

        const tab =
            location.pathname.split('/')[
                location.pathname.split('/').length - 1
            ];
        setActiveTab((prevState) => {
            if (prevState !== tab) return tab;
        });

        return () => {
            Emitter.off('organization:update');
        };
    }, []);

    const fetchData = async () => {
        try {
            const { data } = await OrganizationApiService.getOne(
                params.organizationId,
            );
            setData(data.data);
        } catch (e) {
            console.log(e);
        }
    };

    const handleTabItemClick = (e: string) => {
        navigate(`/organization/${params.organizationId}/${e}`);
        setActiveTab(() => e);
    };

    return (
        <div>
            {!data ? (
                <div className="d-flex flex-column gap-3">
                    <FormSkeletonLoading count={1} />
                    <div
                        className={'d-flex flex-row justify-content-center'}
                        style={{ width: '260px' }}
                    >
                        <FormSkeletonLoading count={1} />
                    </div>
                    <BigBoxSkeletonLoading count={1} />
                </div>
            ) : (
                <>
                    <div className={'mb-2'}>
                        <CollapsableWrapper
                            items={[
                                {
                                    key: 'title',
                                    label: (
                                        <div className="d-flex flex-row align-items-center gap-3 mb-3">
                                            <CustomImage
                                                src={'/public/vite.svg'}
                                                width={'40px'}
                                                height={'40px'}
                                            />
                                            <h5 className={'mb-0'}>
                                                {data.name}
                                            </h5>
                                        </div>
                                    ),
                                    children: (
                                        <div className="d-flex flex-column gap-3 px-md-5 px-xl-5 ">
                                            <span
                                                style={{
                                                    fontSize:
                                                        appConfig.defaultFontSize,
                                                }}
                                                className={'description'}
                                            >
                                                {data.description}
                                            </span>
                                            <small
                                                style={{
                                                    fontSize:
                                                        appConfig.smallFontSize,
                                                }}
                                                className={
                                                    'd-flex justify-content-end'
                                                }
                                            >
                                                {dateToPersian(data.createdAt)}
                                            </small>
                                        </div>
                                    ),
                                },
                            ]}
                            expandIconPosition={'end'}
                        />
                    </div>
                    <TabComponent
                        key={location.pathname}
                        animation={{ inkBar: true, tabPane: true }}
                        activeKey={activeTab}
                        onChange={handleTabItemClick}
                        destroyInactiveTabPane={true}
                        items={[
                            {
                                key: 'project',
                                label: 'پروژه ها',
                                destroyInactiveTabPane: true,
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
                            {
                                key: 'setting',
                                label: 'تنظیمات',
                                destroyInactiveTabPane: true,
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
