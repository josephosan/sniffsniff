import React from 'react';
import { appConfig, statusColors } from '../../config/app.config';
import { Badge } from 'antd';

interface SystemLogMessageProps {
    time: string;
    title: string;
}

const SystemLogMessage: React.FC<SystemLogMessageProps> = ({ time, title }) => {
    return (
        <div className="d-flex flex-column pb-3 gap-1">
            <div>{time}</div>
            <div style={{ fontSize: appConfig.largeFontSize }}>{title}</div>
            <div style={{ fontSize: appConfig.smallFontSize }}>
                <div>
                    <span className="px-1">سیستم</span>
                    <Badge status="processing" color={statusColors.info} />
                </div>
            </div>
        </div>
    );
};

export default SystemLogMessage;
