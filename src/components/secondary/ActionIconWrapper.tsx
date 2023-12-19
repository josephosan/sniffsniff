import React from "react";
import {SizeTypes} from "../../@types/app";
import {appConfig} from "../../config/app.config";

interface ActionIconWrapperProps {
    icon: string,
    size?: number,
    iconClicked?: () => void,
    clickable?: boolean,
    color?: string
}

const ActionIconWrapper: React.FC<ActionIconWrapperProps> = (
    {
        icon,
        size = appConfig.smallIconSize,
        iconClicked,
        clickable = true,
        color
    }
) => {
    return (
        <>
            <i
                onClick={iconClicked}
                className={icon}
                style={{
                    fontSize: size,
                    cursor: clickable ? "pointer" : "",
                    color: color
                }}
            ></i>
        </>
    );
}

export default ActionIconWrapper;