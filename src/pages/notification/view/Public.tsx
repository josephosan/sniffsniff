import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { appConfig, statusColors } from '../../../config/app.config';
import ActionIconWrapper from '../../../components/secondary/ActionIconWrapper';
import FormSkeletonLoading from '../../../components/secondary/FormSkeletonLoading';
import BigBoxSkeletonLoading from '../../../components/secondary/BigBoxSkeletonLoading';
import { useParams } from 'react-router-dom';
import NotificationApiService from '../../../services/NotificationApiService';

const ViewPublicNotification: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const param = useParams();
    const [data, setData] = useState(null);

    const isMobile = useMediaQuery({
        query: `(max-width: ${appConfig.appBreakPoint}px)`,
    });

    useEffect(() => {
        async function getData() {
            await fetchData();
        }
        getData();
    }, []);

    const fetchData = async () => {
        try {
            const { data } = await NotificationApiService.getOne(param.id);
            setData(data.data);
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            {loading ? (
                <div>
                    <FormSkeletonLoading width="200px" count={1} />

                    <BigBoxSkeletonLoading />
                </div>
            ) : (
                <div>
                    <div className="d-flex flex-column gap-4 px-3">
                        <div className="d-flex flex-column gap-3">
                            <div className={'d-flex align-items-center gap-4'}>
                                <ActionIconWrapper
                                    icon={'bi bi-info-circle'}
                                    size={isMobile ? 60 : 80}
                                    color={statusColors.info}
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
                                in two days
                            </small>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ViewPublicNotification;
