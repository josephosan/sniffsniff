import React from "react";
import WrapperCard from "./WrapperCard";
import ActionIconWrapper from "./ActionIconWrapper";
import {appConfig} from "../../config/app.config";

interface WrapperMessageProps {
    type: 'success' | 'info' | 'warning',
    title: string,
    desc: string
}

const WrapperMessage: React.FC<WrapperMessageProps> = React.memo((
    {
        type = 'success',
        title = 'title',
        desc = 'desc'
    }
) => {
    return (
        <WrapperCard
            width={"100%"}
            height={"auto"}
        >
            <div className={"d-flex flex-row gap-3"}>
                <ActionIconWrapper
                    icon={
                        type === 'success' ? 'bi bi-check-circle' :
                            type === 'warning' ? 'bi bi-cone-striped' :
                                'bi bi-info-circle'
                    }
                    size={appConfig.defaultIconSize}
                    color={
                        type === 'success' ? '#65B741' :
                            type === 'warning' ? '#FB8B24' :
                                '#6DB9EF'
                    }
                    clickable={false}
                />
                <h4 style={{ fontWeight: "bold" }}>
                    {title}
                </h4>
            </div>

            <div className={"mt-2 px-2"}>
                {desc}
            </div>
        </WrapperCard>
    );
})

export default WrapperMessage;