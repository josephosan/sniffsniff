import React, {ReactNode} from "react";
import {Tooltip} from "antd";

interface WrapperTooltipProps {
    trigger?: 'click' | 'hover' | 'focus' | 'contextMenu';
    children: ReactNode,
    open?: boolean,
    destroyTooltipOnHide?: boolean;
    content: string | number | ReactNode,
    openChange?: () => void
}

const WrapperTooltip: React.FC<WrapperTooltipProps> = (
    {
        trigger = 'hover',
        children,
        open,
        destroyTooltipOnHide = false,
        content,
        openChange
    }
) => {
    return (
        <Tooltip
            trigger={trigger}
            open={open}
            title={content}
            destroyTooltipOnHide={destroyTooltipOnHide}
            onOpenChange={openChange}
        >
            {children}
        </Tooltip>
    );
}

export default WrapperTooltip;