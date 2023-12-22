import React, {useEffect, useMemo, useState} from 'react';
import {Outlet, useLocation, useNavigate, useParams} from 'react-router-dom';
import TabComponent from '../../components/primary/TabComponent';
import WrapperCard from '../../components/secondary/WrapperCard';
import {useApp} from '../../store/app.store';
import CollapsableWrapper from '../../components/primary/CollapsableWrapper';
import FormSkeletonLoading from '../../components/secondary/FormSkeletonLoading';
import BigBoxSkeletonLoading from '../../components/secondary/BigBoxSkeletonLoading';
import {appConfig} from "../../config/app.config";
import CustomImage from "../../components/secondary/CustomImage";

const OrganizationView: React.FC = () => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const {theme} = useApp();
    const [activeTab, setActiveTab] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState(false);
    // const [isData, setIsData] = useState(null);

    useMemo(() => {
        const tab =
            location.pathname.split('/')[
            location.pathname.split('/').length - 1
                ];
        setActiveTab(() => tab);
    }, [location.pathname]);

    const handleTabItemClick = (e) => {
        navigate(`/organization/${params.organizationId}/${e}`);
    };

    return (
        <div>
            {isLoading ? (
                <div className="d-flex flex-column gap-3">
                    <FormSkeletonLoading count={1}/>
                    <div className={"d-flex flex-row justify-content-center"} style={{width: '260px'}}>
                        <FormSkeletonLoading count={2} width={"70px"}/>
                    </div>
                    <BigBoxSkeletonLoading count={1}/>
                </div>
            ) : (
                <>
                    <div className={"mb-2"}>
                        <CollapsableWrapper
                            items={[
                                {
                                    key: 'title',
                                    label: (
                                        <div className="d-flex flex-row align-items-center gap-3 mb-3">
                                            <CustomImage src={"/public/vite.svg"} width={"40px"} height={"40px"} />
                                            <h5 className={"mb-0"}>نام سازمان</h5>
                                        </div>
                                    ),
                                    children: (
                                        <div className="d-flex flex-column  align-items-end gap-3 px-md-5 px-xl-5 ">
                                    <span
                                        style={{
                                            fontSize: appConfig.defaultFontSize,
                                        }}
                                        className={"description"}
                                    >
                                        ازمایشی و بی‌معنی در صنعت چاپ،
                                        صفحه‌آرایی و طراحی گرافیک گفته می‌شود.
                                        طراح گرافیک از این متن به عنوان عنصری از
                                        ترکیب بندی برای پر کردن صفحه و ارایه
                                        اولیه شکل ظاهری و کلی طرح سفارش گرفته
                                        شده استفاده می نماید، تا از نظر گرافیکی
                                        نشانگر چگونگی نوع و ان
                                    </span>
                                            <small
                                                style={{
                                                    fontSize: appConfig.smallFontSize,
                                                }}
                                            >
                                                ساخته شده در 2 ماه پیش
                                            </small>
                                        </div>
                                    ),
                                },
                            ]}
                            expandIconPosition={'end'}
                        />
                    </div>
                    <TabComponent
                        animation={{inkBar: true, tabPane: true}}
                        activeKey={activeTab}
                        onChange={handleTabItemClick}
                        destroyInactiveTabPane={false}
                        items={[
                            {
                                key: 'project',
                                label: 'پروژه ها',
                                children: (
                                    <WrapperCard
                                        shadowed={false}
                                        backgroundColor={theme.cardBgLighter}
                                        width={'100%'}
                                        height={'auto'}
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
                                        width={'100%'}
                                        height={'auto'}
                                    >
                                        <Outlet/>
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
