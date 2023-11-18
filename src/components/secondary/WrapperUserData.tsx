import React from "react";
import WrapperData from "./WrapperData";
import WrapperUserImage from "../tiny/WrapperUserImage";

interface WrapperUserDataProps {
    url: string
}

const WrapperUserData: React.FC<WrapperUserDataProps> = (
    {
        url
    }
) => {
    return (
        <WrapperData>
            <WrapperUserImage
                url={url}
            />
        </WrapperData>
    );
}

export default WrapperUserData;