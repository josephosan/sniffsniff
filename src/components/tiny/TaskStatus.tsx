import React, { useState } from 'react';
import { TopBarIconWrapper } from '../secondary/TopBarIconWrapper';
import WrapperDropDown from '../secondary/WrapperDropDown';

const TaskStatus: React.FC = () => {
    const [selectedStatusIcon, setIcon] = useState<string | null>('list-task');
    const iconMapper = {
        TODO: 'list-task',
        IN_PROGRESS: 'arrow-clockwise',
        IN_REVIEW: 'eyeglasses',
        DONE: 'check-circle',
        CANCELLED: 'x-circle',
    };

    return (
        <WrapperDropDown
            items={[
                {
                    key: 'TODO',
                    label: (
                        <div>
                            <i className={`bi bi-${iconMapper.TODO} ms-1`}></i>
                            <span>TODO</span>
                        </div>
                    ),
                },
                {
                    key: 'IN_PROGRESS',
                    label: (
                        <div>
                            <i
                                className={`bi bi-${iconMapper.IN_PROGRESS} ms-1`}
                            ></i>
                            <span>IN PROGRESS</span>
                        </div>
                    ),
                },
                {
                    key: 'IN_REVIEW',
                    label: (
                        <div>
                            <i
                                className={`bi bi-${iconMapper.IN_REVIEW} ms-1`}
                            ></i>
                            <span>IN REVIEW</span>
                        </div>
                    ),
                },
                {
                    key: 'DONE',
                    label: (
                        <div>
                            <i className={`bi bi-${iconMapper.DONE} ms-1`}></i>
                            <span>DONE</span>
                        </div>
                    ),
                },
                {
                    key: 'CANCELLED',
                    label: (
                        <div>
                            <i
                                className={`bi bi-${iconMapper.CANCELLED} ms-1`}
                            ></i>
                            <span>CANCELLED</span>
                        </div>
                    ),
                },
            ]}
        >
            <TopBarIconWrapper iconClasses={`bi bi-${selectedStatusIcon}`} />
        </WrapperDropDown>
    );
};

export default TaskStatus;
