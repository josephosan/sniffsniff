import React from 'react';
import { appConfig } from '../../config/app.config';
import WrapperUserImage from './WrapperUserImage';

interface UserLogMessageProps {
    time: string;
    username: string | undefined;
    title: string;
}

const UserLogMessage: React.FC<UserLogMessageProps> = ({
    time,
    title,
    username,
}) => {
    return (
        <div className="d-flex flex-column pb-3 gap-1">
            <div>{time}</div>
            <div style={{ fontSize: appConfig.largeFontSize }}>{title}</div>
            <div style={{ fontSize: appConfig.smallFontSize }}>
                <div className="d-flex align-items-center">
                    <WrapperUserImage url="/public/vite.svg" size="25px" />
                    <span className="px-1 mt-1">{username}</span>
                </div>
            </div>
        </div>
    );
};

export default UserLogMessage;
