import React from 'react';
import '../../../../../styles/pages/view.task.scss';
import { appConfig, statusColors } from '../../../../../config/app.config';
import Logs from '../../../../../components/primary/Logs';
import LogMessage from '../../../../../components/secondary/LogMessage';
import LogComment from '../../../../../components/tiny/LogComment';
import LogIconWrapper from '../../../../../components/tiny/LogIconWrapper';

const ViewTaskTerm: React.FC = () => {
    return (
        <div className="p-xl-3 view-task">
            <div className="mb-3 d-flex flex-row align-items-center">
                <input
                    className="view-input"
                    style={{
                        backgroundColor: 'inherit',
                        border: 'none',
                        width: '100%',
                        fontSize: appConfig.hugeFontSize + 20,
                        color: 'inherit',
                    }}
                    value={'متن تایتل'}
                />
            </div>
            <div className="d-flex flex-column gap-3">
                <textarea
                    className="view-input"
                    rows={6}
                    style={{
                        resize: 'none',
                        backgroundColor: 'inherit',
                        border: 'none',
                        fontSize: appConfig.defaultFontSize,
                        color: 'inherit',
                    }}
                    value={'desc value is here khi khi'}
                />
            </div>

            <hr className="mx-2" />

            <div className="pt-3">
                <div
                    className="mb-5"
                    style={{
                        fontSize: appConfig.largeFontSize + 10,
                    }}
                >
                    فعالیت ها
                </div>

                <div className="px-2">
                    <Logs
                        items={[
                            {
                                dot: <LogIconWrapper icon="bi bi-cloud-plus" />,
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
                                dot: <LogIconWrapper icon="bi bi-window" />,
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
                                dot: <LogIconWrapper icon="bi bi-chat-dots" />,
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
                                    <LogIconWrapper icon="bi bi-person-check" />
                                ),
                                children: (
                                    <LogComment
                                        onSubmit={(value) => console.log(value)}
                                    />
                                ),
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default ViewTaskTerm;
