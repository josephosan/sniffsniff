import React from 'react';
import styled from 'styled-components';
import { useApp } from '../../store/app.store';
import { appConfig } from '../../config/app.config';

interface TermTypeItemProps {
    icon: string;
    title: string;
    color: string;
    onClick?: () => void;
}

const TermTypeItem: React.FC<TermTypeItemProps> = ({
    icon,
    title,
    color,
    onClick,
}) => {
    const { theme } = useApp();

    const StyledCard = styled.div`
        padding: 5px;
        display: flex;
        flex-direction: column;
        gap: 1;
        justify-content: center;
        align-items: center;
        width: 170px;
        height: 170px;
        cursor: pointer;
        transition: all ${appConfig.defaultAnimationSpeed}s;
        border-radius: ${appConfig.defaultBorderRadius}px;

        &:hover {
            background-color: ${theme.itemHoverColor};
        }

        i {
            color: ${(props: any) => props.color};
            font-size: 40px;
        }
    `;

    return (
        <StyledCard onClick={onClick} color={color}>
            <i className={icon}></i>
            <span>{title}</span>
        </StyledCard>
    );
};

export default TermTypeItem;
