import {useState, useEffect} from 'react';
import FormSkeletonLoading from '../../components/secondary/FormSkeletonLoading';
import WrapperMessage from '../../components/secondary/WrapperMessage';
import NoData from '../../components/tiny/NoData';
import NotificationApiService from '../../services/NotificationApiService';
import Loading from '../../components/secondary/Loading';

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
                    {
                        pageFirstLoading && (
                            <FormSkeletonLoading width={'100%'} count={10}/>
                        )
                    }
                </div>

                {
                    (mobileNotifications && mobileNotifications.length > 0) || fetchMoreLoading
                        ? mobileNotifications.map((notif, index) => {
                            return (
                                <WrapperMessage
                                    type={notif.type}
                                    title={notif.title}
                                    desc={notif.desc}
                                    key={index}
                                />
                            );
                        })
                        : !pageFirstLoading && <NoData/>
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
            </div>
        </>
    );
};

export default MobileNotifications;
