import React from "react";
import {Tabs} from "antd";
import {TabItemProps} from "../../@types/app";
import "../../styles/components/primary/tabs.scss";

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
            type={"card"}
            items={
                [
                    {
                        key: '1',
                        label: 'Tab 1',
                        children: <h1>hello</h1>
                    },
                    {
                        key: '2',
                        label: 'Tab 1',
                        children: <h1>hello</h1>
                    },
                ]
            }
        />
    );
}

export default TabComponent;