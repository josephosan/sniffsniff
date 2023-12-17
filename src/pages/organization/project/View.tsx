import React, {useEffect, useState} from 'react';
import {Outlet, useLocation, useNavigate, useParams} from 'react-router-dom';
import CollapsableWrapper from "../../../components/primary/CollapsableWrapper";
import TabComponent from "../../../components/primary/TabComponent";
import WrapperCard from "../../../components/secondary/WrapperCard";
import {useApp} from "../../../store/app.store";
import {appConfig} from "../../../config/app.config";


const ViewProject: React.FC = React.memo(() => {
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
        navigate(`/organization/${params.id}/project/${e}`);
    };

    return (
        <div className="d-flex flex-column gap-3 ">
            <div className="d-flex flex-column mb-5">
                <CollapsableWrapper
                    items={[
                        {
                            key: 'title',
                            label: (
                                <div className="d-flex flex-row align-items-center">
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
                items={[
                    {
                        key: 'term',
                        label: 'ترم ها',
                        children: (
                            <WrapperCard
                                shadowed={false}
                                backgroundColor={theme.cardBgLighter}
                                width="100%"
                                height={'auto'}
                            >
                                <Outlet/>
                            </WrapperCard>
                        ),
                    },
                    {
                        key: 'users',
                        label: 'کاربران',
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
        </div>
    );
});

export default ViewProject;
