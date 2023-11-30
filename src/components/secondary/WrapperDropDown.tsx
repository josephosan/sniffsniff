import { ReactNode } from 'react';
import { Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';

interface WrapperDropDownProps {
    children: ReactNode;
    listItems: ReactNode[];
    placement?:
        | 'bottomLeft'
        | 'topLeft'
        | 'topCenter'
        | 'topRight'
        | 'bottomCenter'
        | 'bottomRight'
        | 'top'
        | 'bottom';

    trigger?: 'hover' | 'click';
}

const WrapperDropDown: React.FC<WrapperDropDownProps> = ({
    children,
    listItems,
    placement = 'bottomLeft',
    trigger = 'click',
}) => {
    const renderedListItems = listItems.map((el, key) => {
        return {
            key: key + 1,
            label: el,
        };
    });

    const items: MenuProps['items'] = renderedListItems;
    return (
        <Dropdown
            menu={{ items }}
            placement={placement}
            trigger={[trigger]}
            rootClassName="dropdown-horizontal"
            overlayClassName="row-dropdown"
            overlayStyle={{}}
        >
            <Space className="d-flex align-items-center ">{children}</Space>
        </Dropdown>
    );
};

export default WrapperDropDown;
