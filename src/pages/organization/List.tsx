import React, {useEffect, useState} from 'react';
import WrapperScroll from '../../components/secondary/WrapperScroll';
import FormSkeletonLoading from '../../components/secondary/FormSkeletonLoading';
import WrapperData from '../../components/secondary/WrapperData';
import Loading from '../../components/secondary/Loading';
import {appConfig} from '../../config/app.config';
import {getPersianDateAsText} from '../../helpers/app.helper';
import {Button, Divider, Popconfirm, Popover, Space, Tag} from 'antd';
import ActionIconWrapper from '../../components/secondary/ActionIconWrapper';
import {useMediaQuery} from 'react-responsive';
import TextItemWrapper from '../../components/tiny/TextItemWrapper';
import CustomSearch from '../../components/primary/CustomSearch';
import {useNavigate} from 'react-router-dom';
import {useApp} from '../../store/app.store';
import NoData from '../../components/tiny/NoData';

const OrganizationList: React.FC = React.memo(() => {
    const [pageFirstLoading, setPageFirstLoading] = useState(true);
    const [fetchMoreLoading, setFetchMoreLoading] = useState(false);
    const [organizationList, setOrganizationList] = useState<never[]>(null);
    const [page, setPage] = useState<number>(null);
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
        page: number = 1,
        order: string = 'DESC',
        s: string = '',
    ) => {
        if (organizationList) setFetchMoreLoading(() => true);
        else setPageFirstLoading(() => true);

        let params = {
            limit: appConfig.paginationLimit,
            order: order,
            page: page,
        };
        if (s !== '') params['s'] = s;
        if (filters) params = {...params, ...filters};

        try {
            // const res = await OrganizationService.paginateAll({ params });
            // setOrganizationList((prevState) => {
            //     if (prevState) return [...prevState, ...res.data.data.items];
            //     return [...res.data.data.items];
            // });
            // setPage(() => res.data.data.next);
        } catch (e) {
            console.log(e);
        } finally {
            if (organizationList) setFetchMoreLoading(() => false);
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
        setOrganizationList(() => []);
        setPage(() => 1);
        await handleFetchMore(1, 'ASC', e.target.value);
    };

    const handleOrganizationDelete = (el) => {
        // todo: handle this
        console.log(el);
    };

    return (
        <WrapperScroll reachedBottom={handleReachedBottom}>
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
                        onClick={() => navigate(`/organization/create`)}
                    >
                        افزودن
                    </Button>
                </div>
            </div>

            {pageFirstLoading && (
                <div className={'w-100'}>
                    <FormSkeletonLoading fillRow={true} count={10}/>
                </div>
            )}
            {(organizationList && organizationList.length > 0) ||
            fetchMoreLoading ? (
                organizationList.map((el, index) => {
                    return (
                        <WrapperData key={index} color={el.color}>
                            {isMobile ? (
                                <div className="d-flex flex-column gap-5">
                                    <div className="d-flex justify-content-between align-items-center ">
                                        <div className="d-flex flex-column">
                                            <TextItemWrapper
                                                fontSize={
                                                    appConfig.defaultFontSize
                                                }
                                                text={el.name}
                                            />
                                            <TextItemWrapper
                                                text={getPersianDateAsText(
                                                    el.startDate,
                                                )}
                                            />{' '}
                                        </div>
                                        <div>
                                            {el.type === 'PRIVATE' ? (
                                                <Tag color={'red'}>خصوصی</Tag>
                                            ) : (
                                                <Tag color={'green'}>گروه</Tag>
                                            )}
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column ">
                                        {el.description}
                                        <TextItemWrapper text={el.tags}/>
                                    </div>
                                    <Space
                                        className={
                                            'd-flex align-items-center justify-content-between'
                                        }
                                    >
                                        <ActionIconWrapper
                                            icon={'bi bi-share'}
                                        />
                                        {/* <Divider type={'vertical'} />
                                        <ActionIconWrapper
                                            icon={'bi bi-calendar-event'}
                                            iconClicked={() =>
                                                navigate(
                                                    `/timeline/${el.id}/event`,
                                                )
                                            }
                                        /> */}
                                        <Divider type={'vertical'}/>
                                        <ActionIconWrapper
                                            icon={'bi bi-binoculars'}
                                        />
                                        <Divider type={'vertical'}/>
                                        <ActionIconWrapper
                                            icon={'bi bi-pencil-square'}
                                            iconClicked={() =>
                                                navigate(
                                                    `/organization/edit/${el.id}`,
                                                )
                                            }
                                        />
                                        <Divider type={'vertical'}/>
                                        <Popconfirm
                                            title={`حذف ${el.name}`}
                                            description={
                                                'آیا از حذف اطمینان دارید؟'
                                            }
                                            onConfirm={() =>
                                                setOrganizationList(el)
                                            }
                                            okText={'تایید'}
                                            placement={'right'}
                                            showCancel={false}
                                        >
                                            <Button
                                                style={{
                                                    border: 'none',
                                                    backgroundColor: 'inherit',
                                                }}
                                                className={'p-0'}
                                                key={el.id}
                                            >
                                                <ActionIconWrapper
                                                    icon={'bi bi-trash'}
                                                />
                                            </Button>
                                        </Popconfirm>
                                    </Space>
                                </div>
                            ) : (
                                <div className="d-flex justify-content-between align-items-center">
                                    <TextItemWrapper
                                        fontSize={appConfig.defaultFontSize}
                                        text={el.name}
                                    />
                                    <div>
                                        {el.type === 'PRIVATE' ? (
                                            <Tag color={'red'}>خصوصی</Tag>
                                        ) : (
                                            <Tag color={'green'}>گروه</Tag>
                                        )}
                                    </div>
                                    <TextItemWrapper text={el.tags}/>
                                    <TextItemWrapper
                                        text={getPersianDateAsText(
                                            el.startDate,
                                        )}
                                    />
                                    <TextItemWrapper
                                        text={getPersianDateAsText(el.endDate)}
                                    />

                                    <Popover content={el.description}>
                                        <span
                                            style={{
                                                fontSize:
                                                    appConfig.smallFontSize +
                                                    'px',
                                            }}
                                        >
                                            {el.description?.split(' ')[0]}{' '}
                                            &nbsp;
                                            {el.description?.split(' ')[1]}{' '}
                                            &nbsp; ...
                                        </span>
                                    </Popover>
                                    <Space className={'mt-1 float-left'}>
                                        <ActionIconWrapper
                                            icon={'bi bi-share'}
                                        />
                                        {/* <Divider type={'vertical'} />
                                        <ActionIconWrapper
                                            icon={'bi bi-calendar-event'}
                                            iconClicked={() =>
                                                navigate(
                                                    `/timeline/${el.id}/event`,
                                                )
                                            }
                                        /> */}
                                        <Divider type={'vertical'}/>
                                        <ActionIconWrapper
                                            icon={'bi bi-binoculars'}
                                        />
                                        <Divider type={'vertical'}/>
                                        <ActionIconWrapper
                                            icon={'bi bi-pencil-square'}
                                            iconClicked={() =>
                                                navigate(
                                                    `/organization/edit/${el.id}`,
                                                )
                                            }
                                        />
                                        <Divider type={'vertical'}/>
                                        <Popconfirm
                                            title={`حذف ${el.name}`}
                                            description={
                                                'آیا از حذف اطمینان دارید؟'
                                            }
                                            onConfirm={() =>
                                                handleOrganizationDelete(el)
                                            }
                                            okText={'تایید'}
                                            showCancel={false}
                                            placement={'right'}
                                        >
                                            <Button
                                                style={{
                                                    border: 'none',
                                                    backgroundColor: 'inherit',
                                                }}
                                                className={'p-0'}
                                                key={el.id}
                                            >
                                                <ActionIconWrapper
                                                    icon={'bi bi-trash'}
                                                />
                                            </Button>
                                        </Popconfirm>
                                    </Space>
                                </div>
                            )}
                        </WrapperData>
                    );
                })
            ) : (
                <NoData/>
            )}
            {fetchMoreLoading && (
                <div
                    className={
                        'w-100 d-flex justify-content-center align-items-center'
                    }
                >
                    <Loading/>
                </div>
            )}
        </WrapperScroll>
    );
});
export default OrganizationList;
