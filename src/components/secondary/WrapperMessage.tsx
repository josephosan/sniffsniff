import React from "react";
import WrapperCard from "./WrapperCard";
import ActionIconWrapper from "./ActionIconWrapper";
import {appConfig, statusColors} from "../../config/app.config";
import {useApp} from "../../store/app.store";

interface WrapperMessageProps {
    type?: 'success' | 'info' | 'warning',
    title?: string,
    desc?: string
}

const WrapperMessage: React.FC<WrapperMessageProps> = React.memo((
    {
        type = 'success',
        title = 'title',
        desc = 'desc',
    }
) => {
    const { theme } = useApp();

    return (
        <WrapperCard
            width={"100%"}
            height={"auto"}
            shadowed={false}
            backgroundColor={theme.mainBackgroundColor}
        >
            <div className={"d-flex flex-row gap-3 align-items-center"}>
                <ActionIconWrapper
                    icon={
                        type === 'success' ? 'bi bi-check-circle' :
                            type === 'warning' ? 'bi bi-cone-striped' :
                                'bi bi-info-circle'
                    }
                    size={appConfig.defaultIconSize}
                    color={
                        type === 'success' ? statusColors.success :
                            type === 'warning' ? statusColors.warning :
                                statusColors.info
                    }
                    clickable={false}
                />
                <h4 className={"mb-0"} style={{ fontWeight: "bold", fontSize: appConfig.defaultFontSize }}>
                    {title}
                </h4>
            </div>

            <div className={"mt-2 px-2"} style={{ fontSize: appConfig.smallFontSize }}>
                {desc}
            </div>
        </WrapperCard>
    );
})

export default WrapperMessage;