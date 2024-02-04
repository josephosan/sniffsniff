import React from 'react';
import { appConfig } from '../../config/app.config';

interface TextItemWrapper {
    fontSize?: number;
    text: string;
    style?: Object;
}

const TextItemWrapper: React.FC<TextItemWrapper> = ({
    fontSize = appConfig.smallFontSize,
    text,
    style,
}) => {
    return (
        <span
            style={{
                fontSize: fontSize,
                ...style,
            }}
        >
            {text}
        </span>
    );
};

export default TextItemWrapper;
