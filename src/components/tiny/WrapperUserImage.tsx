import React from 'react';
import CustomImage from '../secondary/CustomImage';
import { useApp } from '../../store/app.store';

interface WrapperUserImageProps {
    url?: string;
    size?: string;
    icon?: string;
}
const WrapperUserImage: React.FC<WrapperUserImageProps> = ({
    url,
    size = '50px',
    icon,
}) => {
    const { theme } = useApp();

    return (
        <div
            style={{
                backgroundColor: theme.mainBackgroundColor,
                borderRadius: '50%',
                width: size,
                height: size,
            }}
            className={'d-flex justify-content-center align-items-center'}
        >
            {url ? (
                <CustomImage src={url} width={'90%'} height={'90%'} />
            ) : (
                <i className={icon}></i>
            )}
        </div>
    );
};

export default WrapperUserImage;
