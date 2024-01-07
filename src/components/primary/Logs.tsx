import { Timeline } from 'antd';
import React, { ReactNode, useEffect, useState } from 'react';
import { statusColors } from '../../config/app.config';
import { useApp } from '../../store/app.store';

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
        />
    );
};

export default Logs;
