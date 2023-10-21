import React from 'react';
import {Steps} from 'antd';
import {appConfig} from '../../config/app.config';
import {StepsStatusType} from "../../@types/app";

interface StepsProps {
    items: {
        title: string;
        description: string;
    }[],
    currentStepIndex?: number,
    status?: StepsStatusType
}

const CustomSteps: React.FC<StepsProps> = (
    {
        items,
        currentStepIndex,
        status = 'process'
    }
) => {
    return (
        <>
            <Steps
                current={currentStepIndex}
                status={status}
                items={items.map((item) => {
                    return {
                        ...item,
                        description: (
                            <div style={{fontSize: appConfig.smallFontSize}}>
                                {item.description}
                            </div>
                        ),
                    };
                })}
            />
        </>
    );
};

export default CustomSteps;
