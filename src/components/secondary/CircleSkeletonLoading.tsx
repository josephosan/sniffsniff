import React from 'react';
import { Skeleton } from 'antd';
import { ShapeSizeTypes } from '../../@types/app';

interface CircleSkeletonLoadingProps {
    size?: ShapeSizeTypes;
    active?: boolean;
    className?: string;
    width?: string;
    height?: string | undefined;
}

const CircleSkeletonLoading: React.FC<CircleSkeletonLoadingProps> = ({
    size = 'large',
    active = true,
    width,
    height,
    className,
}) => {
    return (
        <div className={'w-100 row'}>
            <Skeleton.Avatar
                style={{
                    minWidth: width,
                    width: width,
                    maxWidth: width,
                    height: height ? height : undefined,
                }}
                className={className}
                active={active}
                size={size}
            />
        </div>
    );
};

export default CircleSkeletonLoading;
