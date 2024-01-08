import React from 'react';
import Logs from '../components/primary/Logs';
import LogMessage from '../components/secondary/LogMessage';
import { statusColors } from '../config/app.config';
import WrapperUserImage from '../components/tiny/WrapperUserImage';
import LogComment from '../components/tiny/LogComment';

export const Home: React.FC = () => {
    return (
        <>
            <Logs
                items={[
                    {
                        dot: <i className="bi bi-cloud-plus"></i>,
                        color: statusColors.success,
                        children: (
                            <LogMessage
                                mode="user"
                                title="تسک ساخته شد."
                                username="joseph"
                                time="13:49"
                            />
                        ),
                    },
                    {
                        dot: <i className="bi bi-window"></i>,
                        color: statusColors.info,
                        children: (
                            <LogMessage
                                mode="system"
                                title="نام ویرایش شد."
                                time="14:49"
                            />
                        ),
                    },
                    {
                        dot: <i className="bi bi-chat-dots"></i>,
                        color: statusColors.warning,
                        children: (
                            <LogMessage
                                mode="user"
                                title="کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد."
                                time="19:49"
                                username="joseph"
                            />
                        ),
                    },
                    {
                        dot: (
                            <WrapperUserImage size="25px" icon="bi bi-person" />
                        ),
                        children: (
                            <LogComment
                                onSubmit={(value) => console.log(value)}
                            />
                        ),
                    },
                ]}
            />
        </>
    );
};
