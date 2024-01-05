import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import ActionIconWrapper from '../../../components/secondary/ActionIconWrapper';
import { appConfig, statusColors } from '../../../config/app.config';
import SegmentedWrapper from '../../../components/secondary/SegmentedWrapper';
import NotificationApiService from '../../../services/NotificationApiService';
import { useParams } from 'react-router-dom';

const ViewProjectNotification: React.FC = () => {
    const [status, setStatue] = useState('pending');

    const params = useParams();
    const [data, setData] = useState(null);
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
        try {
            const res = await NotificationApiService.getOne(params.id);
            setData(res.data);
            setStatue(res.data.projectInvite.status);
        } catch (e) {
            console.log(e);
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
        <div>
            <div className="d-flex flex-column gap-4 px-3">
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
                                            // disabled: true,
                                            className: 'reject',
                                        },
                                        {
                                            label: 'انتظار',
                                            value: 'pending',
                                            // disabled: true,
                                            className: 'pending',
                                        },
                                        {
                                            label: 'تایید',
                                            value: 'accept',
                                            // disabled: false,
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
        </div>
    );
};

export default ViewProjectNotification;
