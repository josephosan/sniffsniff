import React, {useEffect, useState} from "react";
import {TopBarIconWrapper} from "../secondary/TopBarIconWrapper";
import {Breadcrumb, Space} from "antd";
import {useApp} from "../../store/app.store";
import {appConfig, darkConfig, lightConfig} from "../../config/app.config";
import IconHeaderModal from "./IconHeaderModal";
import {handleGetBreadcrump} from "../../helpers/app.helper";
import {useLocation} from "react-router-dom";

interface AppHeaderProps {
    isMobile: boolean;
    sidebarClick: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = (
    {
        isMobile,
        sidebarClick,
    }
) => {
    const location = useLocation();
    const {theme, setThemeMode} = useApp();
    const [openModal, setOpenModal] = useState(false);
    const [breadcrumpItems, setBreadcrumpItems] = useState<never>(null);

    useEffect(() => {
        setBreadcrumpItems(prevState => {
            return handleGetBreadcrump(location.pathname);
        })
    }, [location.pathname]);

    return (
        <div
            className={
                "mt-3 w-100 d-flex align-items-center justify-content-" +
                (isMobile ? "between" : "between")
            }
        >
            {
                isMobile ? (
                    <Space onClick={sidebarClick}>
                        <TopBarIconWrapper iconClasses={"bi bi-list"}/>
                    </Space>
                ) : (
                    <Breadcrumb
                        style={{
                            fontSize: appConfig.largeFontSize+'px',
                        }}
                        items={breadcrumpItems}
                    />
                )
            }
            <Space
                onClick={() => {
                    setOpenModal(true);
                }}
            >
                {!isMobile ? (
                    <Space>
                        <TopBarIconWrapper
                            iconClasses={"bi bi-" + (theme.mode === "dark" ? "moon" : "sun")}
                            size={theme.mode === "dark" ? 20 : null}
                            onClick={() =>
                                setThemeMode(theme === lightConfig ? darkConfig : lightConfig)
                            }
                        />
                        <TopBarIconWrapper size={20} iconClasses={"bi bi-bell"}/>
                        <TopBarIconWrapper iconClasses={"bi bi-person"}/>
                    </Space>
                ) : (
                    <>
                        <TopBarIconWrapper iconClasses={"bi bi-three-dots-vertical"}/>

                        <IconHeaderModal
                            theme={theme}
                            setThemeConfig={setThemeMode}
                            openModal={openModal}
                            setOpenModal={setOpenModal}
                        />
                    </>
                )}
            </Space>
        </div>
    );
};
