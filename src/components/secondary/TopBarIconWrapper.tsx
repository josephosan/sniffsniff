import React from 'react';
import { useApp } from '../../store/app.store';
import { appConfig } from '../../config/app.config';

interface TopBarIconWrapperProps {
    iconClasses: string;
    size?: number;
    onClick?: () => void;
    shadow?: boolean;
    backgroundColor?: string | undefined;
}

export const TopBarIconWrapper: React.FC<TopBarIconWrapperProps> = React.memo(
    ({ iconClasses, size, onClick, shadow = true, backgroundColor }) => {
        const { theme } = useApp();
        return (
            <div
                onClick={onClick}
                className={
                    'd-flex justify-content-center align-items-center ' +
                    (shadow ? 'custom-shadow' : '')
                }
                style={{
                    borderRadius: '50%',
                    backgroundColor: backgroundColor
                        ? backgroundColor
                        : theme.cardBg,
                    padding: appConfig.defaultPadding,
                    width: appConfig.defaultIconSize + 15 + 'px',
                    height: appConfig.defaultIconSize + 15 + 'px',
                    cursor: 'pointer',
                }}
            >
                <i
                    className={iconClasses}
                    style={{
                        fontSize:
                            (size ? size : appConfig.defaultIconSize) + 'px',
                        marginTop: '6.5px',
                        marginRight: '1.5px',
                    }}
                ></i>
            </div>
        );
    },
);
