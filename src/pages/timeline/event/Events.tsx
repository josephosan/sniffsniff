import React, {useState, useEffect} from 'react';
import WrapperScroll from '../../../components/secondary/WrapperScroll';
import CustomSearch from '../../../components/primary/CustomSearch';
import ActionIconWrapper from '../../../components/secondary/ActionIconWrapper';
import FormSkeletonLoading from '../../../components/secondary/FormSkeletonLoading';
import WrapperData from '../../../components/secondary/WrapperData';
import TextItemWrapper from '../../../components/tiny/TextItemWrapper';
import Loading from '../../../components/secondary/Loading';
import TimelineService from '../../../services/TimelineService';
import {appConfig} from '../../../config/app.config';
import {useApp} from '../../../store/app.store';
import {useMediaQuery} from 'react-responsive';
import {useNavigate, useParams} from 'react-router-dom';
import {Button, Divider, Popover, Space, Tag} from 'antd';
import {
    getRandomColor,
    getPersianDateAsText,
} from '../../../helpers/app.helper';
import NoData from "../../../components/tiny/NoData";
import timelines from "../Timelines";

const Events: React.FC = () => {
    const navigate = useNavigate();
    const {timelineId} = useParams();
    const [eventList, setEventList] = useState<never[]>(null);
    const [cursor, setCursor] = useState<number>(null);
    const [pageFirstLoading, setPageFirstLoading] = useState(true);
    const [fetchMoreLoading, setFetchMoreLoading] = useState(false);
    const {theme, handleSetFilterMode, filterMode} = useApp();

    const isMobile = useMediaQuery({
        query: `(max-width: ${appConfig.appBreakPoint}px)`,
    });

    useEffect(() => {
        if (!timelineId) return;
        async function fetchData() {
            try {
                const res = await TimelineService.getTimelineEvents(timelineId, {
                    params: {
                        limit: appConfig.paginationLimit,
                        order: 'ASC',
                    },
                });
                setEventList(() => res.data.data.items);
                setCursor(() => res.data.data.cursor);
            } catch (e) {
                console.log(e);
            } finally {
                setPageFirstLoading(() => false);
            }
        }

        fetchData();
    }, []);

    const handleFetchMore = async () => {
        if (!timelineId) return;
        setFetchMoreLoading(() => true);
        try {
            const res = await TimelineService.getTimelineEvents(timelineId, {
                params: {
                    limit: appConfig.paginationLimit,
                    order: 'ASC',
                    cursor: cursor,
                },
            });
            setEventList((prevState) => {
                return [...prevState, ...res.data.data.items];
            });
            setCursor(() => res.data.data.cursor);
        } catch (e) {
            console.log(e);
        } finally {
            setFetchMoreLoading(() => false);
        }
    };

    const handleReachedBottom = async () => {
        if (!pageFirstLoading && !fetchMoreLoading && cursor) {
            await handleFetchMore();
        }
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
                        <CustomSearch inputMode={true}/>
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
                                iconClicked={() =>
                                    handleSetFilterMode(!filterMode)
                                }
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
                        onClick={() => navigate(`/timeline/${timelineId}/event/create/`)}
                    >
                        افزودن
                    </Button>
                </div>
            </div>

            {
                pageFirstLoading && (
                    <div className={'w-100'}>
                        <FormSkeletonLoading fillRow={true} count={10}/>
                    </div>
                )
            }
            {
                eventList ? eventList.map((el) => {
                    return (
                        <WrapperData key={el.id} color={getRandomColor()}>
                            {isMobile ? (
                                <div>is mobile form</div>
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
                                        <Divider type={'vertical'}/>
                                        <ActionIconWrapper
                                            icon={'bi bi-binoculars'}
                                        />
                                        <Divider type={'vertical'}/>
                                        <ActionIconWrapper
                                            icon={'bi bi-pencil-square'}
                                            // iconClicked={() =>
                                            //     navigate()
                                            // }
                                        />
                                        <Divider type={'vertical'}/>
                                        <ActionIconWrapper
                                            icon={'bi bi-trash'}
                                        />
                                    </Space>
                                </div>
                            )}
                        </WrapperData>
                    );
                }) : (
                    <NoData />
                )
            }
            {
                fetchMoreLoading && (
                    <div
                        className={
                            'w-100 d-flex justify-content-center align-items-center'
                        }
                    >
                        <Loading/>
                    </div>
                )
            }
        </WrapperScroll>
    );
};

export default Events;
