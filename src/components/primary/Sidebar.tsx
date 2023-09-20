import React from "react";
import {Input} from "antd";
import {appConfig} from "../../config/app.config";
import {Link} from "react-router-dom";
import {useApp} from "../../store/app.store";

interface SidebarItem {
    name: string,
    icon: string,
    path: string
}

export const Sidebar: React.FC = () => {
    const {theme} = useApp();
    const sideBarItems: SidebarItem[] = [
        {
            name: "داشبورد",
            path: "/dashboard",
            icon: "bi bi-speedometer2"
        },
        {
            name: "جداول زمانی",
            path: "/timelines",
            icon: "bi bi-calendar-range"
        },
        {
            name: "کلاس ها",
            path: "/classes",
            icon: "bi bi-person-video3"
        },
        {
            name: "اعلان ها",
            path: "/notifications",
            icon: "bi bi-app-indicator"
        },
    ]

    return (
        <div
            className={"d-flex flex-column"}
            style={{}}
        >
            <div className={"mt-3 mb-4"}>
                logo here
            </div>

            <div className={"mb-3"}>
                <Input
                    placeholder={'جستجو ...'}
                    prefix={<i style={{fontSize: appConfig.smallIconSize + "px"}} className={"bi bi-search"}></i>}
                    size={"middle"}
                />
            </div>

            <div className={"d-flex flex-column"}>
                {
                    sideBarItems.map(item => (
                        <Link
                            key={item.name}
                            className={"sidebar-link my-1"}
                            to={item.path}
                            style={{
                                textDecoration: "none",
                                color: theme.defaultTextColor,
                                padding: appConfig.defaultPadding,
                                borderRadius: appConfig.defaultBorderRadius,
                                fontSize: appConfig.smallFontSize + 3
                            }}
                        >
                            <div className={"d-flex align-items-center"}>
                                <i
                                    className={item.icon + " ms-2"}
                                    style={{
                                        fontSize: appConfig.smallIconSize + 5
                                    }}
                                ></i>
                                {item.name}
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
}