import React, {ReactNode} from 'react';
import {appConfig} from '../../config/app.config';
import {useApp} from '../../store/app.store';
import {Col} from "antd";

interface WrapperCardProps {
    width?: number | string;
    height?: number;
    children: ReactNode;
    shadowed?: boolean;
    backgroundColor?: string;
}

const WrapperCard: React.FC<WrapperCardProps> = React.memo((
    {
        width = 200,
        height = 200,
        children,
        shadowed = true,
        backgroundColor,
    }
) => {
    const {theme} = useApp();

    return (
        <Col
            className={`${shadowed ? 'custom-shadow' : ''} p-3`}
            style={{
                width: width,
                height: height,
                borderRadius: appConfig.defaultBorderRadius,
                backgroundColor: backgroundColor ? backgroundColor : theme.cardBg
            }}
        >
            {children}
        </Col>
    );
});

export default WrapperCard;
