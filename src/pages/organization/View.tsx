import React, {useEffect, useMemo, useState} from 'react';
import {Outlet, useLocation, useNavigate, useParams} from 'react-router-dom';
import TabComponent from '../../components/primary/TabComponent';
import WrapperCard from '../../components/secondary/WrapperCard';
import {useApp} from '../../store/app.store';
import CollapsableWrapper from '../../components/primary/CollapsableWrapper';
import FormSkeletonLoading from '../../components/secondary/FormSkeletonLoading';
import BigBoxSkeletonLoading from '../../components/secondary/BigBoxSkeletonLoading';
import {appConfig} from "../../config/app.config";

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

    useEffect(() => {
        async function fetchData() {
            await handleFetchMore();
        }

        // fetchData();
    }, []);

    const handleFetchMore = async () => {
        if (isData) setIsLoading(false);
        try {
        } catch (e) {
            console.log(e);
        } finally {
        }
    };

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
                                        <div className="d-flex flex-row align-items-center gap-3">
                                            <svg
                                                width="40"
                                                height="40"
                                                viewBox="0 0 125 125"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M89.8438 77.1484C89.8438 88.4746 77.5977 97.6562 62.5 97.6562C48.2285 97.6562 36.5625 89.4473 35.3164 78.9824C35.2969 78.8906 35.2891 78.7949 35.2754 78.707C35.2715 78.6504 35.2559 78.5918 35.252 78.5352H35.2617C35.2461 78.3984 35.2188 78.2637 35.2188 78.123C35.2188 75.9648 36.9668 74.2168 39.125 74.2168C41.2422 74.2168 42.957 75.9062 43.0176 78.0078L43.0371 78.0039C43.7168 84.6172 52.1582 89.8438 62.5 89.8438C73.2852 89.8438 82.0312 84.1621 82.0312 77.1484C82.0312 70.1367 71.1504 66.1602 60.5488 63.5977C60.1934 63.5117 59.8535 63.4746 59.5078 63.4121C47.9414 60.8281 35.1562 55 35.1562 43.9453C35.1562 32.6191 46.5234 23.4375 60.5488 23.4375C73.8066 23.4375 84.6406 31.6621 85.7812 42.1348C85.8047 42.2344 85.8105 42.3379 85.8223 42.4375C85.832 42.5312 85.8516 42.627 85.8613 42.7266H85.8516C85.8574 42.8066 85.877 42.8828 85.877 42.9688C85.877 45.127 84.1289 46.875 81.9707 46.875C79.8965 46.875 78.2148 45.25 78.0879 43.2109H78.0742C77.543 36.543 69.9102 31.25 60.5488 31.25C50.8379 31.25 42.9688 36.9316 42.9688 43.9453C42.9688 49.6133 52.0176 53.6523 60.5488 55.6074V55.6035C74.9766 58.6543 89.8438 64.541 89.8438 77.1484ZM115.236 78.125C113.078 78.125 111.33 76.377 111.33 74.2188C111.33 72.0605 113.078 70.3125 115.236 70.3125C117.393 70.3125 119.143 72.0605 119.143 74.2188C119.143 76.377 117.391 78.125 115.236 78.125ZM93.75 125C88.2754 125 83.1426 123.566 78.6699 121.09C78.5684 121.047 78.4746 121.029 78.3711 120.971C77.25 120.35 75.957 119.994 74.584 119.994C74.0859 119.994 73.5996 120.041 73.125 120.131C72.6191 120.227 72.1406 120.277 71.6777 120.311C68.6895 120.805 65.6309 121.094 62.5 121.094C30.1387 121.094 3.90625 94.8633 3.90625 62.5C3.90625 59.3691 4.19336 56.3164 4.6875 53.3242C4.7207 52.8613 4.77148 52.3828 4.86719 51.875C4.95703 51.4004 5.00391 50.9141 5.00391 50.416C5.00391 49.043 4.64844 47.75 4.0293 46.6289C3.97266 46.5234 3.95312 46.4297 3.9082 46.3301C1.43359 41.8555 0 36.7227 0 31.25C0 13.9922 13.9922 0 31.25 0C36.7246 0 41.8574 1.43359 46.3301 3.91016C46.4316 3.95313 46.5254 3.97266 46.6289 4.0293C47.75 4.65039 49.043 5.00586 50.416 5.00586C50.9141 5.00586 51.4004 4.95898 51.875 4.86914C52.3809 4.77344 52.8594 4.72266 53.3223 4.68945C56.3164 4.19531 59.3691 3.90625 62.5 3.90625C93.2617 3.90625 118.4 27.6367 120.814 57.7793C121.084 59.0352 120.799 60.3828 119.828 61.3535C118.299 62.8828 115.828 62.8828 114.303 61.3535C113.607 60.6621 113.271 59.7637 113.209 58.8594L113.094 58.8633C111.225 32.5234 89.3164 11.7188 62.5 11.7188C59.6895 11.7188 56.9316 11.9648 54.2461 12.4062C53.9902 12.4395 53.7441 12.4629 53.4785 12.5195C52.4883 12.7148 51.4629 12.8184 50.416 12.8184C47.627 12.8184 45.0078 12.0879 42.7402 10.8066C42.4277 10.6309 42.1426 10.4941 41.8789 10.3809C38.6934 8.74023 35.0801 7.8125 31.25 7.8125C18.3047 7.8125 7.8125 18.3047 7.8125 31.25C7.8125 35.0801 8.74023 38.6934 10.3789 41.8789C10.4922 42.1445 10.6289 42.4277 10.8047 42.7402C12.0879 45.0078 12.8164 47.627 12.8164 50.416C12.8164 51.4629 12.7109 52.4902 12.5195 53.4785C12.4629 53.7441 12.4375 53.9902 12.4043 54.2402C11.9648 56.9316 11.7188 59.6875 11.7188 62.5C11.7188 90.5449 34.4551 113.281 62.5 113.281C65.3125 113.281 68.0684 113.035 70.7578 112.594C71.0098 112.559 71.2559 112.537 71.5215 112.479C72.5117 112.283 73.5371 112.182 74.584 112.182C77.373 112.182 79.9922 112.91 82.2598 114.193C82.5723 114.369 82.8574 114.506 83.1211 114.619C86.3066 116.26 89.9199 117.188 93.75 117.188C106.695 117.188 117.188 106.695 117.188 93.75C117.188 91.5918 118.936 89.8438 121.094 89.8438C123.252 89.8438 125 91.5918 125 93.75C125 111.008 111.008 125 93.75 125Z"
                                                    fill="#3AA1E0"
                                                />
                                            </svg>
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
