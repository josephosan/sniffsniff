import React from "react";

interface CustomImageProps {
    src: string,
    alt?: string,
    width?: string,
    height?: string
}

const CustomImage: React.FC<CustomImageProps> = (
    {
        src,
        alt = 'alt',
        width,
        height
    }
) => {
    return (
        <>
            <img
                src={src}
                alt={alt}
                width={width}
                height={height}
            />
        </>
    );
}

export default CustomImage;