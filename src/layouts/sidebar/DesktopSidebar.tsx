import React from "react";
import {Link} from "react-router-dom";
import {SidebarLinkItem} from "../../@types/app";
import AppConfig from "../../config/app.config";

interface desktopSidebarProps {
    menuItems: SidebarLinkItem[]
}

export const DesktopSidebar: React.FC<desktopSidebarProps> = ({menuItems}) => {

    // sort items before rendering.
    const order = {
        "/home": 1,
        "/users": 2,
        "/help": 3,
        "/requests": 4,
        "/messages": 5,
        "/settings": 6
    }
    menuItems = menuItems.sort((a, b) => order[a.path] - order[b.path]);

    return (
        <div className={"h-100 px-4 py-3"}>
            <div className="d-flex flex-column h-100">
                <div className={"py-4"}>logo here</div>
                <div className={"flex-grow-1 d-flex flex-column justify-content-center"}>
                    {
                        menuItems.map(item => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={"d-flex align-items-center my-1"}
                                style={{textDecoration: "none", color: "inherit"}}
                            >
                                <i
                                    className={item.selected ? item.icon_classname_selected : item.icon_classname}
                                    style={{fontSize: '23px', color: AppConfig.primaryColor}}
                                ></i>
                                <span
                                    className={"me-2"}
                                    style={{color: item.selected ? AppConfig.selectedTextColor : AppConfig.normalTextColor}}
                                >
                                    {item.label}
                                </span>
                            </Link>
                        ))
                    }
                </div>
                <div style={{ cursor: "pointer" }}>
                    <div
                        className={"d-flex align-items-center my-2"}
                        style={{textDecoration: "none", color: "inherit"}}
                    >
                        <i
                            className={"bi bi-box-arrow-right"}
                            style={{fontSize: '23px', color: AppConfig.primaryColor}}
                        ></i>
                        <span
                            className={"me-2 mb-1"}
                            style={{color: AppConfig.normalTextColor}}
                        >
                            خروج
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}