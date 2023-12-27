import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import ActionIconWrapper from '../../../components/secondary/ActionIconWrapper';
import { appConfig } from '../../../config/app.config';
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
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
            }}
            className={isMobile ? 'gap-3 p-2' : 'gap-5 p-5'}
        >
            <div style={{}}>
                <ActionIconWrapper
                    icon={
                        data.type === 'success'
                            ? 'bi bi-check-circle'
                            : data.type === 'warning'
                            ? 'bi bi-cone-striped'
                            : 'bi bi-info-circle'
                    }
                    size={isMobile ? 60 : 100}
                    color={
                        data.type === 'success'
                            ? '#65B741'
                            : data.type === 'warning'
                            ? '#FB8B24'
                            : '#6DB9EF'
                    }
                    clickable={false}
                />
            </div>
            <div className="d-flex flex-column gap-4">
                <div
                    style={{
                        width: isMobile ? '100%' : '55%',
                    }}
                    className="d-flex flex-column gap-3"
                >
                    <span
                        style={{
                            fontSize: isMobile ? 20 : 30,
                        }}
                    >
                        {data.title}
                    </span>
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
                        // onChange={}
                        // size="middle"
                        //value="confirm"
                    />
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
                        className="d-flex justify-content-end "
                    >
                        {data.time}
                    </small>
                </div>
            </div>
        </div>
    );
};

export default ViewProjectNotification;
