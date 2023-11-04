import React from "react";
import {SizeTypes} from "../../@types/app";
import {appConfig} from "../../config/app.config";

interface ActionIconWrapperProps {
    icon: string,
    size?: number,
    iconClicked?: () => void
}

const ActionIconWrapper: React.FC<ActionIconWrapperProps> = (
    {
        icon,
        size = appConfig.smallIconSize,
        iconClicked,
    }
) => {
    return (
        <>
            <i
                onClick={iconClicked}
                className={icon}
                style={{
                    fontSize: size,
                    cursor: "pointer",
                }}
            ></i>
        </>
    );
}

export default ActionIconWrapper;