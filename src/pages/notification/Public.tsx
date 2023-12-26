import { useEffect, useState } from 'react';
import WrapperMessage from '../../components/secondary/WrapperMessage';
import WrapperScroll from '../../components/secondary/WrapperScroll';
import FormSkeletonLoading from '../../components/secondary/FormSkeletonLoading';
import NoData from '../../components/tiny/NoData';

const PublicNotifications = () => {
    const [publicNotifications, setPublicNotifications] =
        useState<never[]>(null);
    const [pageFirstLoading, setPageFirstLoading] = useState(false);
    const [fetchMoreLoading, setFetchMoreLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            await handleFetchMore();
        }

        fetchData();
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
            <div className=" h-100 d-flex flex-column gap-3 align-items-center ">
                {pageFirstLoading && (
                    <FormSkeletonLoading fillRow={true} count={10} />
                )}

                {publicNotifications && publicNotifications.length > 0 ? (
                    publicNotifications.map((notif) => {
                        return (
                            <WrapperMessage
                                type={notif.type}
                                title={notif.title}
                                desc={notif.desc}
                            />
                        );
                    })
                ) : (
                    <NoData />
                )}
            </div>
        </WrapperScroll>
    );
};

export default PublicNotifications;
