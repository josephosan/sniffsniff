import React from "react";
import {appConfig} from "../../config/app.config";

interface ActionIconWrapperProps {
    fontSize?: number,
    text: string
}

const ActionIconWrapper: React.FC<ActionIconWrapperProps> = (
    {
        fontSize = appConfig.smallFontSize,
        text
    }
) => {
    return (
        <span
            style={{
                fontSize: fontSize,
            }}
        >

            {text}
        </span>
    );
}

export default ActionIconWrapper;