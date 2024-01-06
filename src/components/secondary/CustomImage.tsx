import React from 'react';
import { Image } from 'antd';

interface CustomImageProps {
    src: string;
    width?: number | string;
    height?: number | string;
    preview?: boolean;
    classes?: string;
    color?: string | undefined;
}

const CustomImage: React.FC<CustomImageProps> = ({
    src,
    width = 200,
    height = 200,
    preview = false,
    classes,
    color,
}) => {
    return (
        <Image
            src={src}
            width={width}
            height={height}
            preview={preview}
            className={classes}
            color={color}
        />
    );
};

export default CustomImage;
