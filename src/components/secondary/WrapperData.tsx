import React, {ReactNode} from 'react';
import {useMediaQuery} from 'react-responsive';
import {appConfig} from '../../config/app.config';
import {useApp} from '../../store/app.store';

interface DataProps {
    children: ReactNode;
    color?: never;
    forceDesktop?: boolean,
    displayBorder?: boolean,
    padding?: string
}

const WrapperData: React.FC<DataProps> = (
    {
        children,
        color,
        displayBorder = true,
        forceDesktop = false,
        padding = '15px'
    }
) => {
    const isMobile = useMediaQuery({
        query: `(max-width: ${appConfig.appBreakPoint}px)`,
    });
    const {theme} = useApp();
    return (
        <>
            {(isMobile && !forceDesktop) ? (
                <div
                    className="shadow-sm mb-4 px-4 py-3 rounded align-items-center"
                    style={{
                        backgroundColor: theme.cardBgLighter,
                        color: theme.defaultTextColor,
                    }}
                >
                    {children}
                </div>
            ) : (
                <div
                    className="shadow-sm mb-4 rounded align-items-center"
                    style={{
                        borderRadius: appConfig.defaultBorderRadius,
                        backgroundColor: theme.cardBgLighter,
                        color: theme.defaultTextColor,
                        borderRight: displayBorder ? `4px solid ${color}` : '',
                        padding: padding
                    }}
                >
                    {children}
                </div>
            )}
        </>
    );
};

export default WrapperData;
