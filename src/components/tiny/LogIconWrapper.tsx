import React from 'react';
import { TopBarIconWrapper } from '../secondary/TopBarIconWrapper';
import { useApp } from '../../store/app.store';

interface LogIconWrapperProps {
    icon: string;
}

const LogIconWrapper: React.FC<LogIconWrapperProps> = ({ icon }) => {
    const { theme } = useApp();

    return (
        <TopBarIconWrapper
            iconClasses={icon + ' mb-1'}
            size={15}
            backgroundColor={theme.cardBgLighter}
        />
    );
};

export default LogIconWrapper;
