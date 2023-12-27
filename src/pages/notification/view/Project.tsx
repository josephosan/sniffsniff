import React, {useEffect, useState} from 'react';
import {useMediaQuery} from 'react-responsive';

import ActionIconWrapper from '../../../components/secondary/ActionIconWrapper';
import {appConfig, statusColors} from '../../../config/app.config';
import SegmentedWrapper from '../../../components/secondary/SegmentedWrapper';

const ViewProjectNotification: React.FC = () => {
    const [data, setData] = useState({
        type: 'info',
        title: 'نام نوتیف',
        desc: 'زمایشی و بی‌معنی در صنعت چاپ، صفحه‌آرایی و طراحی گرافیک گفته می‌شود. طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و ان',
        time: ' در 2 دی باطل میشود',
    });

    const isMobile = useMediaQuery({
        query: `(max-width: ${appConfig.appBreakPoint}px)`,
    });
    // useEffect(() => {
    //     async function fetchData() {
    //         await handleFetchMore();
    //     }

    //     // fetchData();
    // }, []);

    // const handleFetchMore = () => {
    //     try {
    //     } catch (e) {
    //         console.log(e);
    //     } finally {
    //     }
    // };

    return (
        <div>
            <div className="d-flex flex-column gap-4 px-3">
                <div className="d-flex flex-column gap-3">
                    <div className={"d-flex align-items-center gap-3"}>
                        <ActionIconWrapper
                            icon={'bi bi-cone-striped'}
                            size={isMobile ? 60 : 80}
                            color={statusColors.warning}
                            clickable={false}
                        />
                        <div className={"d-flex flex-column gap-3"}>
                            <span
                                style={{
                                    fontSize: 30,
                                    fontWeight: 600
                                }}
                            >
                            {data.title}
                        </span>
                            <div style={{width: "200px"}}>
                                <SegmentedWrapper
                                    options={[
                                        {
                                            label: 'رد',
                                            value: 'reject',
                                            disabled: false,
                                            className: 'reject',
                                        },
                                        {
                                            label: 'انتظار',
                                            value: 'waiting',
                                            disabled: false,
                                            className: 'waiting',
                                        },
                                        {
                                            label: 'تایید',
                                            value: 'confirm',
                                            disabled: false,
                                            className: 'confirm',
                                        },
                                    ]}
                                    defaultValue="waiting"
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
                        {data.desc}
                    </span>
                    <small
                        style={{
                            fontSize: appConfig.smallFontSize,
                        }}
                        className="d-flex justify-content-end"
                    >
                        {data.time}
                    </small>
                </div>
            </div>
        </div>
    );
};

export default ViewProjectNotification;
