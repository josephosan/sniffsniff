import React, { useEffect, useState } from 'react';
import WrapperScroll from '../../components/secondary/WrapperScroll';
import FormSkeletonLoading from '../../components/secondary/FormSkeletonLoading';
import WrapperData from '../../components/secondary/WrapperData';
import Loading from '../../components/secondary/Loading';
import { appConfig } from '../../config/app.config';
import { Button } from 'antd';
import ActionIconWrapper from '../../components/secondary/ActionIconWrapper';
import { useMediaQuery } from 'react-responsive';
import TextItemWrapper from '../../components/tiny/TextItemWrapper';
import CustomSearch from '../../components/primary/CustomSearch';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../store/app.store';
import NoData from '../../components/tiny/NoData';
import OrganizationApiService from '../../services/OrganizationApiService';
import CustomImage from '../../components/secondary/CustomImage';

const OrganizationList: React.FC = React.memo(() => {
    const [pageFirstLoading, setPageFirstLoading] = useState(true);
    const [fetchMoreLoading, setFetchMoreLoading] = useState(false);
    const [organizationList, setOrganizationList] = useState<never[]>(null);
    const [page, setPage] = useState<string | null>(null);
    const [searchValue, setSearch] = useState<string | null>(null);
    const navigate = useNavigate();
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

        setOrganizationList(() => []);
        fetchData();
    }, [filters]);

    const handleFetchMore = async (
        page: string | null = null,
        order: string = 'DESC',
        s: string = '',
    ) => {
        if (organizationList) setFetchMoreLoading(() => true);
        else setPageFirstLoading(() => true);

        if (filters && filters['order']) order = filters['order'];

        let params = {
            limit: appConfig.paginationLimit,
            order: order,
            cursor: page,
        };
        if (s !== '') params['s'] = s;
        if (filters) params = { ...params, ...filters };

        try {
            const res = await OrganizationApiService.paginateAll({ params });
            setOrganizationList((prevState) => {
                if (prevState) return [...prevState, ...res.data.data.items];
                return [...res.data.data.items];
            });
            setPage(() => res.data.data.cursor);
        } catch (e) {
            console.log(e);
        } finally {
            if (organizationList) setFetchMoreLoading(() => false);
            else setPageFirstLoading(() => false);
        }
    };

    const handleReachedBottom = async () => {
        if (!pageFirstLoading && !fetchMoreLoading && page) {
            await handleFetchMore(page, 'DESC', searchValue);
        }
    };

    const handleFilterButtonClick = () => {
        handleSetFilterMode(!filterMode);
        handleSetSidebarCollapsed(true);
    };

    const handleSearch = async (e) => {
        setOrganizationList(() => []);
        setPage(() => null);
        setSearch(e.target.value);
        await handleFetchMore(null, 'ASC', e.target.value);
    };

    return (
        <WrapperScroll reachedBottom={handleReachedBottom}>
            {pageFirstLoading && (
                <div className={'w-100 d-flex flex-column'}>
                    {isMobile ? (
                        <div className=" d-flex justify-content-between  ">
                            <div>
                                <FormSkeletonLoading count={1} width="120px" />
                            </div>
                            <div>
                                <FormSkeletonLoading count={1} width="120px" />
                            </div>
                        </div>
                    ) : (
                        <div className="w-100 d-flex justify-content-between ">
                            <div>
                                <FormSkeletonLoading count={1} />
                            </div>
                            <div>
                                <FormSkeletonLoading count={1} />
                            </div>
                        </div>
                    )}

                    <FormSkeletonLoading fillRow={true} count={10} />
                </div>
            )}

            {(organizationList && organizationList.length > 0) ||
            fetchMoreLoading ? (
                <>
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
                                        border:
                                            '1.5px solid ' + theme.primaryColor,
                                        borderRadius:
                                            appConfig.defaultBorderRadius,
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
                                onClick={() => navigate(`/organization/create`)}
                            >
                                افزودن
                            </Button>
                        </div>
                    </div>
                    {organizationList.map((el, index) => (
                        <WrapperData
                            key={index}
                            handleClick={() =>
                                navigate(`/organization/${el.id}/project`)
                            }
                        >
                            {isMobile ? (
                                <div className="d-flex flex-column gap-3">
                                    <div className="d-flex align-items-center gap-2">
                                        <CustomImage
                                            src={'/public/vite.svg'}
                                            width={'40px'}
                                            height={'40px'}
                                        />
                                        <TextItemWrapper
                                            fontSize={appConfig.largeFontSize}
                                            text={el.name}
                                        />
                                    </div>
                                    <div className={'px-2'}>
                                        <TextItemWrapper
                                            text={el.description}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="d-flex align-items-center gap-3">
                                    <CustomImage
                                        src={'/public/vite.svg'}
                                        width={'40px'}
                                        height={'40px'}
                                    />
                                    <div className={'d-flex flex-column gap-2'}>
                                        <TextItemWrapper
                                            fontSize={appConfig.largeFontSize}
                                            text={el.name}
                                        />
                                        <TextItemWrapper
                                            text={el.description}
                                        />
                                    </div>
                                </div>
                            )}
                        </WrapperData>
                    ))}
                </>
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
export default OrganizationList;
