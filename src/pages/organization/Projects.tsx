import React from 'react';
import {useState, useEffect} from 'react';
import {useMediaQuery} from 'react-responsive';
import {useNavigate} from 'react-router-dom';

import WrapperScroll from '../../components/secondary/WrapperScroll';
import FormSkeletonLoading from '../../components/secondary/FormSkeletonLoading';
import WrapperData from '../../components/secondary/WrapperData';
import TextItemWrapper from '../../components/tiny/TextItemWrapper';
import NoData from '../../components/tiny/NoData';
import Loading from '../../components/secondary/Loading';

import {appConfig} from '../../config/app.config';

const OrganizationProjects: React.FC = React.memo(() => {
    const [pageFirstLoading, setPageFirstLoading] = useState(true);
    const [fetchMoreLoading, setFetchMoreLoading] = useState(false);
    const [projectList, setProjectList] = useState<never[]>(null);
    const [page, setPage] = useState<number>(null);

    const navigate = useNavigate();

    const isMobile = useMediaQuery({
        query: `(max-width: ${appConfig.appBreakPoint}px)`,
    });

    useEffect(() => {
        async function fetchData() {
            await handleFetchMore();
        }

        fetchData();
    }, []);

    const handleFetchMore = async () => {
        if (projectList) setFetchMoreLoading(() => true);
        else setPageFirstLoading(() => true);
        try {
        } catch (e) {
            console.log(e);
        } finally {
            if (projectList) setFetchMoreLoading(() => false);
            else setPageFirstLoading(() => false);
        }
    };


    const handleReachedBottom = async () => {
    };

    return (
        <WrapperScroll reachedBottom={handleReachedBottom} height="70vh">
            {pageFirstLoading && (
                <div>
                    <FormSkeletonLoading fillRow={true} count={10}/>
                </div>
            )}

            {(projectList && projectList.length > 0) || fetchMoreLoading ? (
                projectList.map((el, index) => {
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
                                    <TextItemWrapper text={el.description}/>
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

export default OrganizationProjects;
