import React, { ReactNode } from 'react';
import {Dropdown, MenuProps} from 'antd';

interface WrapperDropDownProps {
    items: MenuProps['items'][],
    placement?:
        | 'bottomLeft'
        | 'topLeft'
        | 'topCenter'
        | 'topRight'
        | 'bottomCenter'
        | 'bottomRight'
        | 'top'
        | 'bottom',
    trigger?: 'hover' | 'click',
    children: ReactNode
}

const WrapperDropDown: React.FC<WrapperDropDownProps> = React.memo(({
    items,
    placement = 'bottomLeft',
    trigger = 'click',
    children
}) => {
    return (
        <Dropdown
            menu={{ items }}
            placement={placement}
            trigger={[trigger]}
            rootClassName="dropdown-horizontal"
            overlayClassName="row-dropdown"
            overlayStyle={{}}
        >
            {children}
        </Dropdown>
    );
});

export default WrapperDropDown;
