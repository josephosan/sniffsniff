import { useState, useEffect } from 'react';
import FormSkeletonLoading from '../../components/secondary/FormSkeletonLoading';
import WrapperMessage from '../../components/secondary/WrapperMessage';
import NoData from '../../components/tiny/NoData';
import NotificationApiService from '../../services/NotificationApiService';
import Loading from '../../components/secondary/Loading';
import { Badge } from 'antd';
import { statusColors } from '../../config/app.config';

const MobileNotifications = () => {
    const [mobileNotifications, setMobileNotifications] =
        useState<never[]>(null);
    const [pageFirstLoading, setPageFirstLoading] = useState(true);
    const [fetchMoreLoading, setFetchMoreLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            await handleFetchMore();
        }

        fetchData();
    }, []);

    const handleFetchMore = async () => {
        if (mobileNotifications) setFetchMoreLoading(() => true);
        else setPageFirstLoading(() => true);

        try {
            const res = await NotificationApiService.getAll();

            setMobileNotifications((prevState) => {
                if (prevState) return [...prevState, ...res.data.data.items];

                return [...res.data.data.items];
            });
        } catch (e) {
            console.log(e);
        } finally {
            if (mobileNotifications) setFetchMoreLoading(() => false);
            else setPageFirstLoading(() => false);
        }
    };

    return (
        <>
            <div className="d-flex flex-column gap-3 h-100 align-items-center">
                <div>
                    {pageFirstLoading && (
                        <FormSkeletonLoading
                            height="70px"
                            width={'100%'}
                            count={10}
                        />
                    )}
                </div>

                {(mobileNotifications && mobileNotifications.length > 0) ||
                fetchMoreLoading
                    ? mobileNotifications.map((notif: any, index) => {
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
        </>
    );
};

export default MobileNotifications;
