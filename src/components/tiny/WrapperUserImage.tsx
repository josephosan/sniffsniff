import React from "react";
import CustomImage from "../secondary/CustomImage";
import {useApp} from "../../store/app.store";

interface WrapperUserImageProps {
    url: string,
    size?: string
}
const WrapperUserImage: React.FC<WrapperUserImageProps> = (
    {
        url,
        size = '50px'
    }
) => {
    const { theme } = useApp();

    return (
        <div
            style={{
                backgroundColor: theme.mainBackgroundColor,
                borderRadius: '50%',
                width: size,
                height: size
            }}
            className={"d-flex justify-content-center align-items-center"}
        >
            <CustomImage
                src={url}
                width={'100%'}
                height={'100%'}
            />
        </div>
    );
}

export default WrapperUserImage;
