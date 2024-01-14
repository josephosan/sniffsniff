import React, { useEffect, useState } from 'react';
import WrapperMessage from './WrapperMessage';
import { Badge } from 'antd';
import NotificationApiService from '../../services/NotificationApiService';
import NoData from '../tiny/NoData';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';
import { statusColors } from '../../config/app.config';

const NotificationModalMessages: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [notifList, setNotifList] = useState<any[] | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            await fetchData();
        }

        getData();
    }, []);

    const fetchData = async () => {
        setLoading(true);

        try {
            const { data } = await NotificationApiService.getAll();
            setNotifList(() => data.data.items);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {!loading && (notifList?.length === 0 || !notifList) ? (
                <NoData />
            ) : loading ? (
                <div
                    className={
                        'w-100 d-flex justify-content-center align-items-center p-2'
                    }
                >
                    <Loading />
                </div>
            ) : (
                <div className={'p-1 gap-1'}>
                    {notifList &&
                        notifList.map((notif: any, index) => {
                            return (
                                <div
                                    className="w-100 px-2 py-1"
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
                                            ? () =>
                                                  navigate(
                                                      `/notifications/project/${notif.id}`,
                                                  )
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
                                                title={notif.title}
                                                desc={notif.message}
                                            />
                                        </div>
                                    </Badge.Ribbon>
                                </div>
                            );
                        })}

                    {/* <div className={'d-flex justify-content-center mt-3'}>
                        <UnderlinedLink text={'بیشتر'} />
                    </div> */}
                </div>
            )}
        </>
    );
};

export default NotificationModalMessages;
