import {useEffect, useState} from 'react';
import WrapperMessage from '../../components/secondary/WrapperMessage';
import WrapperScroll from '../../components/secondary/WrapperScroll';
import FormSkeletonLoading from '../../components/secondary/FormSkeletonLoading';
import NoData from '../../components/tiny/NoData';

const ProjectNotifications = () => {
        const [projectNotifications, setProjectNotifications] =
            useState<never[]>(null);
        const [pageFirstLoading, setPageFirstLoading] = useState(false);
        const [fetchMoreLoading, setFetchMoreLoading] = useState(false);

        useEffect(() => {
            async function fetchData() {
                await handleFetchMore();
            }

            // fetchData();
        }, []);

        useEffect(() => {
            setProjectNotifications([
                {
                    type: 'info',
                    title: 'title',
                    desc: 'desc',
                },
                {
                    type: 'success',
                    title: 'title',
                    desc: 'desc',
                },
                {
                    type: 'warning',
                    title: 'title',
                    desc: 'desc',
                },
            ]);
        }, []);

        const handleFetchMore = async () => {
            try {
                // const res = await
                // setProjectNotifications((prevState) => {
                //     if (prevState) return [...prevState, ...res.data.data.items];
                //     return [...res.data.data.items];
            } catch (e) {
                console.log(e);
            } finally {
            }
        };

        return (
            <WrapperScroll>
                <div className=" h-100 d-flex flex-column gap-3 align-items-center">
                    {pageFirstLoading && (
                        <FormSkeletonLoading fillRow={true} count={10}/>
                    )}

                    {projectNotifications && projectNotifications.length > 0 ? (
                        projectNotifications.map((notif, index) => {
                            return (
                                <WrapperMessage
                                    type={notif.type}
                                    title={notif.title}
                                    desc={notif.desc}
                                    key={index}
                                />
                            );
                        })
                    ) : (
                        <NoData/>
                    )}
                </div>
            </WrapperScroll>
        );
    }
;

export default ProjectNotifications;
