import React, { useState } from "react";
import { TopBarIconWrapper } from "../secondary/TopBarIconWrapper";
import { Space } from "antd";
import { useApp } from "../../store/app.store";
import { darkConfig, lightConfig } from "../../config/app.config";
import IconHeaderModal from "./IconHeaderModal";
interface AppHeaderProps {
  isMobile: boolean;
  sidebarClick: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  isMobile,
  sidebarClick,
}) => {
  const { theme, setThemeConfig } = useApp();
  const [openModal, setOpenModal] = useState(false);

  return (
    <div
      className={
        "mt-3 w-100 d-flex align-items-center justify-content-" +
        (isMobile ? "between" : "end")
      }
    >
      {isMobile && (
        <Space onClick={sidebarClick}>
          <TopBarIconWrapper iconClasses={"bi bi-list"} />
        </Space>
      )}
      <Space
        onClick={() => {
          setOpenModal(true);
        }}
      >
        {!isMobile ? (
          <>
            <TopBarIconWrapper
              iconClasses={"bi bi-" + (theme.mode === "dark" ? "moon" : "sun")}
              size={theme.mode === "dark" ? 20 : null}
              onClick={() =>
                setThemeConfig(theme === lightConfig ? darkConfig : lightConfig)
              }
            />
            <TopBarIconWrapper size={20} iconClasses={"bi bi-bell"} />
            <TopBarIconWrapper iconClasses={"bi bi-person"} />
          </>
        ) : (
          <>
            <TopBarIconWrapper iconClasses={"bi bi-three-dots-vertical"} />

            <IconHeaderModal
              theme={theme}
              setThemeConfig={setThemeConfig}
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
          </>
        )}
      </Space>
    </div>
  );
};
