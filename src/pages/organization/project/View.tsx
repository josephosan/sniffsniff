import React, {useEffect, useState} from 'react';
import {Outlet, useLocation, useNavigate, useParams} from 'react-router-dom';
import CollapsableWrapper from "../../../components/primary/CollapsableWrapper";
import TabComponent from "../../../components/primary/TabComponent";
import WrapperCard from "../../../components/secondary/WrapperCard";
import {useApp} from "../../../store/app.store";
import {appConfig} from "../../../config/app.config";
import FormSkeletonLoading from "../../../components/secondary/FormSkeletonLoading";
import BigBoxSkeletonLoading from "../../../components/secondary/BigBoxSkeletonLoading";
import ProjectApiService from "../../../services/ProjectApiService";


const ViewProject: React.FC = React.memo(() => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const {theme} = useApp();
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [data, setData] = useState<never>(null);

    useEffect(() => {
        async function getData() {
            await fetchData();
        }

        getData();

        const tab =
            location.pathname.split('/')[
            location.pathname.split('/').length - 1
                ];
        setActiveTab(() => tab);
    }, [location.pathname]);

    const fetchData = async () => {
        try {
            const {data} = await ProjectApiService.getOne(params.projectId);
            setData(data.data);
        } catch (e) {
            console.log(e);
        }
    }

    const handleTabItemClick = (e) => {
        navigate(`/organization/${params.organizationId}/project/${params.projectId}/${e}`);
    };

    return (
        <div>
            {
                !data ? (
                    <div className="d-flex flex-column gap-3">
                        <FormSkeletonLoading count={1}/>
                        <div className={"d-flex flex-row justify-content-center"} style={{width: '260px'}}>
                            <FormSkeletonLoading count={1}/>
                        </div>
                        <BigBoxSkeletonLoading count={1}/>
                    </div>
                ) : (
                    <div className="d-flex flex-column gap-3 ">
                        <div className="d-flex flex-column mb-5">
                            <CollapsableWrapper
                                items={[
                                    {
                                        key: 'title',
                                        label: (
                                            <div className="d-flex flex-row align-items-center">
                                                <h5 className={"mb-0"}>
                                                    {
                                                        data.name
                                                    }
                                                </h5>
                                            </div>
                                        ),
                                        children: (
                                            <div className="d-flex flex-column gap-3 px-md-5 px-xl-5 ">
                                            <span
                                                style={{
                                                    fontSize: appConfig.defaultFontSize,
                                                }}
                                                className={"description"}
                                            >
                                                {data.description}
                                            </span>
                                                <small
                                                    style={{
                                                        fontSize: appConfig.smallFontSize,
                                                    }}
                                                    className={"d-flex justify-content-end"}
                                                >
                                                    {data.createdAt}
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
                )
            }
        </div>
    );
});

export default ViewProject;
