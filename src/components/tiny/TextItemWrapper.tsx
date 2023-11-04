import React from "react";
import {appConfig} from "../../config/app.config";

interface TextItemWrapper {
    fontSize?: number,
    text: string
}

const TextItemWrapper: React.FC<TextItemWrapper> = (
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

export default TextItemWrapper;