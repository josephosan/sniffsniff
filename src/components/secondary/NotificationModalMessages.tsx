import React, { useEffect, useState } from 'react';
import WrapperMessage from './WrapperMessage';
import UnderlinedLink from './UnderlinedLink';
import NotificationApiService from '../../services/NotificationApiService';
import NoData from '../tiny/NoData';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';

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
                        notifList.map((el, index) => {
                            return (
                                <div
                                    onClick={() =>
                                        navigate(
                                            `/notifications/${
                                                el.type === 0
                                                    ? 'public'
                                                    : 'project'
                                            }/${el.id}`,
                                        )
                                    }
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                    key={index}
                                    className="mb-1"
                                >
                                    <WrapperMessage
                                        title={el.title}
                                        desc={el.message}
                                        type={el.type}
                                    />
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
