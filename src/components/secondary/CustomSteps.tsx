import React, { ReactNode } from 'react';
import { Steps, Divider } from 'antd';
import { appConfig } from '../../config/app.config';

interface StepsProps {
    items: {
        title: string;
        description: string;
    }[];
}

const CustomSteps: React.FC<StepsProps> = ({ items }) => {
    return (
        <>
            <Divider />
            <Steps
                current={3}
                items={items.map((item) => {
                    return {
                        ...item,
                        description: (
                            <div style={{ fontSize: appConfig.smallFontSize }}>
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
