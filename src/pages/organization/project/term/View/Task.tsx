import React, { useEffect, useRef, useState } from 'react';
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
import { useNotify } from '../../../../../store/notify.store';

const ViewTaskTerm: React.FC = () => {
    const [firstPageLoading, setFirstPageLoading] = useState(true);
    const [termInfo, setTermInfo] = useState<any | null>(null);
    const [logList, setLogList] = useState<any[] | null>(null);
    const [logsLoading, setLogsLoading] = useState<boolean>(false);
    const theMessageComponent = useRef<null | any>(null);
    const params = useParams();
    const notifyStore = useNotify();

    useEffect(() => {
        async function getData() {
            await fetchData();
        }

        getData();
    }, []);

    const fetchData = async () => {
        try {
            theMessageComponent.current = {
                dot: <LogIconWrapper icon="bi bi-person-check" />,
                children: <LogComment onSubmit={handleMessageSubmit} />,
            };
            const { data } = await TermService.getOne(params.termId);
            setTermInfo(data.data);
            const logs = data.data.activities.map((el: any) => {
                if (el.type === 'SYSTEM') {
                    return {
                        dot: <LogIconWrapper icon="bi bi-window" />,
                        color: statusColors.info,
                        children: (
                            <LogMessage
                                mode="system"
                                title={el.text}
                                time="14:49"
                            />
                        ),
                    };
                } else if (el.type === 'COMMENT') {
                    return {
                        dot: <LogIconWrapper icon="bi bi-chat-dots" />,
                        color: statusColors.success,
                        children: (
                            <LogMessage
                                mode="message"
                                title={el.text}
                                username={el.createdBy.name}
                                time="13:49"
                            />
                        ),
                    };
                }
            });
            logs.push(theMessageComponent.current);
            setLogList(() => logs);
        } catch (err) {
            console.log(err);
        } finally {
            setFirstPageLoading(false);
        }
    };

    const handleInputBlur = async (data: { [key: string]: string }) => {
        try {
            const res = await TermService.updateOne(params.termId, data);
            notifyStore.showMessage('success', 'با موفقیت ویرایش شد.');
            fetchData();
        } catch (err) {
            console.log(err);
        }
    };

    const handleMessageSubmit = async (value: string | null) => {
        if (value === '' || !value) {
            notifyStore.showMessage('warning', 'لطفا متنی وارد کنید!');
            return;
        }
        setLogList((prevState) => {
            prevState?.pop();
            return prevState;
        });
        setLogsLoading(true);
        try {
            const { data } = await TermService.comment(
                params.termId as string,
                { comment: value },
            );
            await fetchData();
        } catch (err) {
            console.log(err);
        } finally {
            setLogsLoading(false);
        }
    };

    return (
        <div style={{ transform: 'all 0.5s ease' }}>
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
                                pending={logsLoading}
                                items={logList as any}
                                className="mb-5"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewTaskTerm;
