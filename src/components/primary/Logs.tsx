import { Timeline } from 'antd';
import React, { ReactNode, useEffect, useState } from 'react';
import { statusColors } from '../../config/app.config';

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
    return <Timeline mode={mode} items={items} pending={pending} />;
};

export default Logs;
