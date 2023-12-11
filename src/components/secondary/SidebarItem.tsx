import styled from "styled-components";
import {appConfig} from "../../config/app.config";
import {Link} from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import {useApp} from "../../store/app.store";

interface SidebarItemProps {
    name: string;
    icon: string;
    path: string;
}


const SidebarItem: React.FC<SidebarItemProps> = ({name, icon, path}) => {
  const { theme, handleSetSidebarCollapsed } = useApp();
  
  const closeSideBar = () => {
    handleSetSidebarCollapsed(false)
  }
    
    const StyledLink = styled(Link)`
      text-decoration: none;
      padding: ${appConfig.defaultPadding};
      border-radius: ${appConfig.defaultBorderRadius}px;
      font-size: ${appConfig.smallFontSize + 3};
      color: ${theme.defaultTextColor};
      background-color: transparent;
      transition: all ${appConfig.defaultAnimationSpeed}s;

      &:hover {
        background-color: ${theme.itemHoverColor};
        color: ${theme.defaultTextColor};
      }
    `;

    return (
        <StyledLink onClick={closeSideBar} to={path} className={"my-1 p-2 px-2"}>
            <div className={"d-flex align-items-center"}>
                <i
                    className={icon + " ms-2"}
                    style={{
                        fontSize: appConfig.smallIconSize + 5,
                    }}
                ></i>
                {name}
            </div>
        </StyledLink>
    );
};


export default SidebarItem;