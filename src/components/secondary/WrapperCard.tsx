import React, {ReactNode, useEffect} from 'react';
import { appConfig } from '../../config/app.config';
import styled from 'styled-components';
import { useApp } from '../../store/app.store';

interface WrapperCardProps {
    width?: number | string;
    height?: number;
    children: ReactNode;
    shadowed?: boolean;
    backgroundColor?: string;
}

const WrapperCard: React.FC<WrapperCardProps> = React.memo(({
    width = 200,
    height = 200,
    children,
    shadowed = true,
    backgroundColor,
}) => {
    const { theme } = useApp();
    const StyledDiv = styled.div`
        width: ${width}px;
        height: ${height}px;
        border-radius: ${appConfig.defaultBorderRadius}px;
        background-color: ${backgroundColor ? backgroundColor : theme.cardBg};
    `;

    return (
        <StyledDiv className={`${shadowed ? 'custom-shadow' : ''} p-3`}>
            {children}
        </StyledDiv>
    );
});

export default WrapperCard;
