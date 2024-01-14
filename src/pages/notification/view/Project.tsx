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
import { useNotify } from '../../../store/notify.store';

const ViewProjectNotification: React.FC = () => {
    const params = useParams();
    const [status, setStatue] = useState('pending');
    const [pageFirstLoading, setPageFirstLoading] = useState(true);
    const notifyStore = useNotify();

    const [data, setData] = useState<any | null>(null);

    const isMobile = useMediaQuery({
        query: `(max-width: ${appConfig.appBreakPoint}px)`,
    });
    useEffect(() => {
        async function fetchData() {
            await handleGetData();
        }

        fetchData();
    }, []);

    const handleGetData = async () => {
        if (data) setPageFirstLoading(() => false);

        try {
            const res = await NotificationApiService.getOne(
                params.id as string,
            );
            setData(res.data.data);
            setStatue(res.data.data.projectInvite.status);
        } catch (e) {
            console.log(e);
        } finally {
            if (!data) setPageFirstLoading(() => false);
        }
    };
    const handleChange = async (e: string) => {
        if (e == 'REJECTED') await rejectRequest();
        else if (e == 'ACCEPTED') await acceptRequest();
    };

    const acceptRequest = async () => {
        try {
            const res = await NotificationApiService.inviteAccept(params.id);
            notifyStore.showMessage('success', 'با موفقیت انجام شد.');
            setStatue('ACCEPTED');
        } catch (err) {
            console.log(err);
        }
    };

    const rejectRequest = async () => {
        try {
            const res = await NotificationApiService.inviteReject(params.id);
            notifyStore.showMessage('success', 'با موفقیت انجام شد.');
            setStatue('REJECTED');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {pageFirstLoading && (
                <div>
                    <FormSkeletonLoading width="200px" count={1} />

                    <BigBoxSkeletonLoading />
                </div>
            )}

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
                                    دعوت به پروژه{' '}
                                    {data.projectInvite.project.name}
                                </span>
                                <div style={{ width: '200px' }}>
                                    <SegmentedWrapper
                                        options={[
                                            {
                                                label: 'رد',
                                                value: 'REJECTED',
                                                className: 'reject',
                                            },
                                            {
                                                label: 'انتظار',
                                                value: 'PENDING',
                                                className: 'pending',
                                            },
                                            {
                                                label: 'تایید',
                                                value: 'ACCEPTED',
                                                className: 'accept',
                                            },
                                        ]}
                                        value={status}
                                        disabled={
                                            status == 'PENDING' ? false : true
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
                            شما توسط {data.projectInvite.by.name} به پروژه{' '}
                            {data.projectInvite.project.name} دعوت شده اید.
                            <br />
                            توضیحات پروژه:{' '}
                            {data.projectInvite.project.description}
                        </span>
                        <small
                            style={{
                                fontSize: appConfig.defaultFontSize,
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
