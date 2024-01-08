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
}

const Logs: React.FC<LogsProps> = ({
    mode = 'left',
    items,
    pending = false,
}) => {
    const { theme } = useApp();
    return (
        <Timeline
            style={{ color: theme.fadeTextColor }}
            mode={mode}
            items={items}
            pending={pending}
            className="m-1"
        />
    );
};

export default Logs;
