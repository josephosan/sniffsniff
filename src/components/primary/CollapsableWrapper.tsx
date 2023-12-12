import React from 'react';
import { Collapse, CollapseProps } from 'antd';
import { SizeTypes } from '../../@types/app';

interface CollapsableWrapperProps {
    items: CollapseProps['items'];
    defaultActiveKey?: string[];
    ghost?: boolean;
    expandIconPosition?: 'start' | 'end';
    size?: SizeTypes;
    bordered?: boolean;
}

const CollapsableWrapper: React.FC<CollapsableWrapperProps> = ({
    items,
    defaultActiveKey,
    ghost = true,
    expandIconPosition = 'start',
    size = 'middle',
    bordered = false,
}) => {
    return (
        <Collapse
            items={items}
            defaultActiveKey={defaultActiveKey}
            ghost={ghost}
            expandIconPosition={expandIconPosition}
            size={size}
            bordered={bordered}
        />
    );
};

export default CollapsableWrapper;
