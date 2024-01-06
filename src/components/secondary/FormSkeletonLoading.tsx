import React from 'react';
import { Skeleton, Space } from 'antd';
import { ShapeSizeTypes } from '../../@types/app';

interface FormSkeletonLoadingProps {
    size?: ShapeSizeTypes;
    active?: boolean;
    count?: number;
    fillRow?: boolean;
    width?: string;
}

const FormSkeletonLoading: React.FC<FormSkeletonLoadingProps> = ({
    size = 'large',
    active = true,
    count = 10,
    fillRow = false,
    width,
}) => {
    const skeletonArray = Array.from({ length: count }, (_, index) => index);

    return (
        <div className={'w-100 row'}>
            {skeletonArray.map((el) => {
                return (
                    <Skeleton.Input
                        style={{
                            minWidth: width,
                            width: width,
                            maxWidth: width,
                        }}
                        className={'w-100 m-2 ' + (fillRow ? '' : 'col-sm')}
                        key={el}
                        active={active}
                        size={size}
                    />
                );
            })}
        </div>
    );
};

export default FormSkeletonLoading;
