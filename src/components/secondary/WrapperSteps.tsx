import React from 'react';
import { Steps } from 'antd';
import { appConfig } from '../../config/app.config';
interface StepsProps {
    items: { title: string; description: string }[];
}

export default function WrapperSteps({ items }: StepsProps) {
    return (
        <div>
            <Steps
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
        </div>
    );
}
