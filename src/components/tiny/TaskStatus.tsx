import React, { useEffect, useState } from 'react';
import { TopBarIconWrapper } from '../secondary/TopBarIconWrapper';
import WrapperDropDown from '../secondary/WrapperDropDown';
import TermService from '../../services/TermService';
import { useParams } from 'react-router-dom';
import Loading from '../secondary/Loading';
import { useNotify } from '../../store/notify.store';
import { taskIconMapper as iconMapper } from '../../config/app.config';

interface TaskStatusProps {
    status: string;
    changed?: () => void;
}

const TaskStatus: React.FC<TaskStatusProps> = ({ status, changed }) => {
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const notify = useNotify();
    const [selectedStatusIcon, setIcon] = useState<{
        [key: string]: string;
    } | null>(null);

    useEffect(() => {
        setIcon(() => iconMapper[status]);
    }, [status]);

    const handleItemClick = async (key: string) => {
        setLoading(true);
        try {
            const { data } = await TermService.updateTask(params.termId, {
                status: key,
            });
            if (changed) changed();
            notify.showMessage('success', 'با موفقیت انجام شد.');
            setIcon(() => iconMapper[key]);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <WrapperDropDown
            items={[
                {
                    key: 'TODO',
                    label: (
                        <div onClick={() => handleItemClick('TODO')}>
                            <i
                                style={{
                                    color: iconMapper.TODO.color,
                                }}
                                className={`bi bi-${iconMapper.TODO.icon} ms-1`}
                            ></i>
                            <span>TODO</span>
                        </div>
                    ),
                },
                {
                    key: 'IN_PROGRESS',
                    label: (
                        <div onClick={() => handleItemClick('IN_PROGRESS')}>
                            <i
                                style={{
                                    color: iconMapper.IN_PROGRESS.color,
                                }}
                                className={`bi bi-${iconMapper.IN_PROGRESS.icon} ms-1`}
                            ></i>
                            <span>IN PROGRESS</span>
                        </div>
                    ),
                },
                {
                    key: 'IN_REVIEW',
                    label: (
                        <div onClick={() => handleItemClick('IN_REVIEW')}>
                            <i
                                style={{
                                    color: iconMapper.IN_REVIEW.color,
                                }}
                                className={`bi bi-${iconMapper.IN_REVIEW.icon} ms-1`}
                            ></i>
                            <span>IN REVIEW</span>
                        </div>
                    ),
                },
                {
                    key: 'DONE',
                    label: (
                        <div onClick={() => handleItemClick('DONE')}>
                            <i
                                style={{
                                    color: iconMapper.DONE.color,
                                }}
                                className={`bi bi-${iconMapper.DONE.icon} ms-1`}
                            ></i>
                            <span>DONE</span>
                        </div>
                    ),
                },
                {
                    key: 'CANCELLED',
                    label: (
                        <div onClick={() => handleItemClick('CANCELLED')}>
                            <i
                                style={{
                                    color: iconMapper.CANCELLED.color,
                                }}
                                className={`bi bi-${iconMapper.CANCELLED.icon} ms-1`}
                            ></i>
                            <span>CANCELLED</span>
                        </div>
                    ),
                },
            ]}
        >
            <div>
                {loading ? (
                    <Loading />
                ) : (
                    <TopBarIconWrapper
                        color={selectedStatusIcon?.color}
                        iconClasses={`bi bi-${selectedStatusIcon?.icon}`}
                    />
                )}
            </div>
        </WrapperDropDown>
    );
};

export default TaskStatus;
