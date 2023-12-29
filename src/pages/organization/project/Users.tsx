import React from 'react';
import { useApp } from '../../../store/app.store';
import WrapperScroll from '../../../components/secondary/WrapperScroll';
import { useState, useEffect } from 'react';
import { Button } from 'antd';
import FormSkeletonLoading from '../../../components/secondary/FormSkeletonLoading';
import NoData from '../../../components/tiny/NoData';
import Loading from '../../../components/secondary/Loading';
import CustomSearch from '../../../components/primary/CustomSearch';
import ActionIconWrapper from '../../../components/secondary/ActionIconWrapper';
import WrapperUserData from '../../../components/secondary/WrapperUserData';
import { appConfig } from '../../../config/app.config';
import { useNavigate, useParams } from 'react-router-dom';
import ProjectApiService from '../../../services/ProjectApiService';

const ProjectUsers: React.FC = React.memo(() => {
    const [pageFirstLoading, setPageFirstLoading] = useState(false); // todo: make this true
    const [fetchMoreLoading, setFetchMoreLoading] = useState(false);
    const [userList, setUserList] = useState<never[]>([]);
    const [page, setPage] = useState<number>(null);

    const {
        theme,
        handleSetFilterMode,
        filterMode,
        handleSetSidebarCollapsed,
        filters,
    } = useApp();
    const navigate = useNavigate();
    const param = useParams();

    useEffect(() => {
        async function fetchData() {
            await handleFetchMore();
        }

        // setUserList(() => []);
        fetchData();
    }, [filters]);

    const handleFetchMore = async (
        page: number = 1,
        order: string = 'DESC',
        s: string = '',
    ) => {
        if (userList) setFetchMoreLoading(() => true);
        else setPageFirstLoading(() => true);

        let params = {
            limit: appConfig.paginationLimit,
            order: order,
            page: page,
        };
        if (s !== '') params['s'] = s;
        if (filters) params = { ...params, ...filters };

        try {
            const { data } = await ProjectApiService.getOne(param.projectId);
            setUserList(data.data.members);
        } catch (e) {
            console.log(e);
        } finally {
            if (userList) setFetchMoreLoading(() => false);
            else setPageFirstLoading(() => false);
        }
    };

    const handleReachedBottom = async () => {
        if (!pageFirstLoading && !fetchMoreLoading && page) {
            await handleFetchMore(page);
        }
    };

    const handleFilterButtonClick = () => {
        handleSetFilterMode(!filterMode);
        handleSetSidebarCollapsed(true);
    };

    const handleSearch = async (e) => {
        setUserList(() => []);
        setPage(() => 1);
        await handleFetchMore(1, 'ASC', e.target.value);
    };
    return (
        <WrapperScroll /*reachedBottom={handleReachedBottom}*/ height="70vh">
            <div className={'row mb-3 mt-2'}>
                <div className={'col-sm-7 col-md-4 col-xl-4 col-7'}>
                    <div
                        className={
                            'd-flex justify-content-between align-items-center'
                        }
                    >
                        <CustomSearch
                            inputMode={true}
                            asyncSearch={true}
                            /* onSearch={handleSearch} */
                        />
                        <div
                            className={'h-100 me-2'}
                            style={{
                                border: '1.5px solid ' + theme.primaryColor,
                                borderRadius: appConfig.defaultBorderRadius,
                                padding: '3px',
                            }}
                        >
                            <ActionIconWrapper
                                icon={
                                    'bi bi-funnel d-flex justify-content-center align-items-center'
                                }
                                size={appConfig.defaultIconSize}
                                iconClicked={handleFilterButtonClick}
                            />
                        </div>
                    </div>
                </div>
                <div
                    className={
                        'col-sm-5 col-md-8 col-xl-8 col-5 d-flex justify-content-end'
                    }
                >
                    <Button
                        type={'primary'}
                        icon={<i className={'bi bi-plus'}></i>}
                        onClick={() =>
                            navigate(
                                `/organization/${params.organizationId}/project/${params.projectId}/invite`,
                            )
                        }
                    >
                        افزودن
                    </Button>
                </div>
            </div>
            {pageFirstLoading && (
                <div>
                    <FormSkeletonLoading fillRow={true} count={10} />
                </div>
            )}

            <br />

            {(userList && userList.length > 0) || fetchMoreLoading ? (
                userList.map((el) => {
                    return (
                        <WrapperUserData
                            title={el.name}
                            desc={el.desc}
                            imageUrl={'/public/vite.svg'}
                        />
                    );
                })
            ) : (
                <NoData />
            )}
            {fetchMoreLoading && (
                <div
                    className={
                        'w-100 d-flex justify-content-center align-items-center'
                    }
                >
                    <Loading />
                </div>
            )}
        </WrapperScroll>
    );
});

export default ProjectUsers;
