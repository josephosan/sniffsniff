import { useEffect, useState } from 'react';
import WrapperMessage from '../../components/secondary/WrapperMessage';
import WrapperScroll from '../../components/secondary/WrapperScroll';
import FormSkeletonLoading from '../../components/secondary/FormSkeletonLoading';
import NoData from '../../components/tiny/NoData';
import NotificationApiService from '../../services/NotificationApiService';
import Loading from '../../components/secondary/Loading';
import { useNavigate } from 'react-router-dom';
import { Badge } from 'antd';
import { statusColors } from '../../config/app.config';

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
                    <FormSkeletonLoading
                        height="70px"
                        fillRow={true}
                        count={10}
                    />
                )}

                {(projectNotifications && projectNotifications.length > 0) ||
                fetchMoreLoading
                    ? (projectNotifications as any[]).map((notif, index) => {
                          return (
                              <div
                                  className="w-100 px-2"
                                  key={index}
                                  style={{
                                      cursor:
                                          notif.projectInvite.status ===
                                          'PENDING'
                                              ? 'pointer'
                                              : undefined,
                                  }}
                                  onClick={
                                      notif.projectInvite.status === 'PENDING'
                                          ? () => navigate(`${notif.id}`)
                                          : undefined
                                  }
                              >
                                  <Badge.Ribbon
                                      text={
                                          notif.projectInvite.status ===
                                          'JOINED'
                                              ? 'تایید شده'
                                              : notif.projectInvite.status ===
                                                'REJECTED'
                                              ? 'رد شده'
                                              : 'در انتظار'
                                      }
                                      color={
                                          notif.projectInvite.status ===
                                          'JOINED'
                                              ? statusColors.success
                                              : notif.projectInvite.status ===
                                                'REJECTED'
                                              ? statusColors.danger
                                              : statusColors.info
                                      }
                                  >
                                      <div>
                                          <WrapperMessage
                                              type={notif.type}
                                              title={`دعوت به پروژه ${notif.projectInvite?.project.name}`}
                                              desc={`شما توسط ${notif.projectInvite?.by.name} به پروژه ${notif.projectInvite?.project.name} دعوت شده اید.`}
                                          />
                                      </div>
                                  </Badge.Ribbon>
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
