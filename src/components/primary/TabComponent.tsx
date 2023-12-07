import React from "react";
import {Tabs} from "antd";
import {TabItemProps} from "../../@types/app";

interface TabComponentProps {
    onChange?: () => void,
    type: "line" | "card" | "editable-card",
    items: TabItemProps[]
}

const TabComponent: React.FC<TabComponentProps> = (
    {
        onChange,
        type = "card",
        items
    }
) => {
    const handleTabsChange = (e) => {
        if (onChange) onChange(e);
    }

    return (
        <Tabs
            onChange={handleTabsChange}
            type={type}
            items={items}
        >
        </Tabs>
    );
}

export default TabComponent;