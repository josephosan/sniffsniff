import React from "react";
import WrapperData from "./WrapperData";
import WrapperUserImage from "../tiny/WrapperUserImage";
import {Space} from "antd";
import ActionIconWrapper from "./ActionIconWrapper";

interface WrapperUserDataProps {
    imageUrl: string,
    actionIcons?: {
        icon: string,
        event: string
    }[],
    iconClicked?: (eventName: string) => void
}

const WrapperUserData: React.FC<WrapperUserDataProps> = (
    {
        imageUrl,
        actionIcons,
        iconClicked
    }
) => {
    const handleActionIconClick = (event) => {
        if (iconClicked) {
            iconClicked(event);
        }
    }

    return (
        <WrapperData
            forceDesktop={true}
            padding={"10px"}
        >
            <div className={"d-flex justify-content-between align-items-center"}>
                <WrapperUserImage
                    url={imageUrl}
                    size={"40px"}
                />

                <Space className={"ms-2"}>
                    {
                        actionIcons && actionIcons.map(el => {
                            return (
                                <ActionIconWrapper
                                    icon={el.icon}
                                    iconClicked={() => handleActionIconClick(el.event)}
                                    key={el.icon}
                                />
                            )
                        })
                    }
                </Space>
            </div>
        </WrapperData>
    );
}

export default WrapperUserData;