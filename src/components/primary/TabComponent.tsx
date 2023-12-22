import React, {useEffect} from 'react';
import { Tabs } from 'antd';
import { TabItemProps } from '../../@types/app';
import '../../styles/components/primary/tabs.scss';

interface TabComponentProps {
    onChange?: () => void;
    type?: 'line' | 'card' | 'editable-card';
    items: TabItemProps[];
    activeKey?: string;
    animation?: { inkBar: boolean; tabPane: boolean };
    destroyInactiveTabPane?: boolean
}

const TabComponent: React.FC<TabComponentProps> = React.memo((
    {
        onChange,
        type = "card",
        items,
        activeKey,
        animation = {
            inkBar: true,
            tabPage: false
        },
        destroyInactiveTabPane = true
    }
) => {
    const handleTabsChange = (e) => {
        if (onChange) onChange(e);
    };

    return (
        <Tabs
            onChange={handleTabsChange}
            type={type}
            items={items}
            activeKey={activeKey}
            animated={animation}
            destroyInactiveTabPane={destroyInactiveTabPane}
        />
    );
})
export default TabComponent;
