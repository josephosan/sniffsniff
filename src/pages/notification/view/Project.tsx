import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import ActionIconWrapper from '../../../components/secondary/ActionIconWrapper';
import { appConfig, statusColors } from '../../../config/app.config';
import SegmentedWrapper from '../../../components/secondary/SegmentedWrapper';
import NotificationApiService from '../../../services/NotificationApiService';
import FormSkeletonLoading from '../../../components/secondary/FormSkeletonLoading';
import NoData from '../../../components/tiny/NoData';
import BigBoxSkeletonLoading from '../../../components/secondary/BigBoxSkeletonLoading';

import { useParams } from 'react-router-dom';

const ViewProjectNotification: React.FC = () => {
    const params = useParams();
    const [status, setStatue] = useState('pending');
    const [pageFirstLoading, setPageFirstLoading] = useState(true);

    const [data, setData] = useState<never[]>(null);

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
        if (data) setPageFirstLoading(() => false);

        try {
            const res = await NotificationApiService.getOne(params.id);
            setData(res.data);
            setStatue(res.data.projectInvite.status);
        } catch (e) {
            console.log(e);
        } finally {
            if (!data) setPageFirstLoading(() => false);
        }
    };
    const handleChange = async (e: string) => {
        if (e == 'reject') {
            const res = await NotificationApiService.inviteReject(params.id);
        } else if (e == 'accept') {
            const res = await NotificationApiService.inviteAccept(params.id);
        }
        setStatue(e);
    };

    return (
        <>
            <div>
                {pageFirstLoading && (
                    <>
                        <div
                            className={
                                'd-flex flex-row justify-content-center '
                            }
                            style={{
                                width: '260px',
                            }}
                        >
                            <FormSkeletonLoading count={2} />
                        </div>
                        <div className="d-flex flex-column align-items-center  ">
                            <BigBoxSkeletonLoading count={1} />
                            <div className="w-100 d-flex justify-content-end ">
                                <div>
                                    <FormSkeletonLoading
                                        count={1}
                                        size="small"
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {data ? (
                <div className="d-flex flex-column gap-4 px-3 ">
                    <div className="d-flex flex-column gap-3">
                        <div className={'d-flex align-items-center gap-3'}>
                            <ActionIconWrapper
                                icon={'bi bi-cone-striped'}
                                size={isMobile ? 60 : 80}
                                color={statusColors.warning}
                                clickable={false}
                            />
                            <div className={'d-flex flex-column gap-3'}>
                                <span
                                    style={{
                                        fontSize: 30,
                                        fontWeight: 600,
                                    }}
                                >
                                    {data.title}
                                </span>
                                <div style={{ width: '200px' }}>
                                    <SegmentedWrapper
                                        options={[
                                            {
                                                label: 'رد',
                                                value: 'reject',
                                                className: 'reject',
                                            },
                                            {
                                                label: 'انتظار',
                                                value: 'pending',
                                                className: 'pending',
                                            },
                                            {
                                                label: 'تایید',
                                                value: 'accept',
                                                className: 'accept',
                                            },
                                        ]}
                                        value={status}
                                        disabled={
                                            status == 'pending' ? false : true
                                        }
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-column gap-3 w-100">
                        <span
                            style={{
                                fontSize: appConfig.defaultFontSize,
                            }}
                            className={'description'}
                        >
                            {data.message}
                        </span>
                        <small
                            style={{
                                fontSize: appConfig.smallFontSize,
                            }}
                            className="d-flex justify-content-end"
                        >
                            {data.projectInvite.expiresAt}
                        </small>
                    </div>
                </div>
            ) : (
                !pageFirstLoading && <NoData />
            )}
        </>
    );
};

export default ViewProjectNotification;
