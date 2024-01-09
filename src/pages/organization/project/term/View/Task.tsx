import React, { useEffect, useState } from 'react';
import '../../../../../styles/pages/view.task.scss';
import { appConfig, statusColors } from '../../../../../config/app.config';
import Logs from '../../../../../components/primary/Logs';
import LogMessage from '../../../../../components/secondary/LogMessage';
import LogComment from '../../../../../components/tiny/LogComment';
import LogIconWrapper from '../../../../../components/tiny/LogIconWrapper';
import TermService from '../../../../../services/TermService';
import { useParams } from 'react-router-dom';
import { Divider } from 'antd';
import FormSkeletonLoading from '../../../../../components/secondary/FormSkeletonLoading';
import CircleSkeletonLoading from '../../../../../components/secondary/CircleSkeletonLoading';

const ViewTaskTerm: React.FC = () => {
    const [firstPageLoading, setFirstPageLoading] = useState(true);
    const [termInfo, setTermInfo] = useState<any | null>(null);
    const params = useParams();

    useEffect(() => {
        async function getData() {
            await fetchData();
        }

        getData();
    }, []);

    const fetchData = async () => {
        try {
            const { data } = await TermService.getOne(params.termId);
            setTermInfo(data.data);
        } catch (err) {
            console.log(err);
        } finally {
            setFirstPageLoading(false);
        }
    };

    const handleInputBlur = (data: { [key: string]: string }) => {
        console.log(data);
    };

    return (
        <>
            {firstPageLoading ? (
                <>
                    <FormSkeletonLoading count={1} width="200px" />
                    <FormSkeletonLoading count={1} height="20px" />
                    <FormSkeletonLoading count={1} height="20px" />
                    <FormSkeletonLoading
                        count={1}
                        height="20px"
                        width="200px"
                    />

                    <br />
                    <br />

                    <FormSkeletonLoading
                        count={1}
                        height="2px"
                        active={false}
                    />

                    <div className="p-2 px-3">
                        <div className="d-flex">
                            <div className="col-xl-1 col-sm-2 col-md-2">
                                <CircleSkeletonLoading />
                            </div>

                            <div className="d-flex flex-column w-100">
                                <FormSkeletonLoading
                                    count={1}
                                    width="50px"
                                    height="15px"
                                />
                                <FormSkeletonLoading count={1} height="20px" />
                                <FormSkeletonLoading
                                    count={1}
                                    width="100px"
                                    height="10px"
                                />
                            </div>
                        </div>

                        <br />
                        <br />

                        <div className="d-flex">
                            <div className="col-xl-1 col-sm-2">
                                <CircleSkeletonLoading />
                            </div>
                            <div className="d-flex flex-column w-100">
                                <FormSkeletonLoading
                                    count={1}
                                    width="50px"
                                    height="15px"
                                />
                                <FormSkeletonLoading count={1} height="20px" />
                                <FormSkeletonLoading count={1} height="20px" />
                                <FormSkeletonLoading
                                    count={1}
                                    height="20px"
                                    width="200px"
                                />
                                <FormSkeletonLoading
                                    count={1}
                                    width="100px"
                                    height="10px"
                                />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
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
                            defaultValue={termInfo.title}
                            onBlur={(e) =>
                                e.target.value !== termInfo.title
                                    ? handleInputBlur({ title: e.target.value })
                                    : undefined
                            }
                        />
                    </div>
                    <div className="d-flex flex-column gap-3">
                        <textarea
                            className="view-input description"
                            rows={6}
                            style={{
                                resize: 'none',
                                backgroundColor: 'inherit',
                                border: 'none',
                                fontSize: appConfig.defaultFontSize,
                                color: 'inherit',
                            }}
                            defaultValue={termInfo.description}
                            onBlur={(e) =>
                                e.target.value != termInfo.description
                                    ? handleInputBlur({
                                          description: e.target.value,
                                      })
                                    : undefined
                            }
                        />
                    </div>

                    <Divider>فعالیت ها</Divider>

                    <div className="pt-3">
                        <div className="px-2">
                            <Logs
                                items={[
                                    {
                                        dot: (
                                            <LogIconWrapper icon="bi bi-cloud-plus" />
                                        ),
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
                                        dot: (
                                            <LogIconWrapper icon="bi bi-window" />
                                        ),
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
                                        dot: (
                                            <LogIconWrapper icon="bi bi-chat-dots" />
                                        ),
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
                                                onSubmit={(value) =>
                                                    console.log(value)
                                                }
                                            />
                                        ),
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ViewTaskTerm;
