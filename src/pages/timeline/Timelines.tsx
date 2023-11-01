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
            } catch (e) {
                console.log(e);
            } finally {
                setPageFirstLoading(() => false);
            }
        }

        fetchData();
    }, []);

    const handleFetchMore = async (cursor: number) => {
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
        } catch (e) {
            console.log(e);
        } finally {
            setFetchMoreLoading(() => false);
        }
    }

    const handleReachedBottom = () => {
        if (fetchMoreLoading && pageFirstLoading) return;

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
                            <p className={"mb-0"}>{el.name}</p>
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