import React from 'react';
import { useApp } from '../../store/app.store';
import { appConfig } from '../../config/app.config';

interface ShowTaskStatusProps {
    iconClasses: string;
    size?: number;
    shadow?: boolean;
    color?: string;
    text?: string;
}

const ShowTaskStatus: React.FC<ShowTaskStatusProps> = ({
    iconClasses,
    size,
    shadow = true,
    color,
    text,
}) => {
    const { theme } = useApp();

    return (
        <div
            className={
                'd-flex justify-content-center align-items-center ' +
                (shadow ? 'custom-shadow' : '')
            }
            style={{
                borderRadius: appConfig.defaultBorderRadius,
                backgroundColor: theme.cardBgLighter,
                padding: appConfig.defaultPadding,
                height: appConfig.defaultIconSize + 15 + 'px',
                cursor: 'pointer',
            }}
        >
            <div className="gap-2 d-flex justify-content-center align-items-center">
                <i
                    className={iconClasses}
                    style={{
                        fontSize:
                            (size ? size : appConfig.defaultIconSize) + 'px',
                        marginTop: '6.5px',
                        marginRight: '1.5px',
                        color: color ? color : undefined,
                    }}
                ></i>

                <span style={{ whiteSpace: 'nowrap' }} className="mt-1">
                    {text}
                </span>
            </div>
        </div>
    );
};

export default ShowTaskStatus;
