import React, {useEffect, useState} from "react";
import WrapperScroll from "../../components/secondary/WrapperScroll";
import TimelineService from "../../services/TimelineService";
import FormSkeletonLoading from "../../components/secondary/FormSkeletonLoading";
import WrapperData from "../../components/secondary/WrapperData";
import Loading from "../../components/secondary/Loading";
import {appConfig} from "../../config/app.config";
import {getRandomColor} from "../../helpers/app.helper";

const Timelines: React.FC = () => {
    const [pageFirstLoading, setPageFirstLoading] = useState(true);
    const [fetchMoreLoading, setFetchMoreLoading] = useState(false);
    const [timelineList, setTimelineList] = useState<never[]>(null);
    const [cursor, setCursor] = useState<number>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await TimelineService.paginateAll({
                    params: {
                        limit: appConfig.paginationLimit,
                        order: 'ASC',
                    }
                });
                setTimelineList(() => res.data.data.items);
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
        setFetchMoreLoading(() => true);
        try {
            const res = await TimelineService.paginateAll({
                params: {
                    limit: appConfig.paginationLimit,
                    order: 'ASC',
                    cursor: cursor
                }
            });
            setTimelineList((prevState) => {
                return [...prevState, res.data.data.items];
            });
            setCursor(() => res.data.data.cursor);
        } catch (e) {
            console.log(e);
        } finally {
            setFetchMoreLoading(() => false);
        }
    }

    const handleReachedBottom = async () => {
        if (fetchMoreLoading && pageFirstLoading) return;
        console.log(timelineList.length, cursor);
        await handleFetchMore();
    }

    return (
        <WrapperScroll
            reachedBottom={handleReachedBottom}
        >
            {
                pageFirstLoading && (
                    <div className={"w-100"}>
                        <FormSkeletonLoading fillRow={true} count={7}/>
                    </div>
                )
            }
            {
                timelineList && timelineList.map(el => {
                    return (
                        <WrapperData key={el.id} color={getRandomColor()}>
                            <div className="d-flex justify-content-between">
                                <span>{el.title}</span>
                                <span>{el.type}</span>
                                <span>{el.tags}</span>
                                <span>{el.startDate}</span>
                                <span>{el.endDate}</span>
                                <span>{el.description}</span>
                            </div>
                        </WrapperData>
                    );
                })
            }
            {
                fetchMoreLoading && (
                    <div className={"w-100 d-flex justify-content-center align-items-center"}>
                        <Loading/>
                    </div>
                )
            }
        </WrapperScroll>
    );
}

export default Timelines;