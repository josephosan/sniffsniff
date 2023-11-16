import { styled, keyframes } from 'styled-components';
import React, { ReactElement, memo } from 'react';

interface GlowProps {
    children: ReactElement;
    time?: string;
    delayTime?: string;
    key?: string;
    value1?: string;
    value2?: string;
}

const WrapperGlow: React.FC<GlowProps> = memo(({
    children,
    time = '3s',
    key = 'filter',
    value1 = 'blur(5px)',
    value2 = 'bluer(0)',
    delayTime = '0',
}) => {
    const pulse = keyframes`
    from {
        ${key}: ${value1};
    }
    to {
        ${key}: ${value2};
    }
  `;

    const Bar = styled.div`
        animation: ${pulse} ${time};
        animation-delay: ${delayTime};
    `;

    return <Bar>{children}</Bar>;
});

export default WrapperGlow;
