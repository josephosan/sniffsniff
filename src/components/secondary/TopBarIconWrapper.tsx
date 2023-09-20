import React, {ReactNode} from "react";
import {useApp} from "../../store/app.store";
import {appConfig} from "../../config/app.config";

interface TopBarIconWrapperProps {
    iconClasses: string,
    size?: number
}

export const TopBarIconWrapper: React.FC<TopBarIconWrapperProps> = ({iconClasses, size}) => {
    const {theme} = useApp();
    return (
        <div
            className={"d-flex justify-content-center align-items-center custom-shadow"}
            style={{
                borderRadius: "50%",
                backgroundColor: theme.cardBg,
                padding: appConfig.defaultPadding,
                width: appConfig.defaultIconSize + 15 + "px",
                height: appConfig.defaultIconSize + 15 + "px",
            }}
        >
            <i
                className={iconClasses}
                style={{
                    fontSize: (size ? size : appConfig.defaultIconSize) + "px",
                    marginTop: "6.5px",
                    marginRight: "1.5px"
                }}
            ></i>
        </div>
    );
}