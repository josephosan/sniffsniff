import React, {useState} from "react";
import WrapperTooltip from "./WrapperTooltip";
import {TopBarIconWrapper} from "./TopBarIconWrapper";
import {useMediaQuery} from "react-responsive";
import {appConfig} from "../../config/app.config";
import WrapperModal from "./WrapperModal";
import NotificationModalMessages from "./NotificationModalMessages";

interface NotificationBellProps {
    tooltipWidth?: string
}

const NotificationBell: React.FC<NotificationBellProps> = (
    {
        tooltipWidth = "400px"
    }
) => {
    const [bellModalOpen, setBellModalOpen] = useState(false);
    const isMobile = useMediaQuery({
        query: `(max-width: ${appConfig.appBreakPoint}px)`,
    });

    return (
        <>
            {
                isMobile ? (
                    <>
                        <TopBarIconWrapper
                            size={20}
                            iconClasses={'bi bi-bell'}
                            onClick={() => setBellModalOpen(!bellModalOpen)}
                        />
                        <WrapperModal
                            elements={
                                <NotificationModalMessages/>
                            }
                            open={bellModalOpen}
                            setOpenModal={setBellModalOpen}
                            closable={false}
                            footer={null}
                            destroyOnClose={true}
                        />
                    </>
                ) : (
                    <WrapperTooltip
                        open={bellModalOpen}
                        title={"title"}
                        trigger={"click"}
                        width={tooltipWidth}
                        destroyTooltipOnHide={true}
                        content={
                            <NotificationModalMessages/>
                        }
                        openChange={(e) => e ? undefined : setBellModalOpen(e)}
                    >
                        <TopBarIconWrapper
                            size={20}
                            iconClasses={'bi bi-bell'}
                            onClick={() => setBellModalOpen(!bellModalOpen)}
                        />
                    </WrapperTooltip>
                )
            }
        </>
    );
}

export default NotificationBell;