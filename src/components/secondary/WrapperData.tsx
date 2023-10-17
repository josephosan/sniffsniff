import React, {ReactNode} from "react";
import {useMediaQuery} from "react-responsive";
import {appConfig} from "../../config/app.config";
import {useApp} from "../../store/app.store";
import {lightConfig, darkConfig} from "../../config/app.config";

interface DataProps {
    children: ReactNode;
    color?: never;
}

export const WrapperData = ({children, color}: DataProps) => {
    const isMobile = useMediaQuery({
        query: `(max-width: ${appConfig.appBreakPoint}px)`,
    });
    const {theme} = useApp();
    return (
        <>
            {isMobile ? (
                <div
                    className="shadow-sm mb-4 px-5 py-3 rounded align-items-center"
                    style={{
                        backgroundColor: theme.cardBgLighter,
                        color: theme.defaultTextColor
                    }}
                >
                    {children}
                </div>
            ) : (
                <div
                    className="shadow-sm mb-4 px-5 py-3 rounded align-items-center"
                    style={{
                        borderRight: `4px solid ${color}`,
                        backgroundColor: theme.cardBgLighter,
                        color: theme.defaultTextColor
                    }}
                >
                    {children}
                </div>
            )}
        </>
    );
};
