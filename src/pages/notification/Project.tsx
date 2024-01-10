import { useEffect, useState } from 'react';
import WrapperMessage from '../../components/secondary/WrapperMessage';
import WrapperScroll from '../../components/secondary/WrapperScroll';
import FormSkeletonLoading from '../../components/secondary/FormSkeletonLoading';
import NoData from '../../components/tiny/NoData';
import NotificationApiService from '../../services/NotificationApiService';
import Loading from '../../components/secondary/Loading';
import { useNavigate } from 'react-router-dom';

const ProjectNotifications = () => {
    const [projectNotifications, setProjectNotifications] =
        useState<never[]>(null);
    const [pageFirstLoading, setPageFirstLoading] = useState(true);
    const [fetchMoreLoading, setFetchMoreLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            await handleFetchMore();
        }

        fetchData();
    }, []);

    const handleFetchMore = async () => {
        if (projectNotifications) setFetchMoreLoading(() => true);
        else setPageFirstLoading(() => true);

        try {
            const res = await NotificationApiService.getAll({
                params: {
                    type: 1,
                },
            });

            setProjectNotifications((prevState) => {
                if (prevState)
                    return [...prevState, ...res.data.data.items] as any;
                return [...res.data.data.items];
            });
        } catch (e) {
            console.log(e);
        } finally {
            if (projectNotifications) setFetchMoreLoading(() => false);
            else setPageFirstLoading(() => false);
        }
    };

    return (
        <WrapperScroll>
            <div className=" h-100 d-flex flex-column gap-3 align-items-center">
                {pageFirstLoading && (
                    <FormSkeletonLoading fillRow={true} count={10} />
                )}

                {(projectNotifications && projectNotifications.length > 0) ||
                fetchMoreLoading
                    ? (projectNotifications as any[]).map((notif, index) => {
                          return (
                              <div
                                  className="w-100"
                                  key={index}
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => navigate(`${notif.id}`)}
                              >
                                  <WrapperMessage
                                      type={notif.type}
                                      title={notif.title}
                                      desc={notif.message}
                                  />
                              </div>
                          );
                      })
                    : !pageFirstLoading && <NoData />}

                {fetchMoreLoading && (
                    <div
                        className={
                            'w-100 d-flex justify-content-center align-items-center'
                        }
                    >
                        <Loading />
                    </div>
                )}
            </div>
        </WrapperScroll>
    );
};
export default ProjectNotifications;
