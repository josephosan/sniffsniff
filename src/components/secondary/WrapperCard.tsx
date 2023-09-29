import React, {ReactNode} from "react";
import {appConfig} from "../../config/app.config";

interface WrapperCardProps {
    width?: number,
    height?: number,
    children: ReactNode
}

const WrapperCard: React.FC<WrapperCardProps> = (
    {
        width = 200,
        height = 200,
        children
    }
) => {
    return (
        <div
            className={"custom-shadow p-3"}
            style={{
                width: width + 'px',
                height: height + 'px',
                borderRadius: appConfig.defaultBorderRadius + 'px'
            }}
        >
            { children }
        </div>
    );
}

export default WrapperCard;