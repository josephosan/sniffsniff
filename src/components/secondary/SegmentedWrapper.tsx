import React, { ReactNode } from 'react';
import { Segmented } from 'antd';
import { SizeTypes } from '../../@types/app';

interface SegmentedWrapperProps {
    options: {
        label: ReactNode;
        value: string;
        icon?: ReactNode;
        disabled: boolean;
        className: string;
    }[];
    block?: boolean; // an option to make the component fit it's parent with
    defaultValue?: string | number;
    disabled?: boolean;
    onChange?: () => void;
    size?: SizeTypes;
    value?: string | number; // the currently selected value
}

const SegmentedWrapper: React.FC<SegmentedWrapperProps> = ({
    options,
    block = true,
    defaultValue,
    disabled = false,
    onChange,
    size = 'middle',
    value,
}) => {
    return (
        <Segmented
            options={options}
            block={block}
            defaultValue={defaultValue}
            disabled={disabled}
            onChange={onChange}
            size={size}
            value={value}
        />
    );
};

export default SegmentedWrapper;
