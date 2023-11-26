import React from "react";
import WrapperData from "./WrapperData";
import WrapperUserImage from "../tiny/WrapperUserImage";
import ActionIconWrapper from "./ActionIconWrapper";

interface WrapperUserDataProps {
    url: string
}

const WrapperUserData: React.FC<WrapperUserDataProps> = (
    {
        url
    }
) => {
    const [clicked, setClicked] = useState('');
    return (
        <WrapperData>
            <WrapperUserImage
                url={url}
            />
            <ActionIconWrapper icon={url} iconClicked={() => setClicked("seen")} />
            <ActionIconWrapper icon={url} iconClicked={() =>setClicked("remove")} />
        </WrapperData>
    );
}

export default WrapperUserData;