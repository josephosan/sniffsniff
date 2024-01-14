import React from 'react';
import WrapperCard from './WrapperCard';
import ActionIconWrapper from './ActionIconWrapper';
import { appConfig, statusColors } from '../../config/app.config';
import { useApp } from '../../store/app.store';

interface WrapperMessageProps {
    type?: 0 | 1;
    title?: string;
    desc?: string;
}

const WrapperMessage: React.FC<WrapperMessageProps> = React.memo(
    ({ type = 'success', title = 'title', desc }) => {
        const { theme } = useApp();

        return (
            <WrapperCard
                width={'100%'}
                height={'auto'}
                shadowed={true}
                backgroundColor={theme.cardBgLighter}
            >
                <div className={'d-flex flex-row gap-3 align-items-center'}>
                    <ActionIconWrapper
                        icon={
                            type === 0
                                ? 'bi bi-check-circle'
                                : type === 1
                                ? 'bi bi-cone-striped'
                                : 'bi bi-info-circle'
                        }
                        size={appConfig.defaultIconSize}
                        color={
                            type === 0
                                ? statusColors.success
                                : type === 1
                                ? statusColors.warning
                                : statusColors.info
                        }
                        clickable={false}
                    />
                    <h4
                        className={'mb-0'}
                        style={{
                            fontWeight: 'bold',
                            fontSize: appConfig.defaultFontSize,
                        }}
                    >
                        {title}
                    </h4>
                </div>

                <div
                    className={'mt-2 px-2'}
                    style={{ fontSize: appConfig.smallFontSize + 5 }}
                >
                    {desc}
                </div>
            </WrapperCard>
        );
    },
);

export default WrapperMessage;
