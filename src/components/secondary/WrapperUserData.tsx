import React from "react";
import WrapperData from "./WrapperData";
import WrapperUserImage from "../tiny/WrapperUserImage";
import {Space} from "antd";
import ActionIconWrapper from "./ActionIconWrapper";
import TextItemWrapper from "../tiny/TextItemWrapper";
import {appConfig} from "../../config/app.config";

interface WrapperUserDataProps {
    title?: string,
    desc?: string,
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
        iconClicked,
        title,
        desc
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
            wrapperCursor={"auto"}
        >

            <div className={"d-flex justify-content-between align-items-center"}>
                <div className={"d-flex flex-row"}>
                    <Space size={"large"}>
                        <WrapperUserImage
                            url={imageUrl}
                            size={"40px"}
                        />
                        <div>
                            <Space className={"d-flex flex-column align-items-start"}>
                                <TextItemWrapper fontSize={appConfig.defaultFontSize}
                                                 text={title}/>
                                <TextItemWrapper fontSize={appConfig.smallFontSize}
                                                 text={desc}/>
                            </Space>
                        </div>
                    </Space>
                </div>


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