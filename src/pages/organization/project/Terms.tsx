import React, { useEffect, useState } from 'react';
import { useApp } from '../../../store/app.store';
import { useMediaQuery } from 'react-responsive';
import { appConfig } from '../../../config/app.config';
import WrapperScroll from '../../../components/secondary/WrapperScroll';
import CustomSearch from '../../../components/primary/CustomSearch';
import ActionIconWrapper from '../../../components/secondary/ActionIconWrapper';
import { Button } from 'antd';
import FormSkeletonLoading from '../../../components/secondary/FormSkeletonLoading';
import WrapperData from '../../../components/secondary/WrapperData';
import TextItemWrapper from '../../../components/tiny/TextItemWrapper';
import NoData from '../../../components/tiny/NoData';
import Loading from '../../../components/secondary/Loading';
import ProjectApiService from '../../../services/ProjectApiService';
import {useParams} from "react-router-dom";

const ProjectTerms: React.FC = React.memo(() => {
    const [pageFirstLoading, setPageFirstLoading] = useState(true);
    const [fetchMoreLoading, setFetchMoreLoading] = useState(false);
    const [termList, setTermList] = useState<never[]>(null);
    const [page, setPage] = useState<number>(null);
    const param = useParams();
    const {
        theme,
        handleSetFilterMode,
        filterMode,
        handleSetSidebarCollapsed,
        filters,
    } = useApp();

    const isMobile = useMediaQuery({
        query: `(max-width: ${appConfig.appBreakPoint}px)`,
    });

    useEffect(() => {
        async function fetchData() {
            await handleFetchMore();
        }

        setTermList(() => []);
        fetchData();
    }, [filters]);

    const handleFetchMore = async (
        page: number = 1,
        order: string = 'DESC',
        s: string = '',
    ) => {
        if (termList) setFetchMoreLoading(() => true);
        else setPageFirstLoading(() => true);

        if (filters && filters['order']) order = filters['order'];

        let params = {
            limit: appConfig.paginationLimit,
            order: order,
            page: page,
        };
        if (s !== '') params['s'] = s;
        if (filters) params = { ...params, ...filters };

        try {
            const res = await ProjectApiService.getTermPaginate({
                params: {
                    project: param.projectId
                }
            });
            setTermList(res.data);
        } catch (e) {
            console.log(e);
        } finally {
            if (termList) setFetchMoreLoading(() => false);
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
        setTermList(() => []);
        setPage(() => 1);
        await handleFetchMore(1, 'ASC', e.target.value);
    };

    return (
        <WrapperScroll reachedBottom={handleReachedBottom} height="70vh">
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
                            onSearch={handleSearch}
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
                        // onClick={() => navigate()}
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

            {(termList && termList.length > 0) || fetchMoreLoading ? (
                termList.map((el, index) => {
                    return (
                        <WrapperData key={index} color={el.color}>
                            {isMobile ? (
                                <div className="d-flex flex-column gap-5">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <TextItemWrapper
                                            fontSize={appConfig.defaultFontSize}
                                            text={el.name}
                                        />
                                    </div>
                                    <div className="d-flex">
                                        <TextItemWrapper
                                            text={el.description}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="d-flex align-items-center justify-content-between">
                                    <TextItemWrapper
                                        fontSize={appConfig.defaultFontSize}
                                        text={el.name}
                                    />
                                    <TextItemWrapper text={el.description} />
                                </div>
                            )}
                        </WrapperData>
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

export default ProjectTerms;
