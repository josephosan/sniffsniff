import React from "react";
import {TopBarIconWrapper} from "../secondary/TopBarIconWrapper";
import {Space} from "antd";

interface AppHeaderProps {
    isMobile: boolean,
    sidebarClick: () => void
}

export const AppHeader: React.FC<AppHeaderProps> = ({isMobile, sidebarClick}) => {
    return (
        <div className={"mt-3 w-100 d-flex align-items-center justify-content-" + (isMobile ? "between" : "end") }>
            {
                isMobile &&
                <Space onClick={sidebarClick}>
                    <TopBarIconWrapper iconClasses={"bi bi-list"}/>
                </Space>
            }
            <Space>
                {
                    !isMobile ?
                        <>
                            <TopBarIconWrapper iconClasses={"bi bi-sun"}/>
                            <TopBarIconWrapper size={20} iconClasses={"bi bi-bell"}/>
                            <TopBarIconWrapper iconClasses={"bi bi-person"}/>
                        </>
                        :
                        <>
                            <TopBarIconWrapper iconClasses={"bi bi-three-dots-vertical"}/>
                        </>
                }
            </Space>
        </div>
    );
}

