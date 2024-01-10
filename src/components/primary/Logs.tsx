import { Timeline } from 'antd';
import React, { ReactNode } from 'react';
import { useApp } from '../../store/app.store';
import '../../styles/components/primary/logs.scss';

interface LogsProps {
    mode?: 'right' | 'left' | 'alternate' | undefined;
    items:
        | {
              dot?: ReactNode;
              color?: string;
              children: ReactNode;
          }[]
        | undefined;
    pending?: boolean | undefined;
    pendingDot?: ReactNode;
    className?: string;
}

const Logs: React.FC<LogsProps> = ({
    mode = 'left',
    items,
    pending = false,
    pendingDot,
    className,
}) => {
    const { theme } = useApp();
    return (
        <div className={className}>
            <Timeline
                style={{ color: theme.fadeTextColor }}
                mode={mode}
                items={items}
                pending={pending}
                className="m-1"
                pendingDot={pendingDot}
            />
        </div>
    );
};

export default Logs;
