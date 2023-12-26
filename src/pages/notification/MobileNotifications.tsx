import { useState, useEffect } from 'react';
import FormSkeletonLoading from '../../components/secondary/FormSkeletonLoading';
import WrapperMessage from '../../components/secondary/WrapperMessage';
import NoData from '../../components/tiny/NoData';

const MobileNotifications = () => {
    const [mobileNotifications, setMobileNotifications] =
        useState<never[]>(null);
    const [pageFirstLoading, setPageFirstLoading] = useState(false);

    useEffect(() => {
        setMobileNotifications([
            {
                type: 'info',
                title: 'tile',
                desc: 'desc',
            },
            {
                type: 'info',
                title: 'tile',
                desc: 'desc',
            },
        ]);
    }, []);
    return (
        <>
            <div className="d-flex flex-column gap-3">
                {pageFirstLoading && (
                    <FormSkeletonLoading fillRow={true} count={10} />
                )}

                {mobileNotifications && mobileNotifications.length > 0 ? (
                    mobileNotifications.map((notif, index) => {
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
                    <NoData />
                )}
            </div>
        </>
    );
};

export default MobileNotifications;
