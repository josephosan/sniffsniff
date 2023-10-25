import React, {ReactNode} from "react";
import {appConfig} from "../../config/app.config";
import {useApp} from "../../store/app.store";

interface BorderedDataWrapperProps {
    children: ReactNode,
    title?: string,
    required?: boolean
}

const BorderedDataWrapper: React.FC<BorderedDataWrapperProps> = (
    {
        children,
        title,
        required = false
    }
) => {
    const {theme} = useApp();

    return (
        <div
            className={"w-100 h-100 mt-3"}
        >
            <div style={{fontSize: appConfig.defaultFontSize}}>
                {required ? <span style={{color: "red"}}>*</span> : null} {title}
            </div>
            <div
                style={{
                    border: `1px solid ${theme.primaryColor}`,
                    borderRadius: appConfig.defaultBorderRadius
                }}
                className={"p-2"}
            >
                {children}
            </div>
        </div>
    );
}

export default BorderedDataWrapper;