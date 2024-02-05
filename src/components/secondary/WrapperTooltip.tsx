import React, { ReactNode } from 'react';
import { Tooltip } from 'antd';

interface WrapperTooltipProps {
    trigger?: 'click' | 'hover' | 'focus' | 'contextMenu';
    children: ReactNode | any;
    open?: boolean;
    destroyTooltipOnHide?: boolean;
    content: string | number | ReactNode;
    openChange?: () => void;
    width?: string;
}

const WrapperTooltip: React.FC<WrapperTooltipProps> = ({
    trigger = 'hover',
    children,
    open,
    destroyTooltipOnHide = false,
    content,
    openChange,
    width,
}) => {
    return (
        <Tooltip
            trigger={trigger}
            open={open}
            title={content}
            destroyTooltipOnHide={destroyTooltipOnHide}
            onOpenChange={openChange}
            overlayStyle={{ width: width }}
        >
            {children}
        </Tooltip>
    );
};

export default WrapperTooltip;
