import React, {ReactNode} from "react";
import {appConfig} from "../../config/app.config";
import styled from "styled-components";
import {useApp} from "../../store/app.store";

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
    const { theme } = useApp();
    const StyledDiv = styled.div`
      width: ${width}px;
      height: ${height}px;
      border-radius: ${appConfig.defaultBorderRadius}px;
      background-color: ${theme.cardBg};
    `;

    return (
        <StyledDiv
            className={"custom-shadow p-3"}
        >
            { children }
        </StyledDiv>
    );
}

export default WrapperCard;