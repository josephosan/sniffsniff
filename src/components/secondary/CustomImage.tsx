import React from 'react';
import { Image } from 'antd';

interface CustomImageProps {
    src: string;
    width?: number | string;
    height?: number | string;
    preview?: boolean;
    classes?: string;
    color?: string | undefined;
    rounded?: boolean;
}

const CustomImage: React.FC<CustomImageProps> = ({
    src,
    width = 200,
    height = 200,
    preview = false,
    classes,
    color,
    rounded = false,
}) => {
    return (
        <Image
            src={src}
            width={width}
            height={height}
            preview={preview}
            className={classes}
            color={color}
            style={{
                borderRadius: rounded ? '50%' : undefined,
            }}
        />
    );
};

export default CustomImage;
