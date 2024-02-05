import React from 'react';
import CustomImage from '../secondary/CustomImage';
import { useApp } from '../../store/app.store';

interface WrapperUserImageProps {
    url?: string;
    size?: string;
    icon?: string;
    bgColor?: string;
    rounded?: boolean;
    preview?: boolean;
}
const WrapperUserImage: React.FC<WrapperUserImageProps> = ({
    url,
    size = '50px',
    icon,
    bgColor,
    rounded = false,
    preview = false,
}) => {
    const { theme } = useApp();

    return (
        <div
            style={{
                backgroundColor: bgColor ? bgColor : theme.mainBackgroundColor,
                borderRadius: '50%',
                width: size,
                height: size,
            }}
            className={'d-flex justify-content-center align-items-center'}
        >
            {url ? (
                <CustomImage
                    rounded={rounded}
                    src={url}
                    width={'100%'}
                    height={'100%'}
                    preview={preview}
                />
            ) : (
                <i className={icon}></i>
            )}
        </div>
    );
};

export default WrapperUserImage;
