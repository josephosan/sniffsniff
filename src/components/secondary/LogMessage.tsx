import React from 'react';
import SystemLogMessage from '../tiny/SystemLogMessage';
import UserLogMessage from '../tiny/UserLogMessage';

interface LogMessageProps {
    mode?: 'user' | 'system' | undefined;
    title: string;
    time: string;
    username?: string;
}

const LogMessage: React.FC<LogMessageProps> = ({
    mode,
    title,
    time,
    username,
}) => {
    return (
        <div>
            {mode === 'system' ? (
                <SystemLogMessage title={title} time={time} />
            ) : (
                <UserLogMessage title={title} time={time} username={username} />
            )}
        </div>
    );
};

export default LogMessage;
